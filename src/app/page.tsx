import nextDynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero";

export const dynamic = "force-static";

const AboutSection = nextDynamic(() =>
  import("@/components/sections/about").then((m) => ({ default: m.AboutSection })),
);
const ExperienceSection = nextDynamic(() =>
  import("@/components/sections/experience").then((m) => ({
    default: m.ExperienceSection,
  })),
);
const ProjectsSection = nextDynamic(() =>
  import("@/components/sections/projects").then((m) => ({ default: m.ProjectsSection })),
);
const SkillsSection = nextDynamic(() =>
  import("@/components/sections/skills").then((m) => ({ default: m.SkillsSection })),
);
const TestimonialsSection = nextDynamic(() =>
  import("@/components/sections/testimonials").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const ContactSection = nextDynamic(() =>
  import("@/components/sections/contact").then((m) => ({ default: m.ContactSection })),
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
