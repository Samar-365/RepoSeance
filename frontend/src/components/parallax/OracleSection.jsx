import React, { useState, useRef } from "react";
import { Skull, ShieldCheck, CheckCircle2, Terminal, Cpu, Database, Sparkles, BookOpen } from "lucide-react";
import { useSectionProgress } from "../../hooks/useParallax";

export default function OracleSection({ reducedMotion = false }) {
  const sectionRef = useRef(null);
  const { progress } = useSectionProgress(sectionRef);
  const yFactor = reducedMotion ? 0 : 1;

  // Counter-parallax: terminal moves up slightly, pillars move down slightly
  const terminalY = progress * 40 * yFactor;
  const pillarsY = progress * -30 * yFactor;
  const sigilRotate = progress * 35 * yFactor;

  const [activeTab, setActiveTab] = useState("grounding");

  return (
    <section 
      ref={sectionRef}
      id="oracle"
      style={{
        position: "relative",
        padding: "140px 24px",
        maxWidth: 1240,
        margin: "0 auto",
        zIndex: 2,
        overflow: "hidden"
      }}
    >
      {/* Background Sacred Geometric Sigil Rotating with Scroll */}
      <div 
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: 500,
          height: 500,
          pointerEvents: "none",
          opacity: 0.12,
          zIndex: 0,
          transform: `translate3d(0, ${terminalY * 0.5}px, 0) rotate(${sigilRotate}deg)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <circle cx="250" cy="250" r="230" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="250" cy="250" r="180" stroke="#00f5c4" strokeWidth="1" strokeDasharray="4 6" />
          <polygon points="250,30 440,360 60,360" stroke="#00f5c4" strokeWidth="1" opacity="0.6" />
          <polygon points="250,470 60,140 440,140" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
          <circle cx="250" cy="250" r="70" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
        </svg>
      </div>

      {/* Act II Narrative Header */}
      <div style={{ textAlign: "center", marginBottom: 64, position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.8rem",
          color: "var(--spectral-amethyst)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.12em",
          marginBottom: 12
        }}>
          <span>ACT II</span>
          <span>•</span>
          <span>THE SACRED ORACLE</span>
        </div>

        <h2 className="font-gothic" style={{
          fontSize: "clamp(2.1rem, 4.2vw, 3.2rem)",
          fontWeight: 700,
          marginBottom: 16
        }}>
          Inference Without Hallucination
        </h2>

        <p style={{
          color: "var(--text-secondary)",
          maxWidth: 680,
          margin: "0 auto",
          fontSize: "1.05rem",
          lineHeight: 1.65
        }}>
          Standard LLMs invent fictional commit histories and invent nonexistent functions. The Repository Ghost is constrained by an unyielding anti-hallucination pact: it speaks only of what survives in the archaeological record.
        </p>
      </div>

      {/* Main Dual-Chamber Display */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 26,
        alignItems: "center",
        position: "relative",
        zIndex: 1
      }}>
        {/* Left Column: Architectural Pillars */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          transform: `translate3d(0, ${pillarsY}px, 0)`,
          transition: "transform 0.1s ease-out"
        }}>
          {/* Pillar 1 */}
          <div 
            onClick={() => setActiveTab("grounding")}
            className="glass-panel"
            style={{
              padding: 22,
              borderRadius: 12,
              cursor: "pointer",
              borderLeft: activeTab === "grounding" ? "4px solid var(--spectral-teal)" : "1px solid var(--border-subtle)",
              background: activeTab === "grounding" ? "rgba(0, 245, 196, 0.06)" : "var(--bg-glass)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <CheckCircle2 size={18} color="var(--spectral-teal)" />
              <h3 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 600 }}>
                Strict Evidence Citations
              </h3>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Every factual assertion requires an unshakeable citation tag—[Commit &lt;hash&gt;], [File &lt;path&gt;:&lt;line&gt;], or [Issue #&lt;number&gt;]. If the surviving records are inconclusive, the Ghost explicitly admits uncertainty.
            </p>
          </div>

          {/* Pillar 2 */}
          <div 
            onClick={() => setActiveTab("local")}
            className="glass-panel"
            style={{
              padding: 22,
              borderRadius: 12,
              cursor: "pointer",
              borderLeft: activeTab === "local" ? "4px solid var(--spectral-amethyst)" : "1px solid var(--border-subtle)",
              background: activeTab === "local" ? "rgba(168, 85, 247, 0.06)" : "var(--bg-glass)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <ShieldCheck size={18} color="var(--spectral-amethyst)" />
              <h3 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 600 }}>
                100% Local Privacy Guarantee
              </h3>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Untrusted source code is never transmitted to cloud AI endpoints. All token inference runs locally using Google Gemma 2 models via Ollama on your machine.
            </p>
          </div>

          {/* Pillar 3 */}
          <div 
            onClick={() => setActiveTab("fts5")}
            className="glass-panel"
            style={{
              padding: 22,
              borderRadius: 12,
              cursor: "pointer",
              borderLeft: activeTab === "fts5" ? "4px solid var(--ancient-amber)" : "1px solid var(--border-subtle)",
              background: activeTab === "fts5" ? "rgba(245, 158, 11, 0.06)" : "var(--bg-glass)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Database size={18} color="var(--ancient-amber)" />
              <h3 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 600 }}>
                Millisecond SQLite FTS5 Search
              </h3>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Zero heavy vector databases or complex cloud infrastructure. A lightweight SQLite full-text search (BM25) index extracts exact commit diffs and code snippets in under 5 milliseconds.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Terminal Oracle Simulation with Parallax Depth */}
        <div 
          className="glass-panel"
          style={{
            borderRadius: 14,
            overflow: "hidden",
            borderColor: "var(--border-medium)",
            boxShadow: "0 22px 55px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 245, 196, 0.12)",
            transform: `translate3d(0, ${terminalY}px, 0)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          {/* Terminal Title Bar */}
          <div style={{
            background: "rgba(8, 10, 16, 0.95)",
            padding: "12px 18px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
              <span className="font-mono" style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginLeft: 8 }}>
                seance-oracle :: gemma2:2b (local)
              </span>
            </div>

            <span className="badge badge-teal" style={{ fontSize: "0.68rem" }}>
              Active Grounding
            </span>
          </div>

          {/* Terminal Screen Body */}
          <div style={{
            background: "#06080d",
            padding: 24,
            fontFamily: "var(--font-mono)",
            fontSize: "0.84rem",
            lineHeight: 1.65,
            color: "#e2e8f0"
          }}>
            {/* Terminal Input Query */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: "var(--spectral-teal)" }}>traveler@crypt:~$ </span>
              <span style={{ color: "#ffffff" }}>reposeance ask "Why was the caching layer abandoned?"</span>
            </div>

            {/* Retrieval Log */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 6,
              padding: "12px 14px",
              marginBottom: 16,
              fontSize: "0.78rem",
              color: "var(--text-muted)"
            }}>
              <div>[FTS5] Matching query 'caching layer' across 500 commit diffs...</div>
              <div style={{ color: "var(--spectral-teal)" }}>✓ Matched [Commit 8999ce8]: "perf: purge Redis cache layer due to deadlocks"</div>
              <div style={{ color: "var(--ancient-amber)" }}>✓ Matched [File backend/config.py:18]: "# FIXME: replace caching mechanism"</div>
            </div>

            {/* Ghost Response */}
            <div style={{
              borderLeft: "2px solid var(--spectral-teal)",
              paddingLeft: 14,
              color: "var(--text-primary)"
            }}>
              <div style={{ color: "var(--spectral-teal)", fontWeight: 600, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <Skull size={14} />
                <span>Repository Ghost replies:</span>
              </div>
              <p style={{ fontSize: "0.84rem", color: "#cbd5e1", lineHeight: 1.65 }}>
                "The records show the caching layer was eliminated in <span className="evidence-chip">[Commit 8999ce8]</span> after recurring thread deadlocks crippled the worker pool. A lingering reminder remains at <span className="evidence-chip">[File backend/config.py:18]</span> acknowledging the need for a substitute, but no subsequent commits addressed it before the codebase went silent."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
