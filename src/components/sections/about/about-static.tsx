const focusAreas = [
  "Full-stack & backend systems",
  "AI backends & LLM integrations",
  "Production architecture & delivery",
];

type AboutStaticProps = {
  summary: string;
  location: string;
};

export function AboutStatic({ summary, location }: AboutStaticProps) {
  return (
    <div className="max-w-3xl min-h-[188px]">
      <p className="text-lg leading-relaxed text-text-muted">{summary}</p>
      <p className="mt-4 font-mono text-sm text-accent-cyan">📍 {location}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {focusAreas.map((area) => (
          <span
            key={area}
            className="rounded-full border border-border bg-bg-elevated/50 px-3 py-1.5 font-mono text-xs text-text-muted"
          >
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}
