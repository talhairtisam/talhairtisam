"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import type { EnhancementPhase } from "@/lib/enhancement-phases";
import { isPhaseAtLeast } from "@/lib/enhancement-phases";
import {
  getEnhancementPhase,
  startEnhancementLoader,
  subscribeEnhancementPhase,
} from "@/lib/load-enhancements";

type EnhancementContextValue = {
  phase: EnhancementPhase;
  isAtLeast: (required: EnhancementPhase) => boolean;
};

const EnhancementContext = createContext<EnhancementContextValue | null>(null);

export function EnhancementProvider({ children }: { children: React.ReactNode }) {
  const phase = useSyncExternalStore(
    subscribeEnhancementPhase,
    getEnhancementPhase,
    () => "static" as EnhancementPhase,
  );

  useEffect(() => startEnhancementLoader(), []);

  return (
    <EnhancementContext.Provider
      value={{
        phase,
        isAtLeast: (required) => isPhaseAtLeast(phase, required),
      }}
    >
      {children}
    </EnhancementContext.Provider>
  );
}

export function useEnhancementPhase(): EnhancementPhase {
  const ctx = useContext(EnhancementContext);
  return ctx?.phase ?? "static";
}

export function useEnhancementAtLeast(required: EnhancementPhase): boolean {
  const ctx = useContext(EnhancementContext);
  if (!ctx) return false;
  return ctx.isAtLeast(required);
}
