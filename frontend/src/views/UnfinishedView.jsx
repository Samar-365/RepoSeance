import React, { useState, useEffect } from "react";
import { AlertCircle, Bug, GitBranch, FileText, Loader2, Copy, Check } from "lucide-react";
import { getUnfinished } from "../api/client";
import MinimalGhostBackground from "../components/MinimalGhostBackground";

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
      case "high": return <span className="badge badge-red">High</span>;
      case "medium": return <span className="badge badge-amber">Medium</span>;
      default: return <span className="badge badge-blue">Low</span>;
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "fixme": return <Bug size={14} color="var(--accent-danger)" />;
      case "abandoned_branch": return <GitBranch size={14} color="var(--accent-warning)" />;
      case "dangling_doc": return <FileText size={14} color="var(--accent-primary)" />;
      default: return <AlertCircle size={14} color="var(--accent-ghost)" />;
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 64px)", padding: "28px 24px" }}>
      <MinimalGhostBackground />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Title Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: "1px solid var(--border-subtle)",
          flexWrap: "wrap",
          gap: 12
        }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
              <AlertCircle size={20} color="var(--accent-warning)" />
              Issues & Markers
            </h1>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              TODOs, FIXMEs, abandoned branches, and unfinished items ({items.length})
            </span>
          </div>

          {/* Severity Pills */}
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setSeverity("")}
              className={`btn ${severity === "" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            >
              All
            </button>
            <button
              onClick={() => setSeverity("high")}
              className={`btn ${severity === "high" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "4px 10px", fontSize: "0.78rem", color: "var(--accent-danger)" }}
            >
              High
            </button>
            <button
              onClick={() => setSeverity("medium")}
              className={`btn ${severity === "medium" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "4px 10px", fontSize: "0.78rem", color: "var(--accent-warning)" }}
            >
              Medium
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          <button
            onClick={() => setCategory("")}
            className={`btn ${category === "" ? "btn-primary" : "btn-ghost"}`}
            style={{ padding: "5px 12px", fontSize: "0.8rem" }}
          >
            All Categories ({items.length})
          </button>
          {Object.entries(breakdown).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`btn ${category === cat ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "5px 12px", fontSize: "0.8rem", textTransform: "capitalize" }}
            >
              {cat.replace("_", " ")} ({count})
            </button>
          ))}
        </div>

        {/* Items List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--accent-warning)", fontSize: "0.86rem" }}>
            <Loader2 size={24} className="pulse-dot" style={{ margin: "0 auto 8px" }} />
            <div>Scanning markers...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: 36, color: "var(--text-muted)", fontSize: "0.86rem" }}>
            No unfinished items match the selected filter.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => onInspectEvidence({
                  source_type: "code",
                  source_identifier: `${item.file_path}:${item.line_number}`,
                  source_location: item.file_path,
                  content_excerpt: `${item.title}\nCategory: ${item.category}\nSeverity: ${item.severity}\n\nSnippet:\n${item.snippet}`
                })}
                className="card card-interactive"
                style={{ padding: 16 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {getCategoryIcon(item.category)}
                    <h3 style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>
                      {item.title}
                    </h3>
                  </div>
                  {getSeverityBadge(item.severity)}
                </div>

                {item.snippet && (
                  <pre className="font-mono" style={{
                    background: "#06080c",
                    padding: "8px 12px",
                    borderRadius: 5,
                    fontSize: "0.78rem",
                    color: "#cbd5e1",
                    marginBottom: 8,
                    whiteSpace: "pre-wrap",
                    overflowX: "auto"
                  }}>
                    {item.snippet}
                  </pre>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.74rem" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPath(item.file_path);
                    }}
                    className="font-mono btn-ghost"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "2px 6px",
                      borderRadius: 4,
                      color: "var(--text-muted)",
                      cursor: "pointer"
                    }}
                    title="Copy path"
                  >
                    {copiedPath === item.file_path ? <Check size={11} color="var(--accent-success)" /> : <Copy size={11} />}
                    <span>{item.file_path}{item.line_number > 0 ? `#L${item.line_number}` : ""}</span>
                  </button>

                  <span style={{ color: "var(--accent-primary)", fontWeight: 500 }}>
                    Inspect Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
