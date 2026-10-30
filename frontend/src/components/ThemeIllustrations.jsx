import React from "react";

/**
 * Minimalist Hero Theme Illustration
 * Ghost rising above a sleek git commit tree.
 */
export function HeroGhostIllustration({ width = 480, height = 320, className = "" }) {
  return (
    <svg
      viewBox="0 0 500 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "100%", height: "auto" }}
      className={className}
    >
      <defs>
        <linearGradient id="ghostGlow" x1="250" y1="40" x2="250" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="treeGrad" x1="100" y1="280" x2="400" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="auraGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="250" cy="140" r="140" fill="url(#auraGlow)" />

      {/* Grid Lines */}
      <line x1="80" y1="140" x2="420" y2="140" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="80" y1="220" x2="420" y2="220" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="250" y1="40" x2="250" y2="300" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />

      {/* Tree Lines */}
      <path d="M 80 280 L 420 280" stroke="url(#treeGrad)" strokeWidth="2" />
      <path d="M 180 280 C 200 240, 220 230, 270 230 L 370 230" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7" />
      <path d="M 270 280 C 290 310, 310 310, 360 310 L 420 310" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

      <path d="M 210 230 L 210 180" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      <path d="M 290 230 L 290 170" stroke="#818cf8" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />

      {/* Nodes */}
      <circle cx="120" cy="280" r="4" fill="#090b10" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="180" cy="280" r="5" fill="#38bdf8" />
      <circle cx="270" cy="280" r="4" fill="#090b10" stroke="#818cf8" strokeWidth="2" />
      <circle cx="340" cy="280" r="4" fill="#090b10" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="400" cy="280" r="5" fill="#818cf8" />

      <circle cx="270" cy="230" r="4" fill="#090b10" stroke="#818cf8" strokeWidth="2" />
      <circle cx="330" cy="230" r="3.5" fill="#818cf8" opacity="0.8" />
      <circle cx="370" cy="230" r="4" fill="#090b10" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="2 2" />

      {/* Ghost */}
      <g transform="translate(0, -6)">
        <path
          d="M 250 50
             C 215 50, 195 80, 195 125
             C 195 165, 185 190, 180 205
             C 192 196, 204 206, 216 196
             C 228 206, 240 196, 250 205
             C 260 196, 272 206, 284 196
             C 296 206, 308 196, 320 205
             C 315 190, 305 165, 305 125
             C 305 80, 285 50, 250 50 Z"
          stroke="url(#ghostGlow)"
          strokeWidth="2.2"
          fill="rgba(56, 189, 248, 0.04)"
        />
        <circle cx="236" cy="115" r="4" fill="#38bdf8" />
        <circle cx="264" cy="115" r="4" fill="#38bdf8" />
        <path d="M 238 145 L 230 152 L 238 159" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 262 145 L 270 152 L 262 159" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="254" y1="143" x2="246" y2="161" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        <ellipse cx="250" cy="42" rx="26" ry="6" stroke="#38bdf8" strokeWidth="1.2" opacity="0.6" strokeDasharray="3 3" />
      </g>

      <text x="110" y="302" fill="#64748b" fontSize="9" fontFamily="monospace">init</text>
      <text x="260" y="220" fill="#818cf8" fontSize="9" fontFamily="monospace">ghost/v0.8</text>
      <text x="390" y="302" fill="#38bdf8" fontSize="9" fontFamily="monospace">HEAD</text>
    </svg>
  );
}

/**
 * Small Side Mascot Illustration - Oracle Ghost
 * Compact (size ~80px) for placement at the side
 */
export function SmallGhostOracle({ size = 76, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="smallAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient background glow ring */}
      <circle cx="45" cy="45" r="42" fill="url(#smallAura)" />
      <circle cx="45" cy="45" r="40" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" strokeDasharray="3 4" />

      {/* Floating dashed halo */}
      <ellipse cx="45" cy="18" rx="14" ry="3.5" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />

      {/* Ghost Silhouette */}
      <path
        d="M 45 20
           C 32 20, 24 31, 24 47
           C 24 61, 20 68, 18 72
           C 23 69, 28 72, 33 69
           C 38 72, 43 69, 45 72
           C 47 69, 52 72, 57 69
           C 62 72, 67 69, 72 72
           C 70 68, 66 61, 66 47
           C 66 31, 58 20, 45 20 Z"
        stroke="#818cf8"
        strokeWidth="1.6"
        fill="rgba(129, 140, 248, 0.08)"
      />

      {/* Glowing eyes */}
      <circle cx="40" cy="42" r="2.4" fill="#38bdf8" />
      <circle cx="50" cy="42" r="2.4" fill="#38bdf8" />

      {/* Micro commit telemetry */}
      <circle cx="72" cy="28" r="2" fill="#38bdf8" opacity="0.7" />
      <circle cx="18" cy="34" r="1.5" fill="#818cf8" opacity="0.6" />
      <path d="M 42 52 L 40 54 L 42 56" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" />
      <path d="M 48 52 L 50 54 L 48 56" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Timeline Section Hero Banner - Minimalist Git Graph & Spectral Nodes
 */
export function TimelineBannerIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 600 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      className={className}
    >
      <defs>
        <linearGradient id="timeTrunk" x1="40" y1="65" x2="560" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="600" height="130" rx="10" fill="#090b10" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
      <line x1="40" y1="35" x2="560" y2="35" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="40" y1="95" x2="560" y2="95" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 6" />

      <path d="M 40 65 L 560 65" stroke="url(#timeTrunk)" strokeWidth="2" />
      <path d="M 160 65 C 190 25, 230 25, 300 25 L 390 25" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M 320 65 C 350 105, 380 105, 460 105 L 520 105" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />

      <circle cx="80" cy="65" r="4.5" fill="#090b10" stroke="#38bdf8" strokeWidth="2" />
      <text x="70" y="85" fill="#64748b" fontSize="8" fontFamily="monospace">v0.1</text>
      <circle cx="160" cy="65" r="5" fill="#38bdf8" />
      <circle cx="240" cy="65" r="4" fill="#090b10" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="320" cy="65" r="5.5" fill="#38bdf8" />
      <circle cx="420" cy="65" r="4" fill="#090b10" stroke="#818cf8" strokeWidth="2" />
      <circle cx="510" cy="65" r="6" fill="#818cf8" />
      <text x="498" y="85" fill="#818cf8" fontSize="8" fontFamily="monospace">HEAD</text>

      <circle cx="260" cy="25" r="3.5" fill="#818cf8" />
      <circle cx="330" cy="25" r="4" fill="#090b10" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="2 2" />
      <text x="315" y="16" fill="#818cf8" fontSize="8" fontFamily="monospace">abandoned/auth</text>

      <circle cx="410" cy="105" r="3.5" fill="#38bdf8" />
      <circle cx="480" cy="105" r="4" fill="#090b10" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="450" y="122" fill="#38bdf8" fontSize="8" fontFamily="monospace">refactor/core</text>

      <g transform="translate(185, 38)">
        <path
          d="M 20 6 C 14 6, 10 11, 10 18 C 10 24, 8 28, 6 30 C 9 29, 12 30, 15 29 C 18 30, 21 29, 24 30 C 27 29, 30 30, 32 30 C 31 28, 29 24, 29 18 C 29 11, 26 6, 20 6 Z"
          stroke="#38bdf8"
          strokeWidth="1.2"
          fill="#090b10"
        />
        <circle cx="17" cy="14" r="1.2" fill="#38bdf8" />
        <circle cx="23" cy="14" r="1.2" fill="#38bdf8" />
      </g>
    </svg>
  );
}

/**
 * Issues & TODOs Section Hero Banner - Archaeological Code Stratum
 */
export function ExcavationBannerIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 600 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      className={className}
    >
      <rect width="600" height="120" rx="10" fill="#090b10" stroke="rgba(251, 146, 60, 0.2)" strokeWidth="1" />
      <line x1="30" y1="40" x2="570" y2="40" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="30" y1="80" x2="570" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 6" />

      <rect x="60" y="22" width="130" height="34" rx="6" fill="#0f131a" stroke="#f87171" strokeWidth="1.4" />
      <circle cx="76" cy="39" r="4" fill="#f87171" opacity="0.3" />
      <text x="73" y="42" fill="#f87171" fontSize="9" fontWeight="bold">!</text>
      <text x="88" y="38" fill="#fff" fontSize="9" fontFamily="monospace">FIXME: memory leak</text>
      <text x="88" y="48" fill="#64748b" fontSize="7.5" fontFamily="monospace">auth_handler.py:142</text>

      <rect x="225" y="46" width="140" height="34" rx="6" fill="#0f131a" stroke="#fb923c" strokeWidth="1.4" />
      <circle cx="241" cy="63" r="4" fill="#fb923c" opacity="0.3" />
      <text x="238" y="66" fill="#fb923c" fontSize="8" fontWeight="bold">?</text>
      <text x="253" y="62" fill="#fff" fontSize="9" fontFamily="monospace">TODO: remove v1 api</text>
      <text x="253" y="72" fill="#64748b" fontSize="7.5" fontFamily="monospace">routes/api.js:88</text>

      <rect x="400" y="32" width="140" height="34" rx="6" fill="#0f131a" stroke="#38bdf8" strokeWidth="1.4" />
      <text x="415" y="48" fill="#fff" fontSize="9" fontFamily="monospace">HACK: temporary lock</text>
      <text x="415" y="58" fill="#64748b" fontSize="7.5" fontFamily="monospace">worker/queue.go:31</text>

      <circle cx="380" cy="50" r="16" stroke="#fb923c" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" />
      <line x1="380" y1="28" x2="380" y2="72" stroke="#fb923c" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" />
      <line x1="358" y1="50" x2="402" y2="50" stroke="#fb923c" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" />
    </svg>
  );
}

