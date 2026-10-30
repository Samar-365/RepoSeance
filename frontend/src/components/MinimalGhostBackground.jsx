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
      {/* Subtle radial glow */}
      <div style={{
        position: "absolute",
        top: "-15%",
        left: "25%",
        width: "50vw",
        height: "50vw",
        maxWidth: 700,
        maxHeight: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56, 189, 248, 0.035) 0%, transparent 70%)"
      }} />

      {/* Minimalist Ghost Silhouettes & Arch Line Art */}
      <svg
        style={{
          position: "absolute",
          top: "5%",
          right: "4%",
          width: 420,
          height: 480,
          opacity: 0.06
        }}
        viewBox="0 0 400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Minimalist Ghost Contours */}
        <path
          d="M200 40 C130 40 100 110 100 180 C100 280 80 340 70 380 C100 360 130 380 160 360 C190 380 220 360 250 380 C280 360 310 380 330 360 C320 330 300 270 300 180 C300 110 270 40 200 40 Z"
          stroke="#818cf8"
          strokeWidth="2.5"
          strokeDasharray="6 8"
        />
        {/* Subtle eyes */}
        <circle cx="170" cy="160" r="10" stroke="#818cf8" strokeWidth="2" />
        <circle cx="230" cy="160" r="10" stroke="#818cf8" strokeWidth="2" />
        {/* Delicate gothic arch frame */}
        <path
          d="M40 430 V180 Q40 50 200 10 Q360 50 360 180 V430"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="90" r="30" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 4" />
      </svg>

      {/* Secondary Bottom-Left Minimal Ghost Silhouette */}
      <svg
        style={{
          position: "absolute",
          bottom: "4%",
          left: "2%",
          width: 320,
          height: 360,
          opacity: 0.045
        }}
        viewBox="0 0 300 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150 30 C100 30 75 80 75 140 C75 220 60 270 50 300 C75 285 100 300 125 285 C150 300 175 285 200 300 C225 285 240 300 250 285 C240 260 225 210 225 140 C225 80 200 30 150 30 Z"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        <circle cx="130" cy="120" r="7" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="170" cy="120" r="7" stroke="#38bdf8" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
