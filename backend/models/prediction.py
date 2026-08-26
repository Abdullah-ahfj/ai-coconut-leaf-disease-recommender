from datetime import datetime, timezone

from models import db


class Prediction(db.Model):
    __tablename__ = "predictions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    image_path = db.Column(
        db.String(255),
        nullable=False
    )

    predicted_class = db.Column(
        db.String(120),
        nullable=False
    )

    confidence = db.Column(
        db.Float,
        nullable=False
    )

    recommendation = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    def to_dict(self):
        return {
            "id": self.id,
            "image_path": self.image_path,
            "predicted_class": self.predicted_class,
            "confidence": self.confidence,
            "recommendation": self.recommendation,
            "created_at": self.created_at.isoformat()
        }