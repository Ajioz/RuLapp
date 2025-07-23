# 🛠️ Remaining Useful Life (RUL) Prediction Platform

A full-stack machine learning platform for **Remaining Useful Life (RUL)** prediction built using:

* 🧠 **FastAPI**: For dynamic model training & inference API
* 💻 **Next.js (v14)** with **Page Router**: For user interaction
* 🎨 **Styled Components**: For modular, elegant UI
* 🔁 **Joblib**: To persist models and features

---

## 📦 Features

### ✅ API (FastAPI Backend)

* Upload new sensor training data and retrain models (`/upload`)
* Predict RUL for a single machine sample (`/predict`)
* Batch RUL prediction for multiple units (`/predict/batch`)
* Returns RUL in cycles, days, months, years with health status
* Uses `XGBoost` and `RandomForestRegressor`
* CORS enabled for frontend access
* Optional SHAP explanation support

### 🎛️ Frontend (Next.js)

* File upload interface for retraining
* Single prediction form with live feedback
* Batch prediction with table and downloadable CSV
* Responsive layout with layout and navigation
* Toast notifications for user feedback

---

## 📁 Folder Structure

```
rul-platform/
├── backend/                  # FastAPI server
│   ├── main.py               # App entry point
│   └── models/               # Trained models + feature columns
├── frontend/                 # Next.js UI
│   ├── pages/
│   │   ├── index.js          # Homepage
│   │   ├── upload.js         # Upload & train
│   │   ├── predict.js        # Single prediction
│   ├── components/
│   │   ├── ApiService.js     # Axios helper for API calls
│   │   ├── Layout.js         # Shared page wrapper
│   │   └── StyledComponents.js
│   └── public/
├── .env.local                # Base URL for frontend
├── requirements.txt          # Python dependencies
└── README.md
```

---

## 🚀 Getting Started

### 🔧 Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

> Set the API base URL in `.env.local` inside `frontend/`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

## 📤 API Endpoints

| Endpoint         | Method | Description                    |
| ---------------- | ------ | ------------------------------ |
| `/upload`        | POST   | Upload .txt training file      |
| `/predict`       | POST   | Predict RUL for 1 sample       |
| `/predict/batch` | POST   | Predict RUL for multiple rows  |
| `/info`          | GET    | View current model and columns |

---

## 📊 Output Example (Prediction)

```json
{
  "rul_cycles": 130.3,
  "rul_days": 130.3,
  "rul_months": 4.34,
  "rul_years": 0.357,
  "status": "🟢 OK",
  "model": "XGB"
}
```

---

## 🐳 Optional: Docker Support

```bash
docker build -t rul-backend ./backend
docker run -p 8000:8000 rul-backend
```

---

## 💡 Future Enhancements

* SHAP visualizations as PNG via API
* Auth (admin upload only)
* Model selection dropdown in UI

---

## 📬 Contributions

PRs welcome. Let's predict the future together ☁️⚙️