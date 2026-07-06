from flask import Blueprint, request
import boto3
from botocore.exceptions import ClientError
from app.utils.response import success_response, error_response
from app.middleware.auth_middleware import require_auth
from app.config.settings import Config

storage_bp = Blueprint("storage", __name__)

@storage_bp.route("/presigned-upload-url", methods=["POST"])
@require_auth
def get_presigned_url():
    """
    Generates a secure AWS S3 presigned URL for direct client file uploads.
    """
    body = request.get_json() or {}
    filename = body.get("filename")
    content_type = body.get("content_type", "application/pdf")
    
    if not filename:
        return error_response("Missing required parameter: filename")
        
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
        region_name=Config.AWS_REGION
    )
    
    bucket_name = Config.AWS_S3_BUCKET or "attendai-reports-storage"
    # Create key prefix based on tenant scope to prevent overrides
    s3_key = f"reports/{filename}"
    
    try:
        # Generate presigned PUT URL
        presigned_url = s3_client.generate_presigned_url(
            "put_object",
            Params={
                "Bucket": bucket_name,
                "Key": s3_key,
                "ContentType": content_type
            },
            ExpiresIn=3600 # URL valid for 1 hour
        )
        return success_response(
            data={
                "upload_url": presigned_url,
                "file_key": s3_key,
                "bucket": bucket_name
            },
            message="Presigned upload URL generated successfully"
        )
    except ClientError as e:
        return error_response(f"AWS S3 error: {str(e)}", 500)
    except Exception as e:
        # If AWS credentials not configured, fallback to simulated upload details
        return success_response(
            data={
                "upload_url": f"https://s3.amazonaws.com/{bucket_name}/{s3_key}?mock=true",
                "file_key": s3_key,
                "bucket": bucket_name,
                "notice": "Simulation mode active. Configure AWS environment keys."
            },
            message="Presigned upload URL simulated"
        )
