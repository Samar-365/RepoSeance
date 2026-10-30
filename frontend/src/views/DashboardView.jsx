import React from "react";
import { MessageSquare, GitCommit, AlertCircle, FileText, Calendar, GitBranch, ArrowRight } from "lucide-react";
import MinimalGhostBackground from "../components/MinimalGhostBackground";

export default function DashboardView({ repository, setActiveTab }) {
  if (!repository) return null;
  const stats = repository.stats || {};
  const lastCommit = stats.last_commit;

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 64px)", padding: "28px 24px" }}>
      <MinimalGhostBackground />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: "1px solid var(--border-subtle)",
          flexWrap: "wrap",
          gap: 14
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: "1.7rem", fontWeight: 700, color: "#fff" }}>
                {repository.name}
              </h1>
              <span className="badge badge-blue">{repository.source_type}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: "0.8rem", color: "var(--text-muted)" }}>
              <span className="font-mono">{repository.path_or_url}</span>
              <span>•</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <GitBranch size={13} color="var(--accent-primary)" />
                Branch: <span style={{ color: "var(--text-primary)" }}>{repository.default_branch || "main"}</span>
              </span>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab("chat")} 
            className="btn btn-primary" 
            style={{ padding: "8px 16px" }}
          >
            <MessageSquare size={15} /> Ask AI
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.82rem", marginBottom: 6 }}>
              <span>Total Commits</span>
              <GitCommit size={16} color="var(--accent-primary)" />
            </div>
            <div style={{ fontSize: "1.9rem", fontWeight: 700, color: "#fff" }}>
              {stats.total_commits || repository.total_commits || 0}
            </div>
          </div>

          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.82rem", marginBottom: 6 }}>
              <span>TODO & Markers</span>
              <AlertCircle size={16} color="var(--accent-warning)" />
            </div>
            <div style={{ fontSize: "1.9rem", fontWeight: 700, color: "var(--accent-warning)" }}>
              {stats.unfinished_items || 0}
            </div>
          </div>

          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.82rem", marginBottom: 6 }}>
              <span>Issues & PRs</span>
              <FileText size={16} color="var(--accent-ghost)" />
            </div>
            <div style={{ fontSize: "1.9rem", fontWeight: 700, color: "var(--accent-ghost)" }}>
              {(stats.issues || 0) + (stats.prs || 0)}
            </div>
          </div>

          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.82rem", marginBottom: 6 }}>
              <span>Last Commit</span>
              <Calendar size={16} color="var(--accent-primary)" />
            </div>
            <div className="font-mono" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginTop: 4 }}>
              {lastCommit ? lastCommit.committed_at.slice(0, 10) : "N/A"}
            </div>
          </div>
        </div>

        {/* Quick Navigation Panels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>
          <div
            onClick={() => setActiveTab("chat")}
            className="card card-interactive"
            style={{ padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <MessageSquare size={18} color="var(--accent-primary)" />
              <h3 style={{ fontSize: "1rem", color: "#fff", fontWeight: 600 }}>Chat</h3>
            </div>
            <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginBottom: 12 }}>
              Ask questions about past decisions, architecture, and bugs.
            </p>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
              Open Chat <ArrowRight size={13} />
            </span>
          </div>

          <div
            onClick={() => setActiveTab("timeline")}
            className="card card-interactive"
            style={{ padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <GitCommit size={18} color="var(--accent-primary)" />
              <h3 style={{ fontSize: "1rem", color: "#fff", fontWeight: 600 }}>Timeline</h3>
            </div>
            <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginBottom: 12 }}>
              Browse chronological commit history with milestone detection.
            </p>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
              View Timeline <ArrowRight size={13} />
            </span>
          </div>

          <div
            onClick={() => setActiveTab("unfinished")}
            className="card card-interactive"
            style={{ padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <AlertCircle size={18} color="var(--accent-warning)" />
              <h3 style={{ fontSize: "1rem", color: "#fff", fontWeight: 600 }}>Issues & TODOs</h3>
            </div>
            <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginBottom: 12 }}>
              Severity-ranked TODOs, unresolved FIXMEs, and open items.
            </p>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-warning)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
              View Items <ArrowRight size={13} />
            </span>
          </div>

          <div
            onClick={() => setActiveTab("report")}
            className="card card-interactive"
            style={{ padding: 20 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <FileText size={18} color="var(--accent-ghost)" />
              <h3 style={{ fontSize: "1rem", color: "#fff", fontWeight: 600 }}>Report</h3>
            </div>
            <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", marginBottom: 12 }}>
              Generate structured analysis and revival checklist.
            </p>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-ghost)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
              Generate Report <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
