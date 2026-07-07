"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { useEnhancementsEnabled, onIdle } from "@/lib/performance";

type LenisContextValue = {
  lenis: Lenis | null;
  scroll: number;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null, scroll: 0 });

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const enhancements = useEnhancementsEnabled();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (!enhancements) return;

    let instance: Lenis | null = null;
    let rafId = 0;

    const cancelIdle = onIdle(() => {
      instance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      instance.on("scroll", ({ scroll: s }) => {
        setScroll(s);
      });

      setLenis(instance);

      function raf(time: number) {
        instance?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }, 3000);

    return () => {
      cancelIdle();
      cancelAnimationFrame(rafId);
      instance?.destroy();
      setLenis(null);
    };
  }, [enhancements]);

  return (
    <LenisContext.Provider value={{ lenis, scroll }}>
      {children}
    </LenisContext.Provider>
  );
}
