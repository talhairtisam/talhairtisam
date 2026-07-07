"use client";

import Link from "next/link";
import { getFeaturedProjects } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/motion/reveal";

export function ProjectsSection() {
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="section-padding bg-bg-elevated/30">
      <div className="container-main">
        <SectionHeader
          label="Projects"
          title="Featured work"
          subtitle="Production systems I've architected and shipped."
        />

        {/* Mobile: stacked */}
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

        {/* Desktop: horizontal scroll */}
        <div className="hidden gap-6 overflow-x-auto pb-4 md:flex md:snap-x md:snap-mandatory">
          {featured.map((project) => (
            <Reveal key={project.slug} className="w-[min(420px,80vw)] shrink-0 snap-start">
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <TiltCard className="h-full">
                  <ProjectCardContent project={project} />
                </TiltCard>
              </Link>
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
