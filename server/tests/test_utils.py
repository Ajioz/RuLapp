import pytest
import pandas as pd
from models.utils import detect_input_type
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
from models.utils import save_shap_force_plot

def test_detect_input_type_dict():
    source = {"sensor_1": 1.0}
    assert detect_input_type(source) == "form"

def test_detect_input_type_dataframe():
    df = pd.DataFrame({"sensor_1": [1.0], "sensor_2": [2.0]})
    assert detect_input_type(df) == "stream"

@pytest.mark.parametrize("filename,expected", [
    ("sample.csv", "csv"),
    ("data/engine_log.txt", "txt"),
])
def test_detect_input_type_valid_files(filename, expected):
    assert detect_input_type(filename) == expected

def test_detect_input_type_invalid():
    with pytest.raises(ValueError, match="Unsupported input type"):
        detect_input_type(12345)  # not a supported type


def test_save_shap_force_plot(tmp_path):
    shap_explanation = {
        "shap_values_array": [0.1, -0.2, 0.05],
        "expected_value": 0.9,
        "feature_names": ["sensor_1", "sensor_2", "sensor_3"],
        "raw_input": [100.0, 200.0, 300.0]
    }
    output_file = tmp_path / "shap_force.png"
    save_shap_force_plot(shap_explanation, str(output_file))

    assert output_file.exists()
    assert output_file.suffix == ".png"
