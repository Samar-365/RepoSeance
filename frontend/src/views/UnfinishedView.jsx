import React, { useState, useEffect } from "react";
import { AlertOctagon, Bug, GitBranch, FileText, Loader2, AlertTriangle, Copy, Check, Filter } from "lucide-react";
import { getUnfinished } from "../api/client";

export default function UnfinishedView({ repository, onInspectEvidence }) {
  const [items, setItems] = useState([]);
  const [breakdown, setBreakdown] = useState({});
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(true);
  const [copiedPath, setCopiedPath] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await getUnfinished(repository.id, { category, severity });
      setItems(data.items || []);
      setBreakdown(data.breakdown || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [repository.id, category, severity]);

  const handleCopyPath = (path) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case "high":
        return <span className="badge badge-crimson">HIGH SEVERITY</span>;
      case "medium":
        return <span className="badge badge-amber">MEDIUM</span>;
      default:
        return <span className="badge badge-teal">LOW</span>;
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "fixme": return <Bug size={16} color="var(--blood-crimson)" />;
      case "abandoned_branch": return <GitBranch size={16} color="var(--ancient-amber)" />;
      case "dangling_doc": return <FileText size={16} color="var(--spectral-cyan)" />;
      default: return <AlertTriangle size={16} color="var(--spectral-teal)" />;
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "24px auto", padding: "0 24px" }}>
      {/* Title */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: "1px solid var(--border-subtle)",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div>
          <h1 className="font-gothic" style={{ fontSize: "1.9rem", color: "#ffffff", display: "flex", alignItems: "center", gap: 10 }}>
            <AlertOctagon size={24} color="var(--ancient-amber)" />
            The Unfinished Vault
          </h1>
          <span style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Archaeological triage of TODO markers, unresolved bugs, unmerged branches, and dangling documentation promises
          </span>
        </div>

        {/* Severity Filter Pills */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setSeverity("")}
            className={`btn ${severity === "" ? "btn-primary" : "btn-ghost"}`}
            style={{ padding: "6px 12px", fontSize: "0.8rem" }}
          >
            All Severities
          </button>
          <button
            onClick={() => setSeverity("high")}
            className={`btn ${severity === "high" ? "btn-primary" : "btn-ghost"}`}
            style={{ padding: "6px 12px", fontSize: "0.8rem", color: "var(--blood-crimson)" }}
          >
            High Only
          </button>
          <button
            onClick={() => setSeverity("medium")}
            className={`btn ${severity === "medium" ? "btn-primary" : "btn-ghost"}`}
            style={{ padding: "6px 12px", fontSize: "0.8rem", color: "var(--ancient-amber)" }}
          >
            Medium
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <button
          onClick={() => setCategory("")}
          className={`btn ${category === "" ? "btn-primary" : "btn-ghost"}`}
          style={{ padding: "6px 14px", fontSize: "0.82rem" }}
        >
          All Markers ({items.length})
        </button>
        {Object.entries(breakdown).map(([cat, count]) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`btn ${category === cat ? "btn-primary" : "btn-ghost"}`}
            style={{ padding: "6px 14px", fontSize: "0.82rem", textTransform: "capitalize" }}
          >
            {cat.replace("_", " ")} ({count})
          </button>
        ))}
      </div>

      {/* Items Stream */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ancient-amber)" }}>
          <Loader2 size={32} className="ghost-float" style={{ margin: "0 auto 12px" }} />
          <div>Scanning repository files for lingering markers...</div>
        </div>
      ) : items.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: "center", padding: 48, color: "var(--text-muted)" }}>
          No unfinished business matches this filter criteria.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onInspectEvidence({
                source_type: "code",
                source_identifier: `${item.file_path}:${item.line_number}`,
                source_location: item.file_path,
                content_excerpt: `${item.title}\nCategory: ${item.category}\nSeverity: ${item.severity}\n\nSnippet:\n${item.snippet}`
              })}
              className="glass-panel glass-panel-interactive"
              style={{
                padding: 18,
                borderLeft: `3px solid ${item.severity === "high" ? "var(--blood-crimson)" : item.severity === "medium" ? "var(--ancient-amber)" : "var(--spectral-teal)"}`
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {getCategoryIcon(item.category)}
                  <h3 style={{ fontSize: "0.98rem", color: "#ffffff", fontWeight: 600 }}>
                    {item.title}
                  </h3>
                </div>
                {getSeverityBadge(item.severity)}
              </div>

              {item.snippet && (
                <pre className="font-mono" style={{
                  background: "#080a10",
                  padding: "10px 14px",
                  borderRadius: 6,
                  fontSize: "0.8rem",
                  color: "#cbd5e1",
                  marginBottom: 10,
                  whiteSpace: "pre-wrap",
                  overflowX: "auto"
                }}>
                  {item.snippet}
                </pre>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.76rem" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyPath(item.file_path);
                  }}
                  className="font-mono btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "3px 8px",
                    borderRadius: 4,
                    color: "var(--text-muted)",
                    cursor: "pointer"
                  }}
                  title="Click to copy file path"
                >
                  {copiedPath === item.file_path ? <Check size={12} color="var(--spectral-teal)" /> : <Copy size={12} />}
                  <span>{item.file_path}{item.line_number > 0 ? `#L${item.line_number}` : ""}</span>
                </button>

                <span style={{ color: "var(--spectral-teal)", fontWeight: 500 }}>
                  Inspect Evidence →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
