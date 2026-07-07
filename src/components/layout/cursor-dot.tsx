"use client";

import { useTransform } from "motion/react";
import { motion } from "motion/react";
import type { PointerContextValue } from "@/context/pointer-context";
import { usePointerOptional } from "@/context/pointer-context";

function CursorDotInner({ pointer }: { pointer: PointerContextValue }) {
  const dotX = useTransform(pointer.clientX, (v) => v);
  const dotY = useTransform(pointer.clientY, (v) => v);

  return (
    <motion.div
      className="pointer-events-none fixed z-[calc(var(--z-cursor)-1)] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text/90 shadow-[0_0_12px_rgba(0,0,0,0.35)] dark:bg-white/90"
      style={{ left: dotX, top: dotY }}
      aria-hidden
    />
  );
}

export function CursorDot() {
  const pointer = usePointerOptional();
  if (!pointer?.enabled) return null;
  return <CursorDotInner pointer={pointer} />;
}
