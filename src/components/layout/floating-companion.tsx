"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { SECTION_IDS } from "@/lib/constants";
import { useEnhancementsEnabled } from "@/lib/performance";
import { HumanoidCharacter } from "@/components/avatar/humanoid-character";

const SECTION_COLORS = [
  "var(--accent-cyan)",
  "var(--accent-violet)",
  "var(--accent-lime)",
  "var(--accent-cyan)",
  "var(--accent-violet)",
  "var(--accent-lime)",
  "var(--accent-cyan)",
];

function useActiveSectionIndex() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const sections = SECTION_IDS.map((id) => document.getElementById(id));
      const current = sections.findIndex((el, i) => {
        const next = sections[i + 1];
        if (!el) return false;
        const top = el.offsetTop - 140;
        const bottom = next ? next.offsetTop - 140 : Infinity;
        return scrollTop >= top && scrollTop < bottom;
      });
      if (current >= 0) setIndex(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return index;
}

export function FloatingCompanion() {
  const reducedMotion = useReducedMotion();
  const enhancements = useEnhancementsEnabled();
  const activeSection = useActiveSectionIndex();
  const { scrollY, scrollYProgress } = useScroll();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [blink, setBlink] = useState(false);

  const animate = enhancements && !reducedMotion;

  const floatY = useTransform(scrollY, [0, 1400], [0, -56]);
  const driftX = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, -10, 6, -4]);
  const headTilt = useTransform(scrollYProgress, [0, 0.5, 1], [0, 4, -3]);
  const springY = useSpring(floatY, { stiffness: 110, damping: 20 });
  const springX = useSpring(driftX, { stiffness: 90, damping: 18 });
  const springTilt = useSpring(headTilt, { stiffness: 120, damping: 22 });

  const lookX = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.7, 1], [-2.5, 3, -1.5, 2.5, 0]);
  const lookY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -1.5, 0.8]);
  const springLookX = useSpring(lookX, { stiffness: 200, damping: 22 });
  const springLookY = useSpring(lookY, { stiffness: 200, damping: 22 });

  const accent = SECTION_COLORS[activeSection] ?? SECTION_COLORS[0];

  useEffect(() => {
    if (!animate) return;
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, [animate]);

  function hop() {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    const next = SECTION_IDS[(activeSection + 1) % SECTION_IDS.length];
    document.getElementById(next)?.scrollIntoView({ behavior: "smooth" });
  }

  const leftArm =
    activeSection === 0 ? -22 : activeSection === 3 ? 14 : activeSection === 4 ? -38 : hovered ? -28 : 4;
  const rightArm =
    activeSection === 0 ? 18 : activeSection === 3 ? -12 : activeSection === 4 ? 32 : hovered ? 24 : -6;

  return (
    <div className="fixed right-2 bottom-4 z-[var(--z-companion)] sm:right-5 sm:bottom-7">
      <motion.button
        type="button"
        onClick={hop}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Portfolio guide — click to jump to the next section"
        className="relative block cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        style={animate ? { x: springX, y: springY, rotate: springTilt } : undefined}
        animate={
          clicked
            ? { scale: [1, 1.1, 1], y: [0, -8, 0] }
            : hovered && animate
              ? { scale: 1.06 }
              : { scale: 1 }
        }
        transition={{ type: "spring", stiffness: 380, damping: 16 }}
      >
        <div
          className="absolute -inset-4 rounded-full opacity-50 blur-xl transition-colors duration-700"
          style={{ background: `radial-gradient(circle, ${accent}44, transparent 72%)` }}
        />

        <motion.div
          animate={animate ? { y: [0, -4, 0] } : undefined}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <HumanoidCharacter
            accent={accent}
            lookX={animate ? springLookX : undefined}
            lookY={animate ? springLookY : undefined}
            leftArmRotate={leftArm}
            rightArmRotate={rightArm}
            wave={clicked}
            blink={blink}
          />
        </motion.div>
      </motion.button>
    </div>
  );
}
