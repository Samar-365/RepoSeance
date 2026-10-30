import React from "react";
import { useParallax } from "../hooks/useParallax";
import ParallaxBackground from "../components/parallax/ParallaxBackground";
import HeroSection from "../components/parallax/HeroSection";
import StratigraphySection from "../components/parallax/StratigraphySection";
import OracleSection from "../components/parallax/OracleSection";
import SummonAltarSection from "../components/parallax/SummonAltarSection";

export default function SummonView({ repositories, onSelectRepo, onAnalysisComplete }) {
  const { scrollY, reducedMotion } = useParallax();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      {/* Cinematic Parallax Celestial Background */}
      <ParallaxBackground scrollY={scrollY} reducedMotion={reducedMotion} />

      {/* Hero Narrative Act (The Necropolis of Code) */}
      <HeroSection 
        scrollY={scrollY} 
        reducedMotion={reducedMotion} 
        onExplore={() => scrollToSection("stratigraphy")}
        onSummonClick={() => scrollToSection("altar")}
      />

      {/* Act I: The Stratigraphy of Time (Geological Drilldown) */}
      <StratigraphySection 
        scrollY={scrollY} 
        reducedMotion={reducedMotion} 
      />

      {/* Act II: The Oracle in the Crypt (Anti-Hallucination Grounding) */}
      <OracleSection 
        scrollY={scrollY} 
        reducedMotion={reducedMotion} 
      />

      {/* Act III: The Altar of Resurrection (Interactive Coordinate Input & Crypt) */}
      <SummonAltarSection 
        repositories={repositories}
        onSelectRepo={onSelectRepo}
        onAnalysisComplete={onAnalysisComplete}
      />
    </div>
  );
}
