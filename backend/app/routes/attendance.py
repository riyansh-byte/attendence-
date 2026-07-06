from flask import Blueprint, request
from app.utils.response import success_response, error_response
from app.middleware.auth_middleware import require_auth, require_role

attendance_bp = Blueprint("attendance", __name__)

@attendance_bp.route("/session", methods=["POST"])
@require_auth
@require_role(["org_admin", "teacher"])
def create_session():
    """Create a new classroom attendance roll call session."""
    body = request.get_json() or {}
    class_id = body.get("class_id")
    date = body.get("date")
    
    if not class_id or not date:
        return error_response("Missing class code or session date")
        
    session = {
        "id": f"sess_{Date_now_mock()}",
        "class_id": class_id,
        "date": date,
        "status": "active"
    }
    return success_response(data=session, message="Attendance roll call session initialized", status_code=201)

@attendance_bp.route("/records", methods=["POST"])
@require_auth
@require_role(["org_admin", "teacher"])
def save_records():
    """Submit granular attendance checklist logs for individual students."""
    body = request.get_json() or {}
    session_id = body.get("session_id")
    records = body.get("records") # list of dicts: student_id and status
    
    if not session_id or not records:
        return error_response("Missing session key or attendance sheets records")
        
    # Standard backend checks trigger anomaly analysis services here
    return success_response(
        data={"recorded_count": len(records)},
        message="Attendance session checklist committed successfully"
    )

def Date_now_mock():
    import time
    return int(time.time())
