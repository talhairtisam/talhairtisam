"use client";

import { motion } from "motion/react";
import { skillClusters } from "@/data";
import { TechIconMarquee } from "@/components/skills/tech-icon-marquee";
import { TechIcon } from "@/components/icons/tech-icon";
import { TiltCard } from "@/components/ui/tilt-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { skillToSlug } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

function SkillIcon({ skill }: { skill: string }) {
  const lightReady = useEnhancementAtLeast("light");
  const slug = skillToSlug(skill);

  if (!slug) return null;

  if (!lightReady) {
    return <span className="icon-skeleton size-3.5 shrink-0 rounded-full" aria-hidden />;
  }

  return <TechIcon slug={slug} size={14} title={skill} />;
}

export function SkillsClusters() {
  const motionReady = useEnhancementAtLeast("motion");

  return (
    <>
      <TechIconMarquee />

      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        {skillClusters.map((cluster) => (
          <Stagger key={cluster.name}>
            <StaggerItem>
              {motionReady ? (
                <TiltCard>
                  <ClusterContent cluster={cluster} motionReady />
                </TiltCard>
              ) : (
                <div className="rounded-2xl border border-border/40 bg-card-bg/80 p-6">
                  <ClusterContent cluster={cluster} motionReady={false} />
                </div>
              )}
            </StaggerItem>
          </Stagger>
        ))}
      </div>
    </>
  );
}

function ClusterContent({
  cluster,
  motionReady,
}: {
  cluster: (typeof skillClusters)[number];
  motionReady: boolean;
}) {
  return (
    <>
      <h3 className="relative mb-4 text-lg font-semibold">
        {cluster.name}
        {motionReady && (
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-violet"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        )}
      </h3>
      <div className="flex flex-wrap gap-2">
        {cluster.skills.map((skill) => (
          <StaggerItem key={skill}>
            <SkillPill skill={skill} motionReady={motionReady} />
          </StaggerItem>
        ))}
      </div>
    </>
  );
}

function SkillPill({ skill, motionReady }: { skill: string; motionReady: boolean }) {
  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated/50 px-3 py-1.5 font-mono text-xs text-text-muted transition-colors hover:border-accent-cyan/40 hover:text-text",
      )}
    >
      <SkillIcon skill={skill} />
      {skill}
    </span>
  );

  if (!motionReady) return inner;

  return (
    <motion.span whileHover={{ scale: 1.05, rotate: -1 }} className="inline-flex">
      {inner}
    </motion.span>
  );
}
