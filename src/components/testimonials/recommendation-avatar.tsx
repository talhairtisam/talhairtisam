import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type RecommendationAvatarProps = {
  name: string;
  avatar?: string;
  profileUrl: string;
  size?: number;
  className?: string;
};

export function RecommendationAvatar({
  name,
  avatar,
  profileUrl,
  size = 48,
  className,
}: RecommendationAvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block shrink-0 overflow-hidden rounded-full border border-border bg-bg-elevated ring-1 ring-border transition-transform hover:scale-105",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={`${name} on LinkedIn`}
    >
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={size}
          height={size}
          className="size-full rounded-full object-cover"
        />
      ) : (
        <span
          className="flex size-full items-center justify-center rounded-full font-mono text-xs font-semibold text-accent-cyan"
          aria-hidden
        >
          {initials}
        </span>
      )}
    </Link>
  );
}
