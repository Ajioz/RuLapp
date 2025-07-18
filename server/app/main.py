import os
from dotenv import load_dotenv

# ==========================
# ✅ Load Environment Variables
# ==========================
load_dotenv()

# ✅ Dynamically Construct MLFLOW_TRACKING_URI if not explicitly set
if not os.getenv("MLFLOW_TRACKING_URI"):
    mlflow_uri = (
        f"postgresql://{os.getenv('POSTGRES_USER')}:"
        f"{os.getenv('POSTGRES_PASSWORD')}@"
        f"{os.getenv('POSTGRES_HOST')}:{os.getenv('POSTGRES_PORT')}/"
        f"{os.getenv('POSTGRES_DB')}"
    )
    os.environ["MLFLOW_TRACKING_URI"] = mlflow_uri

# ==========================
# 📦 Imports
# ==========================
import argparse
import uvicorn
import logging
from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.security.api_key import APIKeyHeader
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.router import router
from models.utils import create_mlflow_database, prepare_input_data, detect_input_type, save_shap_force_plot
from models.pipeline import predict_rul

# ==========================
# ✅ Setup Logging
# ==========================
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# ==========================
# ✅ Security: API Key
# ==========================
API_KEY = os.getenv("API_KEY")
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

async def validate_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")

# ==========================
# ✅ Rate Limiter
# ==========================
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Engine RUL Prediction API",
    description="⚙️ Predict Remaining Useful Life (RUL) for various engines using ML models.\n\nIncludes SHAP-based model interpretability.",
    version="1.0.0",
    contact={
        "name": "Ajiozi Limited",
        "url": "https://ajiozi.com",
        "email": "sunny@ajiozi.com",
    },
    docs_url="/docs",
    redoc_url="/redoc",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Apply global dependencies and rate limiting
@app.middleware("http")
async def add_security_and_rate_limit(request: Request, call_next):
    await validate_api_key(request.headers.get("X-API-Key"))
    response = await limiter.limit("5/minute")(lambda r: call_next(r))(request)
    return response

# ==========================
# ✅ Mount Router
# ==========================
app.include_router(router)

# ==========================
# ✅ CLI Entry Point
# ==========================
if __name__ == "__main__":
    create_mlflow_database()

    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=str, help="Input source (file path)", default="data/test_FD002.txt")
    parser.add_argument("--engine_type", type=str, help="Engine type (e.g., FD002)", default="FD002")
    parser.add_argument("--serve", action="store_true", help="Start FastAPI server instead of CLI prediction")
    args = parser.parse_args()

    if args.serve:
        logger.info("🚀 Starting FastAPI server on http://0.0.0.0:8000")
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000)
    else:
        try:
            logger.info("🔍 Running CLI RUL prediction...")
            input_type = detect_input_type(args.source)
            if input_type in ["csv", "txt"]:
                input_row = prepare_input_data(args.source, engine_type=args.engine_type)
                result = predict_rul(input_row)
                pred = result["prediction"]

                logger.info("--- CLI RUL Prediction ---")
                logger.info(f"  Predicted RUL: {pred['rul_cycles']} cycles")
                logger.info(f"  Status:        {pred['status']}")
                logger.info(f"  Time Left:     ~{pred['rul_days']} days / ~{pred['rul_months']} months / ~{pred['rul_years']} years")

                save_path = f"reports/shap_force_plot_{args.engine_type.lower()}.png"
                save_shap_force_plot(result["explanation"], save_path)
                logger.info(f"✅ SHAP force plot saved to: {save_path}")
            else:
                raise ValueError("Only file-based sources are supported in CLI mode.")
        except Exception as e:
            logger.error(f"❌ Error: {e}")
