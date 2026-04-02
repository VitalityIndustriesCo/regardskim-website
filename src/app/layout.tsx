import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RegardsKim — Post-purchase emails, handled.",
  description:
    "RegardsKim helps Shopify stores stay on top of order updates, tracking questions, returns, refunds, and exchanges with polished draft replies ready for approval in Gmail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-cream text-ink-navy font-sans">{children}</body>
    </html>
  );
}
