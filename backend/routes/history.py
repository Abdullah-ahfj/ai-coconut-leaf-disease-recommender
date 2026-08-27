from flask import Blueprint, jsonify, session
from models.prediction import Prediction
from sqlalchemy import func


history_bp = Blueprint(
    "history",
    __name__
)


@history_bp.get("/")
def get_history():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "status": "error",
            "message": "You must be logged in."
        }), 401

    predictions = (
        Prediction.query
        .filter_by(user_id=user_id)
        .order_by(Prediction.created_at.desc())
        .all()
    )

    return jsonify({
        "status": "success",
        "predictions": [
            prediction.to_dict()
            for prediction in predictions
        ]
    }), 200

@history_bp.get("/test")
def test_history():
    return jsonify({
        "message": "History route is working."
    }), 200

@history_bp.get("/dashboard")
def get_dashboard():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "status": "error",
            "message": "You must be logged in."
        }), 401

    user_predictions = (
        Prediction.query
        .filter_by(user_id=user_id)
        .order_by(Prediction.created_at.desc())
        .all()
    )

    total_predictions = len(user_predictions)

    if total_predictions == 0:
        return jsonify({
            "status": "success",
            "dashboard": {
                "total_predictions": 0,
                "most_detected_disease": None,
                "latest_prediction": None,
                "average_confidence": 0,
                "recent_predictions": []
            }
        }), 200

    average_confidence = (
        sum(
            prediction.confidence
            for prediction in user_predictions
        )
        / total_predictions
    )

    disease_counts = {}

    for prediction in user_predictions:
        disease = prediction.predicted_class

        disease_counts[disease] = (
            disease_counts.get(disease, 0) + 1
        )

    most_detected_disease = max(
        disease_counts,
        key=disease_counts.get
    )

    latest_prediction = user_predictions[0]

    recent_predictions = (
        user_predictions[:5]
    )

    return jsonify({
        "status": "success",
        "dashboard": {
            "total_predictions": total_predictions,

            "most_detected_disease": {
                "name": most_detected_disease,
                "count": disease_counts[
                    most_detected_disease
                ]
            },

            "latest_prediction":
                latest_prediction.to_dict(),

            "average_confidence":
                round(average_confidence, 2),

            "recent_predictions": [
                prediction.to_dict()
                for prediction in recent_predictions
            ]
        }
    }), 200