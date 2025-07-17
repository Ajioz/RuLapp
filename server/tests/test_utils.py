import pandas as pd
from models.utils import detect_input_type

def test_detect_input_type_dict():
    source = {"sensor_1": 1.0}
    assert detect_input_type(source) == "form"

def test_detect_input_type_dataframe():
    df = pd.DataFrame({"sensor_1": [1.0], "sensor_2": [2.0]})
    assert detect_input_type(df) == "stream"

def test_detect_input_type_file_path():
    assert detect_input_type("test.csv") == "csv"
    assert detect_input_type("data/test_FD002.txt") == "txt"
