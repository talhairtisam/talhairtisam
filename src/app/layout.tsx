import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { Navbar } from "@/components/layout/navbar";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { LeftRail } from "@/components/layout/left-rail";
import { FloatingCompanion } from "@/components/layout/floating-companion";
import { SITE_URL } from "@/lib/constants";
import { profile } from "@/data";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Senior Software Engineer",
    "Full Stack Developer",
    "Python",
    "Next.js",
    "AI Backend",
    "Technical Lead",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: profile.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sialkot",
    addressCountry: "PK",
  },
  url: SITE_URL,
  sameAs: [
    "https://github.com/talhairtisam",
    "https://linkedin.com/in/talhairtisam",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${jetbrains.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProviders>
          <CursorGlow />
          <LeftRail />
          <Navbar />
          <FloatingCompanion />
          <main className="main-with-rail">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
