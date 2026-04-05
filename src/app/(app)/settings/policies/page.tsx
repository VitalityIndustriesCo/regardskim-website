"use client";

import { useEffect, useState, useCallback } from "react";
import { SettingsNav } from "@/components/settings/settings-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { api } from "@/lib/api";

interface StoreFile {
  supportName: string;
  refundWindowDays: number | null;
  processingTime: string;
  returnAddress: string | null;
  shippingPolicyUrl: string | null;
  refundPolicyUrl: string | null;
  freeExchanges: boolean;
  exchangeWindowDays: number | null;
}

export default function PoliciesSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [refundWindow, setRefundWindow] = useState("30");
  const [processingTime, setProcessingTime] = useState("1-3 business days");
  const [returnAddress, setReturnAddress] = useState("");
  const [shippingPolicyUrl, setShippingPolicyUrl] = useState("");
  const [refundPolicyUrl, setRefundPolicyUrl] = useState("");
  const [freeExchanges, setFreeExchanges] = useState(false);
  const [exchangeWindow, setExchangeWindow] = useState("");

  const fetchStoreFile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ success: boolean; data: { storeFile: StoreFile | null } }>("/api/store");
      const sf = res.data.storeFile;
      if (sf) {
        setRefundWindow(sf.refundWindowDays?.toString() || "30");
        setProcessingTime(sf.processingTime || "1-3 business days");
        setReturnAddress(sf.returnAddress || "");
        setShippingPolicyUrl(sf.shippingPolicyUrl || "");
        setRefundPolicyUrl(sf.refundPolicyUrl || "");
        setFreeExchanges(sf.freeExchanges || false);
        setExchangeWindow(sf.exchangeWindowDays?.toString() || "");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStoreFile();
  }, [fetchStoreFile]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await api("/api/store/store-file", {
        method: "PATCH",
        body: JSON.stringify({
          refundWindowDays: parseInt(refundWindow, 10) || 30,
          processingTime,
          returnAddress,
          shippingPolicyUrl,
          refundPolicyUrl,
          freeExchanges,
          exchangeWindowDays: exchangeWindow ? parseInt(exchangeWindow, 10) : null,
        }),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Policy settings</h1>
          <p className="text-sm text-muted-foreground">Centralise the operational rules and visible support identity used in customer replies.</p>
        </div>
        <SettingsNav />
        <LoadingState message="Loading policy settings…" />
      </section>
    );
  }

  if (error && !processingTime) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Policy settings</h1>
          <p className="text-sm text-muted-foreground">Centralise the operational rules and visible support identity used in customer replies.</p>
        </div>
        <SettingsNav />
        <ErrorState message={error} onRetry={fetchStoreFile} />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Policy settings</h1>
        <p className="text-sm text-muted-foreground">
          Centralise the operational rules and visible support identity used in customer replies.
        </p>
      </div>

      <SettingsNav />

      <Card>
        <CardHeader>
          <CardTitle>Core policies</CardTitle>
          <CardDescription>Keep your shipping, refunds, and reference links up to date.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="refund-window">Refund window (days)</Label>
            <Input id="refund-window" type="number" value={refundWindow} onChange={(e) => setRefundWindow(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="processing-time">Processing time</Label>
            <Input id="processing-time" value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="return-address">Return address</Label>
            <Textarea id="return-address" rows={3} value={returnAddress} onChange={(e) => setReturnAddress(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shipping-url">Shipping policy URL</Label>
            <Input id="shipping-url" value={shippingPolicyUrl} onChange={(e) => setShippingPolicyUrl(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="refund-url">Refund policy URL</Label>
            <Input id="refund-url" value={refundPolicyUrl} onChange={(e) => setRefundPolicyUrl(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exchanges</CardTitle>
          <CardDescription>Configure exchange policies for your store.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="space-y-1">
              <Label htmlFor="free-exchanges">Free exchanges</Label>
              <p className="text-sm text-muted-foreground">Allow free exchanges within the exchange window.</p>
            </div>
            <Switch id="free-exchanges" checked={freeExchanges} onCheckedChange={setFreeExchanges} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exchange-window">Exchange window (days)</Label>
            <Input id="exchange-window" type="number" value={exchangeWindow} onChange={(e) => setExchangeWindow(e.target.value)} placeholder="Same as refund window" />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 justify-end">
        {error && <p className="text-sm text-destructive">{error}</p>}
        {success && <p className="text-sm text-green-600">Settings saved!</p>}
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </section>
  );
}
