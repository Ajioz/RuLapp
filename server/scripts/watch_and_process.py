import time
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess

RAW_DIR = Path("data/raw")
PROCESSED_DIR = Path("data/processed")
UTIL_SCRIPT = Path("utils/preprocess.py")

class NewFileHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory and event.src_path.endswith(".txt"):
            input_path = Path(event.src_path)
            output_path = PROCESSED_DIR / input_path.name

            if output_path.exists():
                print(f"⚠️  Already processed: {output_path.name}")
                return

            print(f"⚙️  Processing {input_path.name}...")
            result = subprocess.run(["python", str(UTIL_SCRIPT), str(input_path), str(output_path)])

            if result.returncode == 0:
                print(f"✅ Processed and saved to {output_path}")
            else:
                print(f"❌ Error processing {input_path.name}")

if __name__ == "__main__":
    print(f"👀 Watching {RAW_DIR} for new .txt files...")
    event_handler = NewFileHandler()
    observer = Observer()
    observer.schedule(event_handler, str(RAW_DIR), recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
