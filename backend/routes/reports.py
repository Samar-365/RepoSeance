from flask import Blueprint, request, jsonify
from backend.services.report_service import ReportService

reports_bp = Blueprint("reports", __name__, url_prefix="/api/repositories")

@reports_bp.route("/<int:repo_id>/report", methods=["POST"])
def generate_report(repo_id: int):
    """Generate a structured Resurrection Plan and Archaeology Report."""
    try:
        report = ReportService.generate_resurrection_report(repo_id)
        return jsonify(report), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@reports_bp.route("/<int:repo_id>/report", methods=["GET"])
def get_report(repo_id: int):
    """Fetch the latest generated Resurrection Report for the repository."""
    report = ReportService.get_latest_report(repo_id)
    if not report:
        return jsonify({"error": "No report has been generated yet for this repository"}), 404
    return jsonify({"report": report})
