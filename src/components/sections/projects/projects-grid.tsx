"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { getFeaturedProjects } from "@/data";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { cn } from "@/lib/utils";

export function ProjectsGrid() {
  const featured = getFeaturedProjects();
  const lightReady = useEnhancementAtLeast("light");
  const motionReady = useEnhancementAtLeast("motion");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {featured.map((project, i) => {
          const isActive = lightReady && activeIndex === i;
          const isCollapsed = lightReady && activeIndex !== null && !isActive;
          const colIndex = i % 2;
          const rowIndex = Math.floor(i / 2);
          const rowCount = Math.ceil(featured.length / 2);

          const articleClass = cn(
            "relative border-border bg-card-bg/60 transition-colors duration-300",
            i < featured.length - 1 && "border-b",
            rowIndex < rowCount - 1 && "sm:border-b",
            colIndex === 0 && "sm:border-r",
            isActive && "z-10 bg-card-bg shadow-[0_0_36px_var(--glow)]",
            motionReady && isCollapsed && "opacity-45 scale-[0.98]",
          );

          const inner = (
            <Link href={`/projects/${project.slug}`} className="flex h-full flex-col p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-accent-cyan">{project.context}</p>
                  <h3 className="mt-1 text-xl font-bold md:text-2xl">{project.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{project.subtitle}</p>
                </div>
                <span className="shrink-0 font-mono text-3xl font-bold text-text-muted/25 md:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-[0.9375rem]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-accent-violet/10 px-2 py-0.5 font-mono text-[10px] text-accent-violet"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm font-medium text-accent-cyan">View case study →</p>
                </div>
              </div>

              {!isActive && (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-text-muted/70">
                  Hover for details
                </p>
              )}
            </Link>
          );

          if (motionReady) {
            return (
              <motion.article
                key={project.slug}
                onMouseEnter={() => lightReady && setActiveIndex(i)}
                onMouseLeave={() => lightReady && setActiveIndex(null)}
                className={articleClass}
                layout={false}
              >
                {inner}
              </motion.article>
            );
          }

          return (
            <article
              key={project.slug}
              onMouseEnter={() => lightReady && setActiveIndex(i)}
              onMouseLeave={() => lightReady && setActiveIndex(null)}
              className={articleClass}
            >
              {inner}
            </article>
          );
        })}
      </div>
    </div>
  );
}
