"use client";

import { motion, useReducedMotion } from "motion/react";
import { railSocialLinks } from "@/data";
import { SocialIcon } from "@/components/icons/social-icon";
import { useEnhancementsEnabled } from "@/lib/performance";
import { cn } from "@/lib/utils";

export function LeftRail() {
  const reducedMotion = useReducedMotion();
  const enhancements = useEnhancementsEnabled();
  const animate = enhancements && !reducedMotion;

  return (
    <aside
      className="fixed top-0 left-0 z-[var(--z-rail)] hidden h-screen w-[var(--left-rail-width)] flex-col lg:flex"
      aria-label="Social links"
    >
      <nav
        aria-label="Social profiles"
        className="relative flex flex-1 flex-col items-center justify-center gap-5 px-2"
      >
        <div
          className="absolute top-24 bottom-24 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent"
          aria-hidden
        />

        {railSocialLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={animate ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: animate ? i * 0.08 : 0, duration: 0.35 }}
            whileHover={animate ? { scale: 1.12, x: 2 } : undefined}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-lg text-text-muted transition-colors",
              "hover:bg-bg-elevated/80 hover:text-text",
              "outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
            title={link.label}
            aria-label={link.name}
          >
            <SocialIcon name={link.name} size={20} />
          </motion.a>
        ))}
      </nav>
    </aside>
  );
}
