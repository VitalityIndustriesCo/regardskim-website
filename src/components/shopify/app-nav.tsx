"use client";

import { useEffect, useRef } from "react";

const NAV_ITEMS = [
  { href: "/inbox", label: "Inbox" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
  { href: "/connections", label: "Connections" },
  { href: "/billing", label: "Billing" },
];

export function ShopifyAppNav() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nav = document.createElement("s-app-nav");
    for (const item of NAV_ITEMS) {
      const link = document.createElement("s-link");
      link.setAttribute("href", item.href);
      link.textContent = item.label;
      nav.appendChild(link);
    }

    containerRef.current.appendChild(nav);

    return () => {
      nav.remove();
    };
  }, []);

  return <div ref={containerRef} />;
}
