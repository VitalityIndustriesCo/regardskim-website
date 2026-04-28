import type { Metadata } from "next";

import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "Affiliate Program",
  description:
    "Join the RegardsKim affiliate program and earn recurring commission for referring Shopify merchants.",
  path: "/affiliate",
  image: "/affiliate-hero.jpg",
});
