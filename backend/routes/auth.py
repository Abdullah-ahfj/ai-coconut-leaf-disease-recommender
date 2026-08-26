from flask import (
    Blueprint,
    jsonify,
    request,
    session
)

from models import db
from models.user import User


auth_bp = Blueprint(
    "auth",
    __name__
)

@auth_bp.post("/register")
def register():
    data = request.get_json() or {}

    username = data.get(
        "username",
        ""
    ).strip()

    email = data.get(
        "email",
        ""
    ).strip().lower()

    password = data.get(
        "password",
        ""
    )

    if not username or not email or not password:
        return jsonify({
            "status": "error",
            "message": "Username, email, and password are required."
        }), 400

    if len(password) < 8:
        return jsonify({
            "status": "error",
            "message": "Password must contain at least 8 characters."
        }), 400

    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return jsonify({
            "status": "error",
            "message": "An account with this email already exists."
        }), 409

    user = User(
        username=username,
        email=email
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Account created successfully.",
        "user": user.to_dict()
    }), 201

@auth_bp.post("/login")
def login():
    data = request.get_json() or {}

    email = data.get(
        "email",
        ""
    ).strip().lower()

    password = data.get(
        "password",
        ""
    )

    user = User.query.filter_by(
        email=email
    ).first()

    if not user or not user.check_password(password):
        return jsonify({
            "status": "error",
            "message": "Invalid email or password."
        }), 401

    session["user_id"] = user.id

    return jsonify({
        "status": "success",
        "message": "Login successful.",
        "user": user.to_dict()
    }), 200


@auth_bp.get("/me")
def get_current_user():
    user_id = session.get(
        "user_id"
    )

    if not user_id:
        return jsonify({
            "authenticated": False,
            "user": None
        }), 401

    user = db.session.get(
        User,
        user_id
    )

    if not user:
        session.clear()

        return jsonify({
            "authenticated": False,
            "user": None
        }), 401

    return jsonify({
        "authenticated": True,
        "user": user.to_dict()
    }), 200


@auth_bp.post("/logout")
def logout():
    session.clear()

    return jsonify({
        "status": "success",
        "message": "Logout successful."
    }), 200

@auth_bp.get("/test")
def test_auth():
    return jsonify({
        "message": "Authentication route is working."
    }), 200