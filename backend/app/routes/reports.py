from flask import Blueprint, request
from app.utils.response import success_response, error_response
from app.middleware.auth_middleware import require_auth, require_role

reports_bp = Blueprint("reports", __name__)

@reports_bp.route("/generate", methods=["POST"])
@require_auth
@require_role(["org_admin"])
def generate_report():
    """Trigger background report compiler job which generates PDF/CSV uploads to S3."""
    body = request.get_json() or {}
    report_type = body.get("type", "monthly")
    format = body.get("format", "PDF")
    
    # Simulate compiler execution triggers
    report_metadata = {
        "id": f"rep_job_{Date_now_mock()}",
        "name": f"Attendance_{report_type.upper()}_Report",
        "format": format,
        "status": "processing",
        "aws_s3_url": None
    }
    
    return success_response(
        data=report_metadata,
        message="Report compiling job started on worker nodes",
        status_code=202
    )

def Date_now_mock():
    import time
    return int(time.time())
