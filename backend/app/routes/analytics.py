from flask import Blueprint
from app.utils.response import success_response
from app.middleware.auth_middleware import require_auth

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/overview", methods=["GET"])
@require_auth
def get_overview_metrics():
    """Retrieve summarized aggregate statistics for organization dashboards."""
    metrics = {
        "today": {
            "present": 472,
            "absent": 61,
            "late": 35,
            "total": 568,
            "percentage": 83.1
        },
        "averages": {
            "monthly": 84.2,
            "semester": 82.8
        }
    }
    return success_response(data=metrics, message="High-level dashboard metrics loaded")

@analytics_bp.route("/department-trends", methods=["GET"])
@require_auth
def get_department_comparison():
    """Retrieve attendance performance rankings across organization departments."""
    dept_stats = [
        {"department_name": "Computer Science (CSE)", "percentage": 88.5},
        {"department_name": "Electronics (ECE)", "percentage": 78.2},
        {"department_name": "Business Admin (MBA)", "percentage": 91.0},
        {"department_name": "Mechanical Eng (ME)", "percentage": 73.6},
    ]
    return success_response(data=dept_stats)
