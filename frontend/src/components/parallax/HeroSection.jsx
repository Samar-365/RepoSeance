import React from "react";
import { Ghost, ArrowDown, Sparkles, Terminal, ChevronRight } from "lucide-react";

export default function HeroSection({ scrollY = 0, reducedMotion = false, onExplore, onSummonClick }) {
  const yFactor = reducedMotion ? 0 : 1;

  // Multi-tier parallax offsets
  const archesOffset = scrollY * 0.25 * yFactor;
  const contentOffset = scrollY * 0.45 * yFactor;
  const contentOpacity = Math.max(0, 1 - (scrollY / 600));
  const foregroundRelicsOffset = -scrollY * 0.55 * yFactor;

  return (
    <section 
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px 60px",
        overflow: "hidden"
      }}
    >
      {/* Background Architectural Layer: Gothic Crypt Arches */}
      <div 
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: `translate3d(-50%, ${archesOffset}px, 0)`,
          width: "100%",
          maxWidth: 1200,
          height: 600,
          pointerEvents: "none",
          opacity: 0.18,
          zIndex: 1,
          transition: "transform 0.05s linear"
        }}
      >
        <svg viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {/* Gothic Cathedral Pointed Arches & Pillars */}
          <path d="M150 600 V250 Q150 80 500 20 Q850 80 850 250 V600" stroke="#00f5c4" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M250 600 V300 Q250 140 500 80 Q750 140 750 300 V600" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 5" />
          <path d="M350 600 V360 Q350 200 500 150 Q650 200 650 360 V600" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          
          {/* Vertical Architectural Vault Ribs */}
          <line x1="500" y1="20" x2="500" y2="600" stroke="rgba(0, 245, 196, 0.4)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="150" y1="250" x2="500" y2="150" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.7" />
          <line x1="850" y1="250" x2="500" y2="150" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.7" />

          {/* Central Crypt Rose Window */}
          <circle cx="500" cy="220" r="70" stroke="#00f5c4" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
          <circle cx="500" cy="220" r="45" stroke="#a855f7" strokeWidth="0.8" opacity="0.6" />
          <circle cx="500" cy="220" r="20" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
        </svg>
      </div>

      {/* Main Narrative Hero Content (Moving at mid-speed with graceful fade) */}
      <div 
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 940,
          transform: `translate3d(0, ${contentOffset}px, 0)`,
          opacity: contentOpacity,
          transition: "transform 0.05s linear, opacity 0.05s linear"
        }}
      >
        {/* Floating Sigil Emblem */}
        <div style={{ display: "inline-flex", marginBottom: 20 }}>
          <div className="ghost-float" style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 245, 196, 0.25) 0%, rgba(168, 85, 247, 0.1) 70%, transparent 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(0, 245, 196, 0.4)",
            boxShadow: "0 0 35px rgba(0, 245, 196, 0.25), inset 0 0 15px rgba(0, 245, 196, 0.1)"
          }}>
            <Ghost size={38} color="var(--spectral-teal)" className="spectral-glow" />
          </div>
        </div>

        {/* Eyebrow Inscription */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 16
        }}>
          <span style={{ height: 1, width: 28, background: "rgba(0, 245, 196, 0.5)" }} />
          <span className="font-mono" style={{
            fontSize: "0.82rem",
            color: "var(--spectral-teal)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 500
          }}>
            Software Archaeology & Codebase Resurrection
          </span>
          <span style={{ height: 1, width: 28, background: "rgba(0, 245, 196, 0.5)" }} />
        </div>

        {/* Primary Gothic Headline */}
        <h1 className="font-gothic" style={{
          fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
          background: "linear-gradient(180deg, #ffffff 30%, #e2e8f0 70%, rgba(0, 245, 196, 0.9) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 20
        }}>
          Commune with the Ghosts of Dead Code
        </h1>

        {/* Subtitle Prose */}
        <p style={{
          fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
          color: "var(--text-secondary)",
          maxWidth: 720,
          margin: "0 auto 36px",
          lineHeight: 1.65,
          fontWeight: 400
        }}>
          Millions of abandoned repositories slumber across git history. RepoSeance peels back the stratigraphic layers of commits, tickets, and code markers to revive lost technical context—grounded in surviving evidence using local, private Gemma AI.
        </p>

        {/* Action Conduit */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 44
        }}>
          <button
            onClick={onSummonClick}
            className="btn btn-primary"
            style={{
              padding: "14px 28px",
              fontSize: "1rem",
              borderRadius: 10,
              boxShadow: "0 0 25px rgba(0, 245, 196, 0.35)"
            }}
          >
            <Sparkles size={18} />
            <span>Summon a Repository</span>
            <ChevronRight size={18} />
          </button>

          <button
            onClick={onExplore}
            className="btn btn-ghost"
            style={{
              padding: "14px 24px",
              fontSize: "0.95rem",
              borderRadius: 10,
              border: "1px solid var(--border-medium)"
            }}
          >
            <Terminal size={17} color="var(--spectral-teal)" />
            <span>Witness the Excavation</span>
          </button>
        </div>

        {/* Real-time Archaeological Telemetry Pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(18, 23, 34, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--border-dim)",
          borderRadius: 30,
          padding: "8px 20px",
          fontSize: "0.8rem",
          color: "var(--text-secondary)"
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--spectral-teal)" }} />
            Zero Cloud Leakage
          </span>
          <span style={{ color: "var(--border-bright)" }}>|</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--spectral-amethyst)" }} />
            Strict Evidence Citations
          </span>
          <span style={{ color: "var(--border-bright)" }}>|</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ancient-amber)" }} />
            Local Gemma 2 Inference
          </span>
        </div>
      </div>

      {/* Foreground Layer: Floating Code Relics Drifting Faster */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 4,
          transform: `translate3d(0, ${foregroundRelicsOffset}px, 0)`,
          transition: "transform 0.05s linear"
        }}
      >
        <div style={{
          position: "absolute",
          top: "65%",
          left: "5%",
          background: "rgba(14, 18, 26, 0.75)",
          border: "1px solid rgba(0, 245, 196, 0.3)",
          borderRadius: 8,
          padding: "8px 14px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--spectral-teal)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.5)"
        }}>
          [Commit 9faf6b13] Genesis of backend
        </div>

        <div style={{
          position: "absolute",
          top: "30%",
          right: "6%",
          background: "rgba(14, 18, 26, 0.75)",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          borderRadius: 8,
          padding: "8px 14px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--spectral-amethyst)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.5)"
        }}>
          # FIXME(author): unmerged branch
        </div>
      </div>

      {/* Subtle Cinematic Scroll Indicator */}
      <div 
        onClick={onExplore}
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "var(--text-muted)",
          transition: "color 0.2s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "var(--spectral-teal)"}
        onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
      >
        <span style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
          Descend into the Strata
        </span>
        <div className="ghost-float" style={{ animationDuration: "2s" }}>
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
}
