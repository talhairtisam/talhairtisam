import { isMobileViewport, type DeviceTier } from "@/lib/performance";
import type { EnhancementPhase } from "@/lib/enhancement-phases";

export type NetworkLoadProfile = "fast" | "slow";

export function getConnectionType(): string | undefined {
  if (typeof navigator === "undefined") return undefined;
  const conn = (navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean };
  }).connection;
  return conn?.effectiveType;
}

export function getSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return Boolean(conn?.saveData);
}

export function isSlowConnection(): boolean {
  const connection = getConnectionType();
  return connection === "slow-2g" || connection === "2g" || connection === "3g";
}

/** Fast = parallel prefetch; slow = sequential staged loading. */
export function getNetworkLoadProfile(): NetworkLoadProfile {
  if (getSaveData() || isSlowConnection() || isMobileViewport()) return "slow";
  return "fast";
}

export function getMaxEnhancementPhase(
  tier: DeviceTier,
  reducedMotion: boolean,
): EnhancementPhase {
  if (reducedMotion || tier === "low") return "light";
  if (tier === "medium") return "motion";
  return "heavy";
}

export const LOAD_TIMING = {
  fast: {
    idleMs: 300,
    lightToMotionMs: 0,
    motionToHeavyMs: 0,
  },
  slow: {
    idleMs: 1200,
    lightToMotionMs: 2000,
    motionToHeavyMs: 2400,
    betweenHeavyChunksMs: 900,
  },
} as const;

function importMotion() {
  return import("motion/react");
}

function importHeavyChunks() {
  return Promise.all([
    import("@/components/three/core-canvas"),
    import("@/components/layout/floating-companion"),
    import("lenis"),
  ]);
}

async function importHeavyChunksSequential(onChunkLoaded?: () => void) {
  await import("@/components/three/core-canvas");
  onChunkLoaded?.();
  await delay(LOAD_TIMING.slow.betweenHeavyChunksMs);
  await import("@/components/layout/floating-companion");
  onChunkLoaded?.();
  await delay(LOAD_TIMING.slow.betweenHeavyChunksMs);
  await import("lenis");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function prefetchEnhancements(
  profile: NetworkLoadProfile,
  maxPhase: EnhancementPhase,
  onPhase: (phase: EnhancementPhase) => void,
  cancelled: () => boolean,
): Promise<void> {
  const canReach = (target: EnhancementPhase) => {
    const order: EnhancementPhase[] = ["static", "interactive", "light", "motion", "heavy"];
    return order.indexOf(target) <= order.indexOf(maxPhase);
  };

  onPhase("interactive");

  if (profile === "fast") {
    if (cancelled()) return;
    if (canReach("light")) onPhase("light");

    const motionImport = canReach("motion") ? importMotion() : null;
    const heavyImport = canReach("heavy") ? importHeavyChunks() : null;

    if (motionImport) {
      void motionImport.then(() => {
        if (!cancelled()) onPhase("motion");
      });
    }

    await Promise.all([motionImport, heavyImport].filter(Boolean) as Promise<unknown>[]);
    if (cancelled()) return;

    if (canReach("heavy")) onPhase("heavy");
    return;
  }

  // Slow: advance one phase at a time, prefetch each chunk before activating it.
  if (cancelled()) return;
  if (canReach("light")) onPhase("light");

  if (canReach("motion")) {
    await delay(LOAD_TIMING.slow.lightToMotionMs);
    if (cancelled()) return;
    await importMotion();
    if (cancelled()) return;
    onPhase("motion");
  }

  if (canReach("heavy")) {
    await delay(LOAD_TIMING.slow.motionToHeavyMs);
    if (cancelled()) return;
    await importHeavyChunksSequential();
    if (cancelled()) return;
    onPhase("heavy");
  }
}
