import React from "react";
import { MessageSquare, GitCommit, AlertCircle, FileText, Calendar, GitBranch, ArrowRight } from "lucide-react";
import MinimalGhostBackground from "../components/MinimalGhostBackground";
import { 
  DashboardCodexIllustration,
  ChatSeanceIllustration,
  TimelineGhostIllustration,
  ArtifactScanIllustration,
  ResurrectionReportIllustration
} from "../components/ThemeIllustrations";

export default function DashboardView({ repository, setActiveTab }) {
  if (!repository) return null;
  const stats = repository.stats || {};
  const lastCommit = stats.last_commit;

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 64px)", padding: "28px 24px" }}>
      <MinimalGhostBackground />

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header Bar with Theme Graphic */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          paddingBottom: 18,
          borderBottom: "1px solid var(--border-subtle)",
          flexWrap: "wrap",
          gap: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <DashboardCodexIllustration size={64} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                  {repository.name}
                </h1>
                <span className="badge badge-blue">{repository.source_type}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <span className="font-mono">{repository.path_or_url}</span>
                <span>&bull;</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <GitBranch size={13} color="var(--accent-primary)" />
                  Branch: <span style={{ color: "var(--text-primary)" }}>{repository.default_branch || "main"}</span>
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab("chat")} 
            className="btn btn-primary" 
            style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}
          >
            <MessageSquare size={14} /> Ask Assistant
          </button>
        </div>

        {/* 4 Clean Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
          <div className="card" style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: 6 }}>
              <span>Total Commits</span>
              <GitCommit size={15} color="var(--accent-primary)" />
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>
              {stats.total_commits || repository.total_commits || 0}
            </div>
          </div>

          <div className="card" style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: 6 }}>
              <span>TODO & Markers</span>
              <AlertCircle size={15} color="var(--accent-warning)" />
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--accent-warning)" }}>
              {stats.unfinished_items || 0}
            </div>
          </div>

          <div className="card" style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: 6 }}>
              <span>Issues & PRs</span>
              <FileText size={15} color="var(--accent-ghost)" />
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--accent-ghost)" }}>
              {(stats.issues || 0) + (stats.prs || 0)}
            </div>
          </div>

          <div className="card" style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: 6 }}>
              <span>Last Active</span>
              <Calendar size={15} color="var(--accent-primary)" />
            </div>
            <div className="font-mono" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginTop: 4 }}>
              {lastCommit ? lastCommit.committed_at.slice(0, 10) : "N/A"}
            </div>
          </div>
        </div>

        {/* 4 Feature Action Cards with Theme Illustrations */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {/* Chat Tile */}
          <div
            onClick={() => setActiveTab("chat")}
            className="card card-interactive"
            style={{ padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>Chat</span>
                <ChatSeanceIllustration size={44} />
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "0 0 14px", lineHeight: 1.5 }}>
                Ask questions about past decisions, architecture, and bugs with verified citations.
              </p>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: 4 }}>
              Open Chat <ArrowRight size={13} />
            </span>
          </div>

          {/* Timeline Tile */}
          <div
            onClick={() => setActiveTab("timeline")}
            className="card card-interactive"
            style={{ padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>Timeline</span>
                <TimelineGhostIllustration size={44} />
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "0 0 14px", lineHeight: 1.5 }}>
                Inspect the chronological commit log, filter milestones, and trace changes.
              </p>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: 4 }}>
              View Timeline <ArrowRight size={13} />
            </span>
          </div>

          {/* Issues & Markers Tile */}
          <div
            onClick={() => setActiveTab("unfinished")}
            className="card card-interactive"
            style={{ padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>Issues & TODOs</span>
                <ArtifactScanIllustration size={44} />
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "0 0 14px", lineHeight: 1.5 }}>
                Audit TODOs, FIXMEs, and abandoned branches ranked by severity and date.
              </p>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--accent-warning)", display: "flex", alignItems: "center", gap: 4 }}>
              Inspect Markers <ArrowRight size={13} />
            </span>
          </div>

          {/* Report Tile */}
          <div
            onClick={() => setActiveTab("report")}
            className="card card-interactive"
            style={{ padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>Report</span>
                <ResurrectionReportIllustration size={44} />
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "0 0 14px", lineHeight: 1.5 }}>
                Generate or export full Markdown resurrection audits and feasibility scores.
              </p>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--accent-success)", display: "flex", alignItems: "center", gap: 4 }}>
              View Report <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
