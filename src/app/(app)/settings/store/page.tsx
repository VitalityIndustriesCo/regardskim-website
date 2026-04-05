"use client";

import { useEffect, useState, useCallback } from "react";
import { SettingsNav } from "@/components/settings/settings-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { api } from "@/lib/api";

interface StoreData {
  shopName?: string;
  supportEmail?: string;
  ownerEmail?: string;
  [key: string]: unknown;
}

export default function StoreSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [shopName, setShopName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");

  const fetchStore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ success: boolean; data: StoreData }>("/api/store");
      const store = res.data;
      setShopName(store.shopName || "");
      setSupportEmail(store.supportEmail || store.ownerEmail || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load store settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await api("/api/store/settings", {
        method: "PATCH",
        body: JSON.stringify({ shopName, supportEmail }),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save store settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Store settings</h1>
          <p className="text-sm text-muted-foreground">Basic store details used across the dashboard and support flows.</p>
        </div>
        <SettingsNav />
        <LoadingState message="Loading store settings…" />
      </section>
    );
  }

  if (error && !shopName && !supportEmail) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Store settings</h1>
          <p className="text-sm text-muted-foreground">Basic store details used across the dashboard and support flows.</p>
        </div>
        <SettingsNav />
        <ErrorState message={error || "Failed to load store settings"} onRetry={fetchStore} />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Store settings</h1>
        <p className="text-sm text-muted-foreground">Basic store details used across the dashboard and support flows.</p>
      </div>

      <SettingsNav />

      <Card>
        <CardHeader>
          <CardTitle>Store details</CardTitle>
          <CardDescription>These values appear in support signatures and operational workflows.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store name</Label>
            <Input id="store-name" value={shopName} onChange={(e) => setShopName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-email">Support email</Label>
            <Input id="support-email" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
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
