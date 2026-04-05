"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircleQuestion, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatPanel } from "./chat-panel";

const DASHBOARD_PATHS = ["/", "/inbox", "/analytics", "/connections", "/settings", "/billing"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const shouldShow = useMemo(() => {
    return DASHBOARD_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  }, [pathname]);

  if (!shouldShow) return null;

  return (
    <>
      {open ? (
        <ChatPanel onClose={() => setOpen(false)} />
      ) : null}

      <Button
        className="fixed bottom-4 right-4 z-50 rounded-full px-4 shadow-xl"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close support chat" : "Open support chat"}
      >
        {open ? <X className="mr-1 h-4 w-4" /> : <MessageCircleQuestion className="mr-1 h-4 w-4" />}
        Support
      </Button>
    </>
  );
}
