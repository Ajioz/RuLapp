import os
import json
import shutil
import joblib
import pandas as pd
from pathlib import Path
from fastapi.testclient import TestClient
from app.main import app
from models.pipeline import predict_rul
from models.utils import detect_input_type

client = TestClient(app)
TEST_ENGINE_TYPE = "FD001"

def test_detect_input_type_variants():
    assert detect_input_type({"sensor_1": 1.0}) == "form"
    assert detect_input_type(pd.DataFrame({"sensor_1": [1.0]})) == "stream"
    assert detect_input_type("sample.csv") == "csv"
    assert detect_input_type("sample.txt") == "txt"

def test_predict_rul_valid_input_and_shap():
    input_data = {
        "sensor_2": 641.82,
        "sensor_3": 0.002,
        "sensor_4": 0.01,
        "sensor_7": 100.5,
        "engine_type": TEST_ENGINE_TYPE,
    }
    result = predict_rul(input_data)
    assert "prediction" in result
    assert "rul_cycles" in result["prediction"]
    assert "explanation" in result
    assert len(result["explanation"]["shap_values_array"]) > 0

def test_api_predict_success():
    input_data = {
        "engine_type": TEST_ENGINE_TYPE,
        "data": {
            "sensor_2": 641.82,
            "sensor_3": 0.002,
            "sensor_4": 0.01,
            "sensor_7": 100.5
        }
    }
    response = client.post("/v1/predict", json=input_data)
    assert response.status_code == 200
    assert "rul_cycles" in response.json()

def test_api_predict_validation_error():
    response = client.post("/v1/predict", json={})
    assert response.status_code == 422

def test_batch_file_upload_csv(tmp_path):
    csv_path = tmp_path / "test_fd001.csv"
    df = pd.DataFrame([{
        "unit_number": 1,
        "time_in_cycles": 1,
        "op_setting_1": 0.5,
        "op_setting_2": 0.1,
        "op_setting_3": 0.2,
        "sensor_2": 600,
        "sensor_3": 0.002,
        "sensor_4": 0.01,
        "sensor_7": 100
    }])
    df.to_csv(csv_path, index=False)

    with open(csv_path, "rb") as f:
        response = client.post(
            "/v1/predict/batch",
            files={"file": ("test.csv", f, "text/csv")},
            data={"engine_type": TEST_ENGINE_TYPE, "row_index": 0}
        )
    assert response.status_code == 200
    assert "rul_cycles" in response.json()

def test_batch_file_upload_invalid_format():
    response = client.post(
        "/v1/predict/batch",
        files={"file": ("test.invalid", "some-content")},
        data={"engine_type": TEST_ENGINE_TYPE, "row_index": 0}
    )
    assert response.status_code == 400
    assert response.json()["error"] == "Only CSV or TXT files are supported."

def test_auto_predict_form():
    form_data = {
        "engine_type": TEST_ENGINE_TYPE,
        "row_index": "0",
        "sensor_2": "600",
        "sensor_3": "0.002",
        "sensor_4": "0.01",
        "sensor_7": "100"
    }
    response = client.post("/v1/predict/auto", data=form_data)
    assert response.status_code == 200
    assert "result" in response.json()

def test_predict_rul_schema_mismatch():
    bad_input = {
        "sensor_999": 1234,
        "engine_type": TEST_ENGINE_TYPE
    }
    try:
        predict_rul(bad_input)
        assert False, "Should raise error for unknown feature"
    except Exception as e:
        assert "feature" in str(e).lower() or "column" in str(e).lower()

def test_shap_output_file_created():
    shap_file = Path("reports") / f"shap_force_plot_{TEST_ENGINE_TYPE.lower()}.png"
    if shap_file.exists():
        shap_file.unlink()

    input_data = {
        "sensor_2": 641.82,
        "sensor_3": 0.002,
        "sensor_4": 0.01,
        "sensor_7": 100.5,
        "engine_type": TEST_ENGINE_TYPE,
    }
    predict_rul(input_data)
    assert shap_file.exists()
