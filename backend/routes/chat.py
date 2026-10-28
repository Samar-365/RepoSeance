from flask import Blueprint, request, jsonify
from backend.database.connection import get_db
from backend.indexing.retriever import EvidenceRetriever
from backend.ai.ollama_client import OllamaClient
from backend.ai.prompts import GHOST_SYSTEM_PROMPT, build_chat_prompt
from backend.ai.validator import ResponseValidator

chat_bp = Blueprint("chat", __name__, url_prefix="/api/repositories")

@chat_bp.route("/<int:repo_id>/chat", methods=["POST"])
def seance_chat(repo_id: int):
    """Ask a question to the Repository Ghost, grounded in retrieved evidence."""
    data = request.get_json() or {}
    question = data.get("question", "").strip()
    if not question:
        return jsonify({"error": "Question is required"}), 400

    temperature = float(data.get("temperature", 0.3))

    # Verify repository
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name FROM repositories WHERE id = ?", (repo_id,))
        repo = cursor.fetchone()
        if not repo:
            return jsonify({"error": "Repository not found"}), 404

        # Fetch recent commits for ambient context
        cursor.execute(
            "SELECT commit_hash, author_name, committed_at, message FROM commits WHERE repository_id = ? ORDER BY committed_at DESC LIMIT 5",
            (repo_id,)
        )
        recent_commits = [dict(c) for c in cursor.fetchall()]

    # Retrieve relevant evidence
    evidence_items = EvidenceRetriever.search_evidence(repo_id, question, limit=6)

    # Format prompt and invoke Ollama
    prompt = build_chat_prompt(repo["name"], question, evidence_items, recent_commits)
    client = OllamaClient()
    ai_result = client.generate(prompt=prompt, system_prompt=GHOST_SYSTEM_PROMPT, temperature=temperature)

    # Parse and validate citations
    citations, validation_meta = ResponseValidator.extract_and_match_citations(
        ai_result["text"], evidence_items
    )

    return jsonify({
        "repository_id": repo_id,
        "question": question,
        "response": ai_result["text"],
        "model": ai_result.get("model"),
        "tokens_eval": ai_result.get("tokens_eval"),
        "duration_ms": ai_result.get("total_duration_ms"),
        "simulated": ai_result.get("simulated", False),
        "evidence": evidence_items,
        "citations": citations,
        "grounding": validation_meta
    })
