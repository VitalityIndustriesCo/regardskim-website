"use client";

import { useState } from "react";
import { MessageCircleQuestion, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SalesChatPanel } from "./sales-chat-panel";

export function SalesChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? <SalesChatPanel onClose={() => setOpen(false)} /> : null}

      <Button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close sales support chat" : "Open sales support chat"}
        className="fixed right-4 bottom-4 z-50 rounded-full bg-brass px-4 py-6 text-paper shadow-[0_14px_40px_rgba(232,93,58,0.35)] transition hover:-translate-y-0.5 hover:bg-oxblood"
      >
        {open ? <X className="mr-1 h-4 w-4" /> : <MessageCircleQuestion className="mr-1 h-4 w-4" />}
        SALES SUPPORT
      </Button>
    </>
  );
}
