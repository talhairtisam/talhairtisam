"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type Lenis from "lenis";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { onIdle } from "@/lib/performance";

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export function DeferredLenisProvider({ children }: { children: React.ReactNode }) {
  const heavy = useEnhancementAtLeast("heavy");
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!heavy) return;

    let rafId = 0;
    let instance: Lenis | null = null;
    let cancelled = false;

    const cancelIdle = onIdle(async () => {
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;

      instance = new LenisCtor({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      setLenis(instance);

      function raf(time: number) {
        instance?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }, 500);

    return () => {
      cancelled = true;
      cancelIdle();
      cancelAnimationFrame(rafId);
      instance?.destroy();
      setLenis(null);
    };
  }, [heavy]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
