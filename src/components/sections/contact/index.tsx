import nextDynamic from "next/dynamic";
import { profile } from "@/data";
import { CopyrightYear } from "@/components/ui/copyright-year";

const ContactInteractive = nextDynamic(
  () => import("./contact-interactive").then((m) => ({ default: m.ContactInteractive })),
  {
    loading: () => (
      <div className="mt-8" aria-hidden>
        <div className="mx-auto h-11 w-64 rounded-full border border-border bg-card-bg/50" />
        <div className="mx-auto mt-6 flex min-h-[48px] max-w-xl flex-wrap justify-center gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="inline-block h-9 w-24 rounded-full bg-border/40" />
          ))}
        </div>
      </div>
    ),
  },
);

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-bg-elevated/30">
      <div className="container-main text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
          Contact
        </p>
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Let&apos;s build
          <br />
          <span className="gradient-text">something great</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-muted">
          {profile.availability}. Reach out for senior engineering roles, consulting, or
          collaboration.
        </p>

        <ContactInteractive />

        <footer className="mt-16 border-t border-border pt-8">
          <p className="font-mono text-xs text-text-muted">
            © <CopyrightYear /> {profile.name}. Built with Next.js.
          </p>
        </footer>
      </div>
    </section>
  );
}
