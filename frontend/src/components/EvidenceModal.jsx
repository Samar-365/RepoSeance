import React, { useState } from "react";
import { X, GitCommit, FileCode, AlertCircle, Copy, Check } from "lucide-react";

export default function EvidenceModal({ evidence, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!evidence) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(evidence.content_excerpt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    switch (evidence.source_type) {
      case "commit": return <GitCommit size={16} color="var(--accent-primary)" />;
      case "code": return <FileCode size={16} color="var(--accent-warning)" />;
      default: return <AlertCircle size={16} color="var(--accent-ghost)" />;
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(6px)",
      zIndex: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    }}>
      <div className="card" style={{
        maxWidth: 720,
        width: "100%",
        maxHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0, 0, 0, 0.3)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {getIcon()}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="badge badge-blue">
                  {evidence.source_type?.toUpperCase()}
                </span>
                <span className="font-mono" style={{ fontSize: "0.82rem", color: "#fff", fontWeight: 600 }}>
                  {evidence.source_identifier}
                </span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                {evidence.source_location}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button 
              onClick={handleCopy}
              className="btn btn-ghost" 
              style={{ padding: "4px 8px", fontSize: "0.75rem" }}
              title="Copy snippet"
            >
              {copied ? <Check size={13} color="var(--accent-success)" /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button 
              onClick={onClose}
              className="btn btn-ghost" 
              style={{ padding: "4px 8px" }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 18, overflowY: "auto", flex: 1 }}>
          <pre className="font-mono" style={{
            background: "#06080c",
            padding: 14,
            borderRadius: 6,
            border: "1px solid var(--border-subtle)",
            fontSize: "0.8rem",
            color: "#e2e8f0",
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }}>
            {evidence.content_excerpt}
          </pre>
        </div>

        {/* Footer */}
        <div style={{
          padding: "10px 18px",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "flex-end"
        }}>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
