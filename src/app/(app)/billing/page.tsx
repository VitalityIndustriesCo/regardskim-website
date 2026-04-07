"use client";

import { useEffect, useState, useCallback } from "react";
import { Check, CreditCard, Sparkles, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { useEmbeddedApp } from "@/components/shopify/embedded-app-provider";
import { EmptyState } from "@/components/ui/empty-state";
import { api } from "@/lib/api";

const STANDARD_FEATURES = [
  "Unlimited emails",
  "AI drafts for every customer email",
  "Approve, edit, or skip inline",
  "Auto-learns from your edits",
  "Shopify + tracking integration",
  "Analytics dashboard",
  "Priority support",
];

interface BillingStatus {
  plan: { id: string; name: string; features: string[] };
  usage: { currentMonthEmails: number; emailLimit: number | null; remainingEmails: number | null; billingCycleStart: string };
  subscription: { stripeSubscriptionId: string | null; status: string };
}

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [billingData, setBillingData] = useState<BillingStatus | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const { redirect } = useEmbeddedApp();

  const fetchBilling = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ success: boolean; data: BillingStatus }>("/api/billing/status");
      setBillingData(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load billing data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await api<{ success: boolean; data: { url: string } }>("/api/billing/checkout", {
        method: "POST",
        body: JSON.stringify({}),
      });
      redirect(res.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setCheckoutLoading(false);
    }
  };

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const res = await api<{ success: boolean; data: { url: string } }>("/api/billing/portal", {
        method: "POST",
      });
      redirect(res.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open billing portal");
      setPortalLoading(false);
    }
  };

  const isActive = billingData?.plan?.id === "standard";
  const usage = billingData?.usage;

  if (loading) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Billing</h1>
          <p className="text-sm text-muted-foreground">Manage your RegardsKim subscription.</p>
        </div>
        <LoadingState message="Loading billing…" />
      </section>
    );
  }

  if (error && !billingData) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Billing</h1>
          <p className="text-sm text-muted-foreground">Manage your RegardsKim subscription.</p>
        </div>
        <ErrorState message={error} onRetry={fetchBilling} />
      </section>
    );
  }

  if (!billingData) {
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Billing</h1>
          <p className="text-sm text-muted-foreground">Manage your RegardsKim subscription.</p>
        </div>
        <EmptyState
          icon={CreditCard}
          title="No billing data"
          description="Couldn't load your plan details. Try again in a moment."
          actionLabel="Retry"
          onAction={fetchBilling}
        />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your RegardsKim subscription.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Current plan + usage */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>RegardsKim Standard</CardTitle>
              {isActive ? (
                <Badge>Active</Badge>
              ) : (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </div>
            <CardDescription>
              {isActive
                ? "Your store is live — Kim is handling your inbox."
                : "Subscribe to activate Kim for your store."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-3xl font-semibold">$49<span className="text-base font-normal text-muted-foreground">/mo</span></p>

            {usage && isActive && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Emails handled this month</span>
                  <span className="font-medium">{usage.currentMonthEmails.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Billing cycle started {new Date(usage.billingCycleStart).toLocaleDateString("en-AU", { day: "numeric", month: "long" })}.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end gap-2">
            {isActive ? (
              <Button variant="outline" onClick={handlePortal} disabled={portalLoading}>
                {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                Manage Billing
              </Button>
            ) : (
              <Button onClick={handleCheckout} disabled={checkoutLoading}>
                {checkoutLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Sparkles className="h-4 w-4 mr-1" />}
                Subscribe — $49/mo
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* What&apos;s included */}
        <Card>
          <CardHeader>
            <CardTitle>What&apos;s included</CardTitle>
            <CardDescription>Everything you need. No tiers, no surprises.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {STANDARD_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-xl border p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
