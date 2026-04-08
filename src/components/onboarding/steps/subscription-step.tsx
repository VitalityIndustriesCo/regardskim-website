"use client";

import { Check, CreditCard } from "lucide-react";
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
  return (
    <div className="space-y-4">
      <Card className="border-[#1A1A1A]/10 bg-white shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF8F3] ring-1 ring-[#1A1A1A]/8">
              <CreditCard className="h-5 w-5 text-[#E85D3A]" />
            </div>
            <div>
              <CardTitle className="text-[#1A1A1A]">Subscription is managed by Shopify</CardTitle>
              <CardDescription>
                RegardsKim uses Shopify Managed App Pricing. Plan approval happens during app installation in Shopify.
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
            <p>To activate your plan, install RegardsKim from the Shopify App Store and open it from Shopify Admin.</p>
            <p>Development stores are billing-exempt and can continue without charge.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
