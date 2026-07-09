"use client";

import nextDynamic from "next/dynamic";
import { useEnhancementAtLeast } from "@/context/enhancement-context";

const HeroParallax = nextDynamic(
  () => import("./hero-parallax").then((m) => ({ default: m.HeroParallax })),
  { ssr: false },
);

type HeroEnhancedShellProps = {
  textContent: React.ReactNode;
  coreSlot: React.ReactNode;
};

export function HeroEnhancedShell({ textContent, coreSlot }: HeroEnhancedShellProps) {
  const motionReady = useEnhancementAtLeast("motion");

  if (motionReady) {
    return <HeroParallax textContent={textContent} coreSlot={coreSlot} />;
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16"
    >
      <div className="container-main grid items-center gap-8 px-5 py-12 md:grid-cols-2 md:gap-12 md:px-8">
        <div className="relative z-10">{textContent}</div>
        {coreSlot}
      </div>
    </section>
  );
}
