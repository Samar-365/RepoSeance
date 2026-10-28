from typing import List, Dict, Any

GHOST_SYSTEM_PROMPT = """You are the "Repository Ghost" of this software project — an ethereal, atmospheric, yet rigorously disciplined software archaeologist.
You speak from beyond the git history to explain the past, present condition, and unfinished ambitions of this codebase.

Your core traits:
1. Tone: Atmospheric, gothic, and solemn ("I recall when this commit was forged...", "The unfinished markers linger in the shadows..."), but always clear, professional, and directly useful to modern developers.
2. Grounded Evidence: You MUST base every factual statement strictly on the retrieved Evidence provided below.
3. Strict Citations: Whenever you reference a code change, bug, commit, or issue, cite its source tag in brackets, e.g. [Commit <hash_or_id>], [File <path>:<line>], or [Issue #<number>].
4. Absolute Honesty & Anti-Hallucination: If the retrieved evidence does not contain sufficient information to answer the user's question, you MUST clearly confess uncertainty: "The surviving records in the repository do not provide enough evidence to determine..." Do NOT invent commit messages, authors, or developer motivations.
5. Action-Oriented: Help the living developer understand how to resurrect, maintain, or navigate this codebase.
"""

def build_chat_prompt(repo_name: str, question: str, evidence_items: List[Dict[str, Any]],
                      recent_commits: List[Dict[str, Any]]) -> str:
    """Constructs the prompt for Séance Q&A with grounded evidence."""
    evidence_text = ""
    if evidence_items:
        for idx, ev in enumerate(evidence_items, start=1):
            source_tag = f"[{ev.get('source_type', '').upper()} {ev.get('source_identifier', '')}]"
            evidence_text += f"\n--- Evidence #{idx}: {source_tag} at {ev.get('source_location', 'N/A')} ---\n"
            evidence_text += f"{ev.get('content_excerpt', '').strip()}\n"
    else:
        evidence_text = "No direct matching evidence records were found in the index for this inquiry."

    recent_commits_text = ""
    if recent_commits:
        for c in recent_commits[:5]:
            recent_commits_text += f"- [{c['commit_hash'][:8]}] {c['committed_at'][:10]}: {c['message']} (by {c['author_name']})\n"

    prompt = f"""Repository Under Investigation: {repo_name}

Recent Recorded Commits:
{recent_commits_text or "No recent commits available."}

Retrieved Repository Evidence:
{evidence_text}

Inquirer's Question:
"{question}"

As the Repository Ghost, summon your memory and answer the user's question. Ground your answer in the retrieved evidence above and cite the appropriate evidence tags. If the records are silent or inconclusive, state so plainly.
"""
    return prompt

def build_report_prompt(repo_name: str, stats: Dict[str, Any], recent_commits: List[Dict[str, Any]],
                        unfinished_items: List[Dict[str, Any]], evidence_items: List[Dict[str, Any]]) -> str:
    """Constructs the prompt for generating the comprehensive Resurrection Plan and Archaeology Report."""
    unfinished_summary = ""
    for u in unfinished_items[:12]:
        loc = f"{u.get('file_path')}:{u.get('line_number')}" if u.get('file_path') else "N/A"
        unfinished_summary += f"- [{u.get('severity', 'med').upper()}] ({u.get('category')}) {u.get('title')} at {loc}\n"

    commits_summary = ""
    for c in recent_commits[:8]:
        commits_summary += f"- [{c['commit_hash'][:8]}] ({c['committed_at'][:10]}): {c['message']}\n"

    prompt = f"""Repository Under Investigation: {repo_name}
Repository Statistics:
- Total Commits: {stats.get('total_commits', 0)}
- Unfinished Markers / Issues: {stats.get('unfinished_items', 0)}
- Last Recorded Breath: {stats.get('last_commit', {}).get('committed_at', 'Unknown')}

Key Commit Milestones:
{commits_summary or "None available."}

Prominent Unfinished Business / Dangling Markers:
{unfinished_summary or "No markers found."}

Task:
Generate a structured, evidence-backed **Resurrection Plan and Archaeology Report** in Markdown format.
Include these specific sections:
1. **Executive Summary & Original Intent**: What was this repository created to achieve, and what is its current state?
2. **Key Historical Milestones**: Major architectural inflection points visible in the commit record.
3. **Unfinished Business & Lingering Specters**: Analysis of TODOs, FIXMEs, unmerged branches, or open issues.
4. **Resurrection Checklist**: A prioritized, step-by-step checklist for a modern developer to revive, test, and contribute to this project.
5. **Limitations of Available Records**: What questions remain unanswered due to missing evidence or undocumented decisions.
"""
    return prompt
