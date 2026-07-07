"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { motion } from "motion/react";
import { RecommendationAvatar } from "@/components/testimonials/recommendation-avatar";
import { cn } from "@/lib/utils";

const ACCENT_BARS = [
  "bg-accent-cyan",
  "bg-accent-violet",
  "bg-accent-lime",
] as const;

export type RecommendationCardData = {
  id: string;
  type: "testimonial" | "linkedin";
  name: string;
  role: string;
  quote: string;
  href?: string;
  profileUrl?: string;
  avatar?: string;
};

type RecommendationCardProps = {
  card: RecommendationCardData;
  index: number;
  active?: boolean;
};

const CARD_HEIGHT = 380;
const CARD_WIDTH = "min(340px, 88vw)";

export const RecommendationCard = forwardRef<HTMLElement, RecommendationCardProps>(
  function RecommendationCard({ card, index, active = false }, ref) {
    const accentBar = ACCENT_BARS[index % ACCENT_BARS.length];

    return (
      <motion.article
        ref={ref}
        data-index={index}
        whileHover={{ y: -4 }}
        animate={{
          scale: active ? 1.02 : 0.97,
          opacity: active ? 1 : 0.72,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className={cn(
          "relative flex shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-border bg-card-bg/80 p-6 transition-shadow duration-300",
          active && "shadow-[0_0_28px_var(--glow)] ring-1 ring-accent-violet/30",
        )}
        style={{ height: CARD_HEIGHT, width: CARD_WIDTH }}
      >
        <div
          className={cn("absolute inset-y-0 left-0 w-[3px]", accentBar)}
          aria-hidden
        />

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
      </motion.article>
    );
  },
);
