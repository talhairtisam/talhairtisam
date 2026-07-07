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

        <div className="lg:flex lg:items-start lg:gap-12">
          <aside className="relative mb-10 hidden lg:mb-0 lg:block lg:w-[30%] lg:max-w-[20rem] lg:shrink-0">
            <div className="sticky top-28 isolate [transform:translateZ(0)]">
              <div className="rounded-2xl border border-border/60 bg-card-bg p-8">
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
          </aside>

          <div className="min-w-0 flex-1 space-y-5">
            {experience.map((job, i) => (
              <ExperienceRoleCard key={job.title + job.period} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
