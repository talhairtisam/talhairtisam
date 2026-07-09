"use client";

import { type ReactNode } from "react";
import { ViewportMount } from "@/components/progressive/viewport-mount";

export function TestimonialsViewport({ children }: { children: ReactNode }) {
  return (
    <ViewportMount<Record<string, never>>
      loader={() => import("./testimonials-track").then((m) => ({ default: m.TestimonialsTrack }))}
    >
      {children}
    </ViewportMount>
  );
}
