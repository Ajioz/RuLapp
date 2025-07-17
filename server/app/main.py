# app/main.py

from fastapi import FastAPI
import argparse
import uvicorn
from models.pipeline import predict_rul
from models.utils import prepare_input_data, detect_input_type, save_shap_force_plot
from app.router import router

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
    redoc_url="/redoc"
)

app.include_router(router)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=str, help="Input source (file path)", default="data/test_FD002.txt")
    parser.add_argument("--engine_type", type=str, help="Engine type (e.g., FD002)", default="FD002")
    parser.add_argument("--serve", action="store_true", help="Start FastAPI server instead of CLI prediction")
    args = parser.parse_args()

    if args.serve:
        uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
    else:
        try:
            input_type = detect_input_type(args.source)
            if input_type in ["csv", "txt"]:
                input_row = prepare_input_data(args.source, engine_type=args.engine_type)
                result = predict_rul(input_row)
                pred = result["prediction"]
                print("\n--- CLI RUL Prediction ---")
                print(f"  Predicted RUL: {pred['rul_cycles']} cycles")
                print(f"  Status:        {pred['status']}")
                print(f"  Time Left:     ~{pred['rul_days']} days / ~{pred['rul_months']} months / ~{pred['rul_years']} years\n")

                save_path = f"reports/shap_force_plot_{args.engine_type.lower()}.png"
                save_shap_force_plot(result["explanation"], save_path)
            else:
                raise ValueError("Only file-based sources are supported in CLI mode.")
        except Exception as e:
            print(f"❌ Error: {e}")
