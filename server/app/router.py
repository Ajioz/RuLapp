import io
import pandas as pd
from typing import Union
from fastapi import APIRouter, File, UploadFile, Form, Request, HTTPException
from fastapi.responses import JSONResponse
from models.pipeline import predict_rul
from models.utils import detect_input_type, prepare_input_data
from app.schemas import UIInput  # assuming this is your pydantic input model

router = APIRouter(prefix="/v1")


# =============================================#
# 🧠 Auto Input Single Prediction from          
# =============================================#   
@router.post("/predict/auto", tags=["Flexible Auto Input"])
async def predict_auto(
    request: Request,
    engine_type: str = Form(...),
    condition: str = Form("standard"),
    row_index: int = Form(0),
    file: UploadFile = File(None)
):
    """
    Automatically detects input type: dict (form), csv, txt, or stream.
    """
    try:
        if file:  # If a file is uploaded
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


# ===============================
# 🧠 Single Prediction from UI/Form
# ===============================
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


# ===============================
# 📂 Batch Prediction from File
# ===============================
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
