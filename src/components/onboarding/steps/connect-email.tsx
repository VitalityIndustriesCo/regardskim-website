"use client";

import { FormEvent, useMemo, useState } from "react";
import { Loader2, Mail, ShieldCheck } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EmailConnection = {
  connected: boolean;
  email?: string;
  authUrl?: string;
};

type ImapFormState = {
  server: string;
  port: string;
  email: string;
  password: string;
};

type ConnectEmailProps = {
  connectedEmail?: string | null;
  onConnected: (email: string) => void;
};

const defaultImapState: ImapFormState = {
  server: "imap.gmail.com",
  port: "993",
  email: "support@yourstore.com",
  password: "",
};

export function ConnectEmail({ connectedEmail, onConnected }: ConnectEmailProps) {
  const [imap, setImap] = useState<ImapFormState>(defaultImapState);
  const [error, setError] = useState<string | null>(null);
  const [isGmailLoading, setIsGmailLoading] = useState(false);
  const [isImapLoading, setIsImapLoading] = useState(false);

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

  const handleImapTest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsImapLoading(true);
    setError(null);

    try {
      const response = await api<EmailConnection>("/api/onboarding/email/imap/test", {
        method: "POST",
        body: JSON.stringify({
          server: imap.server,
          port: Number(imap.port),
          email: imap.email,
          password: imap.password,
        }),
      });

      if (response.connected && response.email) {
        onConnected(response.email);
        return;
      }

      throw new Error("IMAP test completed but no inbox was returned.");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Couldn’t verify that inbox right now.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Couldn’t verify that inbox right now.");
      }
    } finally {
      setIsImapLoading(false);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Gmail (one-click)
          </CardTitle>
          <CardDescription>
            Fastest setup. Use Google OAuth and Kim can start monitoring your support inbox without manual server details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            onClick={handleGmailConnect}
            disabled={isGmailLoading || isConnected}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isGmailLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isConnected ? "Inbox connected" : "Connect Gmail"}
          </Button>

          <p className="text-sm text-muted-foreground">
            Best for founders who want the quickest route to live monitoring.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Other provider (IMAP)</CardTitle>
          <CardDescription>
            Prefer another inbox provider? Enter your IMAP credentials and we’ll test the connection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleImapTest}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="imap-server">Server</Label>
                <Input
                  id="imap-server"
                  value={imap.server}
                  onChange={(event) => setImap((current) => ({ ...current, server: event.target.value }))}
                  placeholder="imap.provider.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imap-port">Port</Label>
                <Input
                  id="imap-port"
                  type="number"
                  value={imap.port}
                  onChange={(event) => setImap((current) => ({ ...current, port: event.target.value }))}
                  placeholder="993"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imap-email">Email</Label>
              <Input
                id="imap-email"
                type="email"
                value={imap.email}
                onChange={(event) => setImap((current) => ({ ...current, email: event.target.value }))}
                placeholder="support@yourstore.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imap-password">Password</Label>
              <Input
                id="imap-password"
                type="password"
                value={imap.password}
                onChange={(event) => setImap((current) => ({ ...current, password: event.target.value }))}
                placeholder="App password"
              />
            </div>

            <Button type="submit" disabled={isImapLoading || isConnected} className="w-full sm:w-auto">
              {isImapLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Test Connection
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-emerald-500/20 bg-emerald-500/5 lg:col-span-2">
        <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              Inbox status
            </p>
            <p className="text-lg font-semibold">
              {connectedEmail ? `Kim is now monitoring ${connectedEmail}` : "No inbox connected yet"}
            </p>
            <p className="text-sm text-muted-foreground">
              Once connected, new customer emails can start flowing into your inbox view.
            </p>
          </div>
        </CardContent>
      </Card>

      {error ? <p className="lg:col-span-2 text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
