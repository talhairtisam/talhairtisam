"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getFeaturedProjects } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const featured = getFeaturedProjects();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding bg-bg-elevated/30">
      <div className="container-main">
        <SectionHeader
          label="Projects"
          title="My work"
          subtitle="Production systems and open-source work."
        />

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {featured.map((project, i) => {
              const isActive = activeIndex === i;
              const isCollapsed = activeIndex !== null && !isActive;
              const colIndex = i % 2;
              const rowIndex = Math.floor(i / 2);
              const rowCount = Math.ceil(featured.length / 2);

              return (
                <motion.article
                  key={project.slug}
                  layout
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  animate={{
                    opacity: isCollapsed ? 0.45 : 1,
                    scale: isCollapsed ? 0.98 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className={cn(
                    "relative border-border bg-card-bg/60 transition-colors duration-300",
                    i < featured.length - 1 && "border-b",
                    rowIndex < rowCount - 1 && "sm:border-b",
                    colIndex === 0 && "sm:border-r",
                    isActive && "z-10 bg-card-bg shadow-[0_0_36px_var(--glow)]",
                  )}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex h-full flex-col p-6 md:p-8"
                  >
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

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
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
                          <p className="mt-5 text-sm font-medium text-accent-cyan">
                            View case study →
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isActive && (
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-text-muted/70">
                        Hover for details
                      </p>
                    )}
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
