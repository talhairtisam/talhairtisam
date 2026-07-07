"use client";

import { EnhancementGate } from "@/components/progressive/enhancement-gate";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StaticButton } from "@/components/ui/static-button";

export function HeroCtas() {
  return (
    <EnhancementGate
      phase="light"
      staticSlot={
        <div className="flex flex-wrap gap-4">
          <StaticButton href="#projects">View Work</StaticButton>
          <StaticButton variant="secondary" href="#contact">
            Get in Touch
          </StaticButton>
        </div>
      }
      enhanced={
        <div className="flex flex-wrap gap-4">
          <MagneticButton href="#projects">View Work</MagneticButton>
          <MagneticButton variant="secondary" href="#contact">
            Get in Touch
          </MagneticButton>
        </div>
      }
      overlay={false}
    />
  );
}
