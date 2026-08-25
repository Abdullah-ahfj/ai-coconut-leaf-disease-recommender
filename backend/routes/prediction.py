from pathlib import Path
from uuid import uuid4

from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename

from services.predictor import predict_image
from services.recommender import get_recommendation


prediction_bp = Blueprint(
    "prediction",
    __name__
)


ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png"
}


@prediction_bp.get("/test")
def test_prediction():
    return jsonify({
        "message": "Prediction route is working."
    }), 200


@prediction_bp.post("/predict")
def predict():
    if "image" not in request.files:
        return jsonify({
            "status": "error",
            "message": "No image was provided."
        }), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({
            "status": "error",
            "message": "No image was selected."
        }), 400

    extension = Path(
        secure_filename(image.filename)
    ).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        return jsonify({
            "status": "error",
            "message": "Only JPG, JPEG, and PNG images are supported."
        }), 400

    unique_filename = (
        f"{uuid4().hex}{extension}"
    )

    upload_folder = Path(
        current_app.config["UPLOAD_FOLDER"]
    )

    upload_folder.mkdir(
        parents=True,
        exist_ok=True
    )

    image_path = (
        upload_folder / unique_filename
    )

    image.save(image_path)

    try:
        result = predict_image(
            image_path
        )

        recommendation = get_recommendation(
            result["predicted_class"]
        )

        return jsonify({
            "status": "success",
            "prediction": {
                "class": result["predicted_class"],
                "confidence": result["confidence"],
                "recommendation": recommendation
            }
        }), 200

    except Exception as error:
        return jsonify({
            "status": "error",
            "message": "The image could not be processed.",
            "details": str(error)
        }), 500