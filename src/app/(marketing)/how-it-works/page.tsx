import type { Metadata } from "next";

import Benefits from "@/components/sections/Benefits";
import GettingStarted from "@/components/sections/GettingStarted";
import HowItWorks from "@/components/sections/HowItWorks";
import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = marketingMetadata({
  title: "How Regards Kim Works",
  description:
    "See how Regards Kim connects Shopify and Gmail, sorts customer emails, matches order context, and drafts Shopify-aware replies while you keep the final say.",
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
