"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
            {experience.map((job, i) => (
              <Reveal
                key={job.title + job.period}
                className={cn(
                  "relative pl-12 md:w-[calc(50%-2rem)]",
                  i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8 md:pr-0",
                )}
              >
                <div
                  className={cn(
                    "absolute top-2 left-2 h-4 w-4 rounded-full border-2 md:left-auto",
                    job.promoted
                      ? "border-accent-lime bg-accent-lime/30 shadow-[0_0_12px_var(--accent-lime)]"
                      : "border-accent-cyan bg-accent-cyan/20",
                    i % 2 === 0 ? "md:-right-2 md:left-auto" : "md:-left-2",
                  )}
                />

                <div className="gradient-border rounded-2xl">
                  <div className="rounded-[inherit] bg-card-bg p-6 backdrop-blur-sm md:p-8">
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
                      {job.highlights.map((h) => (
                        <li key={h.slice(0, 40)} className="text-sm text-text-muted">
                          <span className="mr-2 text-accent-violet">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
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
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
