import joblib
import pandas as pd
import shap
import mlflow
import mlflow.sklearn
from pathlib import Path
from models.utils import prepare_input_data, save_shap_force_plot

def predict_rul(source, engine_type=None, condition="standard", row_index=0) -> dict:
    # Step 1: Prepare input
    if isinstance(source, dict) and engine_type is None:
        input_data = prepare_input_data(source, source.get("engine_type"), source.get("condition", condition))
    else:
        input_data = prepare_input_data(source, engine_type, condition, row_index)

    engine_type = input_data.pop("engine_type")
    condition = input_data.pop("condition", "standard")

    model_path = Path("model_registry") / f"{engine_type.lower()}_xgb_model.pkl"
    feature_path = Path("model_registry") / f"{engine_type.lower()}_feature_columns.pkl"

    model = joblib.load(model_path)
    feature_cols = joblib.load(feature_path)
    feature_cols = [c for c in feature_cols if c not in ["unit", "time"]]

    input_df = pd.DataFrame([input_data], columns=feature_cols)
    predicted_rul = model.predict(input_df)[0]

    status = (
        "☠️ CRITICAL" if predicted_rul <= 10 else
        "⚠️ DANGER" if predicted_rul <= 90 else
        "🟢 OK"
    )

    # Step 2: SHAP Explanation
    explainer = shap.Explainer(model)
    shap_values = explainer(input_df)

    # Step 3: Save SHAP Plot to file
    shap_path = f"reports/shap_force_plot_{engine_type.lower()}.png"
    save_shap_force_plot(
        explanation={
            "shap_values_array": shap_values.values[0].tolist(),
            "expected_value": shap_values.base_values[0],
            "feature_names": feature_cols,
            "raw_input": input_df.values[0].tolist()
        },
        save_path=shap_path
    )

    # Step 4: Log with MLflow
    with mlflow.start_run(run_name=f"RUL_Prediction_{engine_type}"):
        mlflow.set_tag("engine_type", engine_type)
        mlflow.set_tag("prediction_status", status)
        mlflow.log_param("row_index", row_index)
        mlflow.log_params(input_data)
        mlflow.log_metric("rul_cycles", predicted_rul)
        mlflow.log_artifact(shap_path)

        # Optionally log model (if this is the first time)
        mlflow.sklearn.log_model(model, artifact_path="model", registered_model_name=f"{engine_type}_XGB_Model")

    return {
        "prediction": {
            "rul_cycles": round(predicted_rul, 2),
            "rul_days": round(predicted_rul, 2),
            "rul_months": round(predicted_rul / 30, 2),
            "rul_years": round(predicted_rul / 365, 3),
            "status": status,
        },
        "explanation": {
            "shap_values_array": shap_values.values[0].tolist(),
            "expected_value": shap_values.base_values[0],
            "feature_names": feature_cols,
            "raw_input": input_df.values[0].tolist()
        }
    }
