from models.utils import detect_input_type
import pandas as pd

def test_detect_input_type_dict():
    assert detect_input_type({"x": 1}) == "form"

def test_detect_input_type_df():
    df = pd.DataFrame({"a": [1]})
    assert detect_input_type(df) == "stream"
