"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { profile, impactStats } from "@/data";
import { SectionHeader } from "@/components/ui/section-header";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { ScrollPin } from "@/components/motion/scroll-pin";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden">
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 grid-bg opacity-60"
        aria-hidden
      />

      <div className="container-main relative">
        <SectionHeader
          label="About"
          title="Building systems that scale"
          subtitle={profile.about}
        />

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <Reveal>
            <p className="text-lg leading-relaxed text-text-muted">{profile.summary}</p>
            <p className="mt-4 font-mono text-sm text-accent-cyan">
              📍 {profile.location}
            </p>
          </Reveal>

          <ScrollPin pinClassName="top-28">
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((stat) => (
                <Reveal key={stat.label} delay={0.1}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="gradient-border group relative rounded-2xl p-5 text-center md:p-6"
                  >
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent-cyan)22, var(--accent-violet)22)",
                      }}
                      aria-hidden
                    />
                    <p className="relative text-3xl font-bold gradient-text md:text-4xl">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="relative mt-1 text-xs text-text-muted md:text-sm">
                      {stat.label}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </ScrollPin>
        </div>
      </div>
    </section>
  );
}
