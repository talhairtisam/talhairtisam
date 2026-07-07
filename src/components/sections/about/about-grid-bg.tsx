"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEnhancementAtLeast } from "@/context/enhancement-context";

export function AboutGridBg() {
  const ref = useRef<HTMLDivElement>(null);
  const motionReady = useEnhancementAtLeast("motion");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      {motionReady ? (
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 grid-bg opacity-80 dark:opacity-60"
        />
      ) : (
        <div className="absolute inset-0 grid-bg opacity-80 dark:opacity-60" />
      )}
    </div>
  );
}
