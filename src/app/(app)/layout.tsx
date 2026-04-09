import { AppAuthProvider } from "@/components/auth/app-auth-provider";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmbeddedAppProvider } from "@/components/shopify/embedded-app-provider";
import { ShopifyAppNav } from "@/components/shopify/app-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmbeddedAppProvider>
      <AppAuthProvider>
        <ShopifyAppNav />
        <DashboardShell>{children}</DashboardShell>
      </AppAuthProvider>
    </EmbeddedAppProvider>
  );
}
