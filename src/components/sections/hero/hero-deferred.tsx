"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { HeroScrollHint } from "./hero-scroll-hint";

const CoreCanvas = dynamic(
  () => import("@/components/three/core-canvas").then((m) => m.CoreCanvas),
  { ssr: false },
);

export function HeroDeferred() {
  const motionReady = useEnhancementAtLeast("motion");
  const heavyReady = useEnhancementAtLeast("heavy");
  const [coreHost, setCoreHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setCoreHost(document.getElementById("hero-core"));
  }, []);

  return (
    <>
      {motionReady && <HeroScrollHint />}
      {heavyReady &&
        coreHost &&
        createPortal(
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 [animation:fade-in_0.3s_ease-out_forwards]">
            <CoreCanvas size="hero" className="h-full w-full" interactive />
          </div>,
          coreHost,
        )}
    </>
  );
}
