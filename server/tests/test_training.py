import pytest
from pathlib import Path
from models.training import run_training_pipeline

@pytest.mark.parametrize("dataset_id", ["FD001", "FD002", "FD003", "FD004"])
def test_run_training_pipeline(dataset_id, monkeypatch, tmp_path):
    # Redirect model output to temporary path
    registry_dir = tmp_path / "model_registry"
    registry_dir.mkdir()
    reports_dir = tmp_path / "reports"
    reports_dir.mkdir()
    inference_dir = tmp_path / "inference"
    inference_dir.mkdir()

    monkeypatch.setattr("models.training.Path", lambda *args: tmp_path.joinpath(*args))

    result = run_training_pipeline(dataset_id)

    xgb_path = tmp_path / f"models/{dataset_id.lower()}_xgb_model.pkl"
    rf_path = tmp_path / f"models/{dataset_id.lower()}_rf_model.pkl"
    features_path = tmp_path / f"models/{dataset_id.lower()}_feature_columns.pkl"

    assert xgb_path.exists(), f"Missing XGBoost model for {dataset_id}"
    assert rf_path.exists(), f"Missing RandomForest model for {dataset_id}"
    assert features_path.exists(), f"Missing feature list for {dataset_id}"
    assert "xgb_metrics" in result and "rf_metrics" in result
