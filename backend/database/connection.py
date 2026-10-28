import sqlite3
from pathlib import Path
from contextlib import contextmanager
from backend.config import DATABASE_PATH

SCHEMA_PATH = Path(__file__).resolve().parent / "schema.sql"

def get_connection() -> sqlite3.Connection:
    """Returns a SQLite connection with row factory enabled."""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

@contextmanager
def get_db():
    """Context manager for safe database transactions."""
    conn = get_connection()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    """Initializes the database schema and virtual tables if not already present."""
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_db() as conn:
        with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
            conn.executescript(f.read())
