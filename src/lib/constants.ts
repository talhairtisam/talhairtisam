export const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "skills",
  "projects",
  "testimonials",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SITE_URL = "https://talhairtisam.vercel.app";