/**
 * Report Section Hero Banner - Resurrection Blueprint & Feasibility Codex
 */
export function ReportBlueprintBannerIllustration({ isGenerated = false, score = 92, className = "" }) {
  return (
    <svg
      viewBox="0 0 600 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      className={className}
    >
      <rect width="600" height="120" rx="10" fill="#090b10" stroke={isGenerated ? "rgba(52, 211, 153, 0.25)" : "rgba(56, 189, 248, 0.2)"} strokeWidth="1" />

      <line x1="30" y1="30" x2="570" y2="30" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="30" y1="60" x2="570" y2="60" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="30" y1="90" x2="570" y2="90" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="180" y1="15" x2="180" y2="105" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="380" y1="15" x2="380" y2="105" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 6" />

      {/* Feasibility Gauge Left - Perfectly concentric geometry */}
      <circle cx="90" cy="60" r="32" stroke="#1e293b" strokeWidth="4" fill="none" />
      {isGenerated ? (
        <circle
          cx="90"
          cy="60"
          r="32"
          stroke="#34d399"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="201"
          strokeDashoffset="35"
          transform="rotate(-90 90 60)"
          fill="none"
        />
      ) : (
        <circle
          cx="90"
          cy="60"
          r="32"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 6"
          fill="none"
          opacity="0.8"
        />
      )}
      <text x="90" y="58" fill={isGenerated ? "#34d399" : "#38bdf8"} fontSize="13" fontWeight="bold" textAnchor="middle">
        {isGenerated ? `${score}%` : "READY"}
      </text>
      <text x="90" y="72" fill="#64748b" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle">
        {isGenerated ? "FEASIBILITY" : "AUDIT"}
      </text>

      {/* Architecture checklist center */}
      <rect x="195" y="24" width="165" height="72" rx="6" fill="#0c1017" stroke="#1e293b" strokeWidth="1" />
      
      <circle cx="212" cy="42" r="5" fill="#34d399" opacity="0.2" />
      <path d="M 209 42 L 211 44 L 215 40" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="224" y="45" fill="#fff" fontSize="8.5" fontFamily="monospace">Git History Index: OK</text>

      <circle cx="212" cy="60" r="5" fill="#34d399" opacity="0.2" />
      <path d="M 209 60 L 211 62 L 215 58" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="224" y="63" fill="#fff" fontSize="8.5" fontFamily="monospace">TODOs Categorized: 100%</text>

      <circle cx="212" cy="78" r="5" fill={isGenerated ? "#34d399" : "#38bdf8"} opacity="0.2" />
      <path
        d={isGenerated ? "M 209 78 L 211 80 L 215 76" : "M 209 78 L 215 78"}
        stroke={isGenerated ? "#34d399" : "#38bdf8"}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="224" y="81" fill={isGenerated ? "#fff" : "var(--text-secondary)"} fontSize="8.5" fontFamily="monospace">
        {isGenerated ? "Revival Plan Generated" : "Revival Plan: Pending"}
      </text>

      {/* Resurrection Seal Right */}
      <circle cx="480" cy="60" r="36" stroke={isGenerated ? "#34d399" : "#38bdf8"} strokeWidth="1.2" strokeDasharray="3 4" opacity="0.8" />
      <circle cx="480" cy="60" r="28" stroke={isGenerated ? "#34d399" : "#818cf8"} strokeWidth="1" />
      
      {/* Ghost stamp inside seal */}
      <path
        d="M 480 44
           C 472 44, 468 49, 468 56
           C 468 64, 465 69, 463 72
           C 466 70, 469 72, 472 70
           C 475 72, 478 70, 480 72
           C 482 70, 485 72, 488 70
           C 491 72, 494 70, 497 72
           C 495 69, 492 64, 492 56
           C 492 49, 488 44, 480 44 Z"
        stroke={isGenerated ? "#34d399" : "#38bdf8"}
        strokeWidth="1.4"
        fill="#090b10"
      />
      <circle cx="477" cy="53" r="1.2" fill={isGenerated ? "#34d399" : "#38bdf8"} />
      <circle cx="483" cy="53" r="1.2" fill={isGenerated ? "#34d399" : "#38bdf8"} />
    </svg>
  );
}

