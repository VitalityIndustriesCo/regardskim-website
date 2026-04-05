"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Filter, FileText, Settings2, ShieldCheck, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const settingsItems = [
  { href: "/settings", label: "Overview", icon: Settings2, value: "overview" },
  { href: "/settings/agent", label: "Agent", icon: Bot, value: "agent" },
  { href: "/settings/filtering", label: "Filtering", icon: Filter, value: "filtering" },
  { href: "/settings/approval", label: "Approval", icon: ShieldCheck, value: "approval" },
  { href: "/settings/policies", label: "Policies", icon: FileText, value: "policies" },
  { href: "/settings/store", label: "Store", icon: Store, value: "store" },
] as const;

function getActiveValue(pathname: string) {
  const activeItem = settingsItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  return activeItem?.value ?? "overview";
}

export function SettingsNav() {
  const pathname = usePathname();
  const activeValue = getActiveValue(pathname);

  return (
    <Tabs value={activeValue} className="gap-4">
      <TabsList variant="line" className="w-full justify-start overflow-x-auto rounded-none border-b p-0 scrollbar-none">
        {settingsItems.map((item) => (
          <TabsTrigger key={item.href} value={item.value} asChild className="shrink-0 rounded-none px-3 py-2">
            <Link href={item.href} className={cn("inline-flex items-center gap-2") }>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export { settingsItems };
