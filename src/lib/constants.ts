export const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "testimonials",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SITE_URL = "https://talhairtisam.dev";
