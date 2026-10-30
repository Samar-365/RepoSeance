import os
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.app import create_app
from backend.services.analysis_service import AnalysisService
from backend.ai.ollama_client import OllamaClient
from backend.indexing.retriever import EvidenceRetriever

def run_e2e_tests():
    print("=" * 60)
    print(" [*] RepoSeance End-to-End Test Suite")
    print("=" * 60)

    # 1. Setup Flask App
    print("\n[Step 1] Initializing Flask application and SQLite FTS5 database...")
    app = create_app()
    client = app.test_client()

    # 2. Health & Model Connectivity Check
    print("\n[Step 2] Testing /api/health and Ollama connectivity...")
    health_resp = client.get("/api/health")
    assert health_resp.status_code == 200, f"Health check failed: {health_resp.data}"
    health_data = health_resp.get_json()
    print(f"   Status: {health_data['status']}")
    print(f"   Service: {health_data['service']}")
    print(f"   Ollama Status: {health_data['ai_inference']['ollama_status']}")
    print(f"   Configured Model: {health_data['ai_inference']['configured_model']}")

    # 3. Error Handling Verification
    print("\n[Step 3] Verifying error handling for invalid operations...")
    # Invalid repository ID for chat
    chat_404 = client.post("/api/repositories/99999/chat", json={"question": "Where is the code?"})
    assert chat_404.status_code == 404, f"Expected 404, got {chat_404.status_code}"
    print("   ✓ Non-existent repository returns 404")

    # Missing question in chat
    chat_400 = client.post("/api/repositories/1/chat", json={})
    assert chat_400.status_code == 400, f"Expected 400, got {chat_400.status_code}"
    print("   ✓ Empty question in chat returns 400")

    # Invalid local repository path
    try:
        AnalysisService.start_analysis("C:\\non_existent_folder_xyz_404")
        assert False, "Expected error on nonexistent directory"
    except FileNotFoundError:
        print("   ✓ Non-existent local path raises FileNotFoundError")

    # 4. Ingestion & Analysis of Local Repository
    repo_dir = str(Path(__file__).resolve().parent.parent)
    print(f"\n[Step 4] Ingesting repository: {repo_dir}")
    analysis_res = AnalysisService.start_analysis(repo_dir)
    assert analysis_res["status"] == "success"
    repo_id = analysis_res["repository_id"]
    print(f"   ✓ Ingestion complete. Repository ID: {repo_id}")

    # 5. Repository Metadata & Stats
    print(f"\n[Step 5] Fetching repository details (GET /api/repositories/{repo_id})...")
    repo_resp = client.get(f"/api/repositories/{repo_id}")
    assert repo_resp.status_code == 200
    repo_details = repo_resp.get_json()["repository"]
    print(f"   Name: {repo_details['name']}")
    print(f"   Total commits: {repo_details['total_commits']}")
    print(f"   Default branch: {repo_details['default_branch']}")
    print(f"   Stats: {repo_details['stats']}")

    # 6. Ghost Timeline Verification
    print(f"\n[Step 6] Testing commit timeline (GET /api/repositories/{repo_id}/timeline)...")
    timeline_resp = client.get(f"/api/repositories/{repo_id}/timeline")
    assert timeline_resp.status_code == 200
    timeline_data = timeline_resp.get_json()
    assert timeline_data["count"] > 0
    print(f"   ✓ Retrieved {timeline_data['count']} commits in chronological order")

    # 7. Unfinished Business Vault Verification
    print(f"\n[Step 7] Testing unfinished business vault (GET /api/repositories/{repo_id}/unfinished)...")
    unf_resp = client.get(f"/api/repositories/{repo_id}/unfinished")
    assert unf_resp.status_code == 200
    unf_data = unf_resp.get_json()
    print(f"   ✓ Total unfinished items: {unf_data['total']}")
    print(f"   ✓ Breakdown: {unf_data['breakdown']}")

    # 8. Evidence Full-Text Search
    print(f"\n[Step 8] Testing FTS5 Evidence Search...")
    evidence = EvidenceRetriever.search_evidence(repo_id, "RepoSeance", limit=5)
    print(f"   ✓ FTS5 Search matched {len(evidence)} evidence entries")

    # 9. Ghost Séance Chat with Local AI Grounding
    print(f"\n[Step 9] Testing Séance Chat (POST /api/repositories/{repo_id}/chat)...")
    question = "What architectural components and data stores does RepoSeance use?"
    chat_resp = client.post(f"/api/repositories/{repo_id}/chat", json={"question": question, "temperature": 0.2})
    assert chat_resp.status_code == 200
    chat_data = chat_resp.get_json()
    print(f"   Model: {chat_data.get('model')} (Simulated: {chat_data.get('simulated')})")
    print(f"   Evidence cards retrieved: {len(chat_data.get('evidence', []))}")
    print(f"   Citations extracted: {len(chat_data.get('citations', []))}")
    print(f"   Ghost response:\n   {chat_data.get('response')[:280]}...\n")

    # 10. Resurrection Report Synthesis & Export
    print(f"\n[Step 10] Testing Resurrection Report generation (POST /api/repositories/{repo_id}/report)...")
    rep_resp = client.post(f"/api/repositories/{repo_id}/report")
    assert rep_resp.status_code == 200
    rep_data = rep_resp.get_json()
    markdown_content = rep_data.get("content_markdown", "")
    assert "Resurrection Report" in markdown_content
    print("   ✓ Resurrection report synthesized successfully")

    # Save sample report to examples/
    examples_dir = Path(__file__).resolve().parent.parent / "examples"
    examples_dir.mkdir(exist_ok=True)
    sample_file = examples_dir / "sample_resurrection_report.md"
    sample_file.write_text(markdown_content, encoding="utf-8")
    print(f"   ✓ Saved sample resurrection report to {sample_file}")

    print("\n" + "=" * 60)
    print(" [OK] ALL END-TO-END VERIFICATION CHECKS PASSED!")
    print("=" * 60)

if __name__ == "__main__":
    run_e2e_tests()
