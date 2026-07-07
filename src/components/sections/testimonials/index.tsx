import { SectionHeader } from "@/components/ui/section-header";
import { TestimonialsTrack } from "./testimonials-track";

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
