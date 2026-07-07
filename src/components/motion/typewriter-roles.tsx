"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { profile } from "@/data";

const ROLES = profile.roles;

export function TypewriterRoles({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const motionReady = useEnhancementAtLeast("motion");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(ROLES[0].length);
  const [deleting, setDeleting] = useState(false);

  const currentRole = ROLES[roleIndex];

  useEffect(() => {
    if (!motionReady || reducedMotion) return;

    const timeout = setTimeout(
      () => {
        if (!deleting && charIndex < currentRole.length) {
          setCharIndex((c) => c + 1);
        } else if (!deleting && charIndex === currentRole.length) {
          setTimeout(() => setDeleting(true), 2000);
        } else if (deleting && charIndex > 0) {
          setCharIndex((c) => c - 1);
        } else if (deleting && charIndex === 0) {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      },
      deleting ? 40 : 80,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, currentRole.length, reducedMotion, motionReady]);

  if (!motionReady || reducedMotion) {
    return <span className={className}>{ROLES[0]}</span>;
  }

  return (
    <span className={className}>
      {currentRole.slice(0, charIndex)}
      <span className="animate-pulse text-accent-cyan">|</span>
    </span>
  );
}
