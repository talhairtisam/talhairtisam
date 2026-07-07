"use client";

import dynamic from "next/dynamic";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { CursorDot } from "@/components/layout/cursor-dot";

const FloatingCompanion = dynamic(
  () =>
    import("@/components/layout/floating-companion").then((m) => m.FloatingCompanion),
  { ssr: false },
);

export function DeferredHeavyUi() {
  const heavy = useEnhancementAtLeast("heavy");
  if (!heavy) return null;

  return (
    <>
      <CursorGlow />
      <CursorDot />
      <FloatingCompanion />
    </>
  );
}
