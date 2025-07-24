import pytest
import pandas as pd
from models.utils import detect_input_type

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
