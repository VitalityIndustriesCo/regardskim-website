"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { API_URL } from "@/lib/api";
import { redirectToRemote } from "@/lib/shopify-app-bridge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GmailLogo } from "@/components/ui/gmail-logo";

type ConnectEmailProps = {
  storeId: string | null;
};

export function ConnectEmail({ storeId }: ConnectEmailProps) {
  const [error, setError] = useState<string | null>(null);
  const [isGmailLoading, setIsGmailLoading] = useState(false);

  const handleGmailConnect = () => {
    if (!storeId) {
      setError("Store not loaded yet. Please wait a moment and try again.");
      return;
    }

    setIsGmailLoading(true);
    setError(null);

    redirectToRemote(
      `${API_URL}/auth/gmail/connect?storeId=${encodeURIComponent(storeId)}&context=onboarding`,
      false,
    );
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
              <CardTitle className="text-[#1A1A1A]">Connect your Gmail</CardTitle>
              <CardDescription>
                Kim needs access to your support inbox to read customer emails and draft replies for you.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-[#1A1A1A]/8 bg-[#FFF8F3]/70 p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#1A1A1A]/8">
              <GmailLogo className="h-8 w-8" imageClassName="h-8 w-8" />
            </div>

            <p className="mb-1 text-sm font-medium text-[#1A1A1A]">
              Connect the Gmail you use for customer support
            </p>
            <p className="mb-5 text-sm text-[#1A1A1A]/60">
              Secure Google OAuth — no passwords, no manual settings.
            </p>

            <Button
              type="button"
              onClick={handleGmailConnect}
              disabled={isGmailLoading}
              size="lg"
              className="bg-[#E85D3A] text-white hover:bg-[#d34f2f]"
            >
              {isGmailLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GmailLogo className="mr-2 h-5 w-5" imageClassName="h-5 w-5" />
              )}
              Connect Gmail
            </Button>
          </div>

          <p className="text-center text-xs text-[#1A1A1A]/50">
            Kim only reads incoming emails. Nothing is ever sent without your approval.
          </p>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
