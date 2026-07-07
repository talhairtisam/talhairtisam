import type { Stat } from "./types";

export const profile = {
  name: "Talha Irtisam",
  firstName: "Talha",
  title: "Senior Software Engineer",
  roles: [
    "Senior Software Engineer",
    "Technical Lead",
    "AI Backend Engineer",
  ],
  location: "Sialkot, Pakistan",
  email: "talhairtisam457@gmail.com",
  availability: "Open to senior remote roles internationally",
  summary:
    "Senior Software Engineer with 4+ years building scalable full-stack systems in production. Led a 6-engineer team as Technical Lead on TechBazaar — a 4-portal e-commerce ecosystem serving 3,000+ sellers and 100,000+ live products. Experienced in AI-powered backend development using Python, Django, and FastAPI, including a recommendation engine and conversational AI platform deployed on AWS.",
  about:
    "I build production systems that scale — from multi-portal e-commerce platforms to AI-powered recommendation engines on AWS. I care about architecture, reliability, and shipping code that teams can maintain.",
};

export const impactStats: Stat[] = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 6, label: "Engineers Led" },
  { value: 3000, suffix: "+", label: "Active Sellers" },
  { value: 100000, suffix: "+", label: "Live Products" },
];

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Recommendations" },
  { id: "contact", label: "Contact" },
];
