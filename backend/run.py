import os
from dotenv import load_dotenv

# Load env variables from .env file
load_dotenv()

from app import create_app

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    # Run server in debug/development mode or production depending on settings
    app.run(host="0.0.0.0", port=port, debug=os.getenv("FLASK_ENV") == "development")
