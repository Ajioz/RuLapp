from models.pipeline import predict_rul

def test_predict_rul_valid_input():
    input_data = {
        "sensor_1": 500, "sensor_2": 640, "sensor_3": 0.2,  # mocked
        "engine_type": "FD002",
        "condition": "standard"
    }
    result = predict_rul(input_data)
    assert "prediction" in result
    assert "rul_cycles" in result["prediction"]
