import type { Metadata } from "next";

import { marketingMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...marketingMetadata({
    title: "Join the Founding 100",
    description:
      "Get 50% off forever. Regards Kim handles your Shopify store customer emails using live order data. You just approve and send.",
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
