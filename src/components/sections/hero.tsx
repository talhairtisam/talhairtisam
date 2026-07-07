"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/data";
import { LetterReveal } from "@/components/motion/letter-reveal";
import { TypewriterRoles } from "@/components/motion/typewriter-roles";
import { MagneticButton } from "@/components/ui/magnetic-button";

const CoreCanvas = dynamic(
  () => import("@/components/three/core-canvas").then((m) => m.CoreCanvas),
  { ssr: false },
);

export function HeroSection() {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 80) setShowHint(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16"
    >
      <div className="container-main grid items-center gap-8 px-5 py-12 md:grid-cols-2 md:gap-12 md:px-8">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan"
          >
            {profile.availability}
          </motion.p>

          <h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <LetterReveal text={profile.name} className="gradient-text" />
          </h1>

          <div className="mb-6 h-8 font-mono text-sm text-text-muted md:text-base">
            <TypewriterRoles />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 max-w-lg text-text-muted"
          >
            {profile.summary.slice(0, 160)}…
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton onClick={() => scrollTo("projects")}>
              View Work
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => scrollTo("contact")}>
              Get in Touch
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative h-[280px] sm:h-[360px] md:h-[480px] lg:h-[560px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-violet/10 blur-2xl" />
          <CoreCanvas size="hero" className="h-full w-full" interactive />
        </div>
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xl"
          >
            ↓
          </motion.span>
        </motion.div>
      )}
    </section>
  );
}
