"use client";

import { ThemeProvider } from "./theme-provider";
import { LenisProvider } from "./lenis-provider";
import { PointerProvider } from "@/context/pointer-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PointerProvider>
        <LenisProvider>{children}</LenisProvider>
      </PointerProvider>
    </ThemeProvider>
  );
}
