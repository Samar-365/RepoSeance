import React from "react";
import { Skull, GitCommit, AlertOctagon, ScrollText, Calendar, User, ArrowUpRight, Flame } from "lucide-react";

export default function DashboardView({ repository, setActiveTab }) {
  if (!repository) return null;
  const stats = repository.stats || {};
  const lastCommit = stats.last_commit;

  return (
    <div style={{ maxWidth: 1300, margin: "30px auto", padding: "0 24px" }}>
      {/* Title banner */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32,
        paddingBottom: 20,
        borderBottom: "1px solid var(--border-dim)"
      }}>
        <div>
          <span style={{ fontSize: "0.82rem", color: "var(--spectral-teal)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
            Sanctum of
          </span>
          <h1 className="font-gothic" style={{ fontSize: "2.2rem", fontWeight: 700, color: "#fff", marginTop: 4 }}>
            {repository.name}
          </h1>
          <div className="font-mono" style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
            Coordinates: {repository.path_or_url} | Default Branch: <span style={{ color: "var(--spectral-teal)" }}>{repository.default_branch}</span>
          </div>
        </div>

        <button onClick={() => setActiveTab("chat")} className="btn btn-primary" style={{ padding: "12px 24px" }}>
          <Skull size={18} /> Begin Conversation with Ghost
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 36 }}>
        {/* Total Commits */}
        <div className="glass-panel" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Recorded Commits</span>
            <GitCommit size={20} color="var(--spectral-teal)" />
          </div>
          <div className="font-gothic" style={{ fontSize: "2.4rem", fontWeight: 700, color: "#fff" }}>
            {stats.total_commits || 0}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 6 }}>
            Chronological project evolution preserved
          </div>
        </div>

        {/* Unfinished Business */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Unfinished Markers</span>
            <AlertOctagon size={20} color="var(--ancient-amber)" />
          </div>
          <div className="font-gothic" style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--ancient-amber)" }}>
            {stats.unfinished_items || 0}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 6 }}>
            TODOs, FIXMEs & incomplete roadmap items
          </div>
        </div>

        {/* Issues & PRs */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Discussions / Issues</span>
            <Flame size={20} color="var(--spectral-amethyst)" />
          </div>
          <div className="font-gothic" style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--spectral-amethyst)" }}>
            {(stats.issues || 0) + (stats.prs || 0)}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 6 }}>
            {stats.issues || 0} issues, {stats.prs || 0} pull requests
          </div>
        </div>

        {/* Last Recorded Breath */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Last Active Breath</span>
            <Calendar size={20} color="var(--spectral-cyan)" />
          </div>
          <div className="font-mono" style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginTop: 6 }}>
            {lastCommit ? lastCommit.committed_at.slice(0, 10) : "Ancient times"}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {lastCommit ? lastCommit.message : "No commits recorded"}
          </div>
        </div>
      </div>

      {/* Portals Grid */}
      <h2 className="font-gothic" style={{ fontSize: "1.3rem", marginBottom: 18, color: "#fff" }}>
        Chambers of Investigation
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* Portal: Chat */}
        <div 
          onClick={() => setActiveTab("chat")}
          className="glass-panel glass-panel-interactive" 
          style={{ padding: 28, cursor: "pointer", borderLeft: "4px solid var(--spectral-teal)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ padding: 12, borderRadius: 10, background: "rgba(0, 245, 196, 0.1)" }}>
              <Skull size={28} color="var(--spectral-teal)" />
            </div>
            <ArrowUpRight size={20} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: 8, color: "#fff" }}>Séance Chamber</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
            Converse with the repository ghost. Inquire about origin stories, historical bugs, or refactoring intent backed by verifiable citations.
          </p>
        </div>

        {/* Portal: Timeline */}
        <div 
          onClick={() => setActiveTab("timeline")}
          className="glass-panel glass-panel-interactive" 
          style={{ padding: 28, cursor: "pointer", borderLeft: "4px solid var(--spectral-cyan)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ padding: 12, borderRadius: 10, background: "rgba(0, 210, 255, 0.1)" }}>
              <GitCommit size={28} color="var(--spectral-cyan)" />
            </div>
            <ArrowUpRight size={20} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: 8, color: "#fff" }}>Ghost Timeline</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
            Trace chronological commit inflection points, inspect code churn metrics, and filter by major releases and merge milestones.
          </p>
        </div>

        {/* Portal: Unfinished Vault */}
        <div 
          onClick={() => setActiveTab("unfinished")}
          className="glass-panel glass-panel-interactive" 
          style={{ padding: 28, cursor: "pointer", borderLeft: "4px solid var(--ancient-amber)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ padding: 12, borderRadius: 10, background: "rgba(255, 170, 64, 0.1)" }}>
              <AlertOctagon size={28} color="var(--ancient-amber)" />
            </div>
            <ArrowUpRight size={20} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: 8, color: "#fff" }}>Unfinished Vault</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
            Examine unresolved TODOs, high-severity FIXMEs, dangling documentation features, and abandoned unmerged branches.
          </p>
        </div>

        {/* Portal: Resurrection Scroll */}
        <div 
          onClick={() => setActiveTab("report")}
          className="glass-panel glass-panel-interactive" 
          style={{ padding: 28, cursor: "pointer", borderLeft: "4px solid var(--spectral-amethyst)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ padding: 12, borderRadius: 10, background: "rgba(168, 85, 247, 0.1)" }}>
              <ScrollText size={28} color="var(--spectral-amethyst)" />
            </div>
            <ArrowUpRight size={20} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: "1.2rem", marginBottom: 8, color: "#fff" }}>Resurrection Scroll</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
            Synthesize an evidence-backed resurrection blueprint and export structured Markdown / JSON revival checklists.
          </p>
        </div>
      </div>
    </div>
  );
}
