export type EnhancementPhase =
  | "static"
  | "interactive"
  | "light"
  | "motion"
  | "heavy";

export const PHASE_ORDER: readonly EnhancementPhase[] = [
  "static",
  "interactive",
  "light",
  "motion",
  "heavy",
] as const;

export function phaseIndex(phase: EnhancementPhase): number {
  return PHASE_ORDER.indexOf(phase);
}

export function isPhaseAtLeast(
  current: EnhancementPhase,
  required: EnhancementPhase,
): boolean {
  return phaseIndex(current) >= phaseIndex(required);
}
