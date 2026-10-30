import React, { useState, useEffect } from "react";
import { GitCommit, Search, Sparkles, Calendar, User, FileDiff, Loader2, Copy, Check, ArrowUpRight } from "lucide-react";
import { getTimeline } from "../api/client";

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
    <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 24px" }}>
      {/* Header & Controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 28,
        paddingBottom: 16,
        borderBottom: "1px solid var(--border-subtle)",
        flexWrap: "wrap"
      }}>
        <div>
          <h1 className="font-gothic" style={{ fontSize: "1.9rem", color: "#ffffff", display: "flex", alignItems: "center", gap: 10 }}>
            <GitCommit size={24} color="var(--spectral-teal)" />
            Ghost Stratigraphy
          </h1>
          <span style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Excavated commit timeline tracking structural evolution, high churn, and architectural milestones
          </span>
        </div>

        {/* Filter Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", minWidth: 240 }}>
            <Search size={15} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: 12 }} />
            <input
              type="text"
              className="input-field font-mono"
              placeholder="Search commit or author..."
              style={{ paddingLeft: 34, fontSize: "0.82rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadTimeline()}
            />
          </div>

          <button
            onClick={() => setOnlySignificant(!onlySignificant)}
            className={`btn ${onlySignificant ? "btn-primary" : "btn-ghost"}`}
            style={{ padding: "8px 14px", fontSize: "0.82rem" }}
          >
            <Sparkles size={14} />
            {onlySignificant ? "Milestones Only" : "All Strata"}
          </button>
        </div>
      </div>

      {/* Stratigraphic Timeline Stream */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--spectral-teal)" }}>
          <Loader2 size={32} className="ghost-float" style={{ margin: "0 auto 12px" }} />
          <div>Excavating commit artifacts from git history...</div>
        </div>
      ) : commits.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: "center", padding: 48, color: "var(--text-muted)" }}>
          No commits matched the specified filter criteria.
        </div>
      ) : (
        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* Stratigraphic Vertical Guide Line */}
          <div style={{
            position: "absolute",
            left: 10,
            top: 14,
            bottom: 20,
            width: 2,
            background: "linear-gradient(180deg, var(--spectral-teal) 0%, rgba(168, 85, 247, 0.4) 50%, var(--border-dim) 100%)",
            opacity: 0.4
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {commits.map((c) => {
              const dateStr = c.committed_at ? c.committed_at.slice(0, 10) : "";
              const shortHash = c.commit_hash ? c.commit_hash.slice(0, 8) : "";

              return (
                <div key={c.id} style={{ position: "relative" }}>
                  {/* Stratum Node Icon */}
                  <div style={{
                    position: "absolute",
                    left: -24,
                    top: 16,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: c.is_significant ? "var(--spectral-teal)" : "var(--bg-chamber)",
                    border: `2px solid ${c.is_significant ? "var(--spectral-teal)" : "var(--border-medium)"}`,
                    boxShadow: c.is_significant ? "0 0 10px var(--spectral-teal)" : "none"
                  }} />

                  {/* Commit Record Card */}
                  <div className="glass-panel" style={{
                    padding: 18,
                    borderLeft: c.is_significant ? "3px solid var(--spectral-teal)" : "1px solid var(--border-subtle)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {/* SHA Copy Badge */}
                        <button
                          onClick={() => handleCopyHash(c.commit_hash)}
                          className="badge badge-teal"
                          style={{ cursor: "pointer", border: "1px solid rgba(0, 245, 196, 0.3)" }}
                          title="Click to copy full commit hash"
                        >
                          {copiedHash === c.commit_hash ? <Check size={11} /> : <Copy size={11} />}
                          <span>{shortHash}</span>
                        </button>

                        {c.is_significant && (
                          <span className="badge badge-amethyst">
                            <Sparkles size={11} />
                            Milestone
                          </span>
                        )}

                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                          <Calendar size={12} />
                          {dateStr}
                        </span>
                      </div>

                      {/* Diff Churn Stats */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>
                        {c.files_changed_count > 0 && (
                          <span style={{ color: "var(--text-muted)" }}>{c.files_changed_count} files</span>
                        )}
                        {c.insertions > 0 && (
                          <span style={{ color: "var(--spectral-teal)" }}>+{c.insertions}</span>
                        )}
                        {c.deletions > 0 && (
                          <span style={{ color: "var(--blood-crimson)" }}>-{c.deletions}</span>
                        )}
                      </div>
                    </div>

                    {/* Commit Message */}
                    <h3 style={{
                      fontSize: "0.98rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: c.significance_reason ? 8 : 12,
                      lineHeight: 1.45
                    }}>
                      {c.message}
                    </h3>

                    {/* Significance Reason if milestone */}
                    {c.significance_reason && (
                      <div style={{
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                        background: "rgba(168, 85, 247, 0.08)",
                        border: "1px solid rgba(168, 85, 247, 0.2)",
                        padding: "6px 12px",
                        borderRadius: 6,
                        marginBottom: 12
                      }}>
                        <strong>Architectural Insight:</strong> {c.significance_reason}
                      </div>
                    )}

                    {/* Footer / Relic Inspection Action */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: 10,
                      borderTop: "1px solid var(--border-subtle)",
                      fontSize: "0.78rem"
                    }}>
                      <span style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                        <User size={12} />
                        {c.author_name}
                      </span>

                      <button
                        onClick={() => onInspectEvidence({
                          source_type: "commit",
                          source_identifier: c.commit_hash,
                          source_location: `Commit ${shortHash}`,
                          content_excerpt: `Commit ${c.commit_hash} by ${c.author_name} (${dateStr}):\n${c.message}\n\nFiles changed: ${c.files_changed_count} (+${c.insertions} / -${c.deletions})`
                        })}
                        className="btn btn-ghost"
                        style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                      >
                        <FileDiff size={13} color="var(--spectral-teal)" />
                        Inspect Commit Artifact
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
