"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, MapPin, PenLine, ReceiptText, Truck, User } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ShopifyPolicyCard = {
  title: string;
  content: string;
};

type PolicyFormState = {
  refundWindowDays: string;
  processingTime: string;
  returnAddress: string;
  signature: string;
  supportName: string;
};

type PolicyPrefillResponse = {
  refundWindowDays?: number;
  processingTime?: string;
  returnAddress?: string;
  signature?: string;
  supportName?: string;
  policies?: ShopifyPolicyCard[];
};

type ConfirmPoliciesProps = {
  value: PolicyFormState;
  policies: ShopifyPolicyCard[];
  onChange: (nextValue: PolicyFormState) => void;
  onPoliciesLoaded: (policies: ShopifyPolicyCard[]) => void;
  onConfirmed: () => void;
};

export function ConfirmPolicies({
  value,
  policies,
  onChange,
  onPoliciesLoaded,
  onConfirmed,
}: ConfirmPoliciesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (hasLoaded) return;

    const loadPolicies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api<PolicyPrefillResponse>("/api/onboarding/policies");

        onChange({
          refundWindowDays: String(response.refundWindowDays ?? value.refundWindowDays ?? 30),
          processingTime: response.processingTime ?? value.processingTime,
          returnAddress: response.returnAddress ?? value.returnAddress,
          signature: response.signature ?? value.signature,
          supportName: response.supportName ?? value.supportName,
        });

        onPoliciesLoaded(response.policies ?? []);
        setHasLoaded(true);
      } catch (err) {
        setHasLoaded(true);
        if (err instanceof ApiError) {
          setError(err.message || "Couldn’t load Shopify policies right now.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Couldn’t load Shopify policies right now.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadPolicies();
  }, [hasLoaded, onChange, onPoliciesLoaded, value.processingTime, value.refundWindowDays, value.returnAddress]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      await api("/api/onboarding/policies", {
        method: "POST",
        body: JSON.stringify({
          refundWindowDays: Number(value.refundWindowDays),
          processingTime: value.processingTime,
          returnAddress: value.returnAddress,
          signature: value.signature,
          supportName: value.supportName,
        }),
      });

      onConfirmed();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Couldn’t save those policy details right now.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Couldn’t save those policy details right now.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <form className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]" onSubmit={handleSubmit}>
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Review the important stuff</CardTitle>
            <CardDescription>
              We’ve pulled what we can from Shopify. Tweak anything that looks off so Kim replies with the right policy context.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="support-name">Your agent&apos;s name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="support-name"
                  value={value.supportName}
                  onChange={(event) => onChange({ ...value, supportName: event.target.value })}
                  className="pl-9"
                  placeholder="Kim"
                />
              </div>
              <p className="text-xs text-muted-foreground">This is who customers see the reply from. Default is Kim — change it to whatever fits your brand.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refund-window">Refund window (days)</Label>
              <div className="relative">
                <ReceiptText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="refund-window"
                  type="number"
                  value={value.refundWindowDays}
                  onChange={(event) => onChange({ ...value, refundWindowDays: event.target.value })}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="processing-time">Processing time</Label>
              <div className="relative">
                <Truck className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="processing-time"
                  value={value.processingTime}
                  onChange={(event) => onChange({ ...value, processingTime: event.target.value })}
                  className="pl-9"
                  placeholder="1-2 business days"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="return-address">Return address</Label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="return-address"
                  value={value.returnAddress}
                  onChange={(event) => onChange({ ...value, returnAddress: event.target.value })}
                  className="min-h-28 pl-9"
                  placeholder="123 Warehouse Lane, Brisbane QLD 4000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signature">Email signature</Label>
              <div className="relative">
                <PenLine className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="signature"
                  value={value.signature}
                  onChange={(event) => onChange({ ...value, signature: event.target.value })}
                  className="min-h-28 pl-9"
                  placeholder={"Kind regards,\nKim at Your Store"}
                />
              </div>
              <p className="text-xs text-muted-foreground">This gets added to the end of every email Kim sends.</p>
            </div>

            <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Looks good!
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-muted/20">
          <CardHeader>
            <CardTitle>Shopify policies found</CardTitle>
            <CardDescription>Read-only cards from your store. Handy reference while you confirm the fields.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading your policy data...
              </div>
            ) : policies.length > 0 ? (
              policies.map((policy) => (
                <div key={policy.title} className="rounded-lg border bg-background p-4">
                  <p className="font-medium">{policy.title}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{policy.content}</p>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed bg-background p-4 text-sm text-muted-foreground">
                No Shopify policies were returned yet. You can still fill these fields manually and continue.
              </div>
            )}
          </CardContent>
        </Card>
      </form>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
