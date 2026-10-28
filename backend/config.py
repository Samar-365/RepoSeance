import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATABASE_PATH = DATA_DIR / "reposeance.db"
CLONES_DIR = DATA_DIR / "clones"

# Ensure data directories exist
DATA_DIR.mkdir(parents=True, exist_ok=True)
CLONES_DIR.mkdir(parents=True, exist_ok=True)

# Application Configuration
OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
DEFAULT_GEMMA_MODEL = os.environ.get("GEMMA_MODEL", "gemma2:2b")
PORT = int(os.environ.get("PORT", 5000))
DEBUG = os.environ.get("FLASK_DEBUG", "True").lower() in ("true", "1", "yes")

# Ingestion limits
MAX_COMMITS_DEFAULT = 500
MAX_FILE_SIZE_BYTES = 500 * 1024  # 500 KB limit for code scanning
ALLOWED_EXTENSIONS = {
    ".py", ".js", ".jsx", ".ts", ".tsx", ".java", ".c", ".cpp", ".h",
    ".cs", ".go", ".rs", ".rb", ".php", ".html", ".css", ".md", ".json",
    ".yaml", ".yml", ".toml", ".sh", ".sql"
}
IGNORED_DIRS = {
    ".git", "node_modules", "venv", ".venv", "__pycache__", "dist",
    "build", ".idea", ".vscode", "target", "vendor", ".gradle"
}
