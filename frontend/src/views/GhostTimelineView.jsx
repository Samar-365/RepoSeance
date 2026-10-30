import React, { useState, useEffect } from "react";
import { GitCommit, Search, Sparkles, Calendar, User, FileText, Loader2, Copy, Check } from "lucide-react";
import { getTimeline } from "../api/client";
import MinimalGhostBackground from "../components/MinimalGhostBackground";
import { TimelineGhostIllustration, TimelineBannerIllustration } from "../components/ThemeIllustrations";

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
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <TimelineGhostIllustration size={52} />
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                Timeline
              </h1>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Chronological commit graph ({commits.length} commits)
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", minWidth: 220 }}>
              <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: 10, top: 10 }} />
              <input
                type="text"
                className="input-field font-mono"
                placeholder="Filter commit or author..."
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

        {/* Minimalist Theme Illustration Banner */}
        <div style={{ marginBottom: 20 }}>
          <TimelineBannerIllustration />
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
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {commits.map((commit, idx) => (
              <div
                key={commit.hash || idx}
                className="card"
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  borderLeft: commit.is_significant ? "3px solid var(--accent-primary)" : "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: commit.is_significant ? "var(--accent-primary-dim)" : "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <GitCommit size={14} color={commit.is_significant ? "var(--accent-primary)" : "var(--text-muted)"} />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontWeight: 600,
                      color: "#fff",
                      fontSize: "0.88rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {commit.message}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                      <span style={{ color: "var(--text-secondary)" }}>{commit.author}</span>
                      <span>&bull;</span>
                      <span>{commit.committed_at?.slice(0, 10)}</span>
                      {commit.insertions !== undefined && (
                        <>
                          <span>&bull;</span>
                          <span style={{ color: "var(--accent-success)" }}>+{commit.insertions}</span>
                          <span style={{ color: "var(--accent-danger)" }}>-{commit.deletions}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => handleCopyHash(commit.hash)}
                    className="btn btn-ghost font-mono"
                    style={{ padding: "3px 7px", fontSize: "0.72rem" }}
                    title="Copy full SHA"
                  >
                    {copiedHash === commit.hash ? (
                      <Check size={11} color="var(--accent-success)" />
                    ) : (
                      <span>{commit.hash?.slice(0, 7)}</span>
                    )}
                  </button>

                  <button
                    onClick={() => onInspectEvidence({
                      source_type: "commit",
                      source_identifier: commit.hash,
                      source_location: commit.message,
                      content_excerpt: `Commit: ${commit.hash}\nAuthor: ${commit.author} <${commit.author_email}>\nDate: ${commit.committed_at}\n\n${commit.message}\n\nDiff Summary:\nFiles changed: ${commit.files_changed || 1}\nInsertions: +${commit.insertions || 0}\nDeletions: -${commit.deletions || 0}`
                    })}
                    className="btn btn-ghost"
                    style={{ padding: "3px 8px", fontSize: "0.72rem" }}
                  >
                    Inspect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
