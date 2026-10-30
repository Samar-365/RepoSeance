import React from "react";

export default function MinimalGhostBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden"
    }}>
      {/* Gentle Ambient Glows */}
      <div style={{
        position: "absolute",
        top: "-10%",
        right: "15%",
        width: "45vw",
        height: "45vw",
        maxWidth: 600,
        maxHeight: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, transparent 70%)"
      }} />

      <div style={{
        position: "absolute",
        bottom: "-15%",
        left: "10%",
        width: "50vw",
        height: "50vw",
        maxWidth: 650,
        maxHeight: 650,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(129, 140, 248, 0.03) 0%, transparent 70%)"
      }} />

      {/* Top-Right Minimalist Ghost & Constellation SVG */}
      <svg
        style={{
          position: "absolute",
          top: "4%",
          right: "3%",
          width: 380,
          height: 440,
          opacity: 0.075
        }}
        viewBox="0 0 380 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle Git Graph Grid behind ghost */}
        <line x1="50" y1="120" x2="330" y2="120" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="50" y1="240" x2="330" y2="240" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="190" y1="40" x2="190" y2="380" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" />

        {/* Minimalist Ghost Outline */}
        <path
          d="M 190 60
             C 130 60, 100 110, 100 180
             C 100 270, 80 320, 70 350
             C 95 338, 120 350, 145 338
             C 170 350, 190 338, 210 350
             C 230 338, 255 350, 280 338
             C 300 350, 310 338, 320 350
             C 310 320, 290 270, 290 180
             C 290 110, 260 60, 190 60 Z"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeDasharray="6 8"
        />

        {/* Minimal eyes */}
        <circle cx="165" cy="160" r="7" stroke="#38bdf8" strokeWidth="1.8" />
        <circle cx="215" cy="160" r="7" stroke="#38bdf8" strokeWidth="1.8" />

        {/* Subtle Halo Arch */}
        <path
          d="M 40 400 V 200 Q 40 40 190 40 Q 340 40 340 200 V 400"
          stroke="#818cf8"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <circle cx="190" cy="100" r="24" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 4" />
      </svg>

      {/* Bottom-Left Minimalist Spectral Code Tree */}
      <svg
        style={{
          position: "absolute",
          bottom: "3%",
          left: "2%",
          width: 320,
          height: 340,
          opacity: 0.06
        }}
        viewBox="0 0 320 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Branching Tree */}
        <path d="M 40 280 L 280 280" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M 120 280 C 140 220, 170 200, 220 200 L 290 200" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 170 200 C 190 150, 210 140, 260 140" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Ghost silhouette hovering at branch point */}
        <path
          d="M 160 50
             C 125 50, 105 85, 105 130
             C 105 180, 90 215, 85 235
             C 105 225, 125 235, 145 225
             C 165 235, 185 225, 205 235
             C 225 225, 235 235, 240 225
             C 235 210, 220 180, 220 130
             C 220 85, 195 50, 160 50 Z"
          stroke="#818cf8"
          strokeWidth="1.8"
        />
        <circle cx="145" cy="115" r="5" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="178" cy="115" r="5" stroke="#818cf8" strokeWidth="1.5" />

        {/* Nodes */}
        <circle cx="70" cy="280" r="4" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="120" cy="280" r="5" fill="#38bdf8" />
        <circle cx="220" cy="200" r="4" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="260" cy="140" r="3" fill="#818cf8" />
      </svg>
    </div>
  );
}
