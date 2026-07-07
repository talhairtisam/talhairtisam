"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useEnhancementAtLeast } from "@/context/enhancement-context";

export function HeroScrollHint() {
  const [show, setShow] = useState(true);
  const motionReady = useEnhancementAtLeast("motion");

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 80) setShow(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted">
      <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
      {motionReady ? (
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-xl"
        >
          ↓
        </motion.span>
      ) : (
        <span className="text-xl">↓</span>
      )}
    </div>
  );
}
