import type { Metadata } from "next";

import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Pricing",
  description:
    "Simple Regards Kim pricing for Shopify stores: AI-powered customer support control for $49/mo.",
  path: "/pricing",
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
