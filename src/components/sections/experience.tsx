"use client";

import { experience } from "@/data";
import { ExperienceRoleCard } from "@/components/experience/experience-role-card";
import { HumanoidCharacter } from "@/components/avatar/humanoid-character";
import { SectionHeader } from "@/components/ui/section-header";
import { usePointer } from "@/context/pointer-context";
import { useEnhancementsEnabled } from "@/lib/performance";

export function ExperienceSection() {
  const { lookX, lookY, enabled: pointerEnabled } = usePointer();
  const enhancements = useEnhancementsEnabled();

  return (
    <section id="experience" className="section-padding bg-bg-elevated/30">
      <div className="container-main">
        <SectionHeader
          label="Experience"
          title="Career journey"
          subtitle="From full-stack engineer to technical lead across production systems."
        />

        <div className="lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
          <div className="relative mb-10 hidden lg:sticky lg:top-28 lg:mb-0 lg:block">
            <div className="rounded-2xl border border-border/60 bg-card-bg/40 p-8 backdrop-blur-sm">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-violet">
                What I do
              </p>
              <h3 className="text-2xl font-bold leading-tight">
                Building production systems with full ownership
              </h3>
              <p className="mt-3 text-sm text-text-muted">
                Hover a role card to see highlights, tech stack, and impact.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="scale-[2.4]">
                  <HumanoidCharacter
                    accent="var(--accent-violet)"
                    lookX={enhancements && pointerEnabled ? lookX : undefined}
                    lookY={enhancements && pointerEnabled ? lookY : undefined}
                    leftArmRotate={-18}
                    rightArmRotate={22}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {experience.map((job, i) => (
              <ExperienceRoleCard key={job.title + job.period} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
