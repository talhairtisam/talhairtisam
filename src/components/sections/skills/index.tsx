import nextDynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/section-header";

const SkillsClusters = nextDynamic(
  () => import("./skills-clusters").then((m) => ({ default: m.SkillsClusters })),
  {
    loading: () => (
      <div aria-hidden>
        <div className="mb-6 h-14 rounded-xl border border-border/50 bg-card-bg/40" />
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[220px] rounded-2xl border border-border/40 bg-card-bg/70 p-6"
            >
              <div className="h-6 w-1/2 rounded bg-border/60" />
              <div className="mt-5 flex flex-wrap gap-2">
                {Array.from({ length: 9 }).map((__, j) => (
                  <span
                    key={`${i}-${j}`}
                    className="inline-block h-7 w-20 rounded-full bg-border/40"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
);

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-main">
        <SectionHeader
          label="Skills"
          title="Tech stack & expertise"
          subtitle="Dual-stack across MERN and Python, with production experience in AI, real-time systems, and cloud infrastructure."
        />
        <SkillsClusters />
      </div>
    </section>
  );
}
