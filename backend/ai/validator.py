import re
from typing import List, Dict, Any, Tuple

# Citation patterns like [Commit abc1234], [File backend/app.py:12], [Issue #4], [PR #12]
CITATION_REGEX = re.compile(
    r'\[(Commit|File|Issue|PR|Evidence)\s*([^\]]+)\]',
    re.IGNORECASE
)

class ResponseValidator:
    @staticmethod
    def extract_and_match_citations(response_text: str,
                                    available_evidence: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
        """Extracts cited tags in the AI response and correlates them with available evidence."""
        matches = CITATION_REGEX.findall(response_text)
        citations = []
        matched_evidence_ids = set()

        for c_type, c_id in matches:
            clean_type = c_type.lower()
            clean_id = c_id.strip()

            matched_evidence = None
            for ev in available_evidence:
                ev_id = str(ev.get("source_identifier", "")).lower()
                if clean_id.lower() in ev_id or ev_id in clean_id.lower():
                    matched_evidence = ev
                    matched_evidence_ids.add(ev["id"])
                    break

            citations.append({
                "type": clean_type,
                "identifier": clean_id,
                "raw_tag": f"[{c_type} {c_id}]",
                "matched_evidence_id": matched_evidence["id"] if matched_evidence else None,
                "matched_evidence": matched_evidence
            })

        metadata = {
            "citation_count": len(citations),
            "grounded_in_evidence": len(matched_evidence_ids) > 0,
            "unique_evidence_referenced": list(matched_evidence_ids)
        }

        return citations, metadata
