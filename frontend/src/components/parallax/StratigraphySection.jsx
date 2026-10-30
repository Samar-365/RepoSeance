import React, { useRef } from "react";
import { GitCommit, Layers, AlertOctagon, GitBranch, Terminal, ShieldAlert, ArrowDown } from "lucide-react";
import { useSectionProgress } from "../../hooks/useParallax";

export default function StratigraphySection({ reducedMotion = false }) {
  const sectionRef = useRef(null);
  const { progress } = useSectionProgress(sectionRef);
  const yFactor = reducedMotion ? 0 : 1;

  // Strata with calculated individual speeds based on section progress
  const strata = [
    {
      num: "01",
      name: "The Ephemeral Surface",
      depth: "Depth: 0m — Recent Commit Strata",
      color: "var(--spectral-teal)",
      borderColor: "rgba(0, 245, 196, 0.35)",
      bg: "linear-gradient(135deg, rgba(0, 245, 196, 0.07) 0%, rgba(14, 18, 27, 0.85) 100%)",
      icon: <Layers size={20} color="var(--spectral-teal)" />,
      description: "The top sedimentary layer of active branches, recent pull requests, and visible package manifests. Survives in living memory, but rapidly decays when original authors depart.",
      evidence: "Commit HEAD: feat(frontend): implement gothic React+Vite UI",
      speed: 0.15,
      side: "left"
    },
    {
      num: "02",
      name: "The Churn Crucible",
      depth: "Depth: -150m — Refactor Storms & Pivots",
      color: "var(--spectral-cyan)",
      borderColor: "rgba(0, 210, 255, 0.35)",
      bg: "linear-gradient(135deg, rgba(0, 210, 255, 0.07) 0%, rgba(14, 18, 27, 0.85) 100%)",
      icon: <GitCommit size={20} color="var(--spectral-cyan)" />,
      description: "High-frequency commit clusters where architecture was violently reworked. RepoSeance measures commit churn and diff volatility to detect pivotal inflection points.",
      evidence: "Pivot point: +1,278 lines / -410 lines during SQLite FTS5 migration",
      speed: -0.1,
      side: "right"
    },
    {
      num: "03",
      name: "The Unfinished Abyss",
      depth: "Depth: -350m — Lingering Specters",
      color: "var(--ancient-amber)",
      borderColor: "rgba(245, 158, 11, 0.35)",
      bg: "linear-gradient(135deg, rgba(245, 158, 11, 0.07) 0%, rgba(14, 18, 27, 0.85) 100%)",
      icon: <AlertOctagon size={20} color="var(--ancient-amber)" />,
      description: "Abandoned branches that were never merged, roadmap promises in markdown that never materialized, and severity-ranked TODO and FIXME markers buried in source files.",
      evidence: "Unmerged branch 'experimental-rag' abandoned 14 months ago",
      speed: 0.22,
      side: "left"
    },
    {
      num: "04",
      name: "The Primeval Bedrock",
      depth: "Depth: -600m — Foundational Genesis",
      color: "var(--spectral-amethyst)",
      borderColor: "rgba(168, 85, 247, 0.35)",
      bg: "linear-gradient(135deg, rgba(168, 85, 247, 0.07) 0%, rgba(14, 18, 27, 0.85) 100%)",
      icon: <Terminal size={20} color="var(--spectral-amethyst)" />,
      description: "The initial root commit and founding technical architecture. Contains the original pure intent and design constraints before entropy and abandon set in.",
      evidence: "Root commit [c7af8e9]: Initial project scaffolding & SRS",
      speed: -0.18,
      side: "right"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="stratigraphy"
      style={{
        position: "relative",
        padding: "140px 24px",
        maxWidth: 1200,
        margin: "0 auto",
        zIndex: 2
      }}
    >
      {/* Narrative Section Header */}
      <div style={{ textAlign: "center", marginBottom: 70 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.8rem",
          color: "var(--spectral-teal)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.12em",
          marginBottom: 12
        }}>
          <span>ACT I</span>
          <span>•</span>
          <span>THE GEOLOGICAL DRILLDOWN</span>
        </div>

        <h2 className="font-gothic" style={{
          fontSize: "clamp(2.1rem, 4.2vw, 3.2rem)",
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
          lineHeight: 1.65
        }}>
          Software does not decay homogeneously—it accumulates in historical strata. RepoSeance reconstructs the timeline chronologically, distinguishing the latest facade from the deep foundational bedrock.
        </p>
      </div>

      {/* Vertical Stratigraphic Drilldown Column */}
      <div style={{ position: "relative", padding: "20px 0" }}>
        {/* Central Luminous Depth Axis */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(180deg, var(--spectral-teal) 0%, var(--spectral-cyan) 35%, var(--ancient-amber) 70%, var(--spectral-amethyst) 100%)",
          opacity: 0.35,
          transform: "translateX(-50%)",
          display: "none" // Shown via media query on desktop
        }} className="desktop-timeline-axis" />

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {strata.map((stratum, idx) => {
            // Parallax offset proportional to section progress and layer speed
            const layerY = progress * 60 * stratum.speed * yFactor;

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: stratum.side === "left" ? "flex-start" : "flex-end",
                  position: "relative"
                }}
              >
                {/* Stratum Card */}
                <div
                  className="glass-panel"
                  style={{
                    width: "100%",
                    maxWidth: 540,
                    padding: 26,
                    borderRadius: 14,
                    border: `1px solid ${stratum.borderColor}`,
                    background: stratum.bg,
                    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.5)",
                    transform: `translate3d(0, ${layerY}px, 0)`,
                    transition: "transform 0.1s ease-out, border-color 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="font-mono" style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: stratum.color
                      }}>
                        {stratum.num}
                      </span>
                      <h3 className="font-gothic" style={{ fontSize: "1.2rem", color: "#ffffff" }}>
                        {stratum.name}
                      </h3>
                    </div>

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

                  <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginBottom: 12 }}>
                    {stratum.depth}
                  </div>

                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 18 }}>
                    {stratum.description}
                  </p>

                  {/* Excavated Code Fragment Excerpt */}
                  <div style={{
                    background: "#07090e",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: stratum.color,
                    lineHeight: 1.45
                  }}>
                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.68rem", marginBottom: 3 }}>
                      EXTRACTED RELIC:
                    </span>
                    {stratum.evidence}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
