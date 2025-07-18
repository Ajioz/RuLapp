# -----------------------------
# ✅ Base image
# -----------------------------
FROM python:3.9-slim

# -----------------------------
# ✅ Environment Config
# -----------------------------
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# -----------------------------
# ✅ Working Directory
# -----------------------------
WORKDIR /app

# -----------------------------
# ✅ Install OS Dependencies
# -----------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------
# ✅ Install Python Dependencies
# -----------------------------
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# -----------------------------
# ✅ Copy App Files
# -----------------------------
COPY . .

# -----------------------------
# ✅ Expose API Port
# -----------------------------
EXPOSE 8000

# -----------------------------
# ✅ Entry Command
# -----------------------------
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
