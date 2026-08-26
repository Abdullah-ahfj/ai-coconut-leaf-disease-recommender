from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

DATABASE_PATH = BASE_DIR / "database" / "coconut.db"


class Config:
    SECRET_KEY = "cocoguard-local-development-key"

    SQLALCHEMY_DATABASE_URI = (
        f"sqlite:///{DATABASE_PATH.as_posix()}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    UPLOAD_FOLDER = BASE_DIR / "uploads"

    MAX_CONTENT_LENGTH = 10 * 1024 * 1024