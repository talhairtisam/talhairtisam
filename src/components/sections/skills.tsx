"use client";

import { skillClusters } from "@/data";
import { TechIconMarquee } from "@/components/skills/tech-icon-marquee";
import { TechIcon } from "@/components/icons/tech-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { TiltCard } from "@/components/ui/tilt-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { skillToSlug } from "@/lib/skill-icons";
import { motion } from "motion/react";

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-main">
        <SectionHeader
          label="Skills"
          title="Tech stack & expertise"
          subtitle="Dual-stack across MERN and Python, with production experience in AI, real-time systems, and cloud infrastructure."
        />

        <TechIconMarquee />

        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {skillClusters.map((cluster) => (
            <Stagger key={cluster.name}>
              <StaggerItem>
                <TiltCard>
                  <h3 className="relative mb-4 text-lg font-semibold">
                    {cluster.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-violet"
                      initial={{ width: 0 }}
                      whileInView={{ width: "4rem" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cluster.skills.map((skill) => {
                      const slug = skillToSlug(skill);
                      return (
                        <StaggerItem key={skill}>
                          <motion.span
                            whileHover={{ scale: 1.05, rotate: -1 }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated/50 px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent-cyan/40 hover:text-text"
                          >
                            {slug && (
                              <TechIcon slug={slug} size={14} title={skill} />
                            )}
                            {skill}
                          </motion.span>
                        </StaggerItem>
                      );
                    })}
                  </div>
                </TiltCard>
              </StaggerItem>
            </Stagger>
          ))}
        </div>
      </div>
    </section>
  );
}
