from flask import Blueprint, request
from app.utils.response import success_response, error_response
from app.middleware.auth_middleware import require_auth, require_role

teachers_bp = Blueprint("teachers", __name__)

@teachers_bp.route("/", methods=["GET"])
@require_auth
@require_role(["org_admin"])
def list_teachers():
    """Retrieve all teachers records for active tenant."""
    mock_teachers = [
        {"id": "tch_1", "full_name": "Prof. Anand Krishnan", "teacher_id": "TCH-301", "designation": "Associate Professor", "is_active": True},
        {"id": "tch_2", "full_name": "Dr. Ramesh Iyer", "teacher_id": "TCH-102", "designation": "Head of Department", "is_active": True},
    ]
    return success_response(data=mock_teachers, message="Faculty directory loaded")

@teachers_bp.route("/", methods=["POST"])
@require_auth
@require_role(["org_admin"])
def add_teacher():
    """Register and invite new teacher accounts to the tenant workspace."""
    body = request.get_json() or {}
    full_name = body.get("full_name")
    teacher_id = body.get("teacher_id")
    email = body.get("email")
    
    if not full_name or not teacher_id or not email:
        return error_response("Missing required parameters")
        
    created = {
        "id": f"tch_{Date_now_mock()}",
        "full_name": full_name,
        "teacher_id": teacher_id,
        "email": email,
        "is_active": True
    }
    return success_response(data=created, message="Teacher account registered", status_code=201)

def Date_now_mock():
    import time
    return int(time.time())
