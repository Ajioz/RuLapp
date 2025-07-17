import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import shap

def detect_input_type(source):
    if isinstance(source, dict): return "form"
    elif isinstance(source, pd.DataFrame): return "stream"
    elif isinstance(source, str) and source.endswith(".csv"): return "csv"
    elif isinstance(source, str) and source.endswith(".txt"): return "txt"
    raise ValueError("Unsupported input type")

def save_shap_force_plot(explanation: dict, save_path: str):
    Path(save_path).parent.mkdir(exist_ok=True)
    shap_values = shap.Explanation(
        values=np.array(explanation["shap_values_array"]),
        base_values=np.array(explanation["expected_value"]),
        data=np.array([explanation["raw_input"]]),
        feature_names=explanation["feature_names"]
    )
    shap.plots.force(shap_values, matplotlib=True)
    plt.savefig(save_path, bbox_inches="tight")
    plt.close()
