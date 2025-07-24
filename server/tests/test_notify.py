import pytest
from utils.notify import send_notification

# ----------- Test Slack Notification -----------
def test_slack_notification(monkeypatch, mocker):
    monkeypatch.setenv("NOTIFY_METHOD", "slack")
    monkeypatch.setenv("SLACK_WEBHOOK_URL", "https://hooks.slack.com/services/fake/test/url")

    mock_post = mocker.patch("utils.notify.requests.post")
    mock_post.return_value.status_code = 200

    send_notification("Test Subject", "Test Message")

    mock_post.assert_called_once()
    payload = mock_post.call_args[1]["json"]
    assert "text" in payload
    assert "Test Subject" in payload["text"]

# ----------- Test Email Notification -----------
def test_email_notification(monkeypatch, mocker):
    monkeypatch.setenv("NOTIFY_METHOD", "email")
    monkeypatch.setenv("SMTP_HOST", "smtp.test.com")
    monkeypatch.setenv("SMTP_PORT", "587")
    monkeypatch.setenv("SMTP_USER", "test@test.com")
    monkeypatch.setenv("SMTP_PASSWORD", "testpass")
    monkeypatch.setenv("NOTIFY_EMAIL", "recipient@test.com")

    mock_smtp = mocker.patch("utils.notify.smtplib.SMTP")
    mock_server = mock_smtp.return_value.__enter__.return_value

    send_notification("Test Email", "Body")

    mock_server.starttls.assert_called_once()
    mock_server.login.assert_called_once_with("test@test.com", "testpass")
    mock_server.send_message.assert_called_once()

# ----------- Test Both Notification -----------
def test_both_notification(monkeypatch, mocker):
    monkeypatch.setenv("NOTIFY_METHOD", "both")
    monkeypatch.setenv("SLACK_WEBHOOK_URL", "https://hooks.slack.com/services/fake/test/url")
    monkeypatch.setenv("SMTP_HOST", "smtp.test.com")
    monkeypatch.setenv("SMTP_PORT", "587")
    monkeypatch.setenv("SMTP_USER", "test@test.com")
    monkeypatch.setenv("SMTP_PASSWORD", "testpass")
    monkeypatch.setenv("NOTIFY_EMAIL", "recipient@test.com")

    mock_post = mocker.patch("utils.notify.requests.post")
    mock_post.return_value.status_code = 200

    mock_smtp = mocker.patch("utils.notify.smtplib.SMTP")
    mock_server = mock_smtp.return_value.__enter__.return_value

    send_notification("Both Channels", "Test")

    assert mock_post.called
    assert mock_server.send_message.called

# ----------- Test Missing Email Config -----------
def test_missing_env_config(monkeypatch, mocker):
    monkeypatch.setenv("NOTIFY_METHOD", "email")
    monkeypatch.delenv("SMTP_HOST", raising=False)  # simulate missing config

    mock_logger = mocker.patch("utils.notify.logger")
    send_notification("Missing Config", "Test")
    mock_logger.warning.assert_called_with("SMTP email config incomplete.")

# ----------- Test Unknown Notification Method -----------
def test_unknown_notify_method(monkeypatch, mocker):
    monkeypatch.setenv("NOTIFY_METHOD", "invalid")

    mock_logger = mocker.patch("utils.notify.logger")
    send_notification("Oops", "Invalid method")
    mock_logger.warning.assert_called_once_with("❌ Unknown NOTIFY_METHOD: invalid")
