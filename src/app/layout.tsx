import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RegardsKim — Your inbox, handled.",
  description:
    "Kim answers your customer emails so you don't have to. Tracking questions, returns, order updates — handled for $49/mo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <meta name="shopify-api-key" content="327e4daf19a338e5b04707172c2b39bc" />
      </head>
      <body className={cn("min-h-full font-sans", plusJakarta.className, geistMono.variable)}>
        <Script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" strategy="beforeInteractive" />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
