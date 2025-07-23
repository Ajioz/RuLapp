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
# ✅ Run Tests (optional layer)
# -----------------------------
RUN pytest tests/ || exit 1  # Enable if you want tests to block build
RUN pytest --maxfail=1 --disable-warnings || exit 1

# -----------------------------
# ✅ Expose FastAPI Port
# -----------------------------
EXPOSE 8000

# -----------------------------
# ✅ Flexible Entrypoint via Arg
# Default: Start FastAPI server
# You can override: docker run ... python scripts/entrypoint.py --mode=train_all
# -----------------------------
ENTRYPOINT ["python", "scripts/entrypoint.py"]
CMD ["--mode", "serve"]
