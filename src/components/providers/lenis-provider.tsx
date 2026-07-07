"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useEnhancementsEnabled, onIdle } from "@/lib/performance";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const enhancements = useEnhancementsEnabled();

  useEffect(() => {
    if (!enhancements) return;

    let lenis: Lenis | null = null;
    let rafId = 0;

    const cancelIdle = onIdle(() => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }, 3000);

    return () => {
      cancelIdle();
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [enhancements]);

  return <>{children}</>;
}
