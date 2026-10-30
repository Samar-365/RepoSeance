import React from "react";
import { Ghost, Sparkles, Database, Skull, ScrollText, GitCommit, AlertOctagon, Cpu } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, currentRepo, ollamaStatus, onOpenSummon }) {
  const isOllamaConnected = ollamaStatus?.ollama_status === "connected";

  return (
    <header style={{
      background: "rgba(11, 14, 20, 0.85)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border-dim)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "12px 24px",
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20
      }}>
        {/* Brand */}
        <div 
          onClick={onOpenSummon}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        >
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "linear-gradient(135deg, rgba(0, 245, 196, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
            border: "1px solid rgba(0, 245, 196, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 15px rgba(0, 245, 196, 0.2)"
          }}>
            <Ghost size={22} color="var(--spectral-teal)" className="spectral-glow" />
          </div>
          <div>
            <h1 style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #ffffff 0%, var(--spectral-teal) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1
            }}>
              RepoSeance
            </h1>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
              SOFTWARE ARCHAEOLOGY & LOCAL AI
            </span>
          </div>
        </div>

        {/* Center Navigation Tabs (Only if repo selected) */}
        {currentRepo && (
          <nav style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.3)", padding: 4, borderRadius: 10, border: "1px solid var(--border-dim)" }}>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`btn btn-ghost ${activeTab === "dashboard" ? "active-tab" : ""}`}
              style={{
                padding: "8px 14px",
                fontSize: "0.82rem",
                background: activeTab === "dashboard" ? "rgba(0, 245, 196, 0.15)" : "transparent",
                color: activeTab === "dashboard" ? "var(--spectral-teal)" : "var(--text-secondary)",
                borderColor: activeTab === "dashboard" ? "rgba(0, 245, 196, 0.3)" : "transparent"
              }}
            >
              <Database size={15} /> Sanctum
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`btn btn-ghost ${activeTab === "chat" ? "active-tab" : ""}`}
              style={{
                padding: "8px 14px",
                fontSize: "0.82rem",
                background: activeTab === "chat" ? "rgba(0, 245, 196, 0.15)" : "transparent",
                color: activeTab === "chat" ? "var(--spectral-teal)" : "var(--text-secondary)",
                borderColor: activeTab === "chat" ? "rgba(0, 245, 196, 0.3)" : "transparent"
              }}
            >
              <Skull size={15} /> Séance Chat
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`btn btn-ghost ${activeTab === "timeline" ? "active-tab" : ""}`}
              style={{
                padding: "8px 14px",
                fontSize: "0.82rem",
                background: activeTab === "timeline" ? "rgba(0, 245, 196, 0.15)" : "transparent",
                color: activeTab === "timeline" ? "var(--spectral-teal)" : "var(--text-secondary)",
                borderColor: activeTab === "timeline" ? "rgba(0, 245, 196, 0.3)" : "transparent"
              }}
            >
              <GitCommit size={15} /> Timeline
            </button>
            <button
              onClick={() => setActiveTab("unfinished")}
              className={`btn btn-ghost ${activeTab === "unfinished" ? "active-tab" : ""}`}
              style={{
                padding: "8px 14px",
                fontSize: "0.82rem",
                background: activeTab === "unfinished" ? "rgba(0, 245, 196, 0.15)" : "transparent",
                color: activeTab === "unfinished" ? "var(--spectral-teal)" : "var(--text-secondary)",
                borderColor: activeTab === "unfinished" ? "rgba(0, 245, 196, 0.3)" : "transparent"
              }}
            >
              <AlertOctagon size={15} /> Unfinished Vault
            </button>
            <button
              onClick={() => setActiveTab("report")}
              className={`btn btn-ghost ${activeTab === "report" ? "active-tab" : ""}`}
              style={{
                padding: "8px 14px",
                fontSize: "0.82rem",
                background: activeTab === "report" ? "rgba(0, 245, 196, 0.15)" : "transparent",
                color: activeTab === "report" ? "var(--spectral-teal)" : "var(--text-secondary)",
                borderColor: activeTab === "report" ? "rgba(0, 245, 196, 0.3)" : "transparent"
              }}
            >
              <ScrollText size={15} /> Resurrection Scroll
            </button>
          </nav>
        )}

        {/* Right Status Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {currentRepo && (
            <div 
              onClick={onOpenSummon}
              title="Click to summon another repository"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-dim)",
                borderRadius: 8,
                fontSize: "0.8rem",
                cursor: "pointer",
                maxWidth: 180,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>Active:</span>
              <span style={{ color: "var(--spectral-teal)", fontWeight: 600 }}>{currentRepo.name}</span>
            </div>
          )}

          {/* Ollama Status Badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            background: isOllamaConnected ? "rgba(0, 245, 196, 0.08)" : "rgba(255, 170, 64, 0.08)",
            border: `1px solid ${isOllamaConnected ? "rgba(0, 245, 196, 0.25)" : "rgba(255, 170, 64, 0.25)"}`,
            borderRadius: 20,
            fontSize: "0.76rem",
            fontFamily: "var(--font-mono)"
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isOllamaConnected ? "var(--spectral-teal)" : "var(--ancient-amber)",
              boxShadow: isOllamaConnected ? "0 0 8px var(--spectral-teal)" : "none",
              display: "inline-block"
            }} />
            <Cpu size={14} color={isOllamaConnected ? "var(--spectral-teal)" : "var(--ancient-amber)"} />
            <span>
              {isOllamaConnected
                ? `Ollama: ${ollamaStatus?.configured_model || "Ready"}`
                : "Ollama: Offline"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
