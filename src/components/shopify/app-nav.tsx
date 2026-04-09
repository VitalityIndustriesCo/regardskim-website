"use client";

import { useEffect, useState } from "react";

function hasAppNavElements() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.shopify && window.customElements.get("s-app-nav") && window.customElements.get("s-link"));
}

export function ShopifyAppNav() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (hasAppNavElements()) {
      setReady(true);
      return;
    }

    const startedAt = Date.now();
    const timeoutMs = 5000;

    const check = () => {
      if (hasAppNavElements()) {
        setReady(true);
        return;
      }

      if (Date.now() - startedAt < timeoutMs) {
        window.setTimeout(check, 150);
      }
    };

    check();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <s-app-nav>
      <s-link href="/" rel="home">Home</s-link>
      <s-link href="/inbox">Inbox</s-link>
      <s-link href="/settings">Setup</s-link>
      <s-link href="/billing">Subscription</s-link>
    </s-app-nav>
  );
}
