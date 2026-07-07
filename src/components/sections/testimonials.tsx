"use client";

import { useEffect, useRef, useState } from "react";
import { linkedInRecommendations, testimonials } from "@/data";
import {
  RecommendationCard,
  type RecommendationCardData,
} from "@/components/testimonials/recommendation-card";
import { SectionHeader } from "@/components/ui/section-header";

function buildCards(): RecommendationCardData[] {
  const cards: RecommendationCardData[] = [
    ...testimonials.map((t) => ({
      id: t.id,
      type: "testimonial" as const,
      name: t.name,
      role: `${t.role} · ${t.company}`,
      quote: t.quote,
      href: t.href,
      profileUrl: t.href,
      avatar: t.avatar,
    })),
    ...linkedInRecommendations.map((r) => ({
      id: r.id,
      type: "linkedin" as const,
      name: r.name,
      role: r.role,
      quote: r.quotePreview,
      href: r.linkedInUrl,
      profileUrl: r.profileUrl,
      avatar: r.avatar,
    })),
  ];

  if (testimonials.length === 0 && linkedInRecommendations.length === 0) {
    cards.push({
      id: "placeholder",
      type: "testimonial",
      name: "Your testimonial here",
      role: "Future client or colleague",
      quote:
        "Worked with me on a project? Your words could live here. Add entries to src/data/testimonials.ts anytime.",
    });
  }

  return cards;
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = buildCards();

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
    <section id="testimonials" className="section-padding overflow-hidden">
      <div className="container-main">
        <SectionHeader
          label="Recommendations"
          title="What people say"
          subtitle="LinkedIn recommendations from colleagues and teammates."
        />

        <div className="relative min-h-[min(420px,62vh)] overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg to-transparent md:w-12"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg to-transparent md:w-12"
            aria-hidden
          />

          <div
            ref={scrollRef}
            className="recommendation-track flex h-[392px] items-stretch gap-4 overflow-x-auto overflow-y-hidden pb-3 snap-x snap-mandatory md:gap-5"
          >
            {cards.map((card, i) => (
              <RecommendationCard
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                card={card}
                index={i}
                active={activeIndex === i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
