import os
import pytest
from utils.notify import send_notification

# ----------- Test Slack Notification -----------
def test_slack_notification(mocker):
    os.environ["NOTIFY_METHOD"] = "slack"
    os.environ["SLACK_WEBHOOK_URL"] = "https://hooks.slack.com/services/fake/test/url"

    mock_post = mocker.patch("utils.notify.requests.post")
    mock_post.return_value.status_code = 200

    send_notification("Test Subject", "Test Message")
    mock_post.assert_called_once()
    payload = mock_post.call_args[1]["json"]
    assert "text" in payload
    assert "Test Subject" in payload["text"]

# ----------- Test Email Notification -----------
def test_email_notification(mocker):
    os.environ["NOTIFY_METHOD"] = "email"
    os.environ["SMTP_HOST"] = "smtp.test.com"
    os.environ["SMTP_PORT"] = "587"
    os.environ["SMTP_USER"] = "test@test.com"
    os.environ["SMTP_PASSWORD"] = "testpass"
    os.environ["NOTIFY_EMAIL"] = "recipient@test.com"

    mock_smtp = mocker.patch("utils.notify.smtplib.SMTP")
    mock_server = mock_smtp.return_value.__enter__.return_value

    send_notification("Test Email", "Body")

    mock_server.starttls.assert_called_once()
    mock_server.login.assert_called_once_with("test@test.com", "testpass")
    mock_server.send_message.assert_called_once()

# ----------- Test Both Notification -----------
def test_both_notification(mocker):
    os.environ["NOTIFY_METHOD"] = "both"
    os.environ["SLACK_WEBHOOK_URL"] = "https://hooks.slack.com/services/fake/test/url"
    os.environ["SMTP_HOST"] = "smtp.test.com"
    os.environ["SMTP_PORT"] = "587"
    os.environ["SMTP_USER"] = "test@test.com"
    os.environ["SMTP_PASSWORD"] = "testpass"
    os.environ["NOTIFY_EMAIL"] = "recipient@test.com"

    mock_post = mocker.patch("utils.notify.requests.post")
    mock_post.return_value.status_code = 200

    mock_smtp = mocker.patch("utils.notify.smtplib.SMTP")
    mock_server = mock_smtp.return_value.__enter__.return_value

    send_notification("Both Channels", "Test")

    assert mock_post.called
    assert mock_server.send_message.called

# ----------- Edge Case: Missing Config -----------
def test_missing_env_config(mocker):
    os.environ["NOTIFY_METHOD"] = "email"
    os.environ.pop("SMTP_HOST", None)  # simulate missing config

    # Should just warn and not crash
    mock_logger = mocker.patch("utils.notify.logger")
    send_notification("Missing Config", "Test")
    mock_logger.warning.assert_called()
