import { skillClusters, techStackDock } from "@/data";
import { cn } from "@/lib/utils";

export function SkillsStatic() {
  return (
    <>
      <div className="relative mb-10 overflow-hidden" aria-hidden={false}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent" />

        <div className="flex w-max gap-5 py-2">
          {techStackDock.map((item) => (
            <div
              key={item.slug}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-elevated shadow-sm ring-1 ring-border/60 dark:bg-bg-elevated/90 dark:ring-border/80"
              title={item.name}
            >
              <span className="icon-skeleton size-[22px] rounded-md" aria-hidden />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        {skillClusters.map((cluster) => (
          <div
            key={cluster.name}
            className="rounded-2xl border border-border/40 bg-card-bg/80 p-6"
          >
            <h3 className="relative mb-4 text-lg font-semibold">{cluster.name}</h3>
            <div className="flex flex-wrap gap-2">
              {cluster.skills.map((skill) => (
                <span
                  key={skill}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated/50 px-3 py-1.5 font-mono text-xs text-text-muted",
                  )}
                >
                  <span className="icon-skeleton size-3.5 shrink-0 rounded-full" aria-hidden />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
