"use client";

import { useEffect, useState, useCallback } from "react";
import { SettingsNav } from "@/components/settings/settings-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { api } from "@/lib/api";

interface StoreFile {
  supportName: string;
  signature: string;
}

export default function AgentSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [supportName, setSupportName] = useState("Kim");
  const [signature, setSignature] = useState("Kind regards,\nKim");

  const fetchStoreFile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ success: boolean; data: { storeFile: StoreFile | null } }>("/api/store");
      const sf = res.data.storeFile;
      if (sf) {
        setSupportName(sf.supportName || "Kim");
        setSignature(sf.signature || "Kind regards,\nKim");
      }
      setDataLoaded(true);
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
        body: JSON.stringify({ supportName, signature }),
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
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Agent settings</h1>
          <p className="text-sm text-muted-foreground">Configure Kim&apos;s identity for customer replies.</p>
        </div>
        <SettingsNav />
        <LoadingState message="Loading agent settings…" />
      </section>
    );
  }

  if (error && !dataLoaded) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Agent settings</h1>
          <p className="text-sm text-muted-foreground">Configure Kim&apos;s identity for customer replies.</p>
        </div>
        <SettingsNav />
        <ErrorState message={error} onRetry={fetchStoreFile} />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Agent settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure Kim&apos;s identity for customer replies.
        </p>
      </div>

      <SettingsNav />

      <Card>
        <CardHeader>
          <CardTitle>Identity</CardTitle>
          <CardDescription>The name and sign-off Kim uses in every reply.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="agent-name">Support name</Label>
            <Input
              id="agent-name"
              value={supportName}
              onChange={(e) => setSupportName(e.target.value)}
              placeholder="Kim"
            />
            <p className="text-xs text-muted-foreground">
              The name customers see in replies.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sign-off">Signature</Label>
            <Textarea
              id="sign-off"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder={"Kind regards,\nKim"}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Closing line appended to every reply.
            </p>
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
