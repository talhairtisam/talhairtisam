import { profile } from "@/data";
import { StaticButton } from "@/components/ui/static-button";
import { CorePosterStatic } from "@/components/three/core-poster-static";
import { HeroDeferredSlot } from "./hero-deferred-slot";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-start overflow-hidden pt-20 md:items-center md:pt-16"
    >
      <div className="container-main grid items-start gap-6 px-5 py-6 md:items-center md:gap-12 md:py-12 md:grid-cols-2 md:px-8">
        <div className="relative z-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
            {profile.availability}
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-text md:gradient-text">{profile.name}</span>
          </h1>
          <p className="h-8 font-mono text-sm text-text-muted md:text-base">
            {profile.roles[0]}
          </p>
          <p className="hero-lcp-text mb-8 mt-6 max-w-lg text-text-muted">
            {profile.summary.slice(0, 160)}…
          </p>
          <div className="flex flex-wrap gap-4">
            <StaticButton href="#projects">View Work</StaticButton>
            <StaticButton variant="secondary" href="#contact">
              Get in Touch
            </StaticButton>
          </div>
        </div>

        <div
          id="hero-core"
          className="relative hidden h-[480px] md:block lg:h-[560px]"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-violet/10 blur-2xl" />
          <CorePosterStatic className="absolute inset-0 h-full w-full" />
        </div>
      </div>

      <HeroDeferredSlot />
    </section>
  );
}
