"use client";

import dynamic from "next/dynamic";
import { DeferredEnhancements } from "@/components/layout/deferred-enhancements";

const FloatingCompanion = dynamic(
  () =>
    import("@/components/layout/floating-companion").then((m) => m.FloatingCompanion),
  { ssr: false },
);

export function DeferredFloatingCompanion() {
  return (
    <DeferredEnhancements>
      <FloatingCompanion />
    </DeferredEnhancements>
  );
}
