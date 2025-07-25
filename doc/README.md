# 🛠️ Predictive Maintenance Platform for RUL Estimation

This is an end-to-end MLOps platform for estimating Remaining Useful Life (RUL) of machines using NASA CMAPSS data.

---

## 🚀 Features

- 📤 Raw data ingestion with context-aware processing using tags (e.g. `purpose`, `mType`)
- 🔄 Automatic preprocessing, training, prediction pipeline based on tag
- 🧠 ML models (XGBoost, RandomForest) with MLflow experiment tracking
- 🔍 SHAP explanations with visualizations (static and HTML)
- 🔔 Notification system (Slack/email) for pipeline status
- 🐳 Dockerized deployment with PostgreSQL + MLflow tracking server
- 🧪 Pytest with coverage reports, CI-ready test structure

---

## 📁 Project Structure

```
├── app/                  # FastAPI app
├── models/               # Training & inference logic
├── utils/                # Shared utilities (preprocessing, notification)
├── scripts/              # Entrypoint automation script
├── data/                 # Raw + processed data
├── model_registry/       # Saved models and features
├── reports/              # SHAP, heatmaps, residuals, test reports
├── inference/            # CSV outputs from batch predictions
├── logs/                 # Entrypoint + audit logs
├── deployment/           # Dockerfile and docker-compose.yml
├── tests/                # Test suite
├── .env.example          # Environment config example
├── Makefile              # Build, train, run, test commands
└── README.md             # You are here.
```

---

## ⚙️ Setup

### 🔧 Local Installation

```bash
git clone https://github.com/yourusername/rul-predictor.git
cd rul-predictor
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 🐳 Docker

```bash
make docker-build
make docker-up
```

---

## 📤 Upload Flow

Uploads with `purpose` and `mType` tags determine routing:

| Purpose      | Trigger Preprocessing | Trigger Training | Trigger Prediction |
|--------------|-----------------------|------------------|--------------------|
| tPipeline    | ✅ Yes                | ✅ Yes           | ❌ No              |
| rul          | ❌ No                 | ❌ No            | ✅ Yes             |

---

## 📡 API Endpoints

- `POST /v1/predict/auto` → Detect format + predict
- `POST /v1/predict/batch` → Upload `.txt`/`.csv`
- `POST /v1/predict` → Structured JSON input

---

## 🧪 Tests

```bash
make test
make test-html  # Generates reports/test_report.html
```

---

## 🧬 MLflow UI

```bash
make mlflow-ui
# or view via http://localhost:5000 when dockerized
```

---

## 📧 Notifications

Supports:
- Slack (via webhook)
- Email (SMTP)
- Both

Configure via `.env`.

---

## 📂 Audit Trail

All file events logged to `logs/audit.csv`:

```
timestamp,file,status
2025-07-23T13:44:00,FD001_raw.txt,processed
```

---

## ✅ CI/CD Ready

- Compatible with GitHub Actions / GitLab CI
- Test + lintable + audit-logged + containerized

---

## 🧾 License

MIT License.