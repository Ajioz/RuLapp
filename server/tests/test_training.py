import os
from pathlib import Path
from models.training import run_training_pipeline

def test_run_training_pipeline_for_all_sets():
    datasets = ["FD001", "FD002", "FD003", "FD004"]
    for dataset in datasets:
        run_training_pipeline(dataset)

        # Check that models were saved correctly
        xgb_path = Path(f"model_registry/{dataset}_xgb_model.pkl")
        rf_path = Path(f"model_registry/{dataset}_rf_model.pkl")
        features_path = Path(f"model_registry/{dataset}_features.json")

        assert xgb_path.exists(), f"Missing XGBoost model for {dataset}"
        assert rf_path.exists(), f"Missing RandomForest model for {dataset}"
        assert features_path.exists(), f"Missing feature list for {dataset}"

        # Optional: cleanup (if testing in CI or repeatedly)
        xgb_path.unlink()
        rf_path.unlink()
        features_path.unlink()
