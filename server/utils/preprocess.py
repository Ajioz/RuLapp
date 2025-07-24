import sys
import re
from pathlib import Path
import pandas as pd
import logging
from utils.notify import send_notification

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CMAPSS column format
COLUMNS = [
    "unit_number", "time_in_cycles", "op_setting_1", "op_setting_2", "op_setting_3",
    "sensor_1", "sensor_2", "sensor_3", "sensor_4", "sensor_5", "sensor_6", "sensor_7",
    "sensor_8", "sensor_9", "sensor_10", "sensor_11", "sensor_12", "sensor_13",
    "sensor_14", "sensor_15", "sensor_16", "sensor_17", "sensor_18", "sensor_19",
    "sensor_20", "sensor_21"
]

DROP_SENSORS = [
    "sensor_1", "sensor_5", "sensor_6", "sensor_10", "sensor_16", "sensor_18", "sensor_19"
]


def extract_engine_type(filename: str) -> str:
    match = re.search(r"(FD\d{3})", filename.upper())
    return match.group(1) if match else "UNKNOWN"


def preprocess(input_path: Path, output_path: Path):
    try:
        logger.info(f"📂 Loading {input_path.name}...")
        df = pd.read_csv(input_path, sep=r"\s+", header=None, names=COLUMNS)

        # Drop constant sensors
        df.drop(columns=DROP_SENSORS, inplace=True)

        # Add Remaining Useful Life (RUL)
        rul_df = df.groupby("unit_number")["time_in_cycles"].max().reset_index()
        rul_df.columns = ["unit_number", "max_cycle"]
        df = df.merge(rul_df, on="unit_number")
        df["RUL"] = df["max_cycle"] - df["time_in_cycles"]
        df.drop(columns=["max_cycle"], inplace=True)

        # Extract engine type from file name
        engine_type = extract_engine_type(input_path.name)
        df["engine_type"] = engine_type

        df.to_csv(output_path, index=False)
        logger.info(f"✅ Processed data saved to {output_path.name} with engine_type={engine_type}")
        send_notification(
            f"📦 Preprocessing Complete - {engine_type}",
            f"Processed file `{input_path.name}` and saved to `{output_path.name}`."
        )
    except Exception as e:
        logger.error(f"❌ Failed to preprocess {input_path.name}: {e}")
        send_notification(
            "❌ Preprocessing Failed",
            f"File `{input_path.name}` failed during preprocessing.\n\nError: {str(e)}"
        )
        raise


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python utils/preprocess.py <input_path> <output_path>")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    preprocess(input_path, output_path)
