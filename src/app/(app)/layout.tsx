import Script from "next/script";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { EmbeddedAppProvider } from "@/components/shopify/embedded-app-provider";
import { ChatWidget } from "@/components/support/chat-widget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" strategy="beforeInteractive" />
      <EmbeddedAppProvider>
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-background to-muted/40 md:flex">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <Header />
            <main className="flex-1 overflow-x-hidden p-4 md:p-6">{children}</main>
          </div>
          <ChatWidget />
        </div>
      </EmbeddedAppProvider>
    </>
  );
}
