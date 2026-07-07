"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { SECTION_IDS } from "@/lib/constants";
import { usePointerOptional } from "@/context/pointer-context";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const heavy = useEnhancementAtLeast("heavy");
  const activeSection = useActiveSectionIndex();
  const { scrollYProgress } = useScroll();
  const pointer = usePointerOptional();
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const clientX = pointer?.clientX ?? fallbackX;
  const clientY = pointer?.clientY ?? fallbackY;
  const pointerEnabled = pointer?.enabled ?? false;
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [blink, setBlink] = useState(false);
  const animate = heavy && !reducedMotion;

  const companionLookX = useMotionValue(0);
  const companionLookY = useMotionValue(0);
  const springLookX = useSpring(companionLookX, { stiffness: 240, damping: 18 });
  const springLookY = useSpring(companionLookY, { stiffness: 240, damping: 18 });

  function updateCompanionLook(mx: number, my: number) {
    const el = buttonRef.current;
    if (!el || !pointerEnabled) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.34;
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < 2) {
      companionLookX.set(0);
      companionLookY.set(0);
      return;
    }

    const t = Math.min(dist / 90, 1);
    const max = 8;
    companionLookX.set((dx / dist) * t * max);
    companionLookY.set((dy / dist) * t * max);
  }

  useMotionValueEvent(clientX, "change", (mx) => updateCompanionLook(mx, clientY.get()));
  useMotionValueEvent(clientY, "change", (my) => updateCompanionLook(clientX.get(), my));
  useMotionValueEvent(scrollYProgress, "change", () => {
    updateCompanionLook(clientX.get(), clientY.get());
  });

  const dropY = useTransform(scrollYProgress, [0, 0.2, 0.55, 1], [0, 16, 44, 72]);
  const dropTilt = useTransform(scrollYProgress, [0, 0.45, 1], [0, 4, 10]);
  const driftX = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, -8, 5, -3]);

  const springDropY = useSpring(dropY, { stiffness: 65, damping: 11, mass: 0.9 });
  const springTilt = useSpring(dropTilt, { stiffness: 85, damping: 14 });
  const springX = useSpring(driftX, { stiffness: 90, damping: 18 });

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
        ref={buttonRef}
        type="button"
        onClick={hop}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Portfolio guide — click to jump to the next section"
        className="relative block cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        style={animate ? { x: springX, y: springDropY, rotate: springTilt } : undefined}
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
