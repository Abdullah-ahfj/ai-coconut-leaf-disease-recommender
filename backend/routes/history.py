from flask import Blueprint, jsonify

history_bp = Blueprint("history", __name__)


@history_bp.get("/test")
def test_history():
    return jsonify(
        {
            "message": "History route is working."
        }
    ), 200