/**
 * Minimalist Summon Altar / Repo Indexing Scanner
 */
export function SummonAltarIllustration({ size = 110 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="52" fill="rgba(56, 189, 248, 0.02)" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
      <circle cx="60" cy="60" r="42" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
      <circle cx="60" cy="60" r="28" stroke="#818cf8" strokeWidth="1.2" opacity="0.6" />

      {/* Crosshair telemetry */}
      <line x1="60" y1="12" x2="60" y2="108" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" />
      <line x1="12" y1="60" x2="108" y2="60" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" />

      {/* Floating Ghost Silhouette in Center */}
      <path
        d="M 60 38
           C 51 38, 46 45, 46 55
           C 46 66, 42 74, 40 78
           C 43 76, 47 78, 51 76
           C 55 78, 59 76, 60 78
           C 61 76, 65 78, 69 76
           C 73 78, 77 76, 80 78
           C 78 74, 74 66, 74 55
           C 74 45, 69 38, 60 38 Z"
        stroke="#38bdf8"
        strokeWidth="1.6"
        fill="#090b10"
      />
      <circle cx="56" cy="51" r="1.5" fill="#38bdf8" />
      <circle cx="64" cy="51" r="1.5" fill="#38bdf8" />

      {/* Scanning Orbit Nodes */}
      <circle cx="88" cy="42" r="3" fill="#818cf8" />
      <circle cx="34" cy="74" r="2.5" fill="#38bdf8" />
    </svg>
  );
}

