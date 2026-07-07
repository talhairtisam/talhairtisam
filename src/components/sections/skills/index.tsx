import { SectionHeader } from "@/components/ui/section-header";
import { SkillsClusters } from "./skills-clusters";

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
