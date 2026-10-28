import React, { useState, useEffect } from "react";
import { AlertOctagon, Filter, CheckCircle2, AlertTriangle, Bug, GitBranch, FileText, Loader2 } from "lucide-react";
import { getUnfinished } from "../api/client";

export default function UnfinishedView({ repository, onInspectEvidence }) {
  const [items, setItems] = useState([]);
  const [breakdown, setBreakdown] = useState({});
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(true);

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
    <div style={{ maxWidth: 1200, margin: "24px auto", padding: "0 20px" }}>
      {/* Title */}
      <div style={{ marginBottom: 28 }}>
        <h2 className="font-gothic" style={{ fontSize: "1.8rem", color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
          <AlertOctagon size={26} color="var(--ancient-amber)" />
          The Unfinished Vault
        </h2>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Identified TODOs, dangling documentation promises, unmerged branch specters, and unresolved issues
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => setCategory("")}
          className={`btn ${category === "" ? "btn-primary" : "btn-ghost"}`}
          style={{ padding: "6px 14px", fontSize: "0.82rem" }}
        >
          All Items ({items.length})
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

      {/* Items List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ancient-amber)" }}>
          <Loader2 size={32} className="ghost-float" style={{ margin: "0 auto 12px" }} />
          <div>Scanning repository files for lingering markers...</div>
        </div>
      ) : items.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: "center", padding: 48, color: "var(--text-muted)" }}>
          No unfinished business matches this filter.
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
                cursor: "pointer",
                borderLeft: `4px solid ${item.severity === "high" ? "var(--blood-crimson)" : item.severity === "medium" ? "var(--ancient-amber)" : "var(--spectral-teal)"}`
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {getCategoryIcon(item.category)}
                  <h4 style={{ fontSize: "0.98rem", color: "#fff", fontWeight: 600 }}>
                    {item.title}
                  </h4>
                </div>
                {getSeverityBadge(item.severity)}
              </div>

              {item.snippet && (
                <pre className="font-mono" style={{
                  background: "#080a10",
                  padding: "10px 14px",
                  borderRadius: 6,
                  fontSize: "0.8rem",
                  color: "#c3cde0",
                  marginBottom: 10,
                  whiteSpace: "pre-wrap",
                  overflowX: "auto"
                }}>
                  {item.snippet}
                </pre>
              )}

              <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {item.file_path}{item.line_number > 0 ? `#L${item.line_number}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
