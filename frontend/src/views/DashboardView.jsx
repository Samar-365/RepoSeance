import React from "react";
import { Skull, GitCommit, AlertOctagon, ScrollText, Calendar, GitBranch, ArrowRight, Activity, Flame, ShieldAlert } from "lucide-react";

export default function DashboardView({ repository, setActiveTab }) {
  if (!repository) return null;
  const stats = repository.stats || {};
  const lastCommit = stats.last_commit;

  return (
    <div style={{ maxWidth: 1280, margin: "28px auto", padding: "0 24px" }}>
      {/* Title & Coordinates Banner */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
        paddingBottom: 20,
        borderBottom: "1px solid var(--border-subtle)",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h1 className="font-gothic" style={{ fontSize: "2.1rem", fontWeight: 700, color: "#ffffff" }}>
              {repository.name}
            </h1>
            <span className="badge badge-teal">{repository.source_type}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: "0.82rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
            <span className="font-mono">
              Coordinates: <span style={{ color: "var(--text-secondary)" }}>{repository.path_or_url}</span>
            </span>
            <span>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <GitBranch size={13} color="var(--spectral-teal)" />
              Branch: <strong style={{ color: "var(--spectral-teal)" }}>{repository.default_branch || "main"}</strong>
            </span>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab("chat")} 
          className="btn btn-primary" 
          style={{ padding: "10px 20px" }}
        >
          <Skull size={16} /> Enter Séance Chamber
        </button>
      </div>

      {/* Primary Archaeological Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
        {/* Total Commits */}
        <div className="glass-panel" style={{ padding: 20, borderLeft: "3px solid var(--spectral-teal)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Commit Strata</span>
            <GitCommit size={18} color="var(--spectral-teal)" />
          </div>
          <div className="font-gothic" style={{ fontSize: "2.2rem", fontWeight: 700, color: "#ffffff" }}>
            {stats.total_commits || repository.total_commits || 0}
          </div>
          <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: 4 }}>
            Preserved historical checkpoints
          </div>
        </div>

        {/* Unfinished Markers */}
        <div className="glass-panel" style={{ padding: 20, borderLeft: "3px solid var(--ancient-amber)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Unfinished Markers</span>
            <AlertOctagon size={18} color="var(--ancient-amber)" />
          </div>
          <div className="font-gothic" style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--ancient-amber)" }}>
            {stats.unfinished_items || 0}
          </div>
          <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: 4 }}>
            TODO, FIXME & abandoned promises
          </div>
        </div>

        {/* Discussions & Issues */}
        <div className="glass-panel" style={{ padding: 20, borderLeft: "3px solid var(--spectral-amethyst)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Discussions / PRs</span>
            <Flame size={18} color="var(--spectral-amethyst)" />
          </div>
          <div className="font-gothic" style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--spectral-amethyst)" }}>
            {(stats.issues || 0) + (stats.prs || 0)}
          </div>
          <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: 4 }}>
            {stats.issues || 0} issues, {stats.prs || 0} pull requests
          </div>
        </div>

        {/* Last Active Breath */}
        <div className="glass-panel" style={{ padding: 20, borderLeft: "3px solid var(--spectral-cyan)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Last Active Breath</span>
            <Calendar size={18} color="var(--spectral-cyan)" />
          </div>
          <div className="font-mono" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#ffffff", marginTop: 4 }}>
            {lastCommit ? lastCommit.committed_at.slice(0, 10) : "Historical"}
          </div>
          <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {lastCommit ? lastCommit.message : "Recorded history intact"}
          </div>
        </div>
      </div>

      {/* Investigation Portals Grid */}
      <h2 className="font-gothic" style={{ fontSize: "1.25rem", marginBottom: 16, color: "#ffffff" }}>
        Chambers of Investigation
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {/* Portal 1: Séance Chamber */}
        <div
          onClick={() => setActiveTab("chat")}
          className="glass-panel glass-panel-interactive"
          style={{ padding: 22 }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: "rgba(0, 245, 196, 0.1)",
            border: "1px solid rgba(0, 245, 196, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16
          }}>
            <Skull size={22} color="var(--spectral-teal)" />
          </div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: 6, color: "#ffffff" }}>
            Séance Chamber
          </h3>
          <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
            Interrogate the Repository Ghost with natural language questions. Every assertion is verified against surviving commit and code evidence.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--spectral-teal)", fontWeight: 500 }}>
            <span>Commune with Ghost</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Portal 2: Ghost Timeline */}
        <div
          onClick={() => setActiveTab("timeline")}
          className="glass-panel glass-panel-interactive"
          style={{ padding: 22 }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: "rgba(0, 210, 255, 0.1)",
            border: "1px solid rgba(0, 210, 255, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16
          }}>
            <GitCommit size={22} color="var(--spectral-cyan)" />
          </div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: 6, color: "#ffffff" }}>
            Ghost Stratigraphy
          </h3>
          <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
            Walk the chronological timeline of commit milestones, high-churn architectural pivots, and author contributions with diff inspection.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--spectral-cyan)", fontWeight: 500 }}>
            <span>Examine Strata</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Portal 3: Unfinished Vault */}
        <div
          onClick={() => setActiveTab("unfinished")}
          className="glass-panel glass-panel-interactive"
          style={{ padding: 22 }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16
          }}>
            <AlertOctagon size={22} color="var(--ancient-amber)" />
          </div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: 6, color: "#ffffff" }}>
            Unfinished Vault
          </h3>
          <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
            Browse severity-ranked TODOs, unresolved FIXMEs, dangling documentation promises, and unmerged branch specters.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--ancient-amber)", fontWeight: 500 }}>
            <span>Audit Unfinished Work</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Portal 4: Resurrection Scroll */}
        <div
          onClick={() => setActiveTab("report")}
          className="glass-panel glass-panel-interactive"
          style={{ padding: 22 }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: "rgba(168, 85, 247, 0.1)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16
          }}>
            <ScrollText size={22} color="var(--spectral-amethyst)" />
          </div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: 6, color: "#ffffff" }}>
            Resurrection Scroll
          </h3>
          <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
            Synthesize an evidence-backed archaeological report and modern step-by-step revival checklist, exportable to Markdown and JSON.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--spectral-amethyst)", fontWeight: 500 }}>
            <span>Inscribe Revival Plan</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
