from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_api_predict_invalid():
    response = client.post("/v1/predict", json={"data": {}, "engine_type": "FD002"})
    assert response.status_code == 422  # Pydantic will catch the missing fields
