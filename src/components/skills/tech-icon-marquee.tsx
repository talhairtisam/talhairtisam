"use client";

import { motion, useReducedMotion } from "motion/react";
import { techStackDock } from "@/data";
import { TechIcon } from "@/components/icons/tech-icon";
import { useEnhancementsEnabled } from "@/lib/performance";

export function TechIconMarquee() {
  const reducedMotion = useReducedMotion();
  const enhancements = useEnhancementsEnabled();
  const animate = enhancements && !reducedMotion;
  const items = [...techStackDock, ...techStackDock];

  return (
    <div className="relative mb-10 overflow-hidden" aria-hidden={false}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent" />

      <motion.div
        className="flex w-max gap-5 py-2"
        animate={animate ? { x: ["0%", "-50%"] } : undefined}
        transition={
          animate
            ? { duration: 28, repeat: Infinity, ease: "linear" }
            : undefined
        }
      >
        {items.map((item, i) => (
          <div
            key={`${item.slug}-${i}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-elevated shadow-sm ring-1 ring-border/60 dark:bg-bg-elevated/90 dark:ring-border/80"
            title={item.name}
          >
            <TechIcon slug={item.slug} size={22} title={item.name} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
