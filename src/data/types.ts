export type SocialLink = {
  name: string;
  href: string;
  label: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  promoted?: boolean;
  highlights: string[];
  tech: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  context: string;
  description: string;
  stack: string[];
  metrics: string[];
  role: string;
  problem: string;
  architecture: string;
  repoUrl?: string;
  repoUrls?: { label: string; url: string }[];
  featured?: boolean;
};

export type SkillCluster = {
  name: string;
  skills: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  href?: string;
};

export type LinkedInRecommendation = {
  id: string;
  name: string;
  role: string;
  relationship: string;
  quotePreview: string;
  linkedInUrl: string;
  profileUrl: string;
  avatar?: string;
};

export type NavSection = {
  id: string;
  label: string;
};

export type TechStackItem = {
  name: string;
  slug: string;
  href?: string;
};
