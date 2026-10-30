import React, { useRef } from "react";
import { Ghost, ArrowDown, Sparkles, Terminal, ChevronRight, Shield, Database, Cpu } from "lucide-react";
import { useSectionProgress } from "../../hooks/useParallax";

export default function HeroSection({ scrollY = 0, mousePos = { x: 0, y: 0 }, reducedMotion = false, onExplore, onSummonClick }) {
  const sectionRef = useRef(null);
  const { progress } = useSectionProgress(sectionRef);
  const yFactor = reducedMotion ? 0 : 1;

  // Background gothic arches drift with scroll and subtle mouse tilt
  const archesY = scrollY * 0.22 * yFactor;
  const archesMouseX = mousePos.x * -12 * yFactor;
  const archesMouseY = mousePos.y * -8 * yFactor;

  // Hero content scale, opacity, and drift
  const contentY = scrollY * 0.38 * yFactor;
  const contentOpacity = Math.max(0, 1 - scrollY / 650);
  const contentScale = Math.max(0.92, 1 - scrollY * 0.00025 * yFactor);

  // Foreground relics move faster and counter-tilt with mouse
  const relic1Y = -scrollY * 0.45 * yFactor + mousePos.y * 14 * yFactor;
  const relic1X = mousePos.x * 12 * yFactor;
  const relic2Y = -scrollY * 0.6 * yFactor + mousePos.y * -16 * yFactor;
  const relic2X = mousePos.x * -14 * yFactor;

  return (
    <section 
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 24px 70px",
        overflow: "hidden",
        perspective: "1000px"
      }}
    >
      {/* Background Architectural Layer: Deep Pointed Gothic Crypt Vaults */}
      <div 
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: `translate3d(-50%, ${archesY}px, 0) translate3d(${archesMouseX}px, ${archesMouseY}px, 0)`,
          width: "100%",
          maxWidth: 1280,
          height: 640,
          pointerEvents: "none",
          opacity: 0.22,
          zIndex: 1,
          transition: "transform 0.12s ease-out",
          filter: "drop-shadow(0 0 20px rgba(0, 245, 196, 0.15))"
        }}
      >
        <svg viewBox="0 0 1000 640" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {/* Gothic Cathedral Pointed Arches & Pillars */}
          <path d="M120 640 V240 Q120 70 500 15 Q880 70 880 240 V640" stroke="#00f5c4" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M220 640 V290 Q220 130 500 75 Q780 130 780 290 V640" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 5" />
          <path d="M320 640 V350 Q320 190 500 140 Q680 190 680 350 V640" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          
          {/* Vertical Architectural Vault Ribs */}
          <line x1="500" y1="15" x2="500" y2="640" stroke="rgba(0, 245, 196, 0.45)" strokeWidth="1.2" strokeDasharray="2 4" />
          <line x1="120" y1="240" x2="500" y2="140" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="0.8" />
          <line x1="880" y1="240" x2="500" y2="140" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="0.8" />

          {/* Central Crypt Rose Window */}
          <circle cx="500" cy="210" r="76" stroke="#00f5c4" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
          <circle cx="500" cy="210" r="50" stroke="#a855f7" strokeWidth="0.8" opacity="0.7" />
          <circle cx="500" cy="210" r="22" stroke="#ffffff" strokeWidth="0.6" opacity="0.85" />
        </svg>
      </div>

      {/* Main Narrative Hero Core */}
      <div 
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 960,
          transform: `translate3d(0, ${contentY}px, 0) scale(${contentScale})`,
          opacity: contentOpacity,
          transition: "transform 0.08s ease-out, opacity 0.08s ease-out"
        }}
      >
        {/* Floating Sigil Emblem */}
        <div style={{ display: "inline-flex", marginBottom: 22 }}>
          <div className="ghost-float" style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 245, 196, 0.28) 0%, rgba(168, 85, 247, 0.12) 65%, transparent 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(0, 245, 196, 0.45)",
            boxShadow: "0 0 35px rgba(0, 245, 196, 0.3), inset 0 0 15px rgba(0, 245, 196, 0.15)"
          }}>
            <Ghost size={40} color="var(--spectral-teal)" className="spectral-glow" />
          </div>
        </div>

        {/* Eyebrow Inscription */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginBottom: 16
        }}>
          <span style={{ height: 1, width: 32, background: "linear-gradient(90deg, transparent, var(--spectral-teal))" }} />
          <span className="font-mono" style={{
            fontSize: "0.82rem",
            color: "var(--spectral-teal)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 500
          }}>
            Software Archaeology & Codebase Resurrection
          </span>
          <span style={{ height: 1, width: 32, background: "linear-gradient(90deg, var(--spectral-teal), transparent)" }} />
        </div>

        {/* Primary Gothic Headline */}
        <h1 className="font-gothic" style={{
          fontSize: "clamp(2.7rem, 6.2vw, 4.9rem)",
          fontWeight: 800,
          lineHeight: 1.06,
          letterSpacing: "-0.01em",
          background: "linear-gradient(180deg, #ffffff 30%, #e2e8f0 70%, rgba(0, 245, 196, 0.95) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 22
        }}>
          Commune with the Ghosts of Dead Code
        </h1>

        {/* Subtitle Prose */}
        <p style={{
          fontSize: "clamp(1.02rem, 1.9vw, 1.22rem)",
          color: "var(--text-secondary)",
          maxWidth: 720,
          margin: "0 auto 36px",
          lineHeight: 1.7,
          fontWeight: 400
        }}>
          Millions of abandoned repositories slumber across git history. RepoSeance peels back the stratigraphic layers of commits, tickets, and code markers to revive lost technical context—grounded in surviving evidence using local, private Gemma AI.
        </p>

        {/* Action Conduit Buttons */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 42
        }}>
          <button
            onClick={onSummonClick}
            className="btn btn-primary"
            style={{
              padding: "14px 30px",
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
          gap: 14,
          background: "rgba(18, 23, 34, 0.75)",
          backdropFilter: "blur(14px)",
          border: "1px solid var(--border-dim)",
          borderRadius: 30,
          padding: "8px 22px",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--spectral-teal)", boxShadow: "0 0 8px var(--spectral-teal)" }} />
            Zero Cloud Leakage
          </span>
          <span style={{ color: "var(--border-bright)" }}>•</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--spectral-amethyst)", boxShadow: "0 0 8px var(--spectral-amethyst)" }} />
            Strict Evidence Grounding
          </span>
          <span style={{ color: "var(--border-bright)" }}>•</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ancient-amber)", boxShadow: "0 0 8px var(--ancient-amber)" }} />
            Local Gemma 2:2b
          </span>
        </div>
      </div>

      {/* Foreground Layer: Floating Code Relics Drifting with Independent Parallax & Mouse Response */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 4,
          overflow: "hidden"
        }}
      >
        {/* Left Relic */}
        <div 
          className="glass-panel"
          style={{
            position: "absolute",
            top: "62%",
            left: "4%",
            transform: `translate3d(${relic1X}px, ${relic1Y}px, 0)`,
            transition: "transform 0.12s ease-out",
            padding: "10px 16px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--spectral-teal)",
            border: "1px solid rgba(0, 245, 196, 0.35)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.6), 0 0 15px rgba(0, 245, 196, 0.15)",
            display: "none", // Visible on wider screens
            maxWidth: 280
          }}
          className="desktop-only-relic"
        >
          <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginBottom: 2 }}>GENESIS RELIC</div>
          <div>[Commit 9faf6b13] feat(backend): init</div>
        </div>

        {/* Right Relic */}
        <div 
          className="glass-panel"
          style={{
            position: "absolute",
            top: "32%",
            right: "5%",
            transform: `translate3d(${relic2X}px, ${relic2Y}px, 0)`,
            transition: "transform 0.12s ease-out",
            padding: "10px 16px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--ancient-amber)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.6), 0 0 15px rgba(245, 158, 11, 0.15)",
            display: "none",
            maxWidth: 280
          }}
          className="desktop-only-relic"
        >
          <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginBottom: 2 }}>SPECTER IN CODE</div>
          <div># FIXME(author): unmerged branch</div>
        </div>
      </div>

      {/* Subtle Cinematic Scroll Prompt */}
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
