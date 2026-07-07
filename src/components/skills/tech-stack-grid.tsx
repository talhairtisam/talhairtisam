"use client";

import { useRef } from "react";
import { techStackDock } from "@/data";
import { TechIcon } from "@/components/icons/tech-icon";
import { getIconData } from "@/lib/skill-icons";
import { useEnhancementsEnabled } from "@/lib/performance";
import { cn } from "@/lib/utils";

export function TechStackGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const enhancements = useEnhancementsEnabled();

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enhancements || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gridRef.current.style.setProperty("--glow-x", `${x}px`);
    gridRef.current.style.setProperty("--glow-y", `${y}px`);
  }

  return (
    <div
      ref={gridRef}
      onMouseMove={handleMove}
      className="relative mb-12 overflow-hidden rounded-2xl border border-border/50 bg-bg-elevated/30 p-4 md:p-6"
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
        } as React.CSSProperties
      }
    >
      {enhancements && (
        <div
          className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(280px circle at var(--glow-x) var(--glow-y), var(--glow), transparent 65%)",
          }}
          aria-hidden
        />
      )}

      <div className="relative grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 lg:gap-4">
        {techStackDock.map((item) => {
          const icon = getIconData(item.slug);
          const glow = icon ? `#${icon.hex}` : "var(--accent-cyan)";

          return (
            <div
              key={item.slug}
              className={cn(
                "group flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card-bg/70 p-3 transition-colors hover:border-accent-cyan/30",
              )}
              title={item.name}
            >
              <div className="relative flex size-11 items-center justify-center rounded-lg bg-bg-elevated/80">
                <span
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-0 blur-md transition-opacity group-hover:opacity-70"
                  style={{
                    background: `radial-gradient(circle, ${glow}55, transparent 70%)`,
                  }}
                  aria-hidden
                />
                <TechIcon slug={item.slug} size={22} title={item.name} />
              </div>
              <span className="max-w-full truncate text-center font-mono text-[9px] text-text-muted">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
