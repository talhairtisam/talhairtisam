import type { SocialLink } from "./types";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/talhairtisam",
    label: "github.com/talhairtisam",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/talhairtisam",
    label: "linkedin.com/in/talhairtisam",
  },
  {
    name: "Email",
    href: "mailto:talhairtisam457@gmail.com",
    label: "talhairtisam457@gmail.com",
  },
];

/** Desktop left rail — add names here when you add more social links */
const RAIL_SOCIAL_NAMES = ["GitHub", "LinkedIn"] as const;

export const railSocialLinks = socialLinks.filter((link) =>
  (RAIL_SOCIAL_NAMES as readonly string[]).includes(link.name),
);

export const linkedInRecommendationsUrl =
  "https://www.linkedin.com/in/talhairtisam/details/recommendations/";
