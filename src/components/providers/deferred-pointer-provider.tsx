"use client";

import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { PointerProvider } from "@/context/pointer-context";

export function DeferredPointerProvider({ children }: { children: React.ReactNode }) {
  const heavy = useEnhancementAtLeast("heavy");
  if (!heavy) return <>{children}</>;
  return <PointerProvider>{children}</PointerProvider>;
}
