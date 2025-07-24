import pytest
from unittest.mock import patch
from models.utils import create_mlflow_database

@patch("models.utils.psycopg2.connect")
def test_create_mlflow_database_success(mock_connect):
    mock_conn = mock_connect.return_value
    mock_cursor = mock_conn.cursor.return_value

    create_mlflow_database()

    mock_cursor.execute.assert_called_once()
    mock_cursor.close.assert_called_once()
    mock_conn.close.assert_called_once()

@patch("models.utils.psycopg2.connect", side_effect=Exception("Connection error"))
def test_create_mlflow_database_failure(mock_connect, capsys):
    create_mlflow_database()
    captured = capsys.readouterr()
    assert "❌ Error while creating MLflow DB" in captured.out
