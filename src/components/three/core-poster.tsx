"use client";

import { cn } from "@/lib/utils";

/** Literal coords — no runtime trig (avoids SSR/client float drift). */
const CORE_POSTER_NODES = [
  { cx: "155.00", cy: "100.00" },
  { cx: "147.63", cy: "127.50" },
  { cx: "127.50", cy: "147.63" },
  { cx: "100.00", cy: "155.00" },
  { cx: "72.50", cy: "147.63" },
  { cx: "52.37", cy: "127.50" },
  { cx: "45.00", cy: "100.00" },
  { cx: "52.37", cy: "72.50" },
  { cx: "72.50", cy: "52.37" },
  { cx: "100.00", cy: "45.00" },
  { cx: "127.50", cy: "52.37" },
  { cx: "147.63", cy: "72.50" },
] as const;

export function CorePoster({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        className,
        "core-poster-bg",
      )}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="h-full w-full opacity-80">
        <circle cx="100" cy="100" r="60" fill="none" stroke="var(--core-primary)" strokeWidth="0.5" opacity="0.4" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="var(--core-secondary)" strokeWidth="0.5" opacity="0.3" />
        {CORE_POSTER_NODES.map((node, i) => (
          <circle key={i} cx={node.cx} cy={node.cy} r="3" fill="var(--core-primary)" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + i * 0.1}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx="100" cy="100" r="6" fill="var(--core-secondary)" opacity="0.9" />
      </svg>
    </div>
  );
}
