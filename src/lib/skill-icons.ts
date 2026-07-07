import {
  siAndela,
  siBitbucket,
  siDjango,
  siDocker,
  siElasticsearch,
  siExpress,
  siFastapi,
  siGithub,
  siGithubactions,
  siJavascript,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSocketdotio,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export type IconData = {
  title: string;
  slug: string;
  hex: string;
  path: string;
};

const CUSTOM_ICONS: Record<string, IconData> = {
  linkedin: {
    title: "LinkedIn",
    slug: "linkedin",
    hex: "0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 24.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  amazonwebservices: {
    title: "Amazon Web Services",
    slug: "amazonwebservices",
    hex: "232F3E",
    path: "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.58.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.58zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .374.095.655.28.846.184.2.45.296.79.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.128 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 7.17c-.048.16-.104.263-.168.311a.549.549 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.15-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.08-.247.239-.247.063 0 .128.008.191.024.063.016.15.048.255.08.343.12.71.215 1.094.279.399.064.79.096 1.182.096.622 0 1.094-.112 1.414-.335.32-.224.48-.543.48-.95 0-.28-.088-.51-.263-.686-.176-.176-.511-.335-.983-.479l-1.405-.44c-.71-.224-1.237-.543-1.57-.95-.32-.399-.48-.846-.48-1.333 0-.386.08-.726.24 1.022.159.295.384.55.67.766.287.215.622.383 1.038.51.415.128.862.191 1.341.191.175 0 .359-.008.535-.032.183-.024.358-.056.535-.088.167-.04.327-.08.48-.127.151-.048.271-.096.359-.144a.69.69 0 0 1 .24-.16c.063-.032.135-.048.215-.048.167 0 .247.08.247.247v.375c0 .136-.016.232-.048.295a.518.518 0 0 1-.191.215c-.383.2-.87.367-1.453.51-.575.144-1.19.215-1.837.215z",
  },
  openai: {
    title: "OpenAI",
    slug: "openai",
    hex: "412991",
    path: "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.899A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z",
  },
  turing: {
    title: "Turing",
    slug: "turing",
    hex: "00A4EF",
    path: "M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.27 3.64L12 11.46 4.73 7.82 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z",
  },
};

const ICON_REGISTRY: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  react: siReact,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  python: siPython,
  django: siDjango,
  fastapi: siFastapi,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  redis: siRedis,
  elasticsearch: siElasticsearch,
  docker: siDocker,
  nestjs: siNestjs,
  express: siExpress,
  mysql: siMysql,
  github: siGithub,
  githubactions: siGithubactions,
  bitbucket: siBitbucket,
  socketdotio: siSocketdotio,
  andela: siAndela,
};

function fromSimpleIcon(icon: SimpleIcon): IconData {
  return { title: icon.title, slug: icon.slug, hex: icon.hex, path: icon.path };
}

export function getIconData(slug: string): IconData | null {
  const custom = CUSTOM_ICONS[slug];
  if (custom) return custom;

  const icon = ICON_REGISTRY[slug];
  if (!icon) return null;
  return fromSimpleIcon(icon);
}

const SKILL_TO_SLUG: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  "React.js": "react",
  React: "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  "Nest.js": "nestjs",
  NestJS: "nestjs",
  "Express.js": "express",
  Express: "express",
  Python: "python",
  Django: "django",
  FastAPI: "fastapi",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Redis: "redis",
  Elasticsearch: "elasticsearch",
  AWS: "amazonwebservices",
  Docker: "docker",
  "GitHub Actions": "githubactions",
  "BitBucket Pipelines": "bitbucket",
  WebSockets: "socketdotio",
  "LLM Integration": "openai",
  "Redis Pub/Sub": "redis",
  BullMQ: "bullmq",
};

export function skillToSlug(skill: string): string | null {
  return SKILL_TO_SLUG[skill] ?? null;
}

export function getSkillIcon(skill: string): IconData | null {
  const slug = skillToSlug(skill);
  return slug ? getIconData(slug) : null;
}
