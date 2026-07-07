"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const styles = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-shadow",
    variant === "primary"
      ? "bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-lime text-bg shadow-lg shadow-accent-cyan/20 hover:shadow-accent-violet/30"
      : "border border-border bg-bg-elevated/50 text-text hover:border-accent-cyan/50",
    className,
  );

  const motionProps = {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a href={href} className={styles} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={styles} {...motionProps}>
      {children}
    </motion.button>
  );
}