/**
 * Minimalist Dashboard Codex / Overview Illustration
 */
export function DashboardCodexIllustration({ size = 110 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="52" fill="rgba(56, 189, 248, 0.02)" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
      
      {/* Blueprint grid */}
      <rect x="28" y="28" width="64" height="64" rx="8" stroke="#38bdf8" strokeWidth="1.5" fill="#090b10" />
      <line x1="28" y1="52" x2="92" y2="52" stroke="#1e2331" strokeWidth="1" />
      <line x1="60" y1="52" x2="60" y2="92" stroke="#1e2331" strokeWidth="1" />

      {/* Metrics inside panels */}
      <circle cx="44" cy="40" r="4" fill="#38bdf8" opacity="0.8" />
      <line x1="52" y1="40" x2="78" y2="40" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mini Git tree bottom left */}
      <circle cx="40" cy="72" r="2.5" fill="#818cf8" />
      <line x1="40" y1="72" x2="50" y2="72" stroke="#818cf8" strokeWidth="1" />
      <circle cx="50" cy="72" r="2.5" fill="#38bdf8" />

      {/* Mini Ghost badge top right corner */}
      <path
        d="M 88 18 C 82 18, 78 23, 78 30 C 78 37, 76 41, 74 44 C 77 42, 80 44, 83 42 C 86 44, 89 42, 92 44 C 95 42, 98 44, 100 44 C 99 41, 98 37, 98 30 C 98 23, 94 18, 88 18 Z"
        stroke="#818cf8"
        strokeWidth="1.3"
        fill="#090b10"
      />
      <circle cx="85" cy="27" r="1.2" fill="#818cf8" />
      <circle cx="91" cy="27" r="1.2" fill="#818cf8" />
    </svg>
  );
}

/**
 * Minimalist Feature Illustration 1: Ground-Truth Chat / Oracle
 */
export function ChatSeanceIllustration({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="rgba(56, 189, 248, 0.03)" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
      
      {/* Terminal prompt frame */}
      <rect x="26" y="34" width="68" height="52" rx="6" stroke="#38bdf8" strokeWidth="1.5" fill="#090b10" />
      <circle cx="34" cy="42" r="2" fill="#f87171" opacity="0.8" />
      <circle cx="41" cy="42" r="2" fill="#fbbf24" opacity="0.8" />
      <circle cx="48" cy="42" r="2" fill="#34d399" opacity="0.8" />
      <line x1="26" y1="48" x2="94" y2="48" stroke="#1e2331" strokeWidth="1" />
      
      {/* Terminal lines */}
      <path d="M34 58 L39 62 L34 66" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="62" x2="62" y2="62" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="73" x2="78" y2="73" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />
      
      {/* Floating Ghost Silhouette in corner */}
      <path
        d="M 80 20 C 72 20, 68 26, 68 36 C 68 44, 66 48, 64 52 C 67 50, 70 52, 73 50 C 76 52, 79 50, 82 52 C 85 50, 88 52, 90 50 C 89 47, 87 43, 87 36 C 87 26, 84 20, 80 20 Z"
        stroke="#38bdf8"
        strokeWidth="1.4"
        fill="#090b10"
      />
      <circle cx="77" cy="30" r="1.5" fill="#38bdf8" />
      <circle cx="83" cy="30" r="1.5" fill="#38bdf8" />
    </svg>
  );
}

