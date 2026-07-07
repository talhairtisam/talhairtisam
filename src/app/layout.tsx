import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talha Irtisam — Senior Software Engineer",
  description:
    "Senior Software Engineer with 4+ years building production software and AI-powered backend systems. Open to senior remote roles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
