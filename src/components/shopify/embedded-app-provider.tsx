"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  getEmbeddedHost,
  isShopifyEmbedded,
  redirectToAppPath,
  redirectToRemote,
} from "@/lib/shopify-app-bridge";

type EmbeddedAppContextValue = {
  embedded: boolean;
  host: string | null;
  navigate: (path: string) => void;
  redirect: (url: string, newContext?: boolean) => void;
};

const EmbeddedAppContext = createContext<EmbeddedAppContextValue>({
  embedded: false,
  host: null,
  navigate: (path) => {
    if (typeof window !== "undefined") {
      window.location.assign(path);
    }
  },
  redirect: (url) => {
    if (typeof window !== "undefined") {
      window.location.assign(url);
    }
  },
});

export function EmbeddedAppProvider({ children }: { children: ReactNode }) {
  const embedded = useMemo(() => isShopifyEmbedded(), []);
  const host = useMemo(() => getEmbeddedHost(), []);

  const value = useMemo<EmbeddedAppContextValue>(
    () => ({
      embedded,
      host,
      navigate: (path: string) => redirectToAppPath(path),
      redirect: (url: string, newContext = true) => redirectToRemote(url, newContext),
    }),
    [embedded, host]
  );

  return <EmbeddedAppContext.Provider value={value}>{children}</EmbeddedAppContext.Provider>;
}

export function useEmbeddedApp() {
  return useContext(EmbeddedAppContext);
}
