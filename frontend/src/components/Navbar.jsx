import React from "react";
import { Ghost, Database, Skull, GitCommit, AlertOctagon, ScrollText, Sparkles, FolderGit2, Cpu } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, currentRepo, ollamaStatus, onOpenSummon }) {
  const isConnected = ollamaStatus?.ollama_status === "connected";
  const modelName = ollamaStatus?.configured_model || "gemma2:2b";

  return (
    <header style={{
      background: "rgba(11, 14, 20, 0.88)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border-subtle)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "10px 24px",
    }}>
      <div style={{
        maxWidth: 1440,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20
      }}>
        {/* Brand */}
        <div 
          onClick={onOpenSummon}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", userSelect: "none" }}
        >
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "linear-gradient(135deg, rgba(0, 245, 196, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)",
            border: "1px solid rgba(0, 245, 196, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px rgba(0, 245, 196, 0.15)"
          }}>
            <Ghost size={20} color="var(--spectral-teal)" className="spectral-glow" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="font-gothic" style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.04em"
              }}>
                RepoSeance
              </span>
              <span className="badge badge-teal" style={{ fontSize: "0.65rem", padding: "1px 6px" }}>
                Archaeology AI
              </span>
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              {currentRepo ? currentRepo.name : "Codebase Resurrection Engine"}
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Available when a repository is active) */}
        {currentRepo && (
          <nav style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "rgba(0, 0, 0, 0.35)",
            padding: "4px 6px",
            borderRadius: 10,
            border: "1px solid var(--border-subtle)"
          }}>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`btn btn-ghost ${activeTab === "dashboard" ? "active" : ""}`}
              style={{ padding: "6px 12px", fontSize: "0.82rem" }}
            >
              <Database size={14} /> Overview
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`btn btn-ghost ${activeTab === "chat" ? "active" : ""}`}
              style={{ padding: "6px 12px", fontSize: "0.82rem" }}
            >
              <Skull size={14} /> Séance Chamber
            </button>

            <button
              onClick={() => setActiveTab("timeline")}
              className={`btn btn-ghost ${activeTab === "timeline" ? "active" : ""}`}
              style={{ padding: "6px 12px", fontSize: "0.82rem" }}
            >
              <GitCommit size={14} /> Stratigraphy
            </button>

            <button
              onClick={() => setActiveTab("unfinished")}
              className={`btn btn-ghost ${activeTab === "unfinished" ? "active" : ""}`}
              style={{ padding: "6px 12px", fontSize: "0.82rem" }}
            >
              <AlertOctagon size={14} /> Unfinished Vault
            </button>

            <button
              onClick={() => setActiveTab("report")}
              className={`btn btn-ghost ${activeTab === "report" ? "active" : ""}`}
              style={{ padding: "6px 12px", fontSize: "0.82rem" }}
            >
              <ScrollText size={14} /> Resurrection Scroll
            </button>
          </nav>
        )}

        {/* Right Status Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* AI Status Badge */}
          <div 
            className="glass-panel"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 12px",
              borderRadius: 20,
              fontSize: "0.78rem"
            }}
            title={isConnected ? `Ollama connected using ${modelName}` : "Ollama runtime offline (using simulation)"}
          >
            <div style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: isConnected ? "var(--spectral-teal)" : "var(--ancient-amber)",
              boxShadow: isConnected ? "0 0 8px var(--spectral-teal)" : "0 0 8px var(--ancient-amber)"
            }} className="pulse-dot" />
            <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
              {isConnected ? modelName : "Offline Simulation"}
            </span>
          </div>

          {/* Summon Repository Button */}
          <button
            onClick={onOpenSummon}
            className={`btn ${activeTab === "summon" ? "btn-primary" : "btn-ghost"}`}
            style={{ padding: "6px 14px", fontSize: "0.82rem" }}
          >
            <FolderGit2 size={14} /> Summon Repo
          </button>
        </div>
      </div>
    </header>
  );
}
