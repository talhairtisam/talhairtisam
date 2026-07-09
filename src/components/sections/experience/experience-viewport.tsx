"use client";

import { type ReactNode } from "react";
import { ViewportMount } from "@/components/progressive/viewport-mount";
import type { ExperienceItem } from "@/data/types";

type ExperienceCardViewportProps = {
  job: ExperienceItem;
  index: number;
  children: ReactNode;
};

export function ExperienceCardViewport({ job, index, children }: ExperienceCardViewportProps) {
  return (
    <ViewportMount<{ job: ExperienceItem; index: number }>
      loader={() =>
        import("@/components/experience/experience-role-card").then((m) => ({
          default: m.ExperienceRoleCard,
        }))
      }
      componentProps={{ job, index }}
    >
      {children}
    </ViewportMount>
  );
}
