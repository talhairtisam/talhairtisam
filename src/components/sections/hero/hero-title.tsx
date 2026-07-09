"use client";

import { profile } from "@/data";
import { EnhancementGate } from "@/components/progressive/enhancement-gate";
import { LetterReveal } from "@/components/motion/letter-reveal";

export function HeroTitle() {
  return (
    <EnhancementGate
      phase="motion"
      overlay={false}
      staticSlot={
        <span className="text-text md:gradient-text">{profile.name}</span>
      }
      enhanced={
        <LetterReveal text={profile.name} className="gradient-text" />
      }
    />
  );
}
