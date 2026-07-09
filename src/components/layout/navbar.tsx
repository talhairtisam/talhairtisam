"use client";

import { useEffect, useState } from "react";
import { navSections } from "@/data";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { SECTION_IDS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 40);

      const sections = SECTION_IDS.map((id) => document.getElementById(id));
      const current = sections.findIndex((el, i) => {
        const next = sections[i + 1];
        if (!el) return false;
        const top = el.offsetTop - 120;
        const bottom = next ? next.offsetTop - 120 : Infinity;
        return scrollTop >= top && scrollTop < bottom;
      });
      if (current >= 0) setActiveSection(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[var(--z-navbar)] transition-all duration-300",
          scrolled
            ? "border-b border-border bg-[var(--nav-bg)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav className="container-main flex h-16 items-center justify-between px-5 md:h-18 md:px-8">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm font-semibold tracking-tight"
          >
            <span className="gradient-text">TI</span>
            <span className="text-text-muted">.</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navSections.map((section, i) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    activeSection === i + 1
                      ? "bg-accent-cyan/10 text-accent-cyan"
                      : "text-text-muted hover:text-text",
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="text-lg">{mobileOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 border-b border-border bg-[var(--nav-bg)] backdrop-blur-xl transition-all duration-200 md:hidden",
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col gap-1 p-4">
          {navSections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                className="w-full rounded-lg px-4 py-3 text-left text-sm text-text-muted transition-colors hover:bg-bg-elevated hover:text-text"
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
