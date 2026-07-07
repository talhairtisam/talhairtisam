"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { testimonials, linkedInRecommendations } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasTestimonials = testimonials.length > 0;
  const cards = [
    ...testimonials.map((t) => ({
      id: t.id,
      type: "testimonial" as const,
      name: t.name,
      role: `${t.role} · ${t.company}`,
      quote: t.quote,
      href: t.href,
    })),
    ...linkedInRecommendations.map((r) => ({
      id: r.id,
      type: "linkedin" as const,
      name: r.name,
      role: `${r.role} · ${r.relationship}`,
      quote: r.quotePreview,
      href: r.linkedInUrl,
    })),
  ];

  if (!hasTestimonials) {
    cards.unshift({
      id: "placeholder",
      type: "testimonial" as const,
      name: "Your testimonial here",
      role: "Future client or colleague",
      quote:
        "Worked with me on a project? Your words could live here. Add entries to src/data/testimonials.ts anytime.",
      href: undefined,
    });
  }

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.6 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [cards.length]);

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-main">
        <SectionHeader
          label="Recommendations"
          title="What people say"
          subtitle="LinkedIn recommendations and client testimonials."
        />

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:gap-6"
        >
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.1}>
              <motion.article
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-index={i}
                whileHover={{ y: -4 }}
                animate={{
                  scale: activeIndex === i ? 1.03 : 0.97,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className={cn(
                  "gradient-border w-[min(340px,85vw)] shrink-0 snap-center rounded-2xl p-6 md:p-8",
                  activeIndex === i &&
                    "ring-2 ring-accent-violet/40 shadow-[0_0_32px_var(--glow)]",
                )}
              >
                <p className="mb-4 text-sm leading-relaxed text-text-muted">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-semibold">{card.name}</p>
                    <p className="text-xs text-text-muted">{card.role}</p>
                  </div>
                  {card.href && (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs text-accent-cyan transition-colors hover:bg-accent-cyan/10"
                    >
                      {card.type === "linkedin" ? "LinkedIn →" : "Read more →"}
                    </a>
                  )}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
