"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent } from "motion/react";
import { usePointerOptional } from "@/context/pointer-context";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { cn } from "@/lib/utils";

export function CursorGlow() {
  const heavy = useEnhancementAtLeast("heavy");
  const pointer = usePointerOptional();
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const clientX = pointer?.clientX ?? fallbackX;
  const clientY = pointer?.clientY ?? fallbackY;

  function moveGlow(x: number, y: number) {
    if (!glowRef.current) return;
    glowRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }

  useMotionValueEvent(clientX, "change", (x) => {
    if (!pointer?.enabled) return;
    setVisible(true);
    moveGlow(x, clientY.get());
  });

  useMotionValueEvent(clientY, "change", (y) => {
    if (!pointer?.enabled) return;
    setVisible(true);
    moveGlow(clientX.get(), y);
  });

  useEffect(() => {
    if (!heavy) return;

    function onLeave() {
      setVisible(false);
    }

    document.body.addEventListener("mouseleave", onLeave);
    return () => document.body.removeEventListener("mouseleave", onLeave);
  }, [heavy]);

  if (!heavy || !pointer?.enabled) return null;

  return (
    <div
      ref={glowRef}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] h-64 w-64 rounded-full blur-3xl will-change-transform transition-opacity duration-300",
        visible ? "opacity-30" : "opacity-0",
      )}
      style={{
        background:
          "radial-gradient(circle, var(--accent-cyan) 0%, var(--accent-violet) 50%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}
