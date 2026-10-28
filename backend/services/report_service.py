import json
from typing import Dict, Any, Optional
from backend.database.connection import get_db
from backend.ai.ollama_client import OllamaClient
from backend.ai.prompts import GHOST_SYSTEM_PROMPT, build_report_prompt

class ReportService:
    @staticmethod
    def generate_resurrection_report(repo_id: int) -> Dict[str, Any]:
        """Generates an evidence-grounded Resurrection Plan and Archaeology Report."""
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM repositories WHERE id = ?", (repo_id,))
            repo = cursor.fetchone()
            if not repo:
                raise ValueError("Repository not found")

            # Collect repository stats
            cursor.execute("SELECT * FROM commits WHERE repository_id = ? ORDER BY committed_at DESC LIMIT 15", (repo_id,))
            commits = [dict(c) for c in cursor.fetchall()]

            cursor.execute("SELECT * FROM unfinished_items WHERE repository_id = ? ORDER BY id ASC LIMIT 20", (repo_id,))
            unfinished = [dict(u) for u in cursor.fetchall()]

            cursor.execute("SELECT * FROM evidence WHERE repository_id = ? ORDER BY id DESC LIMIT 10", (repo_id,))
            evidence = [dict(e) for e in cursor.fetchall()]

            stats = {
                "total_commits": repo["total_commits"],
                "unfinished_items": len(unfinished),
                "last_commit": commits[0] if commits else None
            }

        # Build prompt & query AI
        prompt = build_report_prompt(repo["name"], stats, commits, unfinished, evidence)
        client = OllamaClient()
        ai_resp = client.generate(prompt=prompt, system_prompt=GHOST_SYSTEM_PROMPT, max_tokens=2000)

        # Assemble full structured markdown report
        markdown_body = ai_resp.get("text", "")
        full_markdown = f"""# The Dead Code Séance: Resurrection Report
**Repository:** {repo['name']}  
**Source:** `{repo['path_or_url']}`  
**Analyzed At:** {repo['analyzed_at'] or 'Recently'}  
**Default Branch:** `{repo['default_branch']}`  
**Oracle Model:** {ai_resp.get('model', 'Unknown')}  

---

{markdown_body}

---

## Evidence Appendix
*The claims in this document are grounded in the following surviving artifacts:*

"""
        for ev in evidence[:6]:
            full_markdown += f"- **[{ev['source_type'].upper()} {ev['source_identifier']}]** ({ev['source_location']}): {ev['content_excerpt'][:150]}...\n"

        json_data = {
            "repository": dict(repo),
            "stats": stats,
            "ai_metadata": {
                "model": ai_resp.get("model"),
                "tokens": ai_resp.get("tokens_eval"),
                "duration_ms": ai_resp.get("total_duration_ms"),
                "simulated": ai_resp.get("simulated")
            },
            "key_commits": commits[:5],
            "unfinished_highlights": unfinished[:5],
            "report_markdown": full_markdown
        }

        # Save to database
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO reports (repository_id, report_type, content_markdown, content_json)
                VALUES (?, 'resurrection_plan', ?, ?)
                """,
                (repo_id, full_markdown, json.dumps(json_data))
            )
            report_id = cursor.lastrowid

        return {
            "report_id": report_id,
            "repository_id": repo_id,
            "content_markdown": full_markdown,
            "content_json": json_data
        }

    @staticmethod
    def get_latest_report(repo_id: int) -> Optional[Dict[str, Any]]:
        """Retrieves the most recent report generated for a repository."""
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                SELECT id, repository_id, report_type, content_markdown, content_json, created_at
                FROM reports
                WHERE repository_id = ?
                ORDER BY created_at DESC LIMIT 1
                """,
                (repo_id,)
            )
            row = cursor.fetchone()
            if not row:
                return None
            
            result = dict(row)
            try:
                result["content_json"] = json.loads(result["content_json"])
            except Exception:
                pass
            return result
