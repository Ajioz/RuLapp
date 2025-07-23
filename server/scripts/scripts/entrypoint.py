import os
import argparse
import subprocess
import sys
import time
import logging
import csv
from datetime import datetime
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from utils.notify import send_notification  # ✅ central notification logic

# ========== 📁 Paths ==========
RAW_DIR = Path("data/raw")
PROCESSED_DIR = Path("data/processed")
UTIL_SCRIPT = Path("utils/preprocess.py")
TRAIN_SCRIPT = Path("model/training.py")
FASTAPI_MODULE = "app.main:app"
LOG_DIR = Path("logs")
AUDIT_LOG = LOG_DIR / "audit.csv"

LOG_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)

# ========== 🪵 Logging ==========
logging.basicConfig(
    filename=LOG_DIR / "entrypoint.log",
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)

# ========== 📄 Audit Trail ==========
def log_to_audit(file_name, status):
    is_new_file = not AUDIT_LOG.exists()
    with open(AUDIT_LOG, mode="a", newline="") as csvfile:
        writer = csv.writer(csvfile)
        if is_new_file:
            writer.writerow(["timestamp", "file", "status"])
        writer.writerow([datetime.now().isoformat(), file_name, status])

# ========== 👀 Watcher ==========
class RawDataHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory or not event.src_path.endswith(".txt"):
            return

        input_path = Path(event.src_path)
        output_path = PROCESSED_DIR / input_path.name

        if output_path.exists():
            logger.warning(f"Already processed: {output_path.name}")
            return

        logger.info(f"Processing {input_path.name}...")
        result = subprocess.run([sys.executable, str(UTIL_SCRIPT), str(input_path), str(output_path)])

        if result.returncode == 0:
            logger.info(f"Processed and saved to {output_path}")
            log_to_audit(input_path.name, "processed")
        else:
            logger.error(f"Error processing {input_path.name}")
            log_to_audit(input_path.name, "failed")

def watch_raw_data():
    print(f"👀 Watching {RAW_DIR} for new .txt files...")
    logger.info("Started watching raw data folder.")
    handler = RawDataHandler()
    observer = Observer()
    observer.schedule(handler, str(RAW_DIR), recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("Stopped watching.")
        observer.stop()
    observer.join()

# ========== 🧠 Train All Models ==========
def train_all_models():
    datasets = ["FD001", "FD002", "FD003", "FD004"]
    logger.info("Starting full training pipeline...")
    print("🔥 Starting full training pipeline...")

    for ds in datasets:
        print(f"🚀 Training on {ds}...")
        result = subprocess.run([sys.executable, str(TRAIN_SCRIPT), "--dataset", ds])
        if result.returncode != 0:
            logger.error(f"Failed to train on {ds}")
        else:
            logger.info(f"Finished training on {ds}")

    send_notification("✅ Training Complete", "All models have been trained successfully.")
    print("✅ All models trained successfully!")

# ========== 🚀 Serve FastAPI ==========
def start_server():
    logger.info("Starting FastAPI server.")
    print("🚀 Starting FastAPI server at http://0.0.0.0:8000 ...")
    subprocess.run([
        "uvicorn", FASTAPI_MODULE,
        "--host", "0.0.0.0",
        "--port", "8000"
    ])

# ========== 🧩 Entry ==========
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Unified ML Ops Entrypoint")
    parser.add_argument(
        "--mode",
        choices=["watch_raw", "train_all", "serve"],
        required=True,
        help="Mode to run: watch_raw | train_all | serve"
    )
    args = parser.parse_args()

    if args.mode == "watch_raw":
        watch_raw_data()
    elif args.mode == "train_all":
        train_all_models()
    elif args.mode == "serve":
        start_server()
