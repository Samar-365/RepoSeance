import { useState, useEffect } from "react";

/**
 * Performant parallax scroll hook with requestAnimationFrame throttling,
 * passive event listener, and prefers-reduced-motion detection.
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener?.("change", handleMotionChange);

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.pageYOffset || document.documentElement.scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    const onResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Initial measurement
    setScrollY(window.pageYOffset || document.documentElement.scrollTop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener?.("change", handleMotionChange);
    };
  }, []);

  return { scrollY, windowHeight, reducedMotion };
}
