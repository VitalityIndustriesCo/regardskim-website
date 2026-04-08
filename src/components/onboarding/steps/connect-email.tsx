"use client";

import { useMemo, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GmailLogo } from "@/components/ui/gmail-logo";

type EmailConnection = {
  connected: boolean;
  email?: string;
  authUrl?: string;
};

type ConnectEmailProps = {
  connectedEmail?: string | null;
  onConnected: (email: string) => void;
  onConfirmExisting: (email: string) => void;
};

export function ConnectEmail({ connectedEmail, onConnected, onConfirmExisting }: ConnectEmailProps) {
  const [error, setError] = useState<string | null>(null);
  const [isGmailLoading, setIsGmailLoading] = useState(false);

  const isConnected = useMemo(() => Boolean(connectedEmail), [connectedEmail]);

  const handleGmailConnect = async () => {
    setIsGmailLoading(true);
    setError(null);

    try {
      const response = await api<EmailConnection>("/api/onboarding/email/gmail", {
        method: "POST",
      });

      if (response.authUrl && typeof window !== "undefined") {
        window.location.href = response.authUrl;
        return;
      }

      if (response.connected && response.email) {
        onConnected(response.email);
        return;
      }

      throw new Error("Gmail connection did not return the expected inbox details.");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Couldn’t connect Gmail right now.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Couldn’t connect Gmail right now.");
      }
    } finally {
      setIsGmailLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-[#1A1A1A]/10 bg-white shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF8F3] ring-1 ring-[#1A1A1A]/8">
              <GmailLogo className="h-6 w-6" imageClassName="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-[#1A1A1A]">Connect Gmail</CardTitle>
              <CardDescription>
                One clean click and Kim can start reading customer emails and drafting replies.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-[#1A1A1A]/8 bg-[#FFF8F3]/70 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#1A1A1A]">Gmail only, for now</p>
                <p className="text-sm text-[#1A1A1A]/65">
                  Fastest setup with secure Google OAuth. No passwords or manual server settings.
                </p>
              </div>

              {isConnected ? (
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                  <Button
                    type="button"
                    onClick={() => connectedEmail && onConfirmExisting(connectedEmail)}
                    size="lg"
                    className="w-full bg-[#E85D3A] text-white hover:bg-[#d34f2f] sm:w-auto"
                  >
                    Keep this email
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGmailConnect}
                    disabled={isGmailLoading}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {isGmailLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GmailLogo className="mr-2" />}
                    Connect a different Gmail
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={handleGmailConnect}
                  disabled={isGmailLoading}
                  size="lg"
                  className="w-full bg-[#E85D3A] text-white hover:bg-[#d34f2f] sm:w-auto"
                >
                  {isGmailLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GmailLogo className="mr-2" />}
                  Connect Gmail
                </Button>
              )}
            </div>
          </div>

          <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-none">
            <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  Inbox status
                </p>
                <p className="text-lg font-semibold text-[#1A1A1A]">
                  {connectedEmail ? `Currently connected: ${connectedEmail}` : "No Gmail account connected yet"}
                </p>
                <p className="text-sm text-[#1A1A1A]/65">
                  {connectedEmail
                    ? "Confirm this Gmail to continue, or connect a different one for support."
                    : "Once connected, customer emails will start flowing into your inbox view."}
                </p>
              </div>
            </CardContent>
          </Card>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
