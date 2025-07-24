import pytest
from models.pipeline import predict_rul

def test_predict_rul_valid_input(monkeypatch, mocker):
    # Minimal mock for joblib and model loading
    mock_model = mocker.Mock()
    mock_model.predict.return_value = [42.0]

    # Patch model loading and feature file reading
    monkeypatch.setattr("models.pipeline.joblib.load", lambda path: ["sensor_1", "sensor_2", "sensor_3", "sensor_4", "sensor_5", "sensor_6", "sensor_7", "sensor_8", "sensor_9"])
    monkeypatch.setattr("models.pipeline.Path.exists", lambda self: True)
    
    # Also patch shap.Explainer to avoid actual SHAP computation
    monkeypatch.setattr("models.pipeline.shap.Explainer", lambda model: lambda x: mocker.Mock(
        values=[[0.1] * 9],
        base_values=[0.0]
    ))

    # Replace shap save function with a dummy
    monkeypatch.setattr("models.pipeline.save_shap_force_plot", lambda *args, **kwargs: None)

    # Patch mlflow to disable logging during test
    monkeypatch.setattr("models.pipeline.mlflow.start_run", lambda *args, **kwargs: mocker.MagicMock().__enter__())
    monkeypatch.setattr("models.pipeline.mlflow.set_tag", lambda *args, **kwargs: None)
    monkeypatch.setattr("models.pipeline.mlflow.log_param", lambda *args, **kwargs: None)
    monkeypatch.setattr("models.pipeline.mlflow.log_params", lambda *args, **kwargs: None)
    monkeypatch.setattr("models.pipeline.mlflow.log_metric", lambda *args, **kwargs: None)
    monkeypatch.setattr("models.pipeline.mlflow.log_artifact", lambda *args, **kwargs: None)
    monkeypatch.setattr("models.pipeline.mlflow.sklearn.log_model", lambda *args, **kwargs: None)

    # Sample input
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

    # Assertions
    assert isinstance(result, dict)
    assert "prediction" in result
    assert "rul_cycles" in result["prediction"]
    assert result["prediction"]["status"] in ["🟢 OK", "⚠️ DANGER", "☠️ CRITICAL"]
    assert isinstance(result["prediction"]["rul_cycles"], float)
