import React, { useState } from "react";
import { X, GitCommit, FileCode, AlertCircle, Copy, Check, ExternalLink } from "lucide-react";

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
      case "commit": return <GitCommit size={18} color="var(--spectral-teal)" />;
      case "code": return <FileCode size={18} color="var(--ancient-amber)" />;
      default: return <AlertCircle size={18} color="var(--spectral-amethyst)" />;
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(4, 6, 10, 0.82)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      zIndex: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }}>
      <div className="glass-panel" style={{
        maxWidth: 780,
        width: "100%",
        maxHeight: "86vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 245, 196, 0.12)",
        borderColor: "var(--border-medium)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0, 0, 0, 0.3)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {getIcon()}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="badge badge-teal" style={{ fontSize: "0.68rem" }}>
                  {evidence.source_type?.toUpperCase() || "RECORD"}
                </span>
                <span className="font-mono" style={{ fontSize: "0.86rem", color: "#ffffff", fontWeight: 600 }}>
                  {evidence.source_identifier}
                </span>
              </div>
              <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: 2 }}>
                {evidence.source_location || "Repository Record Index"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button 
              onClick={handleCopy}
              className="btn btn-ghost" 
              style={{ padding: "6px 12px", fontSize: "0.78rem" }}
              title="Copy snippet"
            >
              {copied ? <Check size={14} color="var(--spectral-teal)" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button 
              onClick={onClose}
              className="btn btn-ghost" 
              style={{ padding: "6px 10px" }}
              title="Close modal (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: 22, overflowY: "auto", flex: 1 }}>
          <div style={{ marginBottom: 12, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            Surviving excerpt extracted from codebase strata:
          </div>
          <pre className="font-mono" style={{
            background: "#07090e",
            padding: 18,
            borderRadius: 8,
            border: "1px solid var(--border-subtle)",
            fontSize: "0.82rem",
            color: "#e2e8f0",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }}>
            {evidence.content_excerpt}
          </pre>
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "flex-end",
          background: "rgba(0, 0, 0, 0.25)"
        }}>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: "8px 18px", fontSize: "0.84rem" }}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
