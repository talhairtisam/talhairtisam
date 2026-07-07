"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEnhancementsEnabled } from "@/lib/performance";
import { cn } from "@/lib/utils";

type SectionParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function SectionParallax({ children, className, speed = 40 }: SectionParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const enhancements = useEnhancementsEnabled();
  const enabled = enhancements && !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -speed]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
