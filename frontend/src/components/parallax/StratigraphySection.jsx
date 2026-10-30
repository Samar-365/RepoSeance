import React from "react";
import { GitCommit, Layers, AlertOctagon, GitBranch, Terminal, ShieldAlert } from "lucide-react";

export default function StratigraphySection({ scrollY = 0, reducedMotion = false }) {
  const yFactor = reducedMotion ? 0 : 1;

  // Calculate relative progress for this section (assuming it begins around 600px - 1400px)
  const relativeY = Math.max(0, scrollY - 500);
  const layer1Offset = -(relativeY * 0.12 * yFactor);
  const layer2Offset = -(relativeY * 0.22 * yFactor);
  const layer3Offset = -(relativeY * 0.32 * yFactor);
  const layer4Offset = -(relativeY * 0.42 * yFactor);

  const strata = [
    {
      num: "01",
      name: "The Ephemeral Surface",
      depth: "Depth: 0m — Recent History",
      color: "var(--spectral-teal)",
      borderColor: "rgba(0, 245, 196, 0.3)",
      bg: "rgba(0, 245, 196, 0.04)",
      icon: <Layers size={20} color="var(--spectral-teal)" />,
      description: "The top layer of active branches, recent pull requests, and visible package manifests. Survives in working memory, but rapidly decays when developers leave.",
      evidence: "Commit HEAD: feat(frontend): implement gothic React+Vite UI",
      offset: layer1Offset
    },
    {
      num: "02",
      name: "The Churn Crucible",
      depth: "Depth: 150m — Refactor Storms",
      color: "var(--spectral-cyan)",
      borderColor: "rgba(0, 210, 255, 0.3)",
      bg: "rgba(0, 210, 255, 0.04)",
      icon: <GitCommit size={20} color="var(--spectral-cyan)" />,
      description: "High-frequency commit clusters where architecture was violently reworked. RepoSeance measures commit churn and diff metrics to detect pivot milestones.",
      evidence: "Pivot point: +1,278 lines / -410 lines in SQLite FTS5 migration",
      offset: layer2Offset
    },
    {
      num: "03",
      name: "The Unfinished Abyss",
      depth: "Depth: 350m — Lingering Specters",
      color: "var(--ancient-amber)",
      borderColor: "rgba(245, 158, 11, 0.3)",
      bg: "rgba(245, 158, 11, 0.04)",
      icon: <AlertOctagon size={20} color="var(--ancient-amber)" />,
      description: "Abandoned branches that were never merged, roadmap promises in markdown that never materialized, and severity-ranked TODO and FIXME comments buried in code.",
      evidence: "Unmerged branch 'experimental-rag' abandoned 14 months ago",
      offset: layer3Offset
    },
    {
      num: "04",
      name: "The Primeval Genesis",
      depth: "Depth: 600m — Foundational Bedrock",
      color: "var(--spectral-amethyst)",
      borderColor: "rgba(168, 85, 247, 0.3)",
      bg: "rgba(168, 85, 247, 0.04)",
      icon: <Terminal size={20} color="var(--spectral-amethyst)" />,
      description: "The initial root commit and foundational technical architecture. Contains the original pure intent and design constraints before entropy set in.",
      evidence: "Root commit [c7af8e9]: Initial project scaffolding & SRS",
      offset: layer4Offset
    }
  ];

  return (
    <section 
      id="stratigraphy"
      style={{
        position: "relative",
        padding: "120px 24px",
        maxWidth: 1240,
        margin: "0 auto",
        zIndex: 2
      }}
    >
      {/* Narrative Section Header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.8rem",
          color: "var(--spectral-teal)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em",
          marginBottom: 12
        }}>
          <span>ACT I</span>
          <span>•</span>
          <span>THE GEOLOGICAL DRILLDOWN</span>
        </div>

        <h2 className="font-gothic" style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          marginBottom: 16
        }}>
          Codebases as Archaeological Sites
        </h2>

        <p style={{
          color: "var(--text-secondary)",
          maxWidth: 680,
          margin: "0 auto",
          fontSize: "1.05rem",
          lineHeight: 1.6
        }}>
          Software does not rot homogeneously—it accumulates in historical strata. When you inherit a legacy codebase, reading files linearly is like staring at a cliffside without understanding the sedimentary record.
        </p>
      </div>

      {/* Layered Stratum Cards with Parallax Velocity Differences */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
        gap: 20,
        position: "relative"
      }}>
        {strata.map((stratum, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: 24,
              borderRadius: 14,
              border: `1px solid ${stratum.borderColor}`,
              background: stratum.bg,
              transform: `translate3d(0, ${stratum.offset * 0.4}px, 0)`,
              transition: "transform 0.08s linear, border-color 0.2s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              {/* Stratum Tag Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <span className="font-mono" style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: stratum.color,
                  opacity: 0.9
                }}>
                  {stratum.num}
                </span>

                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${stratum.borderColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {stratum.icon}
                </div>
              </div>

              <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>
                {stratum.depth}
              </div>

              <h3 className="font-gothic" style={{ fontSize: "1.2rem", marginBottom: 12, color: "#ffffff" }}>
                {stratum.name}
              </h3>

              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
                {stratum.description}
              </p>
            </div>

            {/* Extracted Artifact Excerpt Pill */}
            <div style={{
              background: "#07090e",
              border: "1px solid var(--border-subtle)",
              borderRadius: 8,
              padding: "10px 12px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: stratum.color,
              lineHeight: 1.4
            }}>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.68rem", marginBottom: 2 }}>
                SURVIVING ARTIFACT:
              </span>
              {stratum.evidence}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
