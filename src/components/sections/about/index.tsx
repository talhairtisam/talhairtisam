import { profile } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { AboutStatic } from "./about-static";
import { AboutViewport } from "./about-viewport";

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-80 dark:opacity-60"
        aria-hidden
      />

      <div className="container-main relative">
        <SectionHeader
          label="About"
          title="Building systems that scale"
          subtitle={profile.about}
        />

        <AboutViewport summary={profile.summary} location={profile.location}>
          <AboutStatic summary={profile.summary} location={profile.location} />
        </AboutViewport>
      </div>
    </section>
  );
}
