"use client";

import { profile } from "@/data";
import { EnhancementGate } from "@/components/progressive/enhancement-gate";
import { LetterReveal } from "@/components/motion/letter-reveal";

export function HeroTitle() {
  return (
    <EnhancementGate
      phase="motion"
      staticSlot={<span className="gradient-text">{profile.name}</span>}
      enhanced={<LetterReveal text={profile.name} className="gradient-text" />}
    />
  );
}
