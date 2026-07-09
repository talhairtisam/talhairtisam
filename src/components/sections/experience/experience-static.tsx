import type { ExperienceItem } from "@/data/types";
import { cn } from "@/lib/utils";

type ExperienceStaticCardProps = {
  job: ExperienceItem;
  index: number;
};

export function ExperienceStaticCard({ job, index }: ExperienceStaticCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card-bg/60 p-6 md:p-7">
      <article className="outline-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            {job.promoted && (
              <span className="mb-2 inline-block rounded-full bg-accent-lime/10 px-3 py-0.5 font-mono text-xs text-accent-lime">
                Promoted to Senior
              </span>
            )}
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-sm text-accent-cyan">{job.company}</p>
            <p className="text-xs text-text-muted">
              {job.location} · {job.period}
            </p>
          </div>
          <span className="font-mono text-2xl text-text-muted/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-3 text-sm text-text-muted">{job.summary}</p>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="mt-4 space-y-2 border-t border-border/60 pt-4">
              {job.highlights.map((h) => (
                <li key={h.slice(0, 48)} className="text-sm text-text-muted">
                  <span className="mr-2 text-accent-violet">▹</span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.tech.slice(0, 10).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-accent-cyan/70 lg:hidden">
          Tap for details
        </p>
      </article>
    </div>
  );
}
