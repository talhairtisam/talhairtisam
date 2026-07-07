import { getIconData } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

const SOCIAL_SLUGS: Record<string, string> = {
  GitHub: "github",
  LinkedIn: "linkedin",
};

type SocialIconProps = {
  name: string;
  size?: number;
  className?: string;
};

function MailIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function InitialIcon({
  name,
  size,
  className,
}: {
  name: string;
  size: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border bg-bg-elevated font-mono font-bold text-text",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden
    >
      {name.slice(0, 1)}
    </span>
  );
}

export function SocialIcon({ name, size = 20, className }: SocialIconProps) {
  if (name === "Email") {
    return <MailIcon size={size} className={cn("text-text-muted", className)} />;
  }

  const slug = SOCIAL_SLUGS[name];
  const icon = slug ? getIconData(slug) : null;

  if (!icon) {
    return <InitialIcon name={name} size={size} className={className} />;
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-label={name}
    >
      <title>{name}</title>
      <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
  );
}
