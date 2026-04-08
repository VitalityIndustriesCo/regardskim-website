import Script from "next/script";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <meta name="shopify-api-key" content="327e4daf19a338e5b04707172c2b39bc" />
      <Script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" strategy="beforeInteractive" />
      {children}
    </>
  );
}
