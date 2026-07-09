"use client";

import { type ReactNode } from "react";
import { ViewportMount } from "@/components/progressive/viewport-mount";

export function ProjectsViewport({ children }: { children: ReactNode }) {
  return (
    <ViewportMount<Record<string, never>>
      loader={() => import("./projects-grid").then((m) => ({ default: m.ProjectsGrid }))}
    >
      {children}
    </ViewportMount>
  );
}
