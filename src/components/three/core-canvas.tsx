"use client";

import { Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { CoreScene } from "./core-scene";
import { CorePoster } from "./core-poster";
import { cn } from "@/lib/utils";

type CoreCanvasProps = {
  size?: "hero" | "mini";
  className?: string;
  scrollProgress?: number;
  activeSection?: number;
  interactive?: boolean;
};

export function CoreCanvas({
  size = "hero",
  className,
  scrollProgress = 0,
  activeSection = 0,
  interactive = true,
}: CoreCanvasProps) {
  const reducedMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setPointer({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    },
    [interactive],
  );

  if (reducedMotion) {
    return <CorePoster className={cn("flex items-center justify-center", className)} />;
  }

  return (
    <div
      className={cn("relative", className)}
      onPointerMove={handlePointerMove}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, size === "mini" ? 4 : 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#22d3ee" />
          <pointLight position={[-10, -10, -5]} intensity={0.4} color="#a78bfa" />
          <CoreScene
            size={size}
            scrollProgress={scrollProgress}
            activeSection={activeSection}
            interactive={interactive}
            pointer={pointer}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
