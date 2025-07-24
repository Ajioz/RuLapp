import os
from dotenv import load_dotenv

load_dotenv()
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import shap
import joblib
import psycopg2
from psycopg2 import sql
import json
import mlflow


def detect_input_type(source):
    if isinstance(source, dict):
        return "form"
    elif isinstance(source, pd.DataFrame):
        return "stream"
    elif isinstance(source, str) and source.endswith(".csv"):
        return "csv"
    elif isinstance(source, str) and source.endswith(".txt"):
        return "txt"
    raise ValueError("Unsupported input type")


def save_shap_force_plot(explanation: dict, save_path: str):
    Path(save_path).parent.mkdir(exist_ok=True)
    shap_values = shap.Explanation(
        values=np.array(explanation["shap_values_array"]),
        base_values=np.array(explanation["expected_value"]),
        data=np.array([explanation["raw_input"]]),
        feature_names=explanation["feature_names"]
    )
    shap.plots.force(shap_values, matplotlib=True)
    plt.savefig(save_path, bbox_inches="tight")
    plt.close()

    # Save as HTML (interactive)
    html_path = save_path.replace(".png", ".html")
    try:
        shap.save_html(html_path, shap_values)
    except Exception as e:
        print(f"⚠️ Failed to save SHAP HTML: {e}")


def prepare_input_data(source, engine_type: str, condition: str = "standard", row_index: int = 0) -> dict:
    model_dir = Path("model_registry")
    feature_path = model_dir / f"{engine_type}_features.json"

    if not feature_path.exists():
        with mlflow.start_run(run_name=f"Missing_Features_{engine_type}"):
            mlflow.set_tag("engine_type", engine_type)
            mlflow.set_tag("error", "Missing feature file")
        raise FileNotFoundError(f"Feature file not found: {feature_path}")

    with open(feature_path) as f:
        feature_cols = json.load(f)

    input_type = detect_input_type(source)

    if isinstance(source, dict):
        input_data = source.copy()
    elif isinstance(source, pd.DataFrame):
        input_data = source.iloc[row_index].to_dict()
    elif isinstance(source, str) and source.endswith(".txt"):
        df_raw = pd.read_csv(source, sep=r"\s+", header=None)
        try:
            from models.training import infer_column_schema
            col_names, _, _ = infer_column_schema(df_raw)
            df_raw.columns = col_names
        except ImportError:
            raise ImportError("Missing 'infer_column_schema' from training module.")
        input_data = df_raw.iloc[row_index][feature_cols].to_dict()
    elif isinstance(source, str) and source.endswith(".csv"):
        df = pd.read_csv(source)
        input_data = df.iloc[row_index][feature_cols].to_dict()
    else:
        raise ValueError("Unsupported input type. Provide a dict, DataFrame, or file path.")

    # Sanitize: Ensure correct types
    input_data = {
        k: float(v) if k in feature_cols else v for k, v in input_data.items()
        if v != ""
    }

    # Validate schema
    missing_keys = [key for key in feature_cols if key not in input_data]
    extra_keys = [key for key in input_data if key not in feature_cols and key not in ["engine_type", "condition"]]
    if missing_keys:
        raise ValueError(f"Missing required features: {missing_keys}")
    if extra_keys:
        print(f"⚠️ Warning: Extra input features ignored: {extra_keys}")

    # Add context
    input_data["engine_type"] = engine_type
    input_data["condition"] = condition

    # Log input type to MLflow
    mlflow.set_tag("input_type", input_type)

    return input_data


def create_mlflow_database():
    """
    Creates an MLflow PostgreSQL database if it does not already exist.
    """
    dbname = os.getenv("POSTGRES_DB", "mlflow_db")
    user = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("POSTGRES_PASSWORD", "your_pass")
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5432")

    try:
        conn = psycopg2.connect(dbname="postgres", user=user, password=password, host=host, port=port)
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute(sql.SQL("CREATE DATABASE {}".format(sql.Identifier(dbname))))
        print(f"✅ Database '{dbname}' created successfully.")
        cur.close()
        conn.close()
    except psycopg2.errors.DuplicateDatabase:
        print(f"⚠️ Database '{dbname}' already exists.")
    except Exception as e:
        print(f"❌ Error while creating MLflow DB: {e}")
