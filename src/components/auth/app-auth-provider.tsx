"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ExternalLink, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/api";
import { hasSeenOnboarding } from "@/lib/onboarding";
import { getShopifySessionToken, storeIdToken } from "@/lib/shopify-app-bridge";
import { useEmbeddedApp } from "@/components/shopify/embedded-app-provider";
import { Button } from "@/components/ui/button";

type Store = {
  id?: string;
  shopifyDomain?: string;
  shopName?: string;
  [key: string]: unknown;
};

type AppAuthContextValue = {
  store: Store | null;
  loading: boolean;
  authenticated: boolean;
  embedded: boolean;
  billingRequired: boolean;
};

const AppAuthContext = createContext<AppAuthContextValue>({
  store: null,
  loading: true,
  authenticated: false,
  embedded: false,
  billingRequired: false,
});

function waitForShopifyBridge(timeoutMs = 3000): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.shopify) return Promise.resolve(true);

  const startedAt = Date.now();
  return new Promise((resolve) => {
    const check = () => {
      if (window.shopify) {
        resolve(true);
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        resolve(false);
        return;
      }

      window.setTimeout(check, 150);
    };

    check();
  });
}

async function fetchStoreWithToken(token: string): Promise<{ store: Store | null; subscriptionInactive: boolean }> {
  const res = await fetch(`${API_URL}/api/store`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 402) {
    return { store: { id: "subscription-inactive" } as Store, subscriptionInactive: true };
  }

  if (!res.ok) {
    throw new Error(`AUTH_FAILED_${res.status}`);
  }

  const body = (await res.json()) as { data?: Store };
  return { store: body.data || null, subscriptionInactive: false };
}

function SubscriptionInactivePrompt({ embedded }: { embedded: boolean }) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">Subscription inactive</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn't verify an active Shopify subscription for this store. Please open billing in Shopify Admin and confirm your app subscription.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {embedded ? (
          <Button asChild>
            <a href="https://admin.shopify.com/store" target="_top" rel="noreferrer noopener">
              Open Shopify Admin
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function InstallPrompt({ embedded }: { embedded: boolean }) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">Authentication required</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {embedded
          ? "We couldn't verify your Shopify session for this embedded app. Please open RegardsKim from your Shopify Admin Apps list and ensure the app is installed for this store."
          : "We couldn't verify your account session. Please sign in again to continue."}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {embedded ? (
          <Button asChild>
            <a href="https://admin.shopify.com/store" target="_top" rel="noreferrer noopener">
              Open Shopify Admin
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function AppAuthProvider({ children }: { children: ReactNode }) {
  const { embedded } = useEmbeddedApp();
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [subscriptionInactive, setSubscriptionInactive] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    let active = true;

    async function tryAuthWithToken(token: string): Promise<boolean> {
      const result = await fetchStoreWithToken(token);
      if (!active) return false;

      setStore(result.store);
      setAuthenticated(true);

      if (result.subscriptionInactive) {
        setSubscriptionInactive(true);
        setShowOnboarding(false);
        return true;
      }

      setSubscriptionInactive(false);
      setShowOnboarding(!hasSeenOnboarding(result.store?.id as string | null | undefined));
      return true;
    }

    async function runAuthCheck() {
      setLoading(true);
      try {
        if (embedded) {
          const params = new URLSearchParams(window.location.search);
          const urlIdToken = params.get("id_token");
          if (urlIdToken) {
            storeIdToken(urlIdToken);
            try {
              if (await tryAuthWithToken(urlIdToken)) return;
            } catch {
              // URL token failed, fall through to App Bridge
            }
          }

          const bridgeReady = await waitForShopifyBridge(5000);
          if (bridgeReady && window.shopify) {
            const sessionToken = await getShopifySessionToken();
            if (sessionToken) {
              try {
                if (await tryAuthWithToken(sessionToken)) return;
              } catch {
                // Session token auth failed too
              }
            }
          }

          if (!active) return;
          setAuthenticated(false);
          setStore(null);
          setSubscriptionInactive(false);
          setShowOnboarding(false);
          return;
        }

        // Non-embedded: not supported. Middleware should have redirected away.
        if (!active) return;
        setAuthenticated(false);
        setStore(null);
        setSubscriptionInactive(false);
        setShowOnboarding(false);
      } catch {
        if (!active) return;
        setAuthenticated(false);
        setStore(null);
        setSubscriptionInactive(false);
        setShowOnboarding(false);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    runAuthCheck();

    return () => {
      active = false;
    };
  }, [embedded]);

  useEffect(() => {
    const onOnboardingCompleted = () => {
      setShowOnboarding(false);
    };

    const onOnboardingRestart = () => {
      setShowOnboarding(true);
    };

    window.addEventListener("app:onboarding-completed", onOnboardingCompleted);
    window.addEventListener("app:onboarding-restart", onOnboardingRestart);
    return () => {
      window.removeEventListener("app:onboarding-completed", onOnboardingCompleted);
      window.removeEventListener("app:onboarding-restart", onOnboardingRestart);
    };
  }, []);

  useEffect(() => {
    if (showOnboarding) {
      router.replace("/onboarding");
    }
  }, [router, showOnboarding]);

  const value = useMemo<AppAuthContextValue>(
    () => ({ store, loading, authenticated, embedded, billingRequired: false }),
    [store, loading, authenticated, embedded]
  );

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Verifying session…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <AppAuthContext.Provider value={value}>
        <InstallPrompt embedded={embedded} />
      </AppAuthContext.Provider>
    );
  }

  if (subscriptionInactive) {
    return (
      <AppAuthContext.Provider value={value}>
        <SubscriptionInactivePrompt embedded={embedded} />
      </AppAuthContext.Provider>
    );
  }

  if (showOnboarding) {
    return (
      <AppAuthContext.Provider value={value}>
        <div className="flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Opening onboarding…
        </div>
      </AppAuthContext.Provider>
    );
  }

  return <AppAuthContext.Provider value={value}>{children}</AppAuthContext.Provider>;
}

export function useAppAuth() {
  return useContext(AppAuthContext);
}
