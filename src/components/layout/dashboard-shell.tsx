"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatWidget } from "@/components/support/chat-widget";
import { useEmbeddedApp } from "@/components/shopify/embedded-app-provider";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { embedded } = useEmbeddedApp();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-background to-muted/40 md:flex">
      {!embedded ? <Sidebar /> : null}
      <div className="flex min-h-screen flex-1 flex-col">
        {!embedded ? <Header /> : null}
        <main className={embedded ? "flex-1 overflow-x-hidden p-0" : "flex-1 overflow-x-hidden p-4 md:p-6"}>
          {children}
        </main>
      </div>
      {!embedded ? <ChatWidget /> : null}
    </div>
  );
}
