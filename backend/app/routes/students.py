from flask import Blueprint, request
from app.utils.response import success_response, error_response
from app.middleware.auth_middleware import require_auth, require_role

students_bp = Blueprint("students", __name__)

@students_bp.route("/", methods=["GET"])
@require_auth
@require_role(["org_admin", "teacher"])
def list_students():
    """Retrieve all students filtered by active organization tenant scope."""
    # Mock return list
    mock_students = [
        {"id": "std_1", "full_name": "Rahul Sharma", "student_id": "CSE-24-0012", "attendance_percentage": 86, "is_active": True},
        {"id": "std_2", "full_name": "Anjali Gupta", "student_id": "ECE-24-0091", "attendance_percentage": 74, "is_active": True},
        {"id": "std_3", "full_name": "Pooja Patel", "student_id": "CSE-24-0043", "attendance_percentage": 91, "is_active": True},
    ]
    return success_response(data=mock_students, message="Students database records fetched successfully")

@students_bp.route("/<string:student_id>", methods=["GET"])
@require_auth
def get_student(student_id):
    """Retrieve profile metrics detail for a specific student."""
    mock_student = {
        "id": student_id,
        "full_name": "Rahul Sharma",
        "student_id": "CSE-24-0012",
        "email": "rahul@school.edu",
        "attendance_percentage": 86,
        "is_active": True,
        "department": {"name": "Computer Science & Eng", "code": "CSE"}
    }
    return success_response(data=mock_student)

@students_bp.route("/", methods=["POST"])
@require_auth
@require_role(["org_admin"])
def add_student():
    """Create and validate a new student record inside the organization database."""
    body = request.get_json() or {}
    full_name = body.get("full_name")
    student_id = body.get("student_id")
    
    if not full_name or not student_id:
        return error_response("Missing student metadata attributes")
        
    created = {
        "id": f"std_{Date_now_mock()}",
        "full_name": full_name,
        "student_id": student_id,
        "is_active": True
    }
    return success_response(data=created, message="Student created successfully", status_code=201)

def Date_now_mock():
    import time
    return int(time.time())
