import Script from "next/script";
import { AppAuthProvider } from "@/components/auth/app-auth-provider";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmbeddedAppProvider } from "@/components/shopify/embedded-app-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <meta name="shopify-api-key" content="327e4daf19a338e5b04707172c2b39bc" />
      <Script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" strategy="beforeInteractive" />
      <EmbeddedAppProvider>
        <AppAuthProvider>
          <DashboardShell>{children}</DashboardShell>
        </AppAuthProvider>
      </EmbeddedAppProvider>
    </>
  );
}
