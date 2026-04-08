"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AlertTriangle, ExternalLink, Loader2 } from "lucide-react";
import { buildApiUrl } from "@/lib/api";
import { OnboardingStatusResponse, SetupState } from "@/lib/onboarding";
import { buildEmbeddedAppPath, getShopifySessionToken, storeIdToken } from "@/lib/shopify-app-bridge";
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

};

const AppAuthContext = createContext<AppAuthContextValue>({
  store: null,
  loading: true,
  authenticated: false,
  embedded: false,

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

async function fetchStoreWithToken(token: string): Promise<Store | null> {
  const res = await fetch(buildApiUrl("/api/store"), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`AUTH_FAILED_${res.status}`);
  }

  const body = (await res.json()) as { data?: Store };
  return body.data || null;
}

async function fetchOnboardingStatusWithToken(token: string): Promise<{ setupState: SetupState; onboardingCompleted: boolean }> {
  const res = await fetch(buildApiUrl("/api/onboarding/status"), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`ONBOARDING_STATUS_FAILED_${res.status}`);
  }

  const body = (await res.json()) as OnboardingStatusResponse;
  return {
    setupState: body.data?.setupState || "needsGmail",
    onboardingCompleted: Boolean(body.data?.onboardingCompleted),
  };
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
  const pathname = usePathname();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [setupState, setSetupState] = useState<SetupState>("needsGmail");

  useEffect(() => {
    let active = true;

    async function tryAuthWithToken(token: string): Promise<boolean> {
      const nextStore = await fetchStoreWithToken(token);
      if (!active) return false;

      const onboarding = await fetchOnboardingStatusWithToken(token);
      if (!active) return false;

      setStore(nextStore);
      setAuthenticated(true);
      setSetupState(onboarding.setupState);
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
        }

        if (!active) return;
        setAuthenticated(false);
        setStore(null);
      } catch {
        if (!active) return;
        setAuthenticated(false);
        setStore(null);
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
      setSetupState("ready");
    };

    const onOnboardingRestart = () => {
      setSetupState("needsGmail");
    };

    window.addEventListener("app:onboarding-completed", onOnboardingCompleted);
    window.addEventListener("app:onboarding-restart", onOnboardingRestart);
    return () => {
      window.removeEventListener("app:onboarding-completed", onOnboardingCompleted);
      window.removeEventListener("app:onboarding-restart", onOnboardingRestart);
    };
  }, []);

  useEffect(() => {
    if (!authenticated || loading) return;

    if (setupState !== "ready" && pathname !== "/onboarding") {
      router.replace(buildEmbeddedAppPath("/onboarding"));
      return;
    }

    if (setupState === "ready" && pathname === "/onboarding") {
      router.replace(buildEmbeddedAppPath("/inbox"));
    }
  }, [authenticated, loading, pathname, router, setupState]);

  const value = useMemo<AppAuthContextValue>(
    () => ({ store, loading, authenticated, embedded }),
    [store, loading, authenticated, embedded, setupState],
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

  if (setupState !== "ready" && pathname !== "/onboarding") {
    return (
      <AppAuthContext.Provider value={value}>
        <div className="flex min-h-[70vh] items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Opening setup…
        </div>
      </AppAuthContext.Provider>
    );
  }

  return <AppAuthContext.Provider value={value}>{children}</AppAuthContext.Provider>;
}

export function useAppAuth() {
  return useContext(AppAuthContext);
}
