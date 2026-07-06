from functools import wraps
from flask import request, g
from app.auth.jwt_handler import decode_supabase_token
from app.utils.response import error_response

def require_auth(f):
    """Decorator to require authenticated token verification for endpoints."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return error_response("Authorization header is missing", 401)
        
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return error_response("Header format must be Bearer <token>", 401)
            
        token = parts[1]
        try:
            user_payload = decode_supabase_token(token)
            # Store user payload in flask.g thread local variable
            g.user = user_payload
        except Exception as e:
            return error_response(str(e), 401)
            
        return f(*args, **kwargs)
    return decorated

def require_role(roles):
    """Decorator to assert user has specific authorization role access."""
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not hasattr(g, "user"):
                return error_response("User context not established", 401)
            
            # Retrieve role metadata claim in Supabase app_metadata
            app_metadata = g.user.get("app_metadata", {})
            user_role = app_metadata.get("role", "student")
            
            if user_role not in roles:
                return error_response("Forbidden: Insufficient privileges", 403)
                
            return f(*args, **kwargs)
        return decorated
    return decorator
