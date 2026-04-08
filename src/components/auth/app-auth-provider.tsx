"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AlertTriangle, Check, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { API_URL, getAuthHeaders } from "@/lib/api";
import { hasSeenOnboarding } from "@/lib/onboarding";
import { getShopifySessionToken } from "@/lib/shopify-app-bridge";
import { useEmbeddedApp } from "@/components/shopify/embedded-app-provider";
import { Button } from "@/components/ui/button";
import { OnboardingGuide } from "@/components/onboarding/onboarding-guide";

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

async function fetchStoreWithToken(token: string): Promise<{ store: Store | null; billingRequired: boolean }> {
  const res = await fetch(`${API_URL}/api/store`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 402) {
    // Auth succeeded but no active subscription — need billing
    // Fetch store info from billing status endpoint instead (not billing-gated)
    const billingRes = await fetch(`${API_URL}/api/billing/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (billingRes.ok) {
      const billingBody = (await billingRes.json()) as { data?: { plan?: { id?: string }; subscription?: { status?: string } } };
      // Return a minimal store object so auth is considered successful
      return { store: { id: "billing-pending" } as Store, billingRequired: true };
    }
    throw new Error(`AUTH_FAILED_402`);
  }

  if (!res.ok) {
    throw new Error(`AUTH_FAILED_${res.status}`);
  }

  const body = (await res.json()) as { data?: Store };
  return { store: body.data || null, billingRequired: false };
}

async function fetchBillingStatusWithToken(token: string) {
  const res = await fetch(`${API_URL}/api/billing/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`BILLING_FAILED_${res.status}`);
  }

  const body = (await res.json()) as {
    data?: {
      subscription?: {
        active?: boolean;
      };
    };
  };

  return Boolean(body.data?.subscription?.active);
}

const BILLING_FEATURES = [
  "Unlimited customer emails",
  "AI-powered drafts using your store data",
  "You approve every reply before it sends",
  "Works with Gmail (Outlook coming soon)",
  "Cancel anytime",
];

function BillingGate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startTrial = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/billing/checkout`, {
        method: "POST",
        headers: await getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        throw new Error(`CHECKOUT_FAILED_${res.status}`);
      }

      const body = (await res.json()) as { data?: { confirmationUrl?: string; url?: string } };
      const confirmationUrl = body.data?.confirmationUrl || body.data?.url;
      if (!confirmationUrl) {
        throw new Error("CHECKOUT_URL_MISSING");
      }

      window.open(confirmationUrl, "_top");
    } catch {
      setError("Couldn’t start billing approval. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[75vh] w-full max-w-3xl items-center px-6 py-10">
      <div className="w-full rounded-3xl border border-foreground/10 bg-cream/60 p-7 shadow-sm md:p-10">
        <p className="mb-3 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          7-day free trial
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">RegardsKim Standard — $49/mo</h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Start your trial to unlock the full app for this store.
        </p>

        <div className="mt-6 space-y-2.5">
          {BILLING_FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-background/70 px-3.5 py-3">
              <div className="rounded-full bg-primary/10 p-1 text-primary">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button onClick={startTrial} disabled={loading} className="min-w-[240px]">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Start your 7-day free trial
          </Button>
          <p className="text-xs text-muted-foreground">You’ll approve billing in Shopify, then return here automatically.</p>
        </div>
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
        ) : (
          <Button asChild>
            <a href="/login">Go to login</a>
          </Button>
        )}
      </div>
    </div>
  );
}

export function AppAuthProvider({ children }: { children: ReactNode }) {
  const { embedded } = useEmbeddedApp();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [billingRequired, setBillingRequired] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    let active = true;

    async function tryAuthWithToken(token: string): Promise<boolean> {
      const result = await fetchStoreWithToken(token);
      if (!active) return false;

      if (result.billingRequired) {
        setStore(result.store);
        setAuthenticated(true);
        setBillingRequired(true);
        return true;
      }

      // Auth succeeded — now check billing status
      try {
        const hasActiveSub = await fetchBillingStatusWithToken(token);
        if (!hasActiveSub) {
          setStore(result.store);
          setAuthenticated(true);
          setBillingRequired(true);
          return true;
        }
      } catch {
        // Billing check failed — show billing gate to be safe
        setStore(result.store);
        setAuthenticated(true);
        setBillingRequired(true);
        return true;
      }

      setStore(result.store);
      setAuthenticated(true);
      setBillingRequired(false);
      setShowOnboarding(!hasSeenOnboarding(result.store?.id as string | null | undefined));
      return true;
    }

    async function runAuthCheck() {
      setLoading(true);
      try {
        if (embedded) {
          // Strategy 1: Use id_token from URL params
          const params = new URLSearchParams(window.location.search);
          const urlIdToken = params.get("id_token");
          if (urlIdToken) {
            try {
              if (await tryAuthWithToken(urlIdToken)) return;
            } catch {
              // URL token failed, fall through to App Bridge
            }
          }

          // Strategy 2: Wait for App Bridge
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
          setBillingRequired(false);
          return;
        }

        // Standalone JWT flow
        const jwtToken = window.localStorage.getItem("token");
        if (!jwtToken) {
          if (!active) return;
          setAuthenticated(false);
          setStore(null);
          setBillingRequired(false);
          return;
        }

        try {
          await tryAuthWithToken(jwtToken);
        } catch {
          // JWT auth failed
        }
      } catch {
        if (!active) return;
        setAuthenticated(false);
        setStore(null);
        setBillingRequired(false);
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
    const onBillingRequired = () => {
      setAuthenticated(true);
      setBillingRequired(true);
      setShowOnboarding(false);
    };

    const onOnboardingCompleted = () => {
      setShowOnboarding(false);
    };

    const onOnboardingRestart = () => {
      setShowOnboarding(true);
    };

    window.addEventListener("app:billing-required", onBillingRequired);
    window.addEventListener("app:onboarding-completed", onOnboardingCompleted);
    window.addEventListener("app:onboarding-restart", onOnboardingRestart);
    return () => {
      window.removeEventListener("app:billing-required", onBillingRequired);
      window.removeEventListener("app:onboarding-completed", onOnboardingCompleted);
      window.removeEventListener("app:onboarding-restart", onOnboardingRestart);
    };
  }, []);

  const value = useMemo<AppAuthContextValue>(
    () => ({ store, loading, authenticated, embedded, billingRequired }),
    [store, loading, authenticated, embedded, billingRequired]
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

  if (billingRequired) {
    return (
      <AppAuthContext.Provider value={value}>
        <BillingGate />
      </AppAuthContext.Provider>
    );
  }

  if (showOnboarding) {
    return (
      <AppAuthContext.Provider value={value}>
        <OnboardingGuide initialStoreId={(store?.id as string | null | undefined) || null} />
      </AppAuthContext.Provider>
    );
  }

  return <AppAuthContext.Provider value={value}>{children}</AppAuthContext.Provider>;
}

export function useAppAuth() {
  return useContext(AppAuthContext);
}
