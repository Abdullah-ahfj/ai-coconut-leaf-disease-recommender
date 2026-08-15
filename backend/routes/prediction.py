from flask import Blueprint, jsonify

prediction_bp = Blueprint("prediction", __name__)


@prediction_bp.get("/test")
def test_prediction():
    return jsonify(
        {
            "message": "Prediction route is working."
        }
    ), 200