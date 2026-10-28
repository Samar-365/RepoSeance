import sys
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.app import create_app
from backend.ai.ollama_client import OllamaClient

def run_test():
    print("1. Initializing Flask app test client...")
    app = create_app()
    client = app.test_client()

    print("2. Checking Ollama runtime status...")
    ollama_info = OllamaClient().check_connection()
    print(f"   Connection: {ollama_info}")

    repo_id = 1
    print(f"\n3. Testing Séance Chat endpoint (POST /api/repositories/{repo_id}/chat)...")
    chat_payload = {
        "question": "What is the primary purpose of this repository according to the surviving documents?",
        "temperature": 0.2
    }
    resp = client.post(f"/api/repositories/{repo_id}/chat", json=chat_payload)
    assert resp.status_code == 200, f"Expected 200, got {resp.status_code}: {resp.data}"
    chat_data = resp.get_json()
    print(f"   Model used: {chat_data.get('model')} (Simulated: {chat_data.get('simulated')})")
    print(f"   Retrieved Evidence Cards: {len(chat_data.get('evidence', []))}")
    print(f"   Detected Citations: {len(chat_data.get('citations', []))}")
    print(f"   Ghost Response Preview:\n   {chat_data.get('response')[:250]}...\n")

    print(f"4. Testing Report Generation endpoint (POST /api/repositories/{repo_id}/report)...")
    rep_resp = client.post(f"/api/repositories/{repo_id}/report")
    assert rep_resp.status_code == 200, f"Expected 200, got {rep_resp.status_code}: {rep_resp.data}"
    report_data = rep_resp.get_json()
    print(f"   Generated Report ID: {report_data.get('report_id')}")
    assert "Resurrection Report" in report_data.get("content_markdown", "")
    print(f"   Report Preview:\n   {report_data.get('content_markdown')[:300]}...\n")

    print(f"5. Testing Report Retrieval endpoint (GET /api/repositories/{repo_id}/report)...")
    fetch_resp = client.get(f"/api/repositories/{repo_id}/report")
    assert fetch_resp.status_code == 200
    fetched = fetch_resp.get_json()
    assert fetched["report"]["id"] == report_data["report_id"]
    print("   Successfully fetched stored report from SQLite!")

    print("\n All Phase 2 tests passed successfully!")

if __name__ == "__main__":
    run_test()