/**
 * Minimalist Feature Illustration 2: Ghost Timeline
 */
export function TimelineGhostIllustration({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="rgba(129, 140, 248, 0.03)" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1" />
      
      {/* Timeline track */}
      <line x1="30" y1="85" x2="90" y2="85" stroke="#38bdf8" strokeWidth="1.5" />
      <path d="M 45 85 C 55 60, 65 55, 85 55" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
      
      {/* Nodes */}
      <circle cx="35" cy="85" r="3.5" fill="#090b10" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="60" cy="85" r="4.5" fill="#38bdf8" />
      <circle cx="85" cy="85" r="3.5" fill="#090b10" stroke="#38bdf8" strokeWidth="2" />
      
      {/* Ghost Branch Nodes */}
      <circle cx="65" cy="58" r="3" fill="#818cf8" opacity="0.8" />
      <circle cx="85" cy="55" r="4" fill="#090b10" stroke="#818cf8" strokeWidth="2" />
      
      {/* Little ghost marker */}
      <path
        d="M 85 32 C 78 32, 74 37, 74 44 C 74 49, 72 52, 70 54 C 73 53, 76 54, 79 53 C 82 54, 85 53, 88 54 C 91 53, 93 54, 95 54 C 94 51, 93 48, 93 44 C 93 37, 90 32, 85 32 Z"
        stroke="#818cf8"
        strokeWidth="1.3"
        fill="#090b10"
      />
      <circle cx="82" cy="40" r="1.2" fill="#818cf8" />
      <circle cx="88" cy="40" r="1.2" fill="#818cf8" />
    </svg>
  );
}

/**
 * Minimalist Feature Illustration 3: Buried TODOs & Markers
 */
export function ArtifactScanIllustration({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="rgba(251, 146, 60, 0.03)" stroke="rgba(251, 146, 60, 0.15)" strokeWidth="1" />
      
      {/* Archaeological Code Slab */}
      <rect x="30" y="32" width="60" height="56" rx="4" stroke="#fb923c" strokeWidth="1.5" fill="#090b10" />
      <line x1="38" y1="44" x2="68" y2="44" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="38" y1="54" x2="82" y2="54" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="38" y1="64" x2="72" y2="64" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" />
      
      {/* Alert mark */}
      <circle cx="76" cy="44" r="5" fill="#fb923c" opacity="0.2" />
      <text x="74" y="47" fill="#fb923c" fontSize="9" fontWeight="bold" fontFamily="sans-serif">!</text>
      
      {/* Excavation grid lines */}
      <line x1="22" y1="92" x2="98" y2="92" stroke="#334155" strokeWidth="1.2" />
      <line x1="42" y1="92" x2="36" y2="102" stroke="#fb923c" strokeWidth="1" opacity="0.6" />
      <line x1="78" y1="92" x2="84" y2="102" stroke="#fb923c" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

/**
 * Minimalist Feature Illustration 4: Resurrection Audit Report
 */
export function ResurrectionReportIllustration({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="rgba(52, 211, 153, 0.03)" stroke="rgba(52, 211, 153, 0.15)" strokeWidth="1" />
      
      {/* Document page */}
      <path d="M36 28 L68 28 L84 44 L84 92 L36 92 Z" stroke="#34d399" strokeWidth="1.5" fill="#090b10" />
      <path d="M68 28 L68 44 L84 44" stroke="#34d399" strokeWidth="1.5" />
      
      {/* Content lines */}
      <line x1="46" y1="46" x2="60" y2="46" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="58" x2="74" y2="58" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="46" y1="68" x2="74" y2="68" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="46" y1="78" x2="62" y2="78" stroke="#34d399" strokeWidth="1.4" strokeLinecap="round" />
      
      {/* Small Checkmark seal */}
      <circle cx="76" cy="84" r="8" fill="#090b10" stroke="#34d399" strokeWidth="1.5" />
      <path d="M72 84 L75 87 L80 81" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
