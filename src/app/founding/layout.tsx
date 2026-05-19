import type { Metadata } from "next";

import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...marketingMetadata({
    title: "Install Regards Kim on Shopify",
    description:
      "Regards Kim brings AI-powered customer support control to your Shopify store with Gmail, order context, and reply helpers.",
    path: "/founding",
  }),
  robots: { index: false, follow: false },
};

export default function FoundingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
