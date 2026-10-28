import os
import shutil
import git
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any, Optional

from backend.config import CLONES_DIR
from backend.database.connection import get_db
from backend.collectors.git_collector import GitCollector
from backend.collectors.code_scanner import CodeScanner
from backend.collectors.github_collector import GitHubCollector
from backend.indexing.retriever import EvidenceRetriever

class AnalysisService:
    @staticmethod
    def start_analysis(path_or_url: str) -> Dict[str, Any]:
        """Initiates repository ingestion and analysis synchronously or via background task."""
        path_or_url = path_or_url.strip()
        is_remote = path_or_url.startswith("http://") or path_or_url.startswith("https://") or path_or_url.startswith("git@")

        repo_name = os.path.basename(path_or_url.rstrip("/").replace(".git", ""))
        source_type = "remote" if is_remote else "local"

        # Check or create repo record in DB
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, status FROM repositories WHERE path_or_url = ?",
                (path_or_url,)
            )
            existing = cursor.fetchone()
            if existing:
                repo_id = existing["id"]
                cursor.execute(
                    "UPDATE repositories SET status = 'analyzing', error_message = NULL WHERE id = ?",
                    (repo_id,)
                )
            else:
                cursor.execute(
                    """
                    INSERT INTO repositories (name, source_type, path_or_url, status)
                    VALUES (?, ?, ?, 'analyzing')
                    """,
                    (repo_name, source_type, path_or_url)
                )
                repo_id = cursor.lastrowid

        # Execute analysis
        try:
            AnalysisService._run_pipeline(repo_id, path_or_url, is_remote, repo_name)
            return {"status": "success", "repository_id": repo_id, "message": "Repository analysis completed"}
        except Exception as e:
            with get_db() as conn:
                conn.execute(
                    "UPDATE repositories SET status = 'failed', error_message = ? WHERE id = ?",
                    (str(e), repo_id)
                )
            raise e

    @staticmethod
    def _run_pipeline(repo_id: int, path_or_url: str, is_remote: bool, repo_name: str):
        local_work_dir = None

        if is_remote:
            local_work_dir = CLONES_DIR / repo_name
            # If clone already exists, pull or recreate
            if local_work_dir.exists():
                try:
                    repo_obj = git.Repo(local_work_dir)
                    repo_obj.remotes.origin.pull()
                except Exception:
                    shutil.rmtree(local_work_dir, ignore_errors=True)
                    git.Repo.clone_from(path_or_url, local_work_dir, depth=300)
            else:
                git.Repo.clone_from(path_or_url, local_work_dir, depth=300)
        else:
            local_work_dir = Path(path_or_url).resolve()
            if not local_work_dir.exists():
                raise FileNotFoundError(f"Local directory does not exist: {path_or_url}")

        # 1. Git Collector
        git_collector = GitCollector(str(local_work_dir))
        metadata = git_collector.get_repo_metadata()
        commits = git_collector.extract_commits(max_commits=500)
        abandoned_branches = git_collector.detect_abandoned_branches()

        # 2. Code Scanner
        code_scanner = CodeScanner(str(local_work_dir))
        unfinished_items = code_scanner.scan_unfinished_business()

        # 3. GitHub Collector (if applicable)
        gh_collector = GitHubCollector(path_or_url if is_remote else "")
        gh_data = {"issues": [], "prs": []}
        if gh_collector.is_github_repo():
            gh_data = gh_collector.fetch_issues_and_prs(limit=50)

        # 4. Save to Database
        with get_db() as conn:
            cursor = conn.cursor()

            # Update repository metadata
            cursor.execute(
                """
                UPDATE repositories
                SET name = ?, default_branch = ?, total_commits = ?, status = 'ready',
                    analyzed_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """,
                (metadata["name"], metadata["default_branch"], len(commits), repo_id)
            )

            # Insert commits & significant commit evidence
            for c in commits:
                cursor.execute(
                    """
                    INSERT OR REPLACE INTO commits
                    (repository_id, commit_hash, author_name, author_email, committed_at,
                     message, files_changed_count, insertions, deletions, is_significant, significance_reason)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (repo_id, c["commit_hash"], c["author_name"], c["author_email"], c["committed_at"],
                     c["message"], c["files_changed_count"], c["insertions"], c["deletions"],
                     c["is_significant"], c["significance_reason"])
                )

                if c["is_significant"]:
                    diff_excerpt = git_collector.extract_commit_diff_summary(c["commit_hash"], max_chars=1000)
                    evidence_text = f"Commit {c['commit_hash'][:8]} by {c['author_name']}: {c['message']}\n{diff_excerpt}"
                    EvidenceRetriever.add_evidence(
                        conn, repo_id, "commit", c["commit_hash"],
                        f"Commit {c['commit_hash'][:8]}", evidence_text
                    )

            # Insert abandoned branch findings
            for b in abandoned_branches:
                title = f"Unmerged branch: {b['branch_name']}"
                snippet = f"Latest commit {b['latest_commit_hash'][:8]} ({b['latest_commit_date']}): {b['latest_commit_message']}"
                cursor.execute(
                    """
                    INSERT INTO unfinished_items (repository_id, category, title, file_path, line_number, snippet, severity)
                    VALUES (?, 'abandoned_branch', ?, ?, 0, ?, 'medium')
                    """,
                    (repo_id, title, b["branch_name"], snippet)
                )

            # Insert code scanner items
            for u in unfinished_items:
                cursor.execute(
                    """
                    INSERT INTO unfinished_items (repository_id, category, title, file_path, line_number, snippet, severity)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (repo_id, u["category"], u["title"], u["file_path"], u["line_number"], u["snippet"], u["severity"])
                )

                # Add high severity items as evidence
                if u["severity"] == "high":
                    EvidenceRetriever.add_evidence(
                        conn, repo_id, "code", f"{u['file_path']}:{u['line_number']}",
                        f"{u['file_path']}#L{u['line_number']}", f"{u['title']}\nSnippet: {u['snippet']}"
                    )

            # Insert GitHub issues and PRs
            for item in gh_data["issues"] + gh_data["prs"]:
                cursor.execute(
                    """
                    INSERT OR REPLACE INTO issues_prs
                    (repository_id, type, number, title, body, state, author, created_at, closed_at, url)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (repo_id, item["type"], item["number"], item["title"], item["body"], item["state"],
                     item["author"], item["created_at"], item["closed_at"], item["url"])
                )

                # If open, flag in unfinished_items
                if item["state"] == "open":
                    cat = "open_issue" if item["type"] == "issue" else "open_pr"
                    cursor.execute(
                        """
                        INSERT INTO unfinished_items (repository_id, category, title, file_path, line_number, snippet, severity)
                        VALUES (?, ?, ?, ?, 0, ?, 'medium')
                        """,
                        (repo_id, cat, f"{item['type'].upper()} #{item['number']}: {item['title']}", item.get("url") or "", item["body"][:250])
                    )

                # Add issue/PR evidence
                EvidenceRetriever.add_evidence(
                    conn, repo_id, item["type"], f"#{item['number']}",
                    item.get("url") or f"{item['type'].upper()} #{item['number']}",
                    f"{item['type'].upper()} #{item['number']} [{item['state']}]: {item['title']}\n{item['body'][:400]}"
                )
