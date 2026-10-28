import React, { useState, useEffect } from "react";
import { GitCommit, Search, Sparkles, Filter, Calendar, User, FileDiff, Loader2 } from "lucide-react";
import { getTimeline } from "../api/client";

export default function GhostTimelineView({ repository, onInspectEvidence }) {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlySignificant, setOnlySignificant] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadTimeline = async () => {
    setLoading(true);
    try {
      const data = await getTimeline(repository.id, {
        onlySignificant,
        search: searchTerm,
        limit: 150
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

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") loadTimeline();
  };

  return (
    <div style={{ maxWidth: 1100, margin: "24px auto", padding: "0 20px" }}>
      {/* Header & Controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 28,
        flexWrap: "wrap"
      }}>
        <div>
          <h2 className="font-gothic" style={{ fontSize: "1.8rem", color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
            <GitCommit size={26} color="var(--spectral-teal)" />
            Ghost Timeline
          </h2>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Chronological history of recorded commits & major architectural milestones
          </span>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", minWidth: 240 }}>
            <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: 12 }} />
            <input
              type="text"
              className="input-field font-mono"
              placeholder="Search commit or author..."
              style={{ paddingLeft: 36, fontSize: "0.85rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <button
            onClick={() => setOnlySignificant(!onlySignificant)}
            className={`btn ${onlySignificant ? "btn-primary" : "btn-ghost"}`}
            style={{ padding: "8px 14px", fontSize: "0.82rem" }}
          >
            <Sparkles size={15} />
            {onlySignificant ? "Milestones Only" : "All Commits"}
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
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
        <div style={{ position: "relative", paddingLeft: 30 }}>
          {/* Vertical Timeline Guide Wire */}
          <div style={{
            position: "absolute",
            left: 11,
            top: 15,
            bottom: 20,
            width: 2,
            background: "linear-gradient(180deg, var(--spectral-teal) 0%, rgba(168, 85, 247, 0.4) 100%)"
          }} />

          {commits.map((c) => (
            <div
              key={c.commit_hash}
              className="glass-panel glass-panel-interactive"
              onClick={() => onInspectEvidence({
                source_type: "commit",
                source_identifier: c.commit_hash,
                source_location: `Commit ${c.commit_hash.slice(0, 8)}`,
                content_excerpt: `Commit ${c.commit_hash} by ${c.author_name} on ${c.committed_at}\n\nMessage:\n${c.message}\n\nFiles Changed: ${c.files_changed_count} (+${c.insertions}/-${c.deletions})\n${c.significance_reason ? 'Significance: ' + c.significance_reason : ''}`
              })}
              style={{
                padding: 18,
                marginBottom: 16,
                position: "relative",
                cursor: "pointer",
                borderColor: c.is_significant ? "rgba(0, 245, 196, 0.35)" : "var(--border-dim)"
              }}
            >
              {/* Timeline Marker Dot */}
              <div style={{
                position: "absolute",
                left: -26,
                top: 22,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: c.is_significant ? "var(--spectral-teal)" : "var(--bg-crypt)",
                border: `2px solid ${c.is_significant ? "var(--spectral-teal)" : "var(--border-bright)"}`,
                boxShadow: c.is_significant ? "0 0 10px var(--spectral-teal)" : "none"
              }} />

              {/* Commit Content */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                <h4 style={{ fontSize: "1rem", color: "#fff", fontWeight: 600 }}>
                  {c.message}
                </h4>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--spectral-teal)" }}>
                  {c.commit_hash.slice(0, 8)}
                </span>
              </div>

              {/* Significance Reason Tag */}
              {c.significance_reason && (
                <div style={{ marginBottom: 10 }}>
                  <span className="badge badge-amber" style={{ fontSize: "0.72rem" }}>
                    ⭐ {c.significance_reason}
                  </span>
                </div>
              )}

              {/* Commit Meta Footer */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: "0.78rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <User size={13} /> {c.author_name}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Calendar size={13} /> {c.committed_at.slice(0, 10)}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <FileDiff size={13} /> {c.files_changed_count} files
                </span>
                <span className="font-mono" style={{ color: "var(--spectral-teal)" }}>
                  +{c.insertions} / <span style={{ color: "var(--blood-crimson)" }}>-{c.deletions}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
