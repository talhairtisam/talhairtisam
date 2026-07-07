import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeader({ label, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
        {label}
      </p>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-text-muted">{subtitle}</p>
      )}
      <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-lime" />
    </div>
  );
}
