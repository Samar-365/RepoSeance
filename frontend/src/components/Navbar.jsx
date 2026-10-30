import React from "react";
import { Ghost, LayoutDashboard, MessageSquare, GitCommit, AlertCircle, FileText, FolderPlus } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, currentRepo, ollamaStatus, onOpenSummon }) {
  const isConnected = ollamaStatus?.ollama_status === "connected";
  const modelName = ollamaStatus?.configured_model || "gemma2:2b";

  return (
    <header style={{
      background: "rgba(9, 11, 16, 0.95)",
      borderBottom: "1px solid var(--border-subtle)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "10px 20px"
    }}>
      <div style={{
        maxWidth: 1360,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16
      }}>
        {/* Brand */}
        <div 
          onClick={onOpenSummon}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 7,
            background: "var(--accent-primary-dim)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Ghost size={17} color="var(--accent-primary)" />
          </div>
          <div>
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
              RepoSeance
            </span>
            {currentRepo && (
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 8 }}>
                / {currentRepo.name}
              </span>
            )}
          </div>
        </div>

        {/* Center Navigation Tabs (When a repo is active) */}
        {currentRepo && (
          <nav style={{
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`btn btn-ghost ${activeTab === "dashboard" ? "active" : ""}`}
              style={{ padding: "5px 11px", fontSize: "0.82rem" }}
            >
              <LayoutDashboard size={14} /> Overview
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`btn btn-ghost ${activeTab === "chat" ? "active" : ""}`}
              style={{ padding: "5px 11px", fontSize: "0.82rem" }}
            >
              <MessageSquare size={14} /> Chat
            </button>

            <button
              onClick={() => setActiveTab("timeline")}
              className={`btn btn-ghost ${activeTab === "timeline" ? "active" : ""}`}
              style={{ padding: "5px 11px", fontSize: "0.82rem" }}
            >
              <GitCommit size={14} /> Timeline
            </button>

            <button
              onClick={() => setActiveTab("unfinished")}
              className={`btn btn-ghost ${activeTab === "unfinished" ? "active" : ""}`}
              style={{ padding: "5px 11px", fontSize: "0.82rem" }}
            >
              <AlertCircle size={14} /> Issues & TODOs
            </button>

            <button
              onClick={() => setActiveTab("report")}
              className={`btn btn-ghost ${activeTab === "report" ? "active" : ""}`}
              style={{ padding: "5px 11px", fontSize: "0.82rem" }}
            >
              <FileText size={14} /> Report
            </button>
          </nav>
        )}

        {/* Right Status Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Status Badge */}
          <div 
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "4px 10px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 6,
              fontSize: "0.75rem"
            }}
          >
            <div style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isConnected ? "var(--accent-success)" : "var(--accent-warning)"
            }} className="pulse-dot" />
            <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
              {isConnected ? modelName : "Offline"}
            </span>
          </div>

          <button
            onClick={onOpenSummon}
            className="btn btn-ghost"
            style={{ padding: "5px 11px", fontSize: "0.8rem" }}
          >
            <FolderPlus size={14} /> Analyze Repo
          </button>
        </div>
      </div>
    </header>
  );
}
