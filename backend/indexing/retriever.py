import re
import sqlite3
from typing import List, Dict, Any
from backend.database.connection import get_db

class EvidenceRetriever:
    @staticmethod
    def add_evidence(conn: sqlite3.Connection, repository_id: int, source_type: str,
                     source_identifier: str, source_location: str, content_excerpt: str) -> int:
        """Inserts an evidence record into both relational and FTS5 search index."""
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO evidence (repository_id, source_type, source_identifier, source_location, content_excerpt)
            VALUES (?, ?, ?, ?, ?)
            """,
            (repository_id, source_type, source_identifier, source_location, content_excerpt)
        )
        evidence_id = cursor.lastrowid

        # Insert into FTS5 index
        cursor.execute(
            """
            INSERT INTO evidence_fts (evidence_id, repository_id, source_type, source_identifier, content_excerpt)
            VALUES (?, ?, ?, ?, ?)
            """,
            (evidence_id, repository_id, source_type, source_identifier, content_excerpt)
        )
        return evidence_id

    @staticmethod
    def search_evidence(repository_id: int, query: str, limit: int = 6) -> List[Dict[str, Any]]:
        """Searches evidence using FTS5 with fallback to LIKE search on query syntax errors."""
        cleaned_query = re.sub(r'[^\w\s]', ' ', query).strip()
        if not cleaned_query:
            # If empty query, return latest significant evidence
            with get_db() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    """
                    SELECT id, source_type, source_identifier, source_location, content_excerpt
                    FROM evidence
                    WHERE repository_id = ?
                    ORDER BY id DESC LIMIT ?
                    """,
                    (repository_id, limit)
                )
                return [dict(row) for row in cursor.fetchall()]

        # Prepare FTS query terms with prefix matching
        terms = [t for t in cleaned_query.split() if len(t) > 2]
        fts_match_query = " OR ".join([f"{t}*" for t in terms]) if terms else cleaned_query

        results = []
        with get_db() as conn:
            cursor = conn.cursor()
            try:
                # FTS5 search with BM25 rank scoring
                cursor.execute(
                    """
                    SELECT e.id, e.source_type, e.source_identifier, e.source_location, e.content_excerpt,
                           rank as score
                    FROM evidence_fts
                    JOIN evidence e ON evidence_fts.evidence_id = e.id
                    WHERE evidence_fts.repository_id = ? AND evidence_fts MATCH ?
                    ORDER BY rank LIMIT ?
                    """,
                    (repository_id, fts_match_query, limit)
                )
                rows = cursor.fetchall()
                results = [dict(r) for r in rows]
            except Exception as e:
                # Fallback to standard LIKE matching if FTS syntax error
                like_term = f"%{cleaned_query[:50]}%"
                cursor.execute(
                    """
                    SELECT id, source_type, source_identifier, source_location, content_excerpt, 0 as score
                    FROM evidence
                    WHERE repository_id = ? AND (content_excerpt LIKE ? OR source_identifier LIKE ?)
                    ORDER BY id DESC LIMIT ?
                    """,
                    (repository_id, like_term, like_term, limit)
                )
                results = [dict(r) for r in cursor.fetchall()]

        return results
