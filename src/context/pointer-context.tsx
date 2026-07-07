"use client";

import { createContext, useContext, useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useEnhancementAtLeast } from "@/context/enhancement-context";

export type PointerContextValue = {
  lookX: MotionValue<number>;
  lookY: MotionValue<number>;
  clientX: MotionValue<number>;
  clientY: MotionValue<number>;
  normX: MotionValue<number>;
  normY: MotionValue<number>;
  enabled: boolean;
};

const PointerContext = createContext<PointerContextValue | null>(null);

export function PointerProvider({ children }: { children: React.ReactNode }) {
  const heavy = useEnhancementAtLeast("heavy");
  const rawLookX = useMotionValue(0);
  const rawLookY = useMotionValue(0);
  const clientX = useMotionValue(0);
  const clientY = useMotionValue(0);
  const pointerNormX = useMotionValue(0);
  const pointerNormY = useMotionValue(0);

  const lookX = useSpring(rawLookX, { stiffness: 160, damping: 22 });
  const lookY = useSpring(rawLookY, { stiffness: 160, damping: 22 });

  useEffect(() => {
    if (!heavy) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    function onMove(e: MouseEvent) {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = -((e.clientY / window.innerHeight - 0.5) * 2);
      rawLookX.set(nx * 4);
      rawLookY.set(ny * 3);
      clientX.set(e.clientX);
      clientY.set(e.clientY);
      pointerNormX.set(nx);
      pointerNormY.set(ny);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [heavy, rawLookX, rawLookY, clientX, clientY, pointerNormX, pointerNormY]);

  return (
    <PointerContext.Provider
      value={{
        lookX,
        lookY,
        clientX,
        clientY,
        normX: pointerNormX,
        normY: pointerNormY,
        enabled: heavy,
      }}
    >
      {children}
    </PointerContext.Provider>
  );
}

export function usePointer() {
  const ctx = useContext(PointerContext);
  if (!ctx) {
    throw new Error("usePointer must be used within PointerProvider");
  }
  return ctx;
}

export function usePointerOptional() {
  return useContext(PointerContext);
}
