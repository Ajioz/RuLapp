import subprocess

DATASETS = ["FD001", "FD002", "FD003", "FD004"]

print("🔥 Starting full training pipeline...")

for dataset in DATASETS:
    print(f"🚀 Training on {dataset}...")
    result = subprocess.run(["python", "model/training.py", "--dataset", dataset])

    if result.returncode != 0:
        print(f"❌ Error training on {dataset}")
    else:
        print(f"✅ Done training {dataset}")

print("✅ All models trained successfully!")
