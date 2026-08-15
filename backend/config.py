from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


class Config:
    DATABASE_PATH = BASE_DIR / "database" / "coconut.db"
    UPLOAD_FOLDER = BASE_DIR / "uploads"
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024