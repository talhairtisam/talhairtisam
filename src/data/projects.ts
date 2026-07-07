import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "techbazaar",
    title: "TechBazaar",
    subtitle: "Multi-Portal E-Commerce Ecosystem",
    context: "Production · Ultracodes Pvt. Ltd.",
    description:
      "A 4-portal platform (POS, Admin, Sales Portal, Marketplace) serving 3,000+ active sellers and 100,000+ live product listings.",
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Nest.js",
      "TypeScript",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "WebSockets",
      "Elasticsearch",
      "Docker",
      "CI/CD",
    ],
    metrics: ["3,000+ sellers", "100,000+ products", "4 interconnected portals"],
    role: "Technical Lead — full-stack architecture, subscription engine, real-time notifications, payment integration, and Elasticsearch-powered search.",
    problem:
      "Sellers needed a unified platform to manage listings, subscriptions, and orders across multiple business portals with real-time sync.",
    architecture:
      "Microservices architecture with Redis Pub/Sub event bus, WebSocket notifications, BullMQ job queues, and Elasticsearch for product discovery.",
    featured: true,
  },
  {
    slug: "delivery-ai",
    title: "Delivery AI",
    subtitle: "AI-Powered Dish Recommendation Platform",
    context: "Production · Ultracodes Pvt. Ltd.",
    description:
      "Backend services for an AI-driven dish recommendation engine and conversational chatbot with scraping pipelines and real-time API delivery.",
    stack: [
      "Python",
      "Django",
      "FastAPI",
      "AWS",
      "PostgreSQL",
      "Web Scraping",
      "LLM Integration",
    ],
    metrics: ["Real-time recommendations", "LLM-powered chatbot", "AWS production"],
    role: "Backend engineer — built scraping pipelines, data infrastructure, and API layer for recommendation delivery.",
    problem:
      "Users needed personalized dish recommendations based on restaurant data collected and structured at scale.",
    architecture:
      "Python services on AWS with Django/FastAPI APIs, PostgreSQL data store, web scraping pipelines, and LLM integration for conversational AI.",
    featured: true,
  },
  {
    slug: "az-character-recognition",
    title: "AZ Character Recognition",
    subtitle: "ML Computer Vision Project",
    context: "Personal / Academic · github.com/talhairtisam",
    description:
      "Machine learning project for alphabet character recognition using computer vision techniques.",
    stack: ["Python", "Machine Learning", "Computer Vision"],
    metrics: ["Dataset preparation", "Model training", "Evaluation pipeline"],
    role: "Solo developer — end-to-end ML pipeline from data prep to model evaluation.",
    problem: "Classify alphabet characters from images with a trained computer vision model.",
    architecture:
      "Python ML pipeline with dataset preparation, model training, and evaluation metrics.",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
