"use client";

import dynamic from "next/dynamic";

const CoreCanvas = dynamic(
  () => import("@/components/three/core-canvas").then((m) => m.CoreCanvas),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse rounded-full bg-glow/20" /> },
);

type MiniCoreProps = {
  scrollProgress: number;
  activeSection: number;
  onClick?: () => void;
};

export function MiniCore({ scrollProgress, activeSection, onClick }: MiniCoreProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-bg-elevated/30 transition-transform hover:scale-110 active:scale-95"
      aria-label="Scroll progress indicator"
    >
      <CoreCanvas
        size="mini"
        className="h-full w-full"
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        interactive={false}
      />
    </button>
  );
}
