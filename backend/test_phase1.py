import os
import sys
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.app import create_app
from backend.services.analysis_service import AnalysisService
from backend.indexing.retriever import EvidenceRetriever
from backend.database.connection import get_db

def run_test():
    print("1. Creating Flask app & initializing DB...")
    app = create_app()
    client = app.test_client()

    print("2. Testing /api/health...")
    health = client.get("/api/health").get_json()
    print(f"   Health check: {health}")
    assert health["status"] == "healthy"

    repo_dir = str(Path(__file__).resolve().parent.parent)
    print(f"3. Ingesting self repository: {repo_dir}")
    res = AnalysisService.start_analysis(repo_dir)
    print(f"   Analysis result: {res}")
    repo_id = res["repository_id"]

    print("4. Testing GET /api/repositories...")
    repos = client.get("/api/repositories").get_json()
    print(f"   Found {len(repos['repositories'])} repositories")
    assert len(repos["repositories"]) > 0

    print(f"5. Testing GET /api/repositories/{repo_id}...")
    details = client.get(f"/api/repositories/{repo_id}").get_json()
    print(f"   Repository stats: {details['repository']['stats']}")

    print(f"6. Testing GET /api/repositories/{repo_id}/timeline...")
    timeline = client.get(f"/api/repositories/{repo_id}/timeline").get_json()
    print(f"   Found {timeline['count']} commits in timeline")
    assert timeline["count"] > 0

    print(f"7. Testing GET /api/repositories/{repo_id}/unfinished...")
    unfinished = client.get(f"/api/repositories/{repo_id}/unfinished").get_json()
    print(f"   Found {unfinished['total']} unfinished items; breakdown: {unfinished['breakdown']}")

    print("8. Testing EvidenceRetriever.search_evidence...")
    evidence = EvidenceRetriever.search_evidence(repo_id, "Dead Code Séance")
    print(f"   Retrieved {len(evidence)} evidence matches:")
    for e in evidence[:2]:
        print(f"     - [{e['source_type']}] {e['source_identifier']}: {e['content_excerpt'][:80]}...")

    print("\n All Phase 1 smoke tests passed successfully!")

if __name__ == "__main__":
    run_test()
