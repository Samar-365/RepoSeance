from flask import Blueprint, request, jsonify
from backend.database.connection import get_db
from backend.services.analysis_service import AnalysisService

repositories_bp = Blueprint("repositories", __name__, url_prefix="/api/repositories")

@repositories_bp.route("/analyze", methods=["POST"])
def analyze_repository():
    """Trigger analysis of a local directory or remote GitHub repository."""
    data = request.get_json() or {}
    path_or_url = data.get("path_or_url")
    if not path_or_url:
        return jsonify({"error": "path_or_url is required"}), 400

    try:
        result = AnalysisService.start_analysis(path_or_url)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@repositories_bp.route("", methods=["GET"])
def list_repositories():
    """List all tracked repositories with status and summaries."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, name, source_type, path_or_url, default_branch,
                   total_commits, status, error_message, created_at, analyzed_at
            FROM repositories
            ORDER BY created_at DESC
            """
        )
        repos = [dict(r) for r in cursor.fetchall()]
    return jsonify({"repositories": repos})

@repositories_bp.route("/<int:repo_id>", methods=["GET"])
def get_repository(repo_id: int):
    """Retrieve details, counts, and metadata for a specific repository."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM repositories WHERE id = ?", (repo_id,))
        repo = cursor.fetchone()
        if not repo:
            return jsonify({"error": "Repository not found"}), 404

        # Summary statistics
        cursor.execute("SELECT COUNT(*) as cnt FROM commits WHERE repository_id = ?", (repo_id,))
        commit_count = cursor.fetchone()["cnt"]

        cursor.execute("SELECT COUNT(*) as cnt FROM unfinished_items WHERE repository_id = ?", (repo_id,))
        unfinished_count = cursor.fetchone()["cnt"]

        cursor.execute("SELECT COUNT(*) as cnt FROM issues_prs WHERE repository_id = ? AND type = 'issue'", (repo_id,))
        issue_count = cursor.fetchone()["cnt"]

        cursor.execute("SELECT COUNT(*) as cnt FROM issues_prs WHERE repository_id = ? AND type = 'pr'", (repo_id,))
        pr_count = cursor.fetchone()["cnt"]

        cursor.execute(
            "SELECT committed_at, message FROM commits WHERE repository_id = ? ORDER BY committed_at DESC LIMIT 1",
            (repo_id,)
        )
        last_commit = cursor.fetchone()

        result = dict(repo)
        result["stats"] = {
            "total_commits": commit_count,
            "unfinished_items": unfinished_count,
            "issues": issue_count,
            "prs": pr_count,
            "last_commit": dict(last_commit) if last_commit else None
        }

    return jsonify({"repository": result})
