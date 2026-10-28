import os
import re
from pathlib import Path
from typing import List, Dict, Any
from backend.config import ALLOWED_EXTENSIONS, IGNORED_DIRS, MAX_FILE_SIZE_BYTES

# Marker pattern: e.g. // TODO: fix this, # FIXME(author): broken, /* HACK: temp */
MARKER_REGEX = re.compile(
    r'(?://|#|/\*|<!--|;|\*)\s*(TODO|FIXME|HACK|BUG|XXX|OPTIMIZE)(?:\s*\([^)]+\))?[:\s]+(.*)',
    re.IGNORECASE
)

# Documentation incomplete work indicators
DOC_INDICATORS = [
    re.compile(r'[-*]\s*\[\s*\]\s*(.*)', re.IGNORECASE), # Unchecked markdown checkbox - [ ]
    re.compile(r'(?:upcoming|planned|roadmap|in progress|not yet implemented)[:\s]+(.*)', re.IGNORECASE),
]

class CodeScanner:
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path).resolve()

    def scan_unfinished_business(self) -> List[Dict[str, Any]]:
        """Scans source files and documentation for TODOs, FIXMEs, and incomplete roadmap items."""
        findings = []

        for root, dirs, files in os.walk(self.repo_path):
            # Prune ignored directories in-place
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS and not d.startswith('.')]

            for file_name in files:
                file_path = Path(root) / file_name
                rel_path = file_path.relative_to(self.repo_path).as_posix()
                ext = file_path.suffix.lower()

                # Filter extensions & file size
                if ext not in ALLOWED_EXTENSIONS:
                    continue
                try:
                    if file_path.stat().st_size > MAX_FILE_SIZE_BYTES:
                        continue
                except OSError:
                    continue

                # Read and scan file
                try:
                    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
                        lines = f.readlines()
                except Exception:
                    continue

                is_doc_file = ext in {".md", ".rst", ".txt"} or "doc" in rel_path.lower()
                findings.extend(self._scan_lines(rel_path, lines, is_doc_file))

        return findings

    def _scan_lines(self, rel_path: str, lines: List[str], is_doc_file: bool) -> List[Dict[str, Any]]:
        items = []

        for line_no, raw_line in enumerate(lines, start=1):
            line = raw_line.strip()
            if not line:
                continue

            # Check code markers
            match = MARKER_REGEX.search(line)
            if match:
                marker_type = match.group(1).upper()
                content = match.group(2).strip()

                # Determine category and severity
                category = "todo"
                severity = "medium"
                if marker_type in ("FIXME", "BUG", "XXX"):
                    category = "fixme"
                    severity = "high"
                elif marker_type == "HACK":
                    category = "todo"
                    severity = "medium"
                elif marker_type == "OPTIMIZE":
                    category = "todo"
                    severity = "low"

                items.append({
                    "category": category,
                    "title": f"[{marker_type}] {content[:100]}",
                    "file_path": rel_path,
                    "line_number": line_no,
                    "snippet": line[:300],
                    "severity": severity
                })
                continue

            # Check documentation unfinished indicators
            if is_doc_file:
                for doc_re in DOC_INDICATORS:
                    doc_match = doc_re.search(line)
                    if doc_match:
                        content = doc_match.group(1).strip()
                        if content and len(content) > 3:
                            items.append({
                                "category": "dangling_doc",
                                "title": f"[Planned Doc Item] {content[:100]}",
                                "file_path": rel_path,
                                "line_number": line_no,
                                "snippet": line[:300],
                                "severity": "medium"
                            })
                            break

        return items
