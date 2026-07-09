"use client";

import { useEffect, useRef, useState } from "react";
import { buildTestimonialCards } from "@/lib/testimonial-cards";
import {
  RECOMMENDATION_SECTION_MIN_HEIGHT,
  RECOMMENDATION_TRACK_HEIGHT,
} from "@/lib/recommendation-layout";
import {
  RecommendationCard,
  type RecommendationCardData,
} from "@/components/testimonials/recommendation-card";

export function TestimonialsTrack() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = buildTestimonialCards() as RecommendationCardData[];

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
    <div
      className="relative overflow-hidden"
      style={{ minHeight: RECOMMENDATION_SECTION_MIN_HEIGHT }}
    >
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
        className="recommendation-track flex items-stretch gap-4 overflow-x-auto overflow-y-hidden pb-3 snap-x snap-mandatory md:gap-5"
        style={{ height: RECOMMENDATION_TRACK_HEIGHT }}
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
  );
}
