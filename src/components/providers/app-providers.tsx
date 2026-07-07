"use client";

import { ThemeProvider } from "./theme-provider";
import { EnhancementProvider } from "@/context/enhancement-context";
import { DeferredPointerProvider } from "@/components/providers/deferred-pointer-provider";
import { DeferredLenisProvider } from "@/components/providers/deferred-lenis-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <EnhancementProvider>
        <DeferredPointerProvider>
          <DeferredLenisProvider>{children}</DeferredLenisProvider>
        </DeferredPointerProvider>
      </EnhancementProvider>
    </ThemeProvider>
  );
}
