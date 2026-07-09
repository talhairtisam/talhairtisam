"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { HeroScrollHint } from "./hero-scroll-hint";

type HeroParallaxProps = {
  textContent: React.ReactNode;
  coreSlot: React.ReactNode;
};

export function HeroParallax({ textContent, coreSlot }: HeroParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.15]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16"
    >
      <div className="container-main grid items-center gap-8 px-5 py-12 md:grid-cols-2 md:gap-12 md:px-8">
        <motion.div className="relative z-10" style={{ y: textY, opacity: textOpacity }}>
          {textContent}
        </motion.div>
        <motion.div style={{ y: canvasY }}>{coreSlot}</motion.div>
      </div>
      <HeroScrollHint />
    </section>
  );
}
