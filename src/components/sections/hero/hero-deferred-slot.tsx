"use client";

import dynamic from "next/dynamic";

const HeroDeferred = dynamic(
  () => import("./hero-deferred").then((m) => ({ default: m.HeroDeferred })),
  { ssr: false },
);

export function HeroDeferredSlot() {
  return <HeroDeferred />;
}
