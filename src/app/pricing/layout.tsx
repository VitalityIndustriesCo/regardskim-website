import type { Metadata } from "next";

import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import { SalesChatWidget } from "@/components/support/sales-chat-widget";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Pricing",
  description:
    "Simple Regards Kim pricing for Shopify stores: Gmail triage, Shopify order context, AI-drafted replies, and human approval for $49/mo.",
  path: "/pricing",
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
      <SalesChatWidget />
    </>
  );
}
