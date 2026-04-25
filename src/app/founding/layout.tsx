import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Founding 100 — Regards Kim",
  description:
    "Get 50% off forever. Regards Kim handles your Shopify store customer emails using live order data. You just approve and send.",
  robots: { index: false, follow: false },
};

export default function FoundingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
