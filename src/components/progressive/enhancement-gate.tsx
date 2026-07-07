"use client";

import type { EnhancementPhase } from "@/lib/enhancement-phases";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { cn } from "@/lib/utils";

type EnhancementGateProps = {
  phase: EnhancementPhase;
  staticSlot: React.ReactNode;
  enhanced?: React.ReactNode;
  className?: string;
  slotClassName?: string;
  overlay?: boolean;
};

export function EnhancementGate({
  phase,
  staticSlot,
  enhanced,
  className,
  slotClassName,
  overlay = true,
}: EnhancementGateProps) {
  const ready = useEnhancementAtLeast(phase);

  if (!enhanced) {
    return <div className={className}>{staticSlot}</div>;
  }

  return (
    <div className={cn("enhancement-slot", className)}>
      <div
        className={cn(
          slotClassName,
          overlay && ready && "opacity-0 transition-opacity duration-200",
          !overlay && ready && "hidden",
        )}
        aria-hidden={ready}
      >
        {staticSlot}
      </div>
      {ready && (
        <div
          className={cn(
            overlay ? "enhancement-layer absolute inset-0 is-ready" : "is-ready",
          )}
        >
          {enhanced}
        </div>
      )}
    </div>
  );
}
