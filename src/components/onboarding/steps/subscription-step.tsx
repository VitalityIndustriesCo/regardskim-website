"use client";

import { useState } from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { redirectToRemote } from "@/lib/shopify-app-bridge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SubscriptionStepProps = {
  isExempt: boolean;
};

const FEATURES = [
  "Unlimited emails",
  "AI drafts for every customer email",
  "Approve, edit, or skip inline",
  "Shopify + tracking integration",
  "Priority support",
];

export function SubscriptionStep({ isExempt }: SubscriptionStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api<{ success: boolean; data?: { confirmationUrl?: string; url?: string; exempt?: boolean } }>("/api/billing/subscribe", {
        method: "POST",
      });

      const targetUrl = response.data?.confirmationUrl || response.data?.url;
      if (!targetUrl) {
        throw new Error("Shopify didn’t return a billing approval link.");
      }

      redirectToRemote(targetUrl, false);
    } catch (err) {
      if (err instanceof ApiError || err instanceof Error) {
        setError(err.message);
      } else {
        setError("Couldn’t open Shopify billing right now.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-[#1A1A1A]/10 bg-white shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF8F3] ring-1 ring-[#1A1A1A]/8">
              <CreditCard className="h-5 w-5 text-[#E85D3A]" />
            </div>
            <div>
              <CardTitle className="text-[#1A1A1A]">Approve your Shopify subscription</CardTitle>
              <CardDescription>
                RegardsKim billing is managed by Shopify. Approve the app subscription once, then continue setup.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="rounded-2xl border border-[#1A1A1A]/8 bg-[#FFF8F3]/70 p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">RegardsKim Standard</p>
                <p className="mt-1 text-3xl font-semibold text-[#1A1A1A]">$49<span className="text-base font-normal text-[#1A1A1A]/55">/month</span></p>
              </div>
              {isExempt ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">Development store</span>
              ) : null}
            </div>

            <div className="mt-5 space-y-3">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-[#1A1A1A]/75">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-[#1A1A1A]/8">
                    <Check className="h-4 w-4 text-[#E85D3A]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 text-sm text-[#1A1A1A]/65">
            <p>Shopify will show the approval screen inside admin. Once you confirm the plan, RegardsKim will continue your setup automatically.</p>
            <p>Development stores are exempt and can continue without being charged.</p>
          </div>

          <Button
            type="button"
            onClick={() => void handleApprove()}
            disabled={isLoading}
            size="lg"
            className="bg-[#E85D3A] text-white hover:bg-[#d34f2f]"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
            Open Shopify approval
          </Button>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
