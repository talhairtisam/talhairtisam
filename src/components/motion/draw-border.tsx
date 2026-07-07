"use client";

import { motion, useReducedMotion } from "motion/react";
import { drawLine } from "@/lib/motion";
import { useEnhancementsEnabled } from "@/lib/performance";
import { cn } from "@/lib/utils";

type DrawBorderProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  radius?: number;
};

export function DrawBorder({
  children,
  className,
  innerClassName,
  radius = 16,
}: DrawBorderProps) {
  const reducedMotion = useReducedMotion();
  const enhancements = useEnhancementsEnabled();
  const animate = enhancements && !reducedMotion;

  if (!animate) {
    return (
      <div className={cn("gradient-border rounded-2xl", className)}>
        <div className={cn("rounded-[inherit] bg-card-bg", innerClassName)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-2xl", className)}>
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      >
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={radius}
          ry={radius}
          fill="none"
          stroke="url(#draw-border-gradient)"
          strokeWidth="1.5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={drawLine}
        />
        <defs>
          <linearGradient id="draw-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-cyan)" />
            <stop offset="50%" stopColor="var(--accent-violet)" />
            <stop offset="100%" stopColor="var(--accent-lime)" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className={cn(
          "relative rounded-[inherit] border border-border/40 bg-card-bg/80 backdrop-blur-sm",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
