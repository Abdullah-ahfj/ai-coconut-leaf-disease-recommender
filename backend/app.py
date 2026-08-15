from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from routes.auth import auth_bp
from routes.history import history_bp
from routes.prediction import prediction_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": ["http://localhost:5173"]
            }
        },
    )

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(prediction_bp, url_prefix="/api/predictions")
    app.register_blueprint(history_bp, url_prefix="/api/history")

    @app.get("/api/health")
    def health_check():
        return jsonify(
            {
                "status": "success",
                "message": "CocoGuard Flask API is running.",
            }
        ), 200

    return app


if __name__ == "__main__":
    application = create_app()
    application.run(debug=True)