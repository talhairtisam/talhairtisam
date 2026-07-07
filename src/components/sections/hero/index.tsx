import { profile } from "@/data";
import { HeroTitle } from "./hero-title";
import { HeroRole } from "./hero-role";
import { HeroCtas } from "./hero-ctas";
import { HeroCoreSlot } from "./hero-core-slot";
import { HeroEnhancedShell } from "./hero-enhanced";

export function HeroSection() {
  return (
    <HeroEnhancedShell
      textContent={
        <>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
            {profile.availability}
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <HeroTitle />
          </h1>
          <HeroRole />
          <p className="mb-8 mt-6 max-w-lg text-text-muted">
            {profile.summary.slice(0, 160)}…
          </p>
          <HeroCtas />
        </>
      }
      coreSlot={<HeroCoreSlot />}
    />
  );
}
