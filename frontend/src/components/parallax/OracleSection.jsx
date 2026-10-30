import React, { useState } from "react";
import { Skull, ShieldCheck, CheckCircle2, Terminal, Cpu, Database, Sparkles, BookOpen } from "lucide-react";

export default function OracleSection({ scrollY = 0, reducedMotion = false }) {
  const yFactor = reducedMotion ? 0 : 1;
  const relativeY = Math.max(0, scrollY - 1200);
  const terminalParallax = -(relativeY * 0.15 * yFactor);

  const [activeTab, setActiveTab] = useState("grounding");

  return (
    <section 
      id="oracle"
      style={{
        position: "relative",
        padding: "120px 24px",
        maxWidth: 1240,
        margin: "0 auto",
        zIndex: 2
      }}
    >
      {/* Act II Narrative Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.8rem",
          color: "var(--spectral-amethyst)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em",
          marginBottom: 12
        }}>
          <span>ACT II</span>
          <span>•</span>
          <span>THE SACRED ORACLE</span>
        </div>

        <h2 className="font-gothic" style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
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
          lineHeight: 1.6
        }}>
          Standard LLMs invent fictional commit histories and invent nonexistent functions. The Repository Ghost is constrained by an unyielding anti-hallucination pact: it speaks only of what survives in the archaeological record.
        </p>
      </div>

      {/* Main Dual-Chamber Interactive Display */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
        alignItems: "center"
      }}>
        {/* Left Column: Architectural Pillars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Pillar 1 */}
          <div 
            onClick={() => setActiveTab("grounding")}
            className="glass-panel"
            style={{
              padding: 22,
              borderRadius: 12,
              cursor: "pointer",
              borderLeft: activeTab === "grounding" ? "4px solid var(--spectral-teal)" : "1px solid var(--border-subtle)",
              background: activeTab === "grounding" ? "rgba(0, 245, 196, 0.05)" : "var(--bg-glass)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <CheckCircle2 size={18} color="var(--spectral-teal)" />
              <h3 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 600 }}>
                Strict Evidence Citations
              </h3>
            </div>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
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
              background: activeTab === "local" ? "rgba(168, 85, 247, 0.05)" : "var(--bg-glass)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <ShieldCheck size={18} color="var(--spectral-amethyst)" />
              <h3 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 600 }}>
                100% Local Privacy Guarantee
              </h3>
            </div>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
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
              background: activeTab === "fts5" ? "rgba(245, 158, 11, 0.05)" : "var(--bg-glass)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <Database size={18} color="var(--ancient-amber)" />
              <h3 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 600 }}>
                Millisecond SQLite FTS5 Search
              </h3>
            </div>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
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
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 245, 196, 0.12)",
            transform: `translate3d(0, ${terminalParallax}px, 0)`,
            transition: "transform 0.08s linear"
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
            padding: 22,
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
              padding: "10px 14px",
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
              <div style={{ color: "var(--spectral-teal)", fontWeight: 600, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <Skull size={14} />
                <span>Repository Ghost replies:</span>
              </div>
              <p style={{ fontSize: "0.83rem", color: "#cbd5e1", lineHeight: 1.6 }}>
                "The records show the caching layer was eliminated in <span className="evidence-chip">[Commit 8999ce8]</span> after recurring thread deadlocks crippled the worker pool. A lingering reminder remains at <span className="evidence-chip">[File backend/config.py:18]</span> acknowledging the need for a substitute, but no subsequent commits addressed it before the codebase went silent."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
