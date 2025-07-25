import io
import os
import json
import shutil
import pandas as pd
from typing import Union
from pathlib import Path
from fastapi import APIRouter, File, UploadFile, Form, Request, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models.pipeline import predict_rul
from models.utils import detect_input_type, prepare_input_data
from app.schemas import UIInput
import mlflow
import mlflow.sklearn
import joblib

router = APIRouter(prefix="/v1")
security = HTTPBearer()

def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    if token != os.getenv("ADMIN_API_KEY"):
        raise HTTPException(status_code=403, detail="Forbidden: Invalid admin token.")
    return True

@router.post("/predict/auto", tags=["Flexible Auto Input"])
async def predict_auto(
    request: Request,
    engine_type: str = Form(...),
    condition: str = Form("standard"),
    row_index: int = Form(0),
    file: UploadFile = File(None)
):
    try:
        if file:
            contents = await file.read()
            ext = file.filename.split(".")[-1].lower()

            if ext == "csv":
                df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
                input_type = detect_input_type(df)
            elif ext == "txt":
                df = pd.read_csv(io.StringIO(contents.decode("utf-8")), sep=r"\s+", header=None)
                from models.training import infer_column_schema
                col_names, _, _ = infer_column_schema(df)
                df.columns = col_names
                input_type = detect_input_type(df)
            else:
                raise HTTPException(status_code=400, detail="Unsupported file type")

            input_row = prepare_input_data(df, engine_type, condition, row_index)

        else:
            form_data = await request.form()
            input_dict = dict(form_data)
            input_dict.pop("engine_type", None)
            input_dict.pop("condition", None)
            input_dict.pop("row_index", None)
            input_type = detect_input_type(input_dict)
            input_row = prepare_input_data(input_dict, engine_type, condition)

        result = predict_rul(input_row)
        return {"input_type": input_type, "result": result}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.post("/predict", tags=["Single Prediction"])
async def api_predict(input: UIInput):
    try:
        input_row = prepare_input_data(
            source=input.data,
            engine_type=input.engine_type,
            condition=input.condition,
            row_index=input.row_index
        )
        result = predict_rul(input_row)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/predict/batch", tags=["Batch File Upload"])
async def predict_from_file(
    file: UploadFile = File(...),
    engine_type: str = Form(...),
    row_index: int = Form(0)
):
    contents = await file.read()
    ext = file.filename.split(".")[-1].lower()

    try:
        if ext == "csv":
            df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
        elif ext == "txt":
            df = pd.read_csv(io.StringIO(contents.decode("utf-8")), sep=r"\s+", header=None)
            from models.training import infer_column_schema
            col_names, _, _ = infer_column_schema(df)
            df.columns = col_names
        else:
            return JSONResponse(status_code=400, content={"error": "Only CSV or TXT files are supported."})

        input_row = prepare_input_data(df, engine_type=engine_type, row_index=row_index)
        result = predict_rul(input_row)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/upload", tags=["Smart Upload"])
async def upload_file_for_pipeline(
    file: UploadFile = File(...),
    purpose: str = Form(...),
    mType: str = Form(...)
):
    import subprocess
    import uuid

    RAW_DIR = Path("data/raw")
    PROCESSED_DIR = Path("data/processed")
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    filename = f"{uuid.uuid4()}_{file.filename}"
    raw_path = RAW_DIR / filename
    processed_path = PROCESSED_DIR / filename

    with open(raw_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if purpose == "tPipeline":
        preprocess_result = subprocess.run(
            ["python", "utils/preprocess.py", str(raw_path), str(processed_path)]
        )
        if preprocess_result.returncode != 0:
            raise HTTPException(status_code=500, detail="❌ Preprocessing failed.")

        train_result = subprocess.run(
            ["python", "model/training.py", "--dataset", processed_path.name, "--engine_type", mType]
        )
        if train_result.returncode != 0:
            raise HTTPException(status_code=500, detail="❌ Training failed.")

        return {"status": "✅ Success", "message": f"Model trained and registered for: {mType}"}

    elif purpose == "rul":
        try:
            input_type = detect_input_type(str(raw_path))
            input_row = prepare_input_data(str(raw_path), engine_type=mType)
            result = predict_rul(input_row)
            return {"status": "✅ Success", "result": result}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"❌ RUL Prediction failed: {str(e)}")

    else:
        raise HTTPException(status_code=400, detail="Invalid purpose tag. Use 'tPipeline' or 'rul'.")


@router.post("/artefact/upload", tags=["Admin Upload"])
async def upload_artefact(
    mType: str = Form(...),
    model_file: UploadFile = File(...),
    features_file: UploadFile = File(...),
    authorized: bool = Depends(verify_admin)
):
    if not authorized:
        raise HTTPException(status_code=403, detail="Admin privileges required.")

    try:
        if not model_file.filename.endswith(".pkl"):
            raise HTTPException(status_code=400, detail="Model must be a .pkl file")
        if not features_file.filename.endswith(".json"):
            raise HTTPException(status_code=400, detail="Features must be a .json file")

        registry_dir = Path("model_registry")
        registry_dir.mkdir(exist_ok=True)

        model_path = registry_dir / f"{mType.lower()}_xgb_model.pkl"
        features_path = registry_dir / f"{mType.lower()}_feature_columns.pkl"

        with open(model_path, "wb") as f:
            shutil.copyfileobj(model_file.file, f)

        with open(features_path, "wb") as f:
            shutil.copyfileobj(features_file.file, f)

        model = joblib.load(model_path)
        with open(features_path) as f:
            feature_columns = json.load(f)

        if not isinstance(feature_columns, list) or not all(isinstance(col, str) for col in feature_columns):
            raise HTTPException(status_code=400, detail="Invalid features.json format")

        mlflow.set_experiment(mType)
        with mlflow.start_run(run_name=f"{mType}_external_upload"):
            mlflow.set_tag("source", "external_upload")
            mlflow.set_tag("model_type", mType)
            mlflow.set_tag("upload_method", "API")
            mlflow.set_tag("model_origin", "user_uploaded")
            mlflow.log_params({"source": "upload", "features": len(feature_columns)})
            mlflow.sklearn.log_model(model, "model")
            mlflow.register_model(f"runs:/{mlflow.active_run().info.run_id}/model", f"{mType}_XGB_Model")

        return JSONResponse(content={"message": f"{mType} model uploaded and registered."}, status_code=201)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
