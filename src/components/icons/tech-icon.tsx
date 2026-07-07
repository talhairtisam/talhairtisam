import { getIconData } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

type TechIconProps = {
  slug: string;
  size?: number;
  className?: string;
  title?: string;
  color?: string;
};

function Monogram({
  label,
  size,
  className,
}: {
  label: string;
  size: number;
  className?: string;
}) {
  const letter = label.slice(0, 2).toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-bg-elevated font-mono font-bold text-text-muted",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden
    >
      {letter}
    </span>
  );
}

export function TechIcon({ slug, size = 20, className, title, color }: TechIconProps) {
  const icon = getIconData(slug);
  const label = title ?? icon?.title ?? slug;

  if (!icon) {
    return <Monogram label={label} size={size} className={className} />;
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-label={label}
    >
      <title>{label}</title>
      <path fill={color ?? `#${icon.hex}`} d={icon.path} />
    </svg>
  );
}
