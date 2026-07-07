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
    slug: "notification-rnd",
    title: "Real-Time Notification R&D",
    subtitle: "Marketplace Notification System Prototype",
    context: "Open Source · github.com/talhairtisam",
    description:
      "R&D prototype for a real-time notification system with Marketplace and core backend/frontend implementations — exploring event-driven delivery patterns applied in production at TechBazaar.",
    stack: ["TypeScript", "JavaScript", "Node.js", "WebSockets", "React", "HTML", "CSS"],
    metrics: ["Marketplace variant", "Core platform variant", "Full-stack prototype"],
    role: "Solo developer — built backend and frontend notification flows as research ahead of the production TechBazaar notification system.",
    problem:
      "Validate real-time notification delivery patterns across marketplace and admin portals before shipping to production.",
    architecture:
      "Separate backend and frontend services with dedicated Marketplace modules, TypeScript services, and WebSocket-oriented notification flows.",
    repoUrl: "https://github.com/talhairtisam/notification-rnd-project",
    featured: true,
  },
  {
    slug: "multic-client-upload",
    title: "Multi-Client Upload",
    subtitle: "Session-Based Cross-Device File Sync",
    context: "Open Source R&D · github.com/talhairtisam",
    description:
      "R&D system for sharing files and images from one device with real-time reflection on another. Session-scoped with no authentication — one device creates a session ID, another joins via link while the session is valid. Both devices can run pre-upload actions in sync before the file is sent.",
    stack: ["JavaScript", "Node.js", "WebSockets", "Real-Time Sync", "Session Management"],
    metrics: ["Cross-device sync", "Session-only auth", "Pre-upload actions"],
    role: "Solo developer — designed the session model, real-time sync protocol, and full-stack prototype for cross-device upload flows.",
    problem:
      "Users needed to pick or edit files on one device and see changes instantly on another, without accounts — only a shared session.",
    architecture:
      "Session ID links two clients for the lifetime of the session. WebSocket (or similar real-time channel) propagates file state and pre-upload actions between backend and both frontends.",
    repoUrls: [
      {
        label: "Backend",
        url: "https://github.com/talhairtisam/multic-client-upload-backend_demo",
      },
      {
        label: "Frontend",
        url: "https://github.com/talhairtisam/multic-client-upload-frontend_demo",
      },
    ],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
