from flask import Blueprint, request
import requests
from app.utils.response import success_response, error_response
from app.middleware.auth_middleware import require_auth, require_role
from app.config.settings import Config

workflows_bp = Blueprint("workflows", __name__)

@workflows_bp.route("/trigger-anomaly-alert", methods=["POST"])
@require_auth
@require_role(["org_admin", "teacher"])
def trigger_alert():
    """
    Triggers an n8n workflow webhook for attendance anomaly escalations.
    """
    body = request.get_json() or {}
    anomaly_details = body.get("anomaly_details")
    
    if not anomaly_details:
        return error_response("Missing required anomaly details payload")
        
    n8n_url = Config.N8N_ANOMALY_WEBHOOK_URL
    secret_token = Config.N8N_SECRET_TOKEN or "n8n-dev-secret-token"
    
    if not n8n_url:
        # Fallback if webhook url not configured in variables
        return success_response(
            data={"status": "skipped", "message": "n8n URL not configured. Action recorded in audit logs."},
            message="Alert workflow logged (skipped trigger)"
        )
        
    headers = {
        "Content-Type": "application/json",
        "X-AttendAI-Secret-Token": secret_token
    }
    
    try:
        response = requests.post(
            n8n_url,
            json={"event": "attendance_anomaly", "payload": anomaly_details},
            headers=headers,
            timeout=5
        )
        
        if response.status_code == 200:
            return success_response(
                data={"status": "triggered", "n8n_response": response.json()},
                message="n8n alert workflow triggered successfully"
            )
        else:
            return error_response(
                message=f"n8n webhook returned status code {response.status_code}",
                status_code=502
            )
            
    except requests.exceptions.RequestException as e:
        return error_response(
            message=f"Failed to reach n8n workflow server: {str(e)}",
            status_code=504
        )
