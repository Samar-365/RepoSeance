from flask import Blueprint, request, jsonify
from backend.database.connection import get_db

timeline_bp = Blueprint("timeline", __name__, url_prefix="/api/repositories")

@timeline_bp.route("/<int:repo_id>/timeline", methods=["GET"])
def get_timeline(repo_id: int):
    """Retrieve chronological commit timeline with optional milestone filtering."""
    only_significant = request.args.get("only_significant", "false").lower() in ("true", "1")
    search = request.args.get("search", "").strip()
    limit = int(request.args.get("limit", 150))
    direction = request.args.get("direction", "desc").lower()

    query = "SELECT * FROM commits WHERE repository_id = ?"
    params = [repo_id]

    if only_significant:
        query += " AND is_significant = 1"

    if search:
        query += " AND (message LIKE ? OR author_name LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%"])

    order_clause = "ASC" if direction == "asc" else "DESC"
    query += f" ORDER BY committed_at {order_clause} LIMIT ?"
    params.append(limit)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(query, params)
        commits = [dict(c) for c in cursor.fetchall()]

    return jsonify({
        "repository_id": repo_id,
        "count": len(commits),
        "timeline": commits
    })
