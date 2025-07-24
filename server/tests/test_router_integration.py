from fastapi.testclient import TestClient
from app.main import app
import io

client = TestClient(app)

def test_auto_predict_from_csv():
    dummy_csv = "unit,time,op_setting_1,sensor_1,sensor_2\n1,1,0.5,100,200\n"
    response = client.post(
        "/v1/predict/auto",
        data={"engine_type": "FD001", "condition": "standard", "row_index": 0},
        files={"file": ("dummy.csv", io.BytesIO(dummy_csv.encode("utf-8")), "text/csv")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "result" in data
    assert "prediction" in data["result"]
