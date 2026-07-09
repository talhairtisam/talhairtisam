import { SectionHeader } from "@/components/ui/section-header";
import { TestimonialsStatic } from "./testimonials-static";
import { TestimonialsViewport } from "./testimonials-viewport";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding overflow-hidden">
      <div className="container-main">
        <SectionHeader
          label="Recommendations"
          title="What people say"
          subtitle="LinkedIn recommendations from colleagues and teammates."
        />
        <TestimonialsViewport>
          <TestimonialsStatic />
        </TestimonialsViewport>
      </div>
    </section>
  );
}
