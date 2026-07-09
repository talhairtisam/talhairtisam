import nextDynamic from "next/dynamic";
import { profile } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";

const AboutGridBg = nextDynamic(
  () => import("./about-grid-bg").then((m) => ({ default: m.AboutGridBg })),
  {
    loading: () => (
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-80 dark:opacity-60" />
    ),
  },
);

const AboutContent = nextDynamic(
  () => import("./about-content").then((m) => ({ default: m.AboutContent })),
  {
    loading: () => (
      <div className="max-w-3xl" aria-hidden>
        <div className="h-6 w-full rounded bg-border/30" />
        <div className="mt-2 h-6 w-11/12 rounded bg-border/30" />
        <div className="mt-5 h-4 w-44 rounded bg-border/40" />
        <div className="mt-8 flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="inline-block h-8 w-52 rounded-full bg-border/40" />
          ))}
        </div>
      </div>
    ),
  },
);

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

        <AboutContent summary={profile.summary} location={profile.location} />
      </div>
    </section>
  );
}
