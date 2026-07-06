import jwt
import os
from app.config.settings import Config

def decode_supabase_token(token):
    """
    Decodes a JWT issued by Supabase Auth using the shared JWT Secret.
    Returns the decoded token dictionary if valid, or raises an exception.
    """
    jwt_secret = Config.SUPABASE_JWT_SECRET or "dev-fallback-secret"
    
    try:
        # Supabase uses HS256 algorithm by default for token encryption
        decoded = jwt.decode(
            token,
            jwt_secret,
            algorithms=["HS256"],
            audience="authenticated"
        )
        return decoded
    except jwt.ExpiredSignatureError:
        raise Exception("Token signature has expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid authorization token")
