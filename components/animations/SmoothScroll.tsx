"use client";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const frameId = requestAnimationFrame(raf);

    // Handle hash-based anchor scrolling (e.g. #collections)
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          // Small delay to let the page settle
          setTimeout(() => {
            lenis.scrollTo(target as HTMLElement, { offset: 0 });
          }, 100);
        }
      }
    };

    // Run on mount in case URL already has a hash
    handleHashScroll();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("hashchange", handleHashScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]); // Re-init on route change

  return null;
}
