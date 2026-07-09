import { SectionHeader } from "@/components/ui/section-header";
import { SkillsStatic } from "./skills-static";
import { SkillsViewport } from "./skills-viewport";

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-main">
        <SectionHeader
          label="Skills"
          title="Tech stack & expertise"
          subtitle="Dual-stack across MERN and Python, with production experience in AI, real-time systems, and cloud infrastructure."
        />
        <SkillsViewport>
          <SkillsStatic />
        </SkillsViewport>
      </div>
    </section>
  );
}
