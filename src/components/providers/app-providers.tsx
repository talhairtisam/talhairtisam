"use client";

import { ThemeProvider } from "./theme-provider";
import { LenisProvider } from "./lenis-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  );
}
