"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEmbeddedApp } from "@/components/shopify/embedded-app-provider";
import { removeToken } from "@/lib/auth";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SidebarContent } from "./sidebar";

export function Header() {
  const router = useRouter();
  const { embedded } = useEmbeddedApp();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        {!embedded ? (
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SidebarContent onNavigate={() => setMobileNavOpen(false)} />
            </SheetContent>
          </Sheet>
        ) : null}

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Store</p>
          <h1 className="text-lg font-semibold">RegardsKim</h1>
        </div>
      </div>

      {!embedded ? (
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
          <span className="sr-only">Logout</span>
        </Button>
      ) : null}
    </header>
  );
}
