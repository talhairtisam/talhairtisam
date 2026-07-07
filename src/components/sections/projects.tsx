"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
          subtitle="Production systems and open-source work."
        />

        <div className="grid gap-6 sm:grid-cols-2 sm:items-stretch">
          {featured.map((project) => (
            <Reveal key={project.slug} className="h-full">
              <motion.div
                className="h-full"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <Link href={`/projects/${project.slug}`} className="block h-full">
                  <TiltCard className="h-[520px] transition-shadow duration-300 hover:shadow-[0_0_40px_var(--glow)]">
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
    <div className="flex h-full flex-col pb-6">
      <p className="font-mono text-xs text-accent-cyan">{project.context}</p>
      <h3 className="mt-2 text-xl font-bold md:text-2xl">{project.title}</h3>
      <p className="text-sm text-text-muted">{project.subtitle}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted md:text-[0.9375rem]">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((s) => (
          <span
            key={s}
            className="rounded-full bg-accent-violet/10 px-2 py-0.5 font-mono text-[10px] text-accent-violet"
          >
            {s}
          </span>
        ))}
      </div>
      <p className="mt-auto pt-8 text-sm font-medium text-accent-cyan">
        View case study →
      </p>
    </div>
  );
}
