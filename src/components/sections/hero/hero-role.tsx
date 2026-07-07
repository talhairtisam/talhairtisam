"use client";

import { profile } from "@/data";
import { EnhancementGate } from "@/components/progressive/enhancement-gate";
import { TypewriterRoles } from "@/components/motion/typewriter-roles";

export function HeroRole() {
  return (
    <EnhancementGate
      phase="motion"
      className="h-8 font-mono text-sm text-text-muted md:text-base"
      staticSlot={<span>{profile.roles[0]}</span>}
      enhanced={<TypewriterRoles />}
    />
  );
}
