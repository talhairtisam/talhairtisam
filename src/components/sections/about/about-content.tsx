"use client";

import { Reveal } from "@/components/motion/reveal";

const focusAreas = [
  "Full-stack & backend systems",
  "AI backends & LLM integrations",
  "Production architecture & delivery",
];

type AboutContentProps = {
  summary: string;
  location: string;
};

export function AboutContent({ summary, location }: AboutContentProps) {
  return (
    <div className="max-w-3xl min-h-[188px]">
      <Reveal>
        <p className="text-lg leading-relaxed text-text-muted">{summary}</p>
        <p className="mt-4 font-mono text-sm text-accent-cyan">📍 {location}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-border bg-bg-elevated/50 px-3 py-1.5 font-mono text-xs text-text-muted"
            >
              {area}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
