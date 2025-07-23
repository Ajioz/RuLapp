import sys
from pathlib import Path
import pandas as pd

# Column names based on NASA CMAPSS FD001.txt format
COLUMNS = [
    "unit_number", "time_in_cycles", "op_setting_1", "op_setting_2", "op_setting_3",
    "sensor_1", "sensor_2", "sensor_3", "sensor_4", "sensor_5", "sensor_6", "sensor_7",
    "sensor_8", "sensor_9", "sensor_10", "sensor_11", "sensor_12", "sensor_13",
    "sensor_14", "sensor_15", "sensor_16", "sensor_17", "sensor_18", "sensor_19",
    "sensor_20", "sensor_21"
]

def preprocess(input_path: Path, output_path: Path):
    # Load raw space-separated data
    df = pd.read_csv(input_path, sep=r"\s+", header=None, names=COLUMNS)

    # Drop sensors that are constant (as in CMAPSS paper)
    drop_sensors = [
        "sensor_1", "sensor_5", "sensor_6", "sensor_10", "sensor_16", "sensor_18", "sensor_19"
    ]
    df.drop(columns=drop_sensors, inplace=True)

    # Optional: Add Remaining Useful Life (RUL)
    rul_df = df.groupby("unit_number")["time_in_cycles"].max().reset_index()
    rul_df.columns = ["unit_number", "max_cycle"]
    df = df.merge(rul_df, on="unit_number")
    df["RUL"] = df["max_cycle"] - df["time_in_cycles"]
    df.drop(columns=["max_cycle"], inplace=True)

    # Save processed file
    df.to_csv(output_path, index=False)
    print(f"✅ Processed data saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python utils/preprocess.py <input_path> <output_path>")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    preprocess(input_path, output_path)
