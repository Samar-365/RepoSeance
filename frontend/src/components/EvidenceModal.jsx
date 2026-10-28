import React from "react";
import { X, ExternalLink, GitCommit, FileCode, AlertCircle, Copy, Check } from "lucide-react";

export default function EvidenceModal({ evidence, onClose }) {
  const [copied, setCopied] = React.useState(false);
  if (!evidence) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(evidence.content_excerpt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    switch (evidence.source_type) {
      case "commit": return <GitCommit size={18} color="var(--spectral-teal)" />;
      case "code": return <FileCode size={18} color="var(--ancient-amber)" />;
      default: return <AlertCircle size={18} color="var(--spectral-amethyst)" />;
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(3, 4, 7, 0.8)",
      backdropFilter: "blur(10px)",
      zIndex: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }}>
      <div className="glass-panel" style={{
        maxWidth: 750,
        width: "100%",
        maxHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 40px rgba(0, 245, 196, 0.15)",
        borderColor: "var(--border-bright)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-dim)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0,0,0,0.2)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {getIcon()}
            <div>
              <h3 style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
                Evidence Record: {evidence.source_type?.toUpperCase()}
              </h3>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--spectral-teal)" }}>
                {evidence.source_identifier} ({evidence.source_location || "Repository Record"})
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button 
              onClick={handleCopy}
              className="btn btn-ghost" 
              style={{ padding: "6px 10px", fontSize: "0.78rem" }}
              title="Copy snippet"
            >
              {copied ? <Check size={14} color="var(--spectral-teal)" /> : <Copy size={14} />}
            </button>
            <button 
              onClick={onClose}
              className="btn btn-ghost" 
              style={{ padding: "6px 10px" }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>
          <div style={{ marginBottom: 12, fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Surviving excerpt preserved in repository evidence index:
          </div>
          <pre className="font-mono" style={{
            background: "#07090e",
            padding: 16,
            borderRadius: 8,
            border: "1px solid var(--border-dim)",
            fontSize: "0.83rem",
            color: "#d0d9e8",
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all"
          }}>
            {evidence.content_excerpt}
          </pre>
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--border-dim)",
          display: "flex",
          justifyContent: "flex-end",
          background: "rgba(0,0,0,0.2)"
        }}>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: "8px 16px" }}>
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
}
