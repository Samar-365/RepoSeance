import { useState, useEffect, useRef, useCallback } from "react";

/**
 * High-performance parallax and scroll progress hook.
 * Uses requestAnimationFrame throttling, passive listeners, and prefers-reduced-motion.
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener?.("change", handleMotionChange);

    let scrollTicking = false;
    let mouseTicking = false;

    const onScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.pageYOffset || document.documentElement.scrollTop);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    const onMouseMove = (e) => {
      if (!mouseTicking && !motionQuery.matches) {
        window.requestAnimationFrame(() => {
          // Normalized from -1 to 1 relative to window center
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = (e.clientY / window.innerHeight) * 2 - 1;
          setMousePos({ x, y });
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    const onResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    setScrollY(window.pageYOffset || document.documentElement.scrollTop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener?.("change", handleMotionChange);
    };
  }, []);

  return { scrollY, windowHeight, mousePos, reducedMotion };
}

/**
 * Hook to measure a specific section's normalized scroll progress:
 * Returns progress from -1 (entering viewport from bottom) to 0 (centered) to +1 (exiting at top).
 */
export function useSectionProgress(ref) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    let ticking = false;

    const calculate = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Visibility check
      const inView = rect.top < windowH && rect.bottom > 0;
      setIsVisible(inView);

      if (inView) {
        // Center-relative progress: 0 when element center aligns with viewport center
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowH / 2;
        const distance = elementCenter - viewportCenter;
        const totalSpan = (windowH + rect.height) / 2;
        const norm = Math.max(-1.5, Math.min(1.5, -distance / totalSpan));
        setProgress(norm);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculate();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    calculate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return { progress, isVisible };
}
