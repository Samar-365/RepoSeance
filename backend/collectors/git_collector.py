import os
import git
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional

SIGNIFICANT_KEYWORDS = {
    "initial": "Initial repository setup or foundation commit",
    "release": "Version release or milestone tag",
    "breaking": "Breaking architectural or API change",
    "refactor": "Major codebase refactoring",
    "deprecated": "Deprecation or removal of legacy components",
    "wip": "Unfinished work-in-progress commit",
    "abandon": "Explicit abandonment or deferral of feature",
    "re-architect": "Architectural restructuring",
    "rewrite": "Subsystem rewrite"
}

class GitCollector:
    def __init__(self, repo_path: str):
        self.repo_path = os.path.abspath(repo_path)
        if not os.path.isdir(self.repo_path):
            raise ValueError(f"Path does not exist: {self.repo_path}")
        try:
            self.repo = git.Repo(self.repo_path)
        except git.InvalidGitRepositoryError:
            raise ValueError(f"Not a valid git repository: {self.repo_path}")

    def get_repo_metadata(self) -> Dict[str, Any]:
        """Extracts high-level repository metadata."""
        default_branch = "main"
        try:
            if self.repo.active_branch:
                default_branch = self.repo.active_branch.name
        except Exception:
            # Detached head or unnamed branch
            for b in ["main", "master"]:
                if b in self.repo.heads:
                    default_branch = b
                    break

        branches = [b.name for b in self.repo.branches]
        tags = [t.name for t in self.repo.tags]

        # Total commit count
        total_commits = 0
        try:
            total_commits = sum(1 for _ in self.repo.iter_commits())
        except Exception:
            pass

        return {
            "name": os.path.basename(self.repo_path),
            "default_branch": default_branch,
            "branches": branches,
            "tags": tags,
            "total_commits": total_commits
        }

    def extract_commits(self, max_commits: int = 500) -> List[Dict[str, Any]]:
        """Extracts commit history with significance heuristics and diff metrics."""
        commits = []
        try:
            raw_commits = list(self.repo.iter_commits(max_count=max_commits))
        except Exception as e:
            return []

        for idx, commit in enumerate(raw_commits):
            # Commit timestamp
            committed_at = datetime.fromtimestamp(commit.committed_date, tz=timezone.utc).isoformat()
            message = commit.message.strip()

            # Diff stats
            files_changed = 0
            insertions = 0
            deletions = 0
            try:
                stats = commit.stats.total
                files_changed = stats.get("files", 0)
                insertions = stats.get("insertions", 0)
                deletions = stats.get("deletions", 0)
            except Exception:
                pass

            # Significance heuristics
            is_significant = False
            reasons = []

            # First commit in history
            if idx == len(raw_commits) - 1:
                is_significant = True
                reasons.append("Initial repository commit")

            # Merge commit
            if len(commit.parents) > 1:
                is_significant = True
                reasons.append(f"Branch merge commit ({len(commit.parents)} parents)")

            # High churn
            if (insertions + deletions) > 300 or files_changed > 15:
                is_significant = True
                reasons.append(f"High code churn ({insertions}+/{deletions}- across {files_changed} files)")

            # Keyword matches in commit message
            msg_lower = message.lower()
            for kw, desc in SIGNIFICANT_KEYWORDS.items():
                if kw in msg_lower:
                    is_significant = True
                    reasons.append(desc)
                    break

            commits.append({
                "commit_hash": commit.hexsha,
                "author_name": commit.author.name if commit.author else "Unknown",
                "author_email": commit.author.email if commit.author else "unknown@domain.com",
                "committed_at": committed_at,
                "message": message,
                "files_changed_count": files_changed,
                "insertions": insertions,
                "deletions": deletions,
                "is_significant": is_significant,
                "significance_reason": " | ".join(reasons) if reasons else None
            })

        return commits

    def extract_commit_diff_summary(self, commit_hash: str, max_chars: int = 2000) -> str:
        """Extracts a truncated diff excerpt for a given commit to serve as evidence."""
        try:
            commit = self.repo.commit(commit_hash)
            if not commit.parents:
                diff_text = self.repo.git.show(commit_hash, stat=True)
            else:
                diff_text = self.repo.git.diff(commit.parents[0].hexsha, commit.hexsha, stat=True)
            return diff_text[:max_chars]
        except Exception as e:
            return f"Diff unavailable: {str(e)}"

    def detect_abandoned_branches(self) -> List[Dict[str, Any]]:
        """Identifies branches that have not been merged into the default branch."""
        abandoned = []
        try:
            default_branch = self.get_repo_metadata()["default_branch"]
            if default_branch not in self.repo.heads:
                return abandoned
            
            default_head = self.repo.heads[default_branch]

            for branch in self.repo.heads:
                if branch.name == default_branch:
                    continue
                
                # Check if branch tip is an ancestor of default branch
                is_merged = self.repo.is_ancestor(branch.commit, default_head.commit)
                if not is_merged:
                    branch_commit_date = datetime.fromtimestamp(
                        branch.commit.committed_date, tz=timezone.utc
                    ).isoformat()
                    abandoned.append({
                        "branch_name": branch.name,
                        "latest_commit_hash": branch.commit.hexsha,
                        "latest_commit_message": branch.commit.message.strip(),
                        "latest_commit_date": branch_commit_date
                    })
        except Exception:
            pass

        return abandoned
