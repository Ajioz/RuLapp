import os
import logging
import requests
import smtplib
from email.message import EmailMessage

logger = logging.getLogger(__name__)

def send_notification(subject, message, html=False):
    method = os.getenv("NOTIFY_METHOD", "email").lower()

    if method == "slack":
        _notify_slack(subject, message)
    elif method == "email":
        _notify_email(subject, message, html=html)
    elif method == "both":
        _notify_slack(subject, message)
        _notify_email(subject, message, html=html)
    else:
        logger.warning(f"❌ Unknown NOTIFY_METHOD: {method}")

# ========== 🔔 Slack ==========
def _notify_slack(subject, message):
    webhook_url = os.getenv("SLACK_WEBHOOK_URL")
    if not webhook_url:
        logger.warning("Slack webhook not configured.")
        return

    payload = {
        "text": f"*{subject}*\n{message}"
    }

    try:
        response = requests.post(webhook_url, json=payload)
        if response.status_code == 200:
            logger.info("📣 Slack notification sent.")
        else:
            logger.error(f"❌ Slack error: {response.text}")
    except Exception as e:
        logger.error(f"❌ Slack exception: {e}")

# ========== 📧 Email ==========
def _notify_email(subject, message, html=False):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    recipient = os.getenv("NOTIFY_EMAIL")

    if not all([smtp_host, smtp_user, smtp_pass, recipient]):
        logger.warning("SMTP email config incomplete.")
        return

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = recipient

    if html:
        msg.add_alternative(message, subtype="html")
    else:
        msg.set_content(message)

    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            logger.info("📧 Email notification sent.")
    except Exception as e:
        logger.error(f"❌ Email failed: {e}")
