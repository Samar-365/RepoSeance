import requests
from flask import Flask, jsonify
from flask_cors import CORS
from backend.config import PORT, DEBUG, OLLAMA_BASE_URL, DEFAULT_GEMMA_MODEL
from backend.database.connection import init_db
from backend.routes.repositories import repositories_bp
from backend.routes.timeline import timeline_bp
from backend.routes.unfinished import unfinished_bp
from backend.routes.chat import chat_bp
from backend.routes.reports import reports_bp

def create_app() -> Flask:
    """Application factory for RepoSeance backend."""
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize SQLite database schema
    init_db()

    # Register blueprints
    app.register_blueprint(repositories_bp)
    app.register_blueprint(timeline_bp)
    app.register_blueprint(unfinished_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(reports_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        """Health check endpoint checking backend status and local Ollama connectivity."""
        ollama_status = "unreachable"
        available_models = []
        try:
            resp = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=1.5)
            if resp.status_code == 200:
                ollama_status = "connected"
                models_data = resp.json().get("models", [])
                available_models = [m.get("name") for m in models_data]
        except Exception:
            ollama_status = "offline"

        return jsonify({
            "status": "healthy",
            "service": "RepoSeance API",
            "version": "1.0.0",
            "ai_inference": {
                "ollama_status": ollama_status,
                "configured_model": DEFAULT_GEMMA_MODEL,
                "available_models": available_models
            }
        })

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Endpoint not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"error": "Internal server error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    print(f"[RepoSeance] backend rising on port {PORT}...")
    app.run(host="0.0.0.0", port=PORT, debug=DEBUG)
