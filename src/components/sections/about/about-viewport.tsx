"use client";

import { type ReactNode } from "react";
import { ViewportMount } from "@/components/progressive/viewport-mount";

type AboutViewportProps = {
  children: ReactNode;
  summary: string;
  location: string;
};

export function AboutViewport({ children, summary, location }: AboutViewportProps) {
  return (
    <ViewportMount<{ summary: string; location: string }>
      loader={() => import("./about-content").then((m) => ({ default: m.AboutContent }))}
      componentProps={{ summary, location }}
    >
      {children}
    </ViewportMount>
  );
}
