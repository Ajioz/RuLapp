import argparse
import subprocess
import sys
import time
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Paths
RAW_DIR = Path("data/raw")
PROCESSED_DIR = Path("data/processed")
UTIL_SCRIPT = Path("utils/preprocess.py")
TRAIN_SCRIPT = Path("model/training.py")
FASTAPI_MODULE = "app.main:app"

# =========================
# 📦 Watcher for raw data
# =========================
class RawDataHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory or not event.src_path.endswith(".txt"):
            return

        input_path = Path(event.src_path)
        output_path = PROCESSED_DIR / input_path.name

        if output_path.exists():
            print(f"⚠️  Already processed: {output_path.name}")
            return

        print(f"⚙️  Processing {input_path.name}...")
        result = subprocess.run([sys.executable, str(UTIL_SCRIPT), str(input_path), str(output_path)])

        if result.returncode == 0:
            print(f"✅ Processed and saved to {output_path}")
        else:
            print(f"❌ Error processing {input_path.name}")

def watch_raw_data():
    print(f"👀 Watching {RAW_DIR} for new .txt files...")
    handler = RawDataHandler()
    observer = Observer()
    observer.schedule(handler, str(RAW_DIR), recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("🛑 Watcher stopped.")
        observer.stop()
    observer.join()

# =========================
# 📦 Train All Models
# =========================
def train_all_models():
    datasets = ["FD001", "FD002", "FD003", "FD004"]
    print("🔥 Starting full training pipeline...")

    for ds in datasets:
        print(f"🚀 Training on {ds}...")
        result = subprocess.run([sys.executable, str(TRAIN_SCRIPT), "--dataset", ds])
        if result.returncode != 0:
            print(f"❌ Failed to train on {ds}")
        else:
            print(f"✅ Finished training on {ds}")

    print("✅ All models trained successfully!")

# =========================
# 🚀 Start FastAPI Server
# =========================
def start_server():
    print("🚀 Starting FastAPI server at http://0.0.0.0:8000 ...")
    subprocess.run([
        "uvicorn", FASTAPI_MODULE,
        "--host", "0.0.0.0",
        "--port", "8000"
    ])

# =========================
# 🧠 Main Entry
# =========================
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
