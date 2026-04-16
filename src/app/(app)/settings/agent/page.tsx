"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { SettingsNav } from "@/components/settings/settings-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { api, API_URL, getAuthHeaders } from "@/lib/api";
import { ImagePlus, X } from "lucide-react";

interface StoreFile {
  supportName: string;
  signature: string;
  signatureImageUrl?: string;
}

export default function AgentSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [supportName, setSupportName] = useState("Kim");
  const [signature, setSignature] = useState("Kind regards,\nKim");
  const [signatureImageUrl, setSignatureImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchStoreFile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ success: boolean; data: { storeFile: StoreFile | null } }>("/api/store");
      const sf = res.data.storeFile;
      if (sf) {
        setSupportName(sf.supportName || "Kim");
        setSignature(sf.signature || "Kind regards,\nKim");
        setSignatureImageUrl(sf.signatureImageUrl || null);
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
        body: JSON.stringify({ supportName, signature, signatureImageUrl }),
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
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Agent name & signature</h1>
          <p className="text-sm text-muted-foreground">Set your agent&apos;s name and email signature.</p>
        </div>
        <SettingsNav />
        <LoadingState message="Loading settings…" />
      </section>
    );
  }

  if (error && !dataLoaded) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Agent name & signature</h1>
          <p className="text-sm text-muted-foreground">Set your agent&apos;s name and email signature.</p>
        </div>
        <SettingsNav />
        <ErrorState message={error} onRetry={fetchStoreFile} />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Agent name & signature</h1>
        <p className="text-sm text-muted-foreground">
          Set your agent&apos;s name and email signature.
        </p>
      </div>

      <SettingsNav />

      <Card>
        <CardHeader>
          <CardTitle>Agent name</CardTitle>
          <CardDescription>The name your customers see in replies.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm space-y-2">
            <Label htmlFor="agent-name">Name</Label>
            <Input
              id="agent-name"
              value={supportName}
              onChange={(e) => setSupportName(e.target.value)}
              placeholder="Kim"
            />
            <p className="text-xs text-muted-foreground">
              This is how Regards Kim signs off emails. You can change it to any name you like.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email signature</CardTitle>
          <CardDescription>Added to the bottom of every reply Regards Kim sends.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sign-off">Signature text</Label>
            <Textarea
              id="sign-off"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder={"Kind regards,\nKim"}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              The closing lines at the bottom of every email.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Signature image</Label>
            <p className="text-xs text-muted-foreground">
              Add a logo or image to your email signature, like in Gmail.
            </p>

            {signatureImageUrl ? (
              <div className="flex items-start gap-4">
                <div className="relative overflow-hidden rounded-md border border-border bg-muted/20 p-2">
                  <Image
                    src={signatureImageUrl}
                    alt="Signature image"
                    width={200}
                    height={80}
                    className="h-auto max-h-20 w-auto max-w-[200px] object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <ImagePlus className="mr-1.5 h-3.5 w-3.5" />
                    Replace
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSignatureImageUrl(null)}
                  >
                    <X className="mr-1.5 h-3.5 w-3.5" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <ImagePlus className="mr-1.5 h-3.5 w-3.5" />
                {uploading ? "Uploading…" : "Add image"}
              </Button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                  alert("Image must be under 2MB");
                  return;
                }
                setUploading(true);
                try {
                  const formData = new FormData();
                  formData.append("file", file);
                  const res = await fetch(`${API_URL}/api/store/signature-image`, {
                    method: "POST",
                    headers: await getAuthHeaders(),
                    body: formData,
                  });
                  if (!res.ok) throw new Error("Upload failed");
                  const data = await res.json();
                  setSignatureImageUrl(data.url || data.data?.url);
                } catch {
                  alert("Failed to upload image. Try a smaller file.");
                } finally {
                  setUploading(false);
                  e.target.value = "";
                }
              }}
            />
          </div>

          {/* Signature preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="rounded-md border border-border bg-white p-4 text-sm leading-relaxed text-foreground dark:bg-muted/20">
              {signature.split("\n").map((line, i) => (
                <p key={i}>{line || "\u00A0"}</p>
              ))}
              {signatureImageUrl && (
                <div className="mt-2">
                  <Image
                    src={signatureImageUrl}
                    alt="Signature"
                    width={200}
                    height={80}
                    className="h-auto max-h-20 w-auto max-w-[200px] object-contain"
                    unoptimized
                  />
                </div>
              )}
            </div>
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
