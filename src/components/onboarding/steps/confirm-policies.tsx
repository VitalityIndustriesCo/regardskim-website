"use client";

import { FormEvent, useEffect, useState } from "react";
import { Globe, Loader2, User } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PolicyFormState = {
  shippingPolicyUrl: string;
  refundPolicyUrl: string;
  supportName: string;
};

type PolicyPrefillResponse = {
  success?: boolean;
  data?: {
    shippingPolicyUrl?: string | null;
    refundPolicyUrl?: string | null;
    supportName?: string;
  };
};

type ConfirmPoliciesProps = {
  value: PolicyFormState;
  onChange: (nextValue: PolicyFormState) => void;
  onConfirmed: () => void;
};

export function ConfirmPolicies({ value, onChange, onConfirmed }: ConfirmPoliciesProps) {
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
          shippingPolicyUrl: response.data?.shippingPolicyUrl ?? value.shippingPolicyUrl,
          refundPolicyUrl: response.data?.refundPolicyUrl ?? value.refundPolicyUrl,
          supportName: response.data?.supportName ?? value.supportName,
        });
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message || "Couldn’t load your policy links right now.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Couldn’t load your policy links right now.");
        }
      } finally {
        setHasLoaded(true);
        setIsLoading(false);
      }
    };

    void loadPolicies();
  }, [hasLoaded, onChange, value.refundPolicyUrl, value.shippingPolicyUrl, value.supportName]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      await api("/api/onboarding/policies", {
        method: "POST",
        body: JSON.stringify({
          shippingPolicyUrl: value.shippingPolicyUrl.trim(),
          refundPolicyUrl: value.refundPolicyUrl.trim(),
          supportName: value.supportName.trim(),
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
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Just the essentials</CardTitle>
        <CardDescription>
          Keep this fast. Add the policy links Kim should use as source references, plus the name customers will see on replies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="shipping-policy-url">Shipping policy URL</Label>
            <div className="relative">
              <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="shipping-policy-url"
                type="url"
                required
                value={value.shippingPolicyUrl}
                onChange={(event) => onChange({ ...value, shippingPolicyUrl: event.target.value })}
                className="pl-9"
                placeholder="https://yourstore.com/policies/shipping-policy"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refund-policy-url">Returns / refund policy URL</Label>
            <div className="relative">
              <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="refund-policy-url"
                type="url"
                required
                value={value.refundPolicyUrl}
                onChange={(event) => onChange({ ...value, refundPolicyUrl: event.target.value })}
                className="pl-9"
                placeholder="https://yourstore.com/policies/refund-policy"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-name">Agent name</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="support-name"
                required
                value={value.supportName}
                onChange={(event) => onChange({ ...value, supportName: event.target.value })}
                className="pl-9"
                placeholder="Kim"
              />
            </div>
            <p className="text-xs text-muted-foreground">This is the sender name customers will see in replies.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isLoading || isSaving} className="w-full sm:w-auto">
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save and continue
            </Button>
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading saved values…
              </div>
            ) : null}
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
