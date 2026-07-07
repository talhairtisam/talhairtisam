"use client";

import { useEffect, useState } from "react";
import { useEnhancementsEnabled } from "@/lib/performance";

export function CursorGlow() {
  const enhancements = useEnhancementsEnabled();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enhancements) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, [enhancements]);

  if (!enhancements || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[var(--z-cursor)] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl transition-opacity duration-300"
      style={{
        left: pos.x,
        top: pos.y,
        background:
          "radial-gradient(circle, var(--accent-cyan) 0%, var(--accent-violet) 50%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}
