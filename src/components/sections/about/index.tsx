import { profile } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { AboutGridBg } from "./about-grid-bg";

const focusAreas = [
  "Full-stack & backend systems",
  "AI backends & LLM integrations",
  "Production architecture & delivery",
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <AboutGridBg />

      <div className="container-main relative">
        <SectionHeader
          label="About"
          title="Building systems that scale"
          subtitle={profile.about}
        />

        <div className="max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-text-muted">{profile.summary}</p>
            <p className="mt-4 font-mono text-sm text-accent-cyan">
              📍 {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-bg-elevated/50 px-3 py-1.5 font-mono text-xs text-text-muted"
                >
                  {area}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
