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
    assert response.json()["error"] == "Only CSV or TXT files are supported."
