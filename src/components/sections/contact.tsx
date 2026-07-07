"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { profile, socialLinks } from "@/data";
import { SocialIcon } from "@/components/icons/social-icon";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/motion/reveal";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="section-padding bg-bg-elevated/30">
      <div className="container-main text-center">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
            Contact
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Let&apos;s build
            <br />
            <span className="gradient-text">something great</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-muted">
            {profile.availability}. Reach out for senior engineering roles,
            consulting, or collaboration.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex justify-center">
            <MagneticButton variant="secondary" onClick={copyEmail}>
              {copied ? "✓ Copied!" : profile.email}
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 hidden font-mono text-xs text-text-muted lg:block">
            Social links are on the left rail — or connect below
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:mt-4 lg:scale-95 lg:opacity-70">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.04 }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-text-muted transition-all hover:border-accent-violet/50 hover:text-text"
              >
                <SocialIcon name={link.name} size={14} />
                {link.name}
              </motion.a>
            ))}
          </div>
        </Reveal>

        <footer className="mt-16 border-t border-border pt-8">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js.
          </p>
        </footer>
      </div>
    </section>
  );
}
