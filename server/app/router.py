import io
import pandas as pd
from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse
from models.pipeline import predict_rul
from models.utils import prepare_input_data
from app.schemas import UIInput

router = APIRouter(prefix="/v1")


@router.post("/predict", tags=["Single Prediction"])
async def api_predict(input: UIInput):
    input_row = prepare_input_data(
        source=input.data,
        engine_type=input.engine_type,
        condition=input.condition,
        row_index=input.row_index
    )
    result = predict_rul(input_row)
    return result



@router.post("/predict/batch", tags=["Batch File Upload"])
async def predict_from_file(
    file: UploadFile = File(...),
    engine_type: str = Form(...),
    row_index: int = Form(0)
):
    contents = await file.read()
    ext = file.filename.split(".")[-1].lower()

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
