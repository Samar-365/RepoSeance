from flask import Blueprint, request, jsonify
from backend.database.connection import get_db

unfinished_bp = Blueprint("unfinished", __name__, url_prefix="/api/repositories")

@unfinished_bp.route("/<int:repo_id>/unfinished", methods=["GET"])
def get_unfinished_items(repo_id: int):
    """Retrieve categorized unfinished work findings (TODOs, FIXMEs, unmerged branches, open issues)."""
    category = request.args.get("category")
    severity = request.args.get("severity")
    limit = int(request.args.get("limit", 200))

    query = "SELECT * FROM unfinished_items WHERE repository_id = ?"
    params = [repo_id]

    if category:
        query += " AND category = ?"
        params.append(category)

    if severity:
        query += " AND severity = ?"
        params.append(severity)

    query += " ORDER BY CASE severity WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END, id ASC LIMIT ?"
    params.append(limit)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(query, params)
        items = [dict(r) for r in cursor.fetchall()]

        # Compute category breakdown
        cursor.execute(
            """
            SELECT category, COUNT(*) as count
            FROM unfinished_items
            WHERE repository_id = ?
            GROUP BY category
            """,
            (repo_id,)
        )
        breakdown = {r["category"]: r["count"] for r in cursor.fetchall()}

    return jsonify({
        "repository_id": repo_id,
        "total": len(items),
        "breakdown": breakdown,
        "items": items
    })
