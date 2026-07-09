"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { isLgViewport } from "@/lib/performance";

const LeftRail = dynamic(
  () => import("./left-rail").then((m) => ({ default: m.LeftRail })),
  { ssr: false },
);

function subscribeLg(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

export function LeftRailSlot() {
  const isLg = useSyncExternalStore(subscribeLg, isLgViewport, () => false);
  if (!isLg) return null;
  return <LeftRail />;
}
