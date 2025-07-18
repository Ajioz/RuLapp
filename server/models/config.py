import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ======== Directory Paths ========
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model_registry"
REPORT_DIR = BASE_DIR / "reports"
DATA_DIR = BASE_DIR / "data"

# ======== MLflow Configuration ========
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")
MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI") or (
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
)

# ======== Security ========
API_KEY = os.getenv("API_KEY")

# ======== App Config ========
RATE_LIMIT = "5/minute"

app_config = {
    "title": "Engine RUL Prediction API",
    "description": "API for predicting Remaining Useful Life (RUL) of engines using machine learning models.",
    "version": "1.0.0",
    "contact": {
        "name": "Support Team",
        "email": "sunny@ajiozi.com",  # ✅ fixed
        "url": "https://ajiozi.com",
    },
    "docs_url": "/docs",
    "redoc_url": "/redoc",
}
# ==========================
# ✅ Ensure Directories Exist