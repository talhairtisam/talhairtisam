"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const SECTION_COLORS = [
  "var(--accent-cyan)",
  "var(--accent-violet)",
  "var(--accent-lime)",
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section-padding bg-bg-elevated/30">
      <div className="container-main">
        <SectionHeader
          label="Experience"
          title="Career journey"
          subtitle="From full-stack engineer to technical lead across production systems."
        />

        <div ref={containerRef} className="relative">
          <div className="absolute top-0 left-4 h-full w-px bg-border md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-lime"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {experience.map((job, i) => {
              const expanded = expandedIndex === i;
              const visibleHighlights = expanded
                ? job.highlights
                : job.highlights.slice(0, 2);
              const accent = SECTION_COLORS[i % SECTION_COLORS.length];
              const isActive = activeIndex === i;

              return (
                <Reveal
                  key={job.title + job.period}
                  className={cn(
                    "relative pl-12 md:w-[calc(50%-2rem)]",
                    i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8 md:pr-0",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-2 left-2 h-4 w-4 rounded-full border-2 transition-all duration-500 md:left-auto",
                      job.promoted
                        ? "border-accent-lime bg-accent-lime/30"
                        : "border-accent-cyan bg-accent-cyan/20",
                      isActive && "scale-125 shadow-[0_0_16px_var(--accent-cyan)]",
                      i % 2 === 0 ? "md:-right-2 md:left-auto" : "md:-left-2",
                    )}
                    style={
                      isActive
                        ? { boxShadow: `0 0 16px ${accent}` }
                        : undefined
                    }
                  />

                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    data-index={i}
                    className="gradient-border rounded-2xl transition-transform duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(expanded ? null : i)}
                      className="w-full rounded-[inherit] bg-card-bg p-6 text-left backdrop-blur-sm transition-colors hover:bg-bg-elevated/40 md:p-8"
                      aria-expanded={expanded}
                    >
                      {job.promoted && (
                        <span className="mb-2 inline-block rounded-full bg-accent-lime/10 px-3 py-0.5 font-mono text-xs text-accent-lime">
                          Promoted to Senior
                        </span>
                      )}
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-sm text-accent-cyan">{job.company}</p>
                      <p className="text-xs text-text-muted">
                        {job.location} · {job.period}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {visibleHighlights.map((h) => (
                          <li key={h.slice(0, 40)} className="text-sm text-text-muted">
                            <span className="mr-2 text-accent-violet">▹</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      {job.highlights.length > 2 && (
                        <p className="mt-3 font-mono text-xs text-accent-cyan">
                          {expanded ? "Show less ↑" : `+${job.highlights.length - 2} more highlights ↓`}
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.tech.slice(0, 8).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
