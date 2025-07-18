import joblib
import json
from pathlib import Path
from datetime import datetime
import mlflow
import mlflow.sklearn
import mlflow.xgboost
from mlflow.models.signature import infer_signature
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
import warnings

warnings.filterwarnings("ignore")
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

def plot_learning_curve(model, X_train, y_train, dataset_id):
    from sklearn.model_selection import learning_curve

    train_sizes, train_scores, test_scores = learning_curve(
        model, X_train, y_train, cv=5, scoring='neg_mean_squared_error', n_jobs=-1
    )
    train_scores_mean = -np.mean(train_scores, axis=1)
    test_scores_mean = -np.mean(test_scores, axis=1)

    plt.figure(figsize=(8, 6))
    plt.plot(train_sizes, train_scores_mean, label='Train', marker='o')
    plt.plot(train_sizes, test_scores_mean, label='CV', marker='x')
    plt.title(f"Learning Curve - {dataset_id} {model.__class__.__name__}")
    plt.xlabel("Training Size")
    plt.ylabel("MSE")
    plt.legend()
    plt.grid()
    lc_path = Path("reports") / f"{dataset_id.lower()}_{model.__class__.__name__.lower()}_learning_curve.png"
    plt.tight_layout()
    plt.savefig(lc_path)
    plt.close()
    mlflow.log_artifact(lc_path.as_posix())
    print(f"📊 Learning curve saved: {lc_path.name}")

def run_training_pipeline(dataset_id: str):
    print(f"\n🚀 Training pipeline for {dataset_id}")

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

    selector = VarianceThreshold(1e-6)
    selector.fit(train_df[sensor_cols])
    selected_sensors = list(np.array(sensor_cols)[selector.get_support()])

    corr = train_df[selected_sensors + ['RUL']].corr()
    weak_corr = corr['RUL'].abs() < 0.01
    weak_sensors = corr['RUL'][weak_corr].index.tolist()
    final_sensors = [s for s in selected_sensors if s not in weak_sensors]
    features = op_cols + final_sensors
    print(f"✅ Features selected: {len(features)}")

    Path("reports").mkdir(exist_ok=True)
    plt.figure(figsize=(10, 8))
    sns.heatmap(train_df[final_sensors + ['RUL']].corr(), cmap="coolwarm", annot=False)
    plt.title(f"{dataset_id} Sensor Correlation Heatmap")
    plt.tight_layout()
    heatmap_path = Path("reports") / f"{dataset_id.lower()}_correlation_heatmap.png"
    plt.savefig(heatmap_path)
    plt.close()
    print(f"🧊 Correlation heatmap saved: {heatmap_path}")

    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    mlflow.set_experiment(dataset_id)
    mlflow.sklearn.autolog()
    mlflow.xgboost.autolog()

    with mlflow.start_run(run_name=f"{dataset_id}_rul_training"):
        mlflow.log_param("selected_features", features)

        X = train_df[features]
        y = train_df["RUL"]
        X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

        rf = RandomForestRegressor(n_estimators=100, random_state=42)
        xgb = XGBRegressor(n_estimators=100, random_state=42)

        print("🏋️ Training RandomForest and XGBoost...")
        rf.fit(X_train, y_train)
        xgb.fit(X_train, y_train)
        print("✅ Models trained.")

        plot_learning_curve(rf, X_train, y_train, dataset_id)
        plot_learning_curve(xgb, X_train, y_train, dataset_id)

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

        Path("models").mkdir(exist_ok=True)
        Path("inference").mkdir(exist_ok=True)

        joblib.dump(rf, f"models/{dataset_id.lower()}_rf_model.pkl")
        joblib.dump(xgb, f"models/{dataset_id.lower()}_xgb_model.pkl")
        joblib.dump(features, f"models/{dataset_id.lower()}_feature_columns.pkl")

        signature = infer_signature(X_test, xgb_preds)

        mlflow.sklearn.log_model(rf, artifact_path="random_forest")
        mlflow.xgboost.log_model(
            xgb,
            artifact_path="xgboost",
            signature=signature,
            input_example=X_test.head(1)
        )

        mlflow.register_model(f"runs:/{mlflow.active_run().info.run_id}/random_forest", f"{dataset_id}_RandomForest")
        mlflow.register_model(f"runs:/{mlflow.active_run().info.run_id}/xgboost", f"{dataset_id}_XGBoost")

        predictions = pd.DataFrame({
            "True_RUL": y_test,
            "RF_Predicted_RUL": rf_preds,
            "XGB_Predicted_RUL": xgb_preds
        })
        pred_path = Path("inference") / f"{dataset_id.lower()}_predictions.csv"
        predictions.to_csv(pred_path, index=False)
        mlflow.log_artifact(pred_path.as_posix())

        residuals = y_test - xgb_preds
        plt.figure(figsize=(8, 6))
        sns.histplot(residuals, kde=True)
        plt.title(f"Residual Distribution - {dataset_id} XGBoost")
        plt.xlabel("Residuals")
        res_path = Path("reports") / f"{dataset_id.lower()}_residuals.png"
        plt.savefig(res_path)
        plt.close()
        mlflow.log_artifact(res_path.as_posix())

        plt.figure(figsize=(8, 6))
        sns.scatterplot(x=y_test, y=xgb_preds, alpha=0.6)
        plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], "--", color="red")
        plt.xlabel("True RUL")
        plt.ylabel("Predicted RUL")
        plt.title(f"XGBoost Prediction vs True - {dataset_id}")
        pred_vs_path = Path("reports") / f"{dataset_id.lower()}_xgb_scatter.png"
        plt.savefig(pred_vs_path)
        plt.close()
        mlflow.log_artifact(pred_vs_path.as_posix())

        try:
            print("🔍 Generating SHAP explanations...")
            explainer = shap.Explainer(xgb)
            shap_values = explainer(X_train)

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
