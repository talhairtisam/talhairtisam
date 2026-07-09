import nextDynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/section-header";

const TestimonialsTrack = nextDynamic(
  () => import("./testimonials-track").then((m) => ({ default: m.TestimonialsTrack })),
  {
    loading: () => (
      <div className="relative min-h-[min(420px,62vh)] overflow-hidden" aria-hidden>
        <div className="flex h-[392px] gap-4 overflow-hidden md:gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-full min-w-[82%] rounded-xl border border-border bg-card-bg/60 p-5 md:min-w-[48%]"
            >
              <div className="h-4 w-2/3 rounded bg-border/50" />
              <div className="mt-4 h-3 w-full rounded bg-border/40" />
              <div className="mt-2 h-3 w-11/12 rounded bg-border/40" />
              <div className="mt-2 h-3 w-10/12 rounded bg-border/40" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
);

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding overflow-hidden">
      <div className="container-main">
        <SectionHeader
          label="Recommendations"
          title="What people say"
          subtitle="LinkedIn recommendations from colleagues and teammates."
        />
        <TestimonialsTrack />
      </div>
    </section>
  );
}
