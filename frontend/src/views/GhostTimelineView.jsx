import React, { useState, useEffect } from "react";
import { GitCommit, Search, Sparkles, Calendar, User, FileText, Loader2, Copy, Check } from "lucide-react";
import { getTimeline } from "../api/client";
import MinimalGhostBackground from "../components/MinimalGhostBackground";

export default function GhostTimelineView({ repository, onInspectEvidence }) {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlySignificant, setOnlySignificant] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedHash, setCopiedHash] = useState(null);

  const loadTimeline = async () => {
    setLoading(true);
    try {
      const data = await getTimeline(repository.id, {
        onlySignificant,
        search: searchTerm,
        limit: 200
      });
      setCommits(data.timeline || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimeline();
  }, [repository.id, onlySignificant]);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 64px)", padding: "28px 24px" }}>
      <MinimalGhostBackground />

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header & Search */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: "1px solid var(--border-subtle)",
          flexWrap: "wrap"
        }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
              <GitCommit size={20} color="var(--accent-primary)" />
              Timeline
            </h1>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Chronological commit history ({commits.length} commits)
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", minWidth: 220 }}>
              <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: 10, top: 10 }} />
              <input
                type="text"
                className="input-field font-mono"
                placeholder="Filter commits or authors..."
                style={{ paddingLeft: 30, fontSize: "0.8rem" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadTimeline()}
              />
            </div>

            <button
              onClick={() => setOnlySignificant(!onlySignificant)}
              className={`btn ${onlySignificant ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "6px 12px", fontSize: "0.8rem" }}
            >
              <Sparkles size={13} />
              {onlySignificant ? "Milestones" : "All Commits"}
            </button>
          </div>
        </div>

        {/* Commit Stream */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--accent-primary)", fontSize: "0.86rem" }}>
            <Loader2 size={24} className="pulse-dot" style={{ margin: "0 auto 8px" }} />
            <div>Loading commit history...</div>
          </div>
        ) : commits.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: 36, color: "var(--text-muted)", fontSize: "0.86rem" }}>
            No commits match your filter criteria.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {commits.map((c) => {
              const dateStr = c.committed_at ? c.committed_at.slice(0, 10) : "";
              const shortHash = c.commit_hash ? c.commit_hash.slice(0, 8) : "";

              return (
                <div key={c.id} className="card" style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button
                        onClick={() => handleCopyHash(c.commit_hash)}
                        className="badge badge-blue"
                        style={{ cursor: "pointer" }}
                        title="Copy commit hash"
                      >
                        {copiedHash === c.commit_hash ? <Check size={10} /> : <Copy size={10} />}
                        <span>{shortHash}</span>
                      </button>

                      {c.is_significant && (
                        <span className="badge badge-purple">
                          <Sparkles size={10} /> Milestone
                        </span>
                      )}

                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Calendar size={11} /> {dateStr}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.76rem", fontFamily: "var(--font-mono)" }}>
                      {c.files_changed_count > 0 && (
                        <span style={{ color: "var(--text-muted)" }}>{c.files_changed_count} files</span>
                      )}
                      {c.insertions > 0 && (
                        <span style={{ color: "var(--accent-success)" }}>+{c.insertions}</span>
                      )}
                      {c.deletions > 0 && (
                        <span style={{ color: "var(--accent-danger)" }}>-{c.deletions}</span>
                      )}
                    </div>
                  </div>

                  <div style={{ fontSize: "0.92rem", fontWeight: 500, color: "#fff", marginBottom: 8 }}>
                    {c.message}
                  </div>

                  {c.significance_reason && (
                    <div style={{
                      fontSize: "0.76rem",
                      color: "var(--text-secondary)",
                      background: "rgba(129, 140, 248, 0.08)",
                      border: "1px solid rgba(129, 140, 248, 0.2)",
                      padding: "4px 8px",
                      borderRadius: 4,
                      marginBottom: 8
                    }}>
                      {c.significance_reason}
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <User size={11} /> {c.author_name}
                    </span>

                    <button
                      onClick={() => onInspectEvidence({
                        source_type: "commit",
                        source_identifier: c.commit_hash,
                        source_location: `Commit ${shortHash}`,
                        content_excerpt: `Commit ${c.commit_hash} by ${c.author_name} (${dateStr}):\n${c.message}\n\nFiles changed: ${c.files_changed_count} (+${c.insertions} / -${c.deletions})`
                      })}
                      className="btn btn-ghost"
                      style={{ padding: "3px 8px", fontSize: "0.72rem" }}
                    >
                      <FileText size={11} color="var(--accent-primary)" />
                      Inspect Diff
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
