"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export function CorePoster({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div
      className={className}
      aria-hidden
      style={{
        background: isDark
          ? "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.25) 0%, rgba(167,139,250,0.15) 40%, transparent 70%)"
          : "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.2) 0%, rgba(139,92,246,0.12) 40%, transparent 70%)",
      }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full opacity-80">
        <circle cx="100" cy="100" r="60" fill="none" stroke="var(--core-primary)" strokeWidth="0.5" opacity="0.4" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="var(--core-secondary)" strokeWidth="0.5" opacity="0.3" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = 100 + Math.cos(angle) * 55;
          const y = 100 + Math.sin(angle) * 55;
          return (
            <circle key={i} cx={x} cy={y} r="3" fill="var(--core-primary)" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + i * 0.1}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
        <circle cx="100" cy="100" r="6" fill="var(--core-secondary)" opacity="0.9" />
      </svg>
    </div>
  );
}
