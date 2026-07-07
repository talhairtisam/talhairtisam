"use client";

import Link from "next/link";
import { CorePoster } from "@/components/three/core-poster";

export function NotFoundContent() {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center px-5 text-center">
      <div className="mb-8 h-32 w-32">
        <CorePoster className="h-full w-full" />
      </div>
      <h1 className="text-6xl font-bold gradient-text">404</h1>
      <p className="mt-4 text-text-muted">This node isn&apos;t in the graph.</p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-border px-6 py-3 font-mono text-sm text-accent-cyan transition-colors hover:bg-accent-cyan/10"
      >
        Return home →
      </Link>
    </div>
  );
}
