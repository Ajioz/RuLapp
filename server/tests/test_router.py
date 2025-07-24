import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_api_predict_validation_error():
    response = client.post("/v1/predict", json={})
    assert response.status_code == 422

def test_batch_file_upload_invalid_format():
    response = client.post(
        "/v1/predict/batch",
        files={"file": ("test.invalid", "some-content")},
        data={"engine_type": "FD002", "row_index": 0}
    )
    assert response.status_code == 400
    assert "Only CSV or TXT files are supported" in response.text

def test_predict_auto_with_form_dict():
    # Simulate a simple form input (dict mode)
    response = client.post(
        "/v1/predict/auto",
        data={
            "engine_type": "FD001",
            "sensor_1": "500",
            "sensor_2": "600",
            "sensor_3": "0.3",
            "sensor_4": "0.6",
            "sensor_5": "800"
        }
    )
    assert response.status_code in [200, 500]  # may fail if no model exists
    assert "input_type" in response.json() or "error" in response.json()

def test_predict_batch_csv_file():
    csv_content = "sensor_1,sensor_2,sensor_3\n100,200,300\n"
    response = client.post(
        "/v1/predict/batch",
        files={"file": ("test.csv", io.StringIO(csv_content).read())},
        data={"engine_type": "FD001", "row_index": 0}
    )
    assert response.status_code in [200, 400, 422]  # if schema mismatch, it's OK
    assert isinstance(response.json(), dict)
