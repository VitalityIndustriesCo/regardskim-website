"use client";

import { usePathname } from "next/navigation";
import { AppLink } from "@/components/shopify/app-link";
import { useEmbeddedApp } from "@/components/shopify/embedded-app-provider";
import { useAppAuth } from "@/components/auth/app-auth-provider";
import { BarChart3, CreditCard, Inbox, Link2, Settings } from "lucide-react";
import { resetOnboardingSeen } from "@/lib/onboarding";
import { cn } from "@/lib/utils";

export const navItems = [
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/connections", label: "Connections", icon: Link2 },
  { href: "/billing", label: "Billing", icon: CreditCard },
];

type SidebarNavProps = {
  onNavigate?: () => void;
};

function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const { store } = useAppAuth();

  const handleResetGuide = () => {
    resetOnboardingSeen((store?.id as string | null | undefined) || null);
    window.dispatchEvent(new CustomEvent("app:onboarding-restart"));
    onNavigate?.();
  };

  return (
    <nav className="flex-1 space-y-1 p-3">
      {navItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <AppLink
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </AppLink>
        );
      })}

      <button
        type="button"
        onClick={handleResetGuide}
        className="mt-3 w-full rounded-lg border border-sidebar-foreground/20 px-3 py-2 text-left text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        Setup guide
      </button>
    </nav>
  );
}

export function SidebarContent({ onNavigate }: SidebarNavProps) {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-sidebar to-sidebar/80 text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <div>
          <p className="text-sm text-sidebar-foreground/60">Your dashboard</p>
          <h2 className="text-lg font-semibold">RegardsKim</h2>
        </div>
      </div>
      <SidebarNav onNavigate={onNavigate} />
    </div>
  );
}

export function Sidebar() {
  const { embedded } = useEmbeddedApp();

  if (embedded) {
    return null;
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border md:block">
      <SidebarContent />
    </aside>
  );
}
