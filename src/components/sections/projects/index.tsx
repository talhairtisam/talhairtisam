import nextDynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/section-header";

const ProjectsGrid = nextDynamic(
  () => import("./projects-grid").then((m) => ({ default: m.ProjectsGrid })),
  {
    loading: () => (
      <div className="overflow-hidden rounded-xl border border-border" aria-hidden>
        <div className="grid min-h-[780px] grid-cols-1 sm:min-h-[620px] sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-border bg-card-bg/50 p-6 md:p-8 sm:[&:nth-child(odd)]:border-r [&:not(:last-child)]:border-b sm:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <div className="h-3 w-24 rounded bg-border/60" />
              <div className="mt-3 h-6 w-2/3 rounded bg-border/50" />
              <div className="mt-2 h-4 w-5/6 rounded bg-border/40" />
              <div className="mt-10 h-4 w-full rounded bg-border/30" />
              <div className="mt-2 h-4 w-11/12 rounded bg-border/30" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
);

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-bg-elevated/30">
      <div className="container-main">
        <SectionHeader
          label="Projects"
          title="My work"
          subtitle="Production systems and open-source work."
        />
        <ProjectsGrid />
      </div>
    </section>
  );
}
