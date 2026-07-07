"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { profile, socialLinks } from "@/data";
import { SocialIcon } from "@/components/icons/social-icon";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StaticButton } from "@/components/ui/static-button";
import { EnhancementGate } from "@/components/progressive/enhancement-gate";
import { useEnhancementAtLeast } from "@/context/enhancement-context";

export function ContactInteractive() {
  const [copied, setCopied] = useState(false);
  const lightReady = useEnhancementAtLeast("light");
  const motionReady = useEnhancementAtLeast("motion");

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className="mt-8 flex justify-center">
        <EnhancementGate
          phase="light"
          staticSlot={
            <StaticButton variant="secondary" onClick={copyEmail}>
              {copied ? "✓ Copied!" : profile.email}
            </StaticButton>
          }
          enhanced={
            <MagneticButton variant="secondary" onClick={copyEmail}>
              {copied ? "✓ Copied!" : profile.email}
            </MagneticButton>
          }
          overlay={false}
        />
      </div>

      <p className="mt-8 hidden font-mono text-xs text-text-muted lg:block">
        Social links are on the left rail — or connect below
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 lg:mt-4 lg:scale-95 lg:opacity-70">
        {socialLinks.map((link) => {
          const inner = (
            <>
              <SocialIcon name={link.name} size={14} />
              {link.name}
            </>
          );

          if (!motionReady || !lightReady) {
            return (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-text-muted transition-all hover:border-accent-violet/50 hover:text-text"
              >
                {inner}
              </a>
            );
          }

          return (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.04 }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-text-muted transition-all hover:border-accent-violet/50 hover:text-text"
            >
              {inner}
            </motion.a>
          );
        })}
      </div>
    </>
  );
}
