import Link from "next/link";
import { RecommendationAvatar } from "@/components/testimonials/recommendation-avatar";
import { buildTestimonialCards } from "@/lib/testimonial-cards";
import {
  RECOMMENDATION_CARD_HEIGHT,
  RECOMMENDATION_CARD_WIDTH,
  RECOMMENDATION_SECTION_MIN_HEIGHT,
  RECOMMENDATION_TRACK_HEIGHT,
} from "@/lib/recommendation-layout";
import { cn } from "@/lib/utils";

const ACCENT_BARS = ["bg-accent-cyan", "bg-accent-violet", "bg-accent-lime"] as const;

export function TestimonialsStatic() {
  const cards = buildTestimonialCards();

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
        className="recommendation-track flex items-stretch gap-4 overflow-x-auto overflow-y-hidden pb-3 snap-x snap-mandatory md:gap-5"
        style={{ height: RECOMMENDATION_TRACK_HEIGHT }}
      >
        {cards.map((card, index) => {
          const accentBar = ACCENT_BARS[index % ACCENT_BARS.length];

          return (
            <article
              key={card.id}
              data-index={index}
              className="relative flex shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-border bg-card-bg/80 p-6 transition-shadow duration-300"
              style={{ height: RECOMMENDATION_CARD_HEIGHT, width: RECOMMENDATION_CARD_WIDTH }}
            >
              <div className={cn("absolute inset-y-0 left-0 w-[3px]", accentBar)} aria-hidden />

              <div className="flex shrink-0 flex-col items-center text-center">
                {card.profileUrl ? (
                  <RecommendationAvatar
                    name={card.name}
                    avatar={card.avatar}
                    profileUrl={card.profileUrl}
                    size={48}
                  />
                ) : (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-bg-elevated font-mono text-xs text-accent-cyan">
                    {card.name.slice(0, 2).toUpperCase()}
                  </div>
                )}

                <div className="mt-3 w-full min-w-0 px-1">
                  {card.profileUrl ? (
                    <Link
                      href={card.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-sm font-semibold transition-colors hover:text-accent-cyan"
                    >
                      {card.name}
                    </Link>
                  ) : (
                    <p className="truncate text-sm font-semibold">{card.name}</p>
                  )}
                  <p className="mt-0.5 truncate text-xs text-text-muted">{card.role}</p>
                </div>
              </div>

              <div className="scrollbar-hide mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
                <p className="text-sm leading-relaxed text-text-muted md:text-[0.9375rem]">
                  &ldquo;{card.quote}&rdquo;
                </p>
              </div>

              <div className="mt-auto shrink-0 pt-5">
                {card.href ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit font-mono text-xs text-accent-cyan transition-colors hover:text-accent-violet"
                  >
                    {card.type === "linkedin" ? "View on LinkedIn →" : "Read more →"}
                  </a>
                ) : (
                  <span className="inline-block h-[1.125rem]" aria-hidden />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
