# -----------------------------
# ✅ Base image
# -----------------------------
FROM python:3.9-slim

# -----------------------------
# ✅ Metadata
# -----------------------------
LABEL maintainer="you@example.com" \
      version="1.0" \
      description="Context-aware RUL prediction pipeline with FastAPI + MLflow"

# -----------------------------
# ✅ Environment Config
# -----------------------------
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    MODE=serve

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
    curl \
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
# ✅ Ensure needed folders exist
# -----------------------------
RUN mkdir -p data/raw data/processed logs reports model_registry inference

# -----------------------------
# ✅ Run Tests (optional)
# -----------------------------
# COPY tests/ tests/
RUN pytest tests/ --maxfail=1 --disable-warnings || exit 1

# -----------------------------
# ✅ Expose FastAPI Port
# -----------------------------
EXPOSE 8000

# -----------------------------
# ✅ Healthcheck (optional)
# -----------------------------
HEALTHCHECK CMD curl --fail http://localhost:8000/docs || exit 1

# -----------------------------
# ✅ Flexible Entrypoint
# -----------------------------
ENTRYPOINT ["python", "scripts/entrypoint.py"]
CMD ["--mode", "${MODE}"]
