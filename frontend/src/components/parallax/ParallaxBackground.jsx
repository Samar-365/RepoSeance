import React from "react";

export default function ParallaxBackground({ scrollY = 0, reducedMotion = false }) {
  // If reduced motion is requested, render static background
  const yFactor = reducedMotion ? 0 : 1;

  // Parallax offsets for distinct celestial/atmospheric layers
  const starsOffset = -(scrollY * 0.08 * yFactor);
  const glyphsOffset = -(scrollY * 0.22 * yFactor);
  const fogOffset = -(scrollY * 0.15 * yFactor);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden"
    }}>
      {/* Layer 1: Ambient Lighting Wells */}
      <div style={{
        position: "absolute",
        top: "-20%",
        left: "10%",
        width: "70vw",
        height: "70vw",
        maxWidth: 900,
        maxHeight: 900,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0, 245, 196, 0.04) 0%, transparent 65%)",
        transform: `translate3d(0, ${starsOffset * 0.5}px, 0)`,
        transition: "transform 0.1s ease-out"
      }} />

      <div style={{
        position: "absolute",
        top: "40%",
        right: "-10%",
        width: "60vw",
        height: "60vw",
        maxWidth: 800,
        maxHeight: 800,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168, 85, 247, 0.04) 0%, transparent 65%)",
        transform: `translate3d(0, ${starsOffset * 0.8}px, 0)`,
        transition: "transform 0.1s ease-out"
      }} />

      {/* Layer 2: Distant Celestial & Rune Stars */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "140%",
          transform: `translate3d(0, ${starsOffset}px, 0)`,
          opacity: 0.6
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f5c4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f5c4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Distributed Star Points */}
        <circle cx="15%" cy="12%" r="1.5" fill="#f1f5f9" opacity="0.4" />
        <circle cx="28%" cy="8%" r="1" fill="#00f5c4" opacity="0.6" />
        <circle cx="45%" cy="22%" r="2" fill="url(#starGlow)" />
        <circle cx="70%" cy="15%" r="1.5" fill="#f1f5f9" opacity="0.5" />
        <circle cx="85%" cy="28%" r="1" fill="#a855f7" opacity="0.6" />
        <circle cx="12%" cy="45%" r="1.5" fill="#f1f5f9" opacity="0.3" />
        <circle cx="35%" cy="55%" r="2" fill="url(#starGlow)" />
        <circle cx="62%" cy="48%" r="1" fill="#f1f5f9" opacity="0.4" />
        <circle cx="80%" cy="65%" r="1.5" fill="#00f5c4" opacity="0.5" />
        <circle cx="25%" cy="78%" r="1" fill="#f1f5f9" opacity="0.3" />
        <circle cx="50%" cy="85%" r="2" fill="#a855f7" opacity="0.5" />
        <circle cx="75%" cy="92%" r="1.5" fill="url(#starGlow)" />

        {/* Subtle Constellation Ley Lines */}
        <line x1="15%" y1="12%" x2="28%" y2="8%" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,6" />
        <line x1="28%" y1="8%" x2="45%" y2="22%" stroke="rgba(0,245,196,0.08)" strokeDasharray="2,4" />
        <line x1="70%" y1="15%" x2="85%" y2="28%" stroke="rgba(168,85,247,0.08)" strokeDasharray="3,6" />
        <line x1="35%" y1="55%" x2="62%" y2="48%" stroke="rgba(255,255,255,0.05)" strokeDasharray="4,8" />
      </svg>

      {/* Layer 3: Floating Archaeological Code Runes & Hex Tokens */}
      <div style={{
        position: "absolute",
        inset: 0,
        height: "160%",
        transform: `translate3d(0, ${glyphsOffset}px, 0)`,
        opacity: 0.35,
        fontFamily: "var(--font-mono)",
        fontSize: "0.74rem",
        color: "var(--text-muted)",
        userSelect: "none"
      }}>
        <span style={{ position: "absolute", top: "18%", left: "8%", color: "rgba(0, 245, 196, 0.4)" }}>0x7F_SEANCE</span>
        <span style={{ position: "absolute", top: "26%", right: "12%", color: "rgba(168, 85, 247, 0.35)" }}>// TODO: revive</span>
        <span style={{ position: "absolute", top: "42%", left: "14%" }}>commit: 9faf6b13</span>
        <span style={{ position: "absolute", top: "54%", right: "8%", color: "rgba(0, 210, 255, 0.35)" }}>&lt;FossilizedStrata /&gt;</span>
        <span style={{ position: "absolute", top: "68%", left: "6%" }}>branch: forgotten-fix</span>
        <span style={{ position: "absolute", top: "82%", right: "15%", color: "rgba(245, 158, 11, 0.35)" }}>AST::traverse()</span>
      </div>

      {/* Layer 4: Distant Spectral Mist Gradient at the Horizon */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "35vh",
        background: "linear-gradient(to top, rgba(6, 7, 10, 0.95) 0%, transparent 100%)",
        transform: `translate3d(0, ${fogOffset}px, 0)`
      }} />
    </div>
  );
}
