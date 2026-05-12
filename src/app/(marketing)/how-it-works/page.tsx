import type { Metadata } from "next";

import Benefits from "@/components/sections/Benefits";
import GettingStarted from "@/components/sections/GettingStarted";
import HowItWorks from "@/components/sections/HowItWorks";
import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "How Regards Kim Works",
  description:
    "See how Regards Kim connects Shopify and Gmail, matches customer emails to live order data, drafts accurate replies, and keeps you in control before anything sends.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <main>
      <HowItWorks />
      <Benefits />
      <GettingStarted />
    </main>
  );
}
