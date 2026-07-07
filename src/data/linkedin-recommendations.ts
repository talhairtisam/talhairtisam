import type { LinkedInRecommendation } from "./types";
import { linkedInRecommendationsUrl } from "./socials";

/**
 * Update quote previews with excerpts from your LinkedIn recommendations.
 * Each card links to the full recommendation on LinkedIn.
 */
export const linkedInRecommendations: LinkedInRecommendation[] = [
  {
    id: "li-rec-1",
    name: "View on LinkedIn",
    role: "Colleague / Manager",
    relationship: "Worked with Talha at Ultracodes",
    quotePreview:
      "Read my professional recommendations on LinkedIn — endorsements from colleagues and managers I've worked with.",
    linkedInUrl: linkedInRecommendationsUrl,
  },
];
