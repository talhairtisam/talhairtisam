"use client";

import dynamic from "next/dynamic";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { useIsMdUp } from "@/lib/performance";
import { CorePoster } from "@/components/three/core-poster";
import { cn } from "@/lib/utils";

const CoreCanvas = dynamic(
  () => import("@/components/three/core-canvas").then((m) => m.CoreCanvas),
  { ssr: false },
);

export function HeroCoreSlot({ className }: { className?: string }) {
  const isMdUp = useIsMdUp();
  const heavy = useEnhancementAtLeast("heavy");

  if (!isMdUp) return null;

  return (
    <div className={cn("relative h-[480px] lg:h-[560px]", className)}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-violet/10 blur-2xl" />
      <CorePoster className="absolute inset-0 h-full w-full" />
      {heavy && (
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 [animation:fade-in_0.3s_ease-out_forwards]">
          <CoreCanvas size="hero" className="h-full w-full" interactive />
        </div>
      )}
    </div>
  );
}
