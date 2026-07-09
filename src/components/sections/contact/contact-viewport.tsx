"use client";

import { type ReactNode } from "react";
import { ViewportMount } from "@/components/progressive/viewport-mount";

export function ContactViewport({ children }: { children: ReactNode }) {
  return (
    <ViewportMount<Record<string, never>>
      loader={() =>
        import("./contact-interactive").then((m) => ({ default: m.ContactInteractive }))
      }
    >
      {children}
    </ViewportMount>
  );
}
