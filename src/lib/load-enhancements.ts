import type { EnhancementPhase } from "@/lib/enhancement-phases";
import { getDeviceTier, onIdle } from "@/lib/performance";
import {
  getMaxEnhancementPhase,
  getNetworkLoadProfile,
  LOAD_TIMING,
  prefetchEnhancements,
} from "@/lib/network-gate";

type PhaseListener = (phase: EnhancementPhase) => void;

let currentPhase: EnhancementPhase = "static";
const listeners = new Set<PhaseListener>();
let started = false;

export function getEnhancementPhase(): EnhancementPhase {
  return currentPhase;
}

export function subscribeEnhancementPhase(listener: PhaseListener): () => void {
  listeners.add(listener);
  listener(currentPhase);
  return () => listeners.delete(listener);
}

function setPhase(phase: EnhancementPhase) {
  if (currentPhase === phase) return;
  currentPhase = phase;
  listeners.forEach((l) => l(phase));
}

export function startEnhancementLoader(): () => void {
  if (started || typeof window === "undefined") return () => {};
  started = true;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tier = getDeviceTier();
  const maxPhase = getMaxEnhancementPhase(tier, reducedMotion);
  const profile = getNetworkLoadProfile();
  const idleMs = LOAD_TIMING[profile].idleMs;

  let cancelled = false;
  const isCancelled = () => cancelled;

  const cancelIdle = onIdle(() => {
    void prefetchEnhancements(profile, maxPhase, setPhase, isCancelled);
  }, idleMs);

  return () => {
    cancelled = true;
    cancelIdle();
  };
}
