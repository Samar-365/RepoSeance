import re
import os
import requests
from typing import Dict, Any, List, Tuple, Optional

GITHUB_URL_PATTERN = re.compile(
    r'(?:https?://github\.com/|git@github\.com:)([\w\-\.]+)/([\w\-\.]+?)(?:\.git)?/?$'
)

class GitHubCollector:
    def __init__(self, repo_url: str):
        self.repo_url = repo_url.strip()
        self.owner, self.repo = self._parse_url()
        self.token = os.environ.get("GITHUB_TOKEN")

    def _parse_url(self) -> Tuple[Optional[str], Optional[str]]:
        match = GITHUB_URL_PATTERN.match(self.repo_url)
        if match:
            return match.group(1), match.group(2)
        return None, None

    def is_github_repo(self) -> bool:
        return bool(self.owner and self.repo)

    def fetch_issues_and_prs(self, limit: int = 50) -> Dict[str, List[Dict[str, Any]]]:
        """Fetches public issues and pull requests from GitHub REST API."""
        if not self.is_github_repo():
            return {"issues": [], "prs": []}

        headers = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "RepoSeance-Archaeology-Tool"
        }
        if self.token:
            headers["Authorization"] = f"token {self.token}"

        api_url = f"https://api.github.com/repos/{self.owner}/{self.repo}/issues"
        params = {
            "state": "all",
            "per_page": min(limit, 100),
            "sort": "updated",
            "direction": "desc"
        }

        issues = []
        prs = []

        try:
            resp = requests.get(api_url, headers=headers, params=params, timeout=10)
            if resp.status_code == 200:
                items = resp.json()
                for item in items:
                    is_pr = "pull_request" in item
                    item_type = "pr" if is_pr else "issue"
                    
                    # State normalization: merged vs closed
                    state = item.get("state", "open")
                    if is_pr and state == "closed":
                        # Check if merged if PR object has merged_at
                        if item.get("pull_request", {}).get("merged_at"):
                            state = "merged"

                    record = {
                        "type": item_type,
                        "number": item.get("number"),
                        "title": item.get("title", "Untitled"),
                        "body": (item.get("body") or "")[:2000],
                        "state": state,
                        "author": item.get("user", {}).get("login", "Unknown"),
                        "created_at": item.get("created_at"),
                        "closed_at": item.get("closed_at"),
                        "url": item.get("html_url")
                    }

                    if is_pr:
                        prs.append(record)
                    else:
                        issues.append(record)
            elif resp.status_code in (403, 429):
                # Rate limited - log gracefully without crashing
                print(f"[GitHubCollector] Rate limit hit while fetching issues for {self.owner}/{self.repo}")
        except Exception as e:
            print(f"[GitHubCollector] Error fetching GitHub metadata: {e}")

        return {"issues": issues, "prs": prs}
