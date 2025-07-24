import pytest
import pandas as pd
import json
from pathlib import Path
from models.utils import prepare_input_data

@pytest.fixture
def feature_file(tmp_path):
    features = ["sensor_1", "sensor_2"]
    path = tmp_path / "FD001_features.json"
    with open(path, "w") as f:
        json.dump(features, f)
    return path

@pytest.mark.parametrize("source_type", ["dict", "dataframe"])
def test_prepare_input_data_dict_and_df(source_type, feature_file, monkeypatch):
    monkeypatch.setattr("models.utils.Path", lambda *args: feature_file.parent)

    source = {"sensor_1": 1.1, "sensor_2": 2.2} if source_type == "dict" else pd.DataFrame([{"sensor_1": 1.1, "sensor_2": 2.2}])
    result = prepare_input_data(source, engine_type="FD001", condition="custom", row_index=0)

    assert result["sensor_1"] == 1.1
    assert result["sensor_2"] == 2.2
    assert result["engine_type"] == "FD001"
    assert result["condition"] == "custom"

def test_prepare_input_data_missing_feature_file(tmp_path, monkeypatch):
    monkeypatch.setattr("models.utils.Path", lambda *args: tmp_path)

    with pytest.raises(FileNotFoundError):
        prepare_input_data({}, engine_type="UnknownEngine")
