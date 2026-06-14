import type { Metadata } from "next";

import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...marketingMetadata({
    title: "Install Regards Kim on Shopify",
    description:
      "Regards Kim drafts Shopify support email replies from Gmail, order context, and human-approved AI drafts.",
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
