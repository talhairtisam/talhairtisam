import { SectionHeader } from "@/components/ui/section-header";
import { ProjectsGrid } from "./projects-grid";

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
