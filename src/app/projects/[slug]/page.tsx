import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data";
import { Reveal } from "@/components/motion/reveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="section-padding pt-24">
      <div className="container-main max-w-3xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex font-mono text-sm text-accent-cyan hover:underline"
        >
          ← Back to projects
        </Link>

        <Reveal>
          <p className="font-mono text-xs text-accent-cyan">{project.context}</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">{project.title}</h1>
          <p className="mt-2 text-xl text-text-muted">{project.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="rounded-full bg-accent-cyan/10 px-3 py-1 font-mono text-xs text-accent-cyan"
              >
                {m}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <section className="mt-12">
            <h2 className="mb-3 text-lg font-semibold">Overview</h2>
            <p className="text-text-muted leading-relaxed">{project.description}</p>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-semibold">Problem</h2>
            <p className="text-text-muted leading-relaxed">{project.problem}</p>
          </section>
        </Reveal>

        <Reveal delay={0.25}>
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-semibold">Architecture</h2>
            <p className="text-text-muted leading-relaxed">{project.architecture}</p>
          </section>
        </Reveal>

        <Reveal delay={0.3}>
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-semibold">My Role</h2>
            <p className="text-text-muted leading-relaxed">{project.role}</p>
          </section>
        </Reveal>

        <Reveal delay={0.35}>
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-semibold">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        {(project.repoUrls?.length ? project.repoUrls : project.repoUrl ? [{ label: "GitHub", url: project.repoUrl }] : []).map(
          (link) => (
            <Reveal key={link.url} delay={0.4}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 mr-6 inline-flex font-mono text-sm text-accent-cyan hover:underline"
              >
                {link.label} on GitHub →
              </a>
            </Reveal>
          ),
        )}
      </div>
    </article>
  );
}
