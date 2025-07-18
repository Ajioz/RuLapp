import joblib
import json
from pathlib import Path
from datetime import datetime

import mlflow
import mlflow.sklearn
import mlflow.xgboost

from mlflow_config import MLFLOW_TRACKING_URI

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import shap

from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.feature_selection import VarianceThreshold

sns.set(style='whitegrid')


def infer_column_schema(df: pd.DataFrame):
    fixed_cols = ["unit", "time"]
    data = df.iloc[:, 2:]
    variances = data.var()
    threshold = 1e2
    op_count = 0
    for i, v in enumerate(variances):
        if v < threshold:
            op_count += 1
        else:
            break
    op_cols = [f"op_setting_{i}" for i in range(1, op_count + 1)]
    sensor_cols = [f"sensor_{i}" for i in range(1, data.shape[1] - op_count + 1)]
    return fixed_cols + op_cols + sensor_cols, op_cols, sensor_cols


def run_training_pipeline(dataset_id: str):
    print(f"\n🚀 Training pipeline for {dataset_id}")

    # === Load Data ===
    def load_dataset(file_path):
        df = pd.read_csv(file_path, sep=r"\s+", header=None)
        cols, op_cols, sensor_cols = infer_column_schema(df)
        df.columns = cols
        return df, op_cols, sensor_cols

    train_fp = Path("data") / f"train_{dataset_id}.txt"
    test_fp = Path("data") / f"test_{dataset_id}.txt"
    train_df, op_cols, sensor_cols = load_dataset(train_fp)
    test_df, _, _ = load_dataset(test_fp)

    train_df["RUL"] = train_df.groupby("unit")["time"].transform("max") - train_df["time"]
    test_df["RUL"] = test_df.groupby("unit")["time"].transform("max") - test_df["time"]

    # === Feature Selection ===
    selector = VarianceThreshold(1e-6)
    selector.fit(train_df[sensor_cols])
    selected_sensors = list(np.array(sensor_cols)[selector.get_support()])

    corr = train_df[selected_sensors + ['RUL']].corr()
    weak_corr = corr['RUL'].abs() < 0.01
    weak_sensors = corr['RUL'][weak_corr].index.tolist()
    final_sensors = [s for s in selected_sensors if s not in weak_sensors]
    features = op_cols + final_sensors
    print(f"✅ Features selected: {len(features)}")

    # Correlation heatmap
    plt.figure(figsize=(10, 8))
    sns.heatmap(train_df[final_sensors + ['RUL']].corr(), cmap="coolwarm", annot=False)
    plt.title(f"{dataset_id} Sensor Correlation Heatmap")
    plt.tight_layout()
    Path("reports").mkdir(exist_ok=True)
    heatmap_path = Path("reports") / f"{dataset_id.lower()}_correlation_heatmap.png"
    plt.savefig(heatmap_path)
    plt.close()
    print(f"🧊 Correlation heatmap saved: {heatmap_path}")

    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    mlflow.set_experiment(dataset_id)

    with mlflow.start_run(run_name=f"{dataset_id}_rul_training"):
        mlflow.log_param("selected_features", features)

        # === Train Models ===
        X = train_df[features]
        y = train_df["RUL"]
        X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

        rf = RandomForestRegressor(n_estimators=100, random_state=42)
        xgb = XGBRegressor(n_estimators=100, random_state=42)

        print("🏋️ Training RandomForest and XGBoost...")
        rf.fit(X_train, y_train)
        xgb.fit(X_train, y_train)
        print("✅ Models trained.")

        # === Evaluate Models ===
        X_test = test_df[features]
        y_test = test_df["RUL"]
        rf_preds = rf.predict(X_test)
        xgb_preds = xgb.predict(X_test)

        def evaluate(y_true, y_pred):
            return {
                "RMSE": np.sqrt(mean_squared_error(y_true, y_pred)),
                "MAE": mean_absolute_error(y_true, y_pred),
                "R2": r2_score(y_true, y_pred)
            }

        rf_eval = evaluate(y_test, rf_preds)
        xgb_eval = evaluate(y_test, xgb_preds)

        for model_name, eval_result in zip(["RandomForest", "XGBoost"], [rf_eval, xgb_eval]):
            for metric, value in eval_result.items():
                mlflow.log_metric(f"{model_name}_{metric}", value)

        # === Save Models and Features ===
        joblib.dump(rf, f"models/{dataset_id.lower()}_rf_model.pkl")
        joblib.dump(xgb, f"models/{dataset_id.lower()}_xgb_model.pkl")
        joblib.dump(features, f"models/{dataset_id.lower()}_feature_columns.pkl")

        mlflow.sklearn.log_model(rf, artifact_path="random_forest")
        mlflow.xgboost.log_model(xgb, artifact_path="xgboost")

        # === Save Predictions ===
        predictions = pd.DataFrame({
            "True_RUL": y_test,
            "RF_Predicted_RUL": rf_preds,
            "XGB_Predicted_RUL": xgb_preds
        })
        pred_path = Path("inference") / f"{dataset_id.lower()}_predictions.csv"
        Path("inference").mkdir(exist_ok=True)
        predictions.to_csv(pred_path, index=False)
        mlflow.log_artifact(pred_path.as_posix())

        # === SHAP Explanation ===
        try:
            print("🔍 Generating SHAP explanations...")
            explainer = shap.Explainer(xgb)
            shap_values = explainer(X_train)

            # Bar Plot
            shap_bar_path = Path("reports") / f"{dataset_id.lower()}_shap_bar.png"
            shap.plots.bar(shap_values, max_display=10, show=False)
            plt.title("Top SHAP Features")
            plt.savefig(shap_bar_path, bbox_inches="tight")
            plt.close()
            mlflow.log_artifact(shap_bar_path.as_posix())
            print(f"📈 SHAP bar plot saved: {shap_bar_path.name}")

        except Exception as e:
            print(f"⚠️ SHAP generation failed: {e}")

        print("🎉 Training complete and logged to MLflow.")

    return {
        "dataset": dataset_id,
        "rf_metrics": rf_eval,
        "xgb_metrics": xgb_eval,
        "features_used": features
    }


if __name__ == "__main__":
    for dataset in ["FD001", "FD002", "FD003", "FD004"]:
        run_training_pipeline(dataset)
