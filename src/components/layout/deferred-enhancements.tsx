"use client";

import { useEffect, useState, type ReactNode } from "react";
import { onIdle, useEnhancementsEnabled } from "@/lib/performance";

type DeferredEnhancementsProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Lowest priority: mounts children only when the device can handle it and the
 * browser is idle — keeps LCP/content-first on slow networks and low-end hardware.
 */
export function DeferredEnhancements({
  children,
  fallback = null,
}: DeferredEnhancementsProps) {
  const enhancements = useEnhancementsEnabled();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enhancements) return;
    return onIdle(() => setReady(true), 5000);
  }, [enhancements]);

  if (!enhancements || !ready) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
