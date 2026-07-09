import { linkedInRecommendations, testimonials } from "@/data";

export type TestimonialCardData = {
  id: string;
  type: "testimonial" | "linkedin";
  name: string;
  role: string;
  quote: string;
  href?: string;
  profileUrl?: string;
  avatar?: string;
};

export function buildTestimonialCards(): TestimonialCardData[] {
  const cards: TestimonialCardData[] = [
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
