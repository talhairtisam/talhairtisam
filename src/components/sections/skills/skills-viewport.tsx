"use client";

import { type ReactNode } from "react";
import { ViewportMount } from "@/components/progressive/viewport-mount";

export function SkillsViewport({ children }: { children: ReactNode }) {
  return (
    <ViewportMount<Record<string, never>>
      loader={() => import("./skills-clusters").then((m) => ({ default: m.SkillsClusters }))}
    >
      {children}
    </ViewportMount>
  );
}
