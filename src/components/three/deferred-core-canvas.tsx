"use client";

import dynamic from "next/dynamic";
import { CorePoster } from "@/components/three/core-poster";
import { DeferredEnhancements } from "@/components/layout/deferred-enhancements";
import { cn } from "@/lib/utils";

const CoreCanvas = dynamic(
  () => import("@/components/three/core-canvas").then((m) => m.CoreCanvas),
  { ssr: false, loading: () => <CorePoster className="h-full w-full" /> },
);

type DeferredCoreCanvasProps = {
  size?: "hero" | "mini";
  className?: string;
  interactive?: boolean;
};

export function DeferredCoreCanvas({
  size = "hero",
  className,
  interactive = true,
}: DeferredCoreCanvasProps) {
  return (
    <DeferredEnhancements
      fallback={<CorePoster className={cn("flex h-full w-full items-center justify-center", className)} />}
    >
      <CoreCanvas size={size} className={className} interactive={interactive} />
    </DeferredEnhancements>
  );
}
