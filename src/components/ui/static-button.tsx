import { cn } from "@/lib/utils";

type StaticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-shadow";

export function StaticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: StaticButtonProps) {
  const styles = cn(
    baseStyles,
    variant === "primary"
      ? "bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-lime text-bg shadow-lg shadow-accent-cyan/20"
      : "border border-border bg-bg-elevated/50 text-text",
    className,
  );

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
