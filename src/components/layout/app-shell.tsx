"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const authRoutes = new Set(["/login"]);

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  if (authRoutes.has(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-muted/30 md:flex">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
