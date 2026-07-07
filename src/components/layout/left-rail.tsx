"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { socialLinks, techStackDock } from "@/data";
import { SocialIcon } from "@/components/icons/social-icon";
import { TechIcon } from "@/components/icons/tech-icon";
import { getIconData } from "@/lib/skill-icons";
import { useEnhancementsEnabled } from "@/lib/performance";
import { cn } from "@/lib/utils";

function TechDockItem({
  item,
  index,
  animate,
}: {
  item: (typeof techStackDock)[number];
  index: number;
  animate: boolean;
}) {
  const icon = getIconData(item.slug);
  const glow = icon ? `#${icon.hex}` : "var(--accent-cyan)";

  const inner = (
    <motion.span
      initial={animate ? { opacity: 0, x: -12 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: animate ? index * 0.04 : 0, duration: 0.35 }}
      whileHover={animate ? { scale: 1.15 } : undefined}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-lg border border-transparent transition-colors",
        "hover:border-border hover:bg-bg-elevated/80",
      )}
      title={item.name}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 blur-md transition-opacity group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${glow}55, transparent 70%)` }}
        aria-hidden
      />
      <TechIcon slug={item.slug} size={18} title={item.name} />
    </motion.span>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        aria-label={item.name}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

export function LeftRail() {
  const reducedMotion = useReducedMotion();
  const enhancements = useEnhancementsEnabled();
  const animate = enhancements && !reducedMotion;

  return (
    <aside
      className="fixed top-0 left-0 z-[var(--z-rail)] hidden h-screen w-[var(--left-rail-width)] flex-col lg:flex"
      aria-label="Tech stack and social links"
    >
      <div className="relative flex flex-1 flex-col items-center justify-center px-2 py-24">
        <div
          className="absolute top-24 bottom-32 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent"
          aria-hidden
        />

        <nav aria-label="Technologies" className="relative flex flex-col items-center gap-3">
          {techStackDock.map((item, i) => (
            <TechDockItem key={item.name} item={item} index={i} animate={animate} />
          ))}
        </nav>
      </div>

      <nav
        aria-label="Social links"
        className="flex flex-col items-center gap-4 border-t border-border/60 px-2 py-6"
      >
        <div className="h-8 w-px bg-gradient-to-b from-border to-transparent" aria-hidden />
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            initial={animate ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animate ? 0.3 + i * 0.05 : 0 }}
            whileHover={animate ? { scale: 1.12, y: -2 } : undefined}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors",
              "hover:bg-bg-elevated/80 hover:text-text",
              "outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
            title={link.label}
            aria-label={link.name}
          >
            <SocialIcon name={link.name} size={18} />
          </motion.a>
        ))}
      </nav>
    </aside>
  );
}
