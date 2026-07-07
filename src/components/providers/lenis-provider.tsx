"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { useEnhancementsEnabled, onIdle } from "@/lib/performance";

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const enhancements = useEnhancementsEnabled();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enhancements) return;

    let rafId = 0;
    let cancelled = false;

    const cancelIdle = onIdle(async () => {
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;

      const instance = new LenisCtor({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = instance;
      setLenis(instance);

      function raf(time: number) {
        instance.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }, 3000);

    return () => {
      cancelled = true;
      cancelIdle();
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [enhancements]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
