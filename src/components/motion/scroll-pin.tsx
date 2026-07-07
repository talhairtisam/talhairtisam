"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEnhancementsEnabled } from "@/lib/performance";
import { cn } from "@/lib/utils";

type ScrollPinProps = {
  children: ReactNode;
  className?: string;
  pinClassName?: string;
  minHeight?: string;
};

export function ScrollPin({
  children,
  className,
  pinClassName,
  minHeight = "140vh",
}: ScrollPinProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const enhancements = useEnhancementsEnabled();
  const enabled = enhancements && !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 1, 1, 0.85]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.98]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)} style={{ minHeight }}>
      <motion.div
        style={{ opacity, scale }}
        className={cn("sticky top-24", pinClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
}
