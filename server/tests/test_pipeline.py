from models.pipeline import predict_rul

def test_predict_rul_valid_input():
    input_data = {
        "sensor_1": 500,
        "sensor_2": 640,
        "sensor_3": 0.2,
        "sensor_4": 0.5,
        "sensor_5": 1000,
        "sensor_6": 200,
        "sensor_7": 30,
        "sensor_8": 0.1,
        "sensor_9": 0.03,
        "engine_type": "FD001"
    }

    result = predict_rul(input_data)
    assert isinstance(result, dict)
    assert "prediction" in result
    assert "rul_cycles" in result["prediction"]
    assert result["prediction"]["status"] in ["Healthy", "Moderate", "Critical"]
