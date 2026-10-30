import React, { useState, useEffect } from "react";
import { AlertCircle, Bug, GitBranch, FileText, Loader2, Copy, Check } from "lucide-react";
import { getUnfinished } from "../api/client";
import MinimalGhostBackground from "../components/MinimalGhostBackground";
import { ArtifactScanIllustration, ExcavationBannerIllustration } from "../components/ThemeIllustrations";

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
      case "high": return <span className="badge badge-red" style={{ fontSize: "0.68rem" }}>High</span>;
      case "medium": return <span className="badge badge-amber" style={{ fontSize: "0.68rem" }}>Medium</span>;
      default: return <span className="badge badge-blue" style={{ fontSize: "0.68rem" }}>Low</span>;
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

      <div style={{ maxWidth: 1050, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Title Bar with Theme Graphic */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: "1px solid var(--border-subtle)",
          flexWrap: "wrap",
          gap: 14
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <ArtifactScanIllustration size={52} />
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                Issues & Markers
              </h1>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                TODOs, FIXMEs, and abandoned branches ({items.length})
              </span>
            </div>
          </div>

          {/* Severity Filters */}
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
            <button
              onClick={() => setSeverity("low")}
              className={`btn ${severity === "low" ? "btn-primary" : "btn-ghost"}`}
              style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            >
              Low
            </button>
          </div>
        </div>

        {/* Minimalist Excavation Stratum Banner */}
        <div style={{ marginBottom: 20 }}>
          <ExcavationBannerIllustration />
        </div>

        {/* Content Stream */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--accent-primary)", fontSize: "0.86rem" }}>
            <Loader2 size={24} className="pulse-dot" style={{ margin: "0 auto 8px" }} />
            <div>Excavating markers from codebase...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: 36, color: "var(--text-muted)", fontSize: "0.86rem" }}>
            No unfinished items match your filter criteria.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="card"
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {getCategoryIcon(item.category)}
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span className="font-mono" style={{
                        fontSize: "0.82rem",
                        color: "#fff",
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {item.file_path} {item.line_number ? `:${item.line_number}` : ""}
                      </span>
                      {getSeverityBadge(item.severity)}
                    </div>

                    <div style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {item.title || item.snippet}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => handleCopyPath(item.file_path)}
                    className="btn btn-ghost"
                    style={{ padding: "3px 7px", fontSize: "0.72rem" }}
                    title="Copy file path"
                  >
                    {copiedPath === item.file_path ? (
                      <Check size={11} color="var(--accent-success)" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>

                  <button
                    onClick={() => onInspectEvidence({
                      source_type: item.category || "marker",
                      source_identifier: `${item.file_path}:${item.line_number || 1}`,
                      source_location: item.title,
                      content_excerpt: `File: ${item.file_path}\nLine: ${item.line_number || "N/A"}\nCategory: ${item.category}\nSeverity: ${item.severity}\n\nSnippet:\n${item.snippet}`
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
