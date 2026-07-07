"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { getFeaturedProjects } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/motion/reveal";
import { useEnhancementsEnabled } from "@/lib/performance";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const featured = getFeaturedProjects();
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const enhancements = useEnhancementsEnabled();

  const { scrollXProgress } = useScroll({
    container: scrollRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useTransform(scrollXProgress, [0, 1], [0, 1]);

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
      { root: scrollRef.current, threshold: 0.55 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section-padding bg-bg-elevated/30">
      <div className="container-main">
        <SectionHeader
          label="Projects"
          title="Featured work"
          subtitle="Production systems and open-source work."
        />

        {enhancements && (
          <div className="mb-6 hidden h-1 overflow-hidden rounded-full bg-border md:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-lime"
              style={{ scaleX: progressScale }}
            />
          </div>
        )}

        <div className="flex flex-col gap-6 md:hidden">
          {featured.map((project) => (
            <Reveal key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="block">
                <TiltCard>
                  <ProjectCardContent project={project} />
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>

        <div
          ref={scrollRef}
          className="hidden gap-6 overflow-x-auto pb-4 md:flex md:snap-x md:snap-mandatory"
        >
          {featured.map((project, i) => (
            <Reveal
              key={project.slug}
              className="w-[min(420px,80vw)] shrink-0 snap-center"
            >
              <motion.div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-index={i}
                animate={
                  enhancements
                    ? {
                        scale: activeIndex === i ? 1.04 : 0.94,
                        opacity: activeIndex === i ? 1 : 0.62,
                      }
                    : undefined
                }
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="h-full"
              >
                <Link href={`/projects/${project.slug}`} className="block h-full">
                  <TiltCard
                    className={cn(
                      "h-full transition-shadow duration-300",
                      activeIndex === i && "shadow-[0_0_40px_var(--glow)]",
                    )}
                  >
                    <ProjectCardContent project={project} />
                  </TiltCard>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardContent({
  project,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
}) {
  return (
    <>
      <p className="font-mono text-xs text-accent-cyan">{project.context}</p>
      <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
      <p className="text-sm text-text-muted">{project.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
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
      <p className="mt-4 text-sm font-medium text-accent-cyan">
        View case study →
      </p>
    </>
  );
}
