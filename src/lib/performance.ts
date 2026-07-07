"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "low" | "medium" | "high";

function getConnectionType(): string | undefined {
  if (typeof navigator === "undefined") return undefined;
  const conn = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
  return conn?.effectiveType;
}

function getSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

export function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "medium";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = getSaveData();
  const connection = getConnectionType();
  const cores = navigator.hardwareConcurrency ?? 4;
  const slowConnection = connection === "slow-2g" || connection === "2g" || connection === "3g";

  if (reducedMotion || saveData || slowConnection || cores <= 2) {
    return "low";
  }

  if (cores >= 8 && connection === "4g") {
    return "high";
  }

  return "medium";
}

/** 3D, Lenis, cursor glow, and heavy motion — lowest loading priority */
export function shouldLoadEnhancements(): boolean {
  return getDeviceTier() !== "low";
}

/** Defer non-critical bundles until the browser is idle */
export function onIdle(callback: () => void, timeout = 4000): () => void {
  if (typeof window === "undefined") return () => {};

  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const id = globalThis.setTimeout(callback, Math.min(timeout, 1500));
  return () => globalThis.clearTimeout(id);
}

function subscribeToTier(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(
    subscribeToTier,
    getDeviceTier,
    () => "medium",
  );
}

export function useEnhancementsEnabled(): boolean {
  const tier = useDeviceTier();
  return tier !== "low";
}
