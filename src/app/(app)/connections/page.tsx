"use client";

import { useEffect, useState, useCallback, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  RefreshCw,
  Store,
  Unplug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GmailLogo } from "@/components/ui/gmail-logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "sonner";
import { useEmbeddedApp } from "@/components/shopify/embedded-app-provider";
import { api, API_URL } from "@/lib/api";

interface StoreData {
  id?: string;
  shopifyDomain?: string;
  shopName?: string;
  supportEmail?: string;
  emailProvider?: string;
  [key: string]: unknown;
}

interface SyncStatus {
  shopifyDomain: string;
  shopName: string | null;
  lastSyncAt: string | null;
  status: string;
  orderCount: number;
  productCount: number;
}

interface GmailStatus {
  connected: boolean;
  email?: string;
  expired: boolean;
}

interface Connection {
  title: string;
  description: string;
  status: "Connected" | "Disconnected" | "Expired";
  detail: string;
  icon: ComponentType<{ className?: string }>;
  provider?: string;
  syncInfo?: {
    orderCount: number;
    productCount: number;
    lastSyncAt: string | null;
  };
}

function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return "Never";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function deriveConnections(
  data: StoreData,
  syncStatus: SyncStatus | null,
  gmailStatus: GmailStatus | null
): Connection[] {
  const shopifyConnected = Boolean(data.shopifyDomain);

  // Determine email connection state
  let emailStatus: "Connected" | "Disconnected" | "Expired" = "Disconnected";
  let emailDetail = "Connect an email provider to enable support flows";
  let emailProvider: string | undefined;

  if (gmailStatus?.connected) {
    emailStatus = gmailStatus.expired ? "Expired" : "Connected";
    emailDetail = gmailStatus.expired
      ? `Gmail token expired — reconnect ${gmailStatus.email || ""}`
      : `Connected to ${gmailStatus.email || "Gmail"}`;
    emailProvider = "gmail";
  } else if (data.supportEmail && data.emailProvider === "imap") {
    emailStatus = "Connected";
    emailDetail = `${data.supportEmail} via IMAP/SMTP`;
    emailProvider = "imap";
  }

  return [
    {
      title: "Shopify",
      description: "Sync orders, customer data, and catalog updates.",
      status: shopifyConnected ? "Connected" : "Disconnected",
      detail: shopifyConnected
        ? `Connected to ${syncStatus?.shopName || data.shopifyDomain}`
        : "Connect your Shopify store to get started",
      icon: Store,
      ...(shopifyConnected && syncStatus
        ? {
            syncInfo: {
              orderCount: syncStatus.orderCount,
              productCount: syncStatus.productCount,
              lastSyncAt: syncStatus.lastSyncAt,
            },
          }
        : {}),
    },
    {
      title: "Email",
      description: "Pull support conversations and send approved drafts.",
      status: emailStatus,
      detail: emailDetail,
      icon: GmailLogo,
      provider: emailProvider,
    },
  ];
}

import { Suspense } from "react";

function ConnectionsContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [disconnectingShopify, setDisconnectingShopify] = useState(false);
  const searchParams = useSearchParams();
  const { redirect } = useEmbeddedApp();

  const fetchStore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [storeRes, syncRes, gmailRes] = await Promise.all([
        api<{ success: boolean; data: StoreData }>("/api/store"),
        api<{ success: boolean; data: SyncStatus }>("/api/store/sync-status").catch(
          () => null
        ),
        api<{ success: boolean; data: GmailStatus }>("/api/gmail/status").catch(
          () => null
        ),
      ]);
      setStoreId(storeRes.data.id || null);
      setConnections(
        deriveConnections(
          storeRes.data,
          syncRes ? syncRes.data : null,
          gmailRes ? gmailRes.data : null
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load connections"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle Gmail OAuth callback params
  useEffect(() => {
    const gmailResult = searchParams.get("gmail");
    const gmailEmail = searchParams.get("email");
    const reason = searchParams.get("reason");

    if (gmailResult === "success") {
      toast.success(
        gmailEmail
          ? `Successfully connected ${gmailEmail}`
          : "Gmail account connected successfully"
      );
      window.history.replaceState({}, "", "/connections");
    } else if (gmailResult === "error") {
      toast.error(reason || "Failed to connect Gmail account");
      window.history.replaceState({}, "", "/connections");
    }
  }, [searchParams]);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await api("/api/store/sync", { method: "POST" });
      setTimeout(() => {
        fetchStore().finally(() => setSyncing(false));
      }, 3000);
    } catch {
      setSyncing(false);
    }
  };

  const handleConnectGmail = () => {
    if (!storeId) {
      toast.error("Store not loaded");
      return;
    }
    redirect(`${API_URL}/auth/gmail/connect?storeId=${storeId}`);
  };

  const handleDisconnectGmail = async () => {
    setDisconnecting(true);
    try {
      await api("/api/gmail/disconnect", { method: "POST" });
      toast.success("Gmail account disconnected");
      fetchStore();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to disconnect");
    } finally {
      setDisconnecting(false);
    }
  };

  const handleDisconnectShopify = async () => {
    const confirmed = window.confirm(
      "Disconnect Shopify? This will stop syncing orders and products."
    );

    if (!confirmed) return;

    setDisconnectingShopify(true);
    try {
      await api("/api/store/disconnect", { method: "POST" });
      toast.success("Shopify store disconnected");
      fetchStore();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to disconnect Shopify");
    } finally {
      setDisconnectingShopify(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Connections
        </h1>
        <p className="text-sm text-muted-foreground">
          Connected integrations and services that power support automation.
        </p>
      </div>

      {loading ? (
        <LoadingState message="Loading connections…" />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchStore} />
      ) : connections.length === 0 ? (
        <EmptyState
          icon={Store}
          title="No connections yet"
          description="Connect your Shopify store and email provider to enable support automation."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {connections.map((connection) => {
            const isConnected = connection.status === "Connected";
            const isExpired = connection.status === "Expired";
            const isShopify = connection.title === "Shopify";
            const isEmail = connection.title === "Email";

            return (
              <Card key={connection.title}>
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <connection.icon className="h-5 w-5" />
                    </div>
                    <Badge
                      variant={
                        isConnected
                          ? "secondary"
                          : isExpired
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {isConnected ? (
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                      ) : null}
                      {connection.status}
                    </Badge>
                  </div>
                  <CardTitle>{connection.title}</CardTitle>
                  <CardDescription>{connection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {connection.detail}
                  </p>
                  {connection.syncInfo && (
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">
                          {connection.syncInfo.orderCount}
                        </span>{" "}
                        orders synced
                        {" · "}
                        <span className="font-medium text-foreground">
                          {connection.syncInfo.productCount}
                        </span>{" "}
                        products
                      </p>
                      <p>
                        Last sync:{" "}
                        <span className="font-medium text-foreground">
                          {formatRelativeTime(connection.syncInfo.lastSyncAt)}
                        </span>
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  {/* Shopify actions */}
                  {isShopify && isConnected && (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleSync}
                        disabled={syncing}
                      >
                        {syncing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        {syncing ? "Syncing…" : "Sync Now"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleDisconnectShopify}
                        disabled={disconnectingShopify}
                      >
                        <Unplug className="mr-2 h-4 w-4" />
                        {disconnectingShopify ? "Disconnecting…" : "Disconnect"}
                      </Button>
                    </>
                  )}

                  {/* Gmail connect button */}
                  {isEmail && !isConnected && !isExpired && (
                    <>
                      <Button onClick={handleConnectGmail}>
                        <GmailLogo className="mr-2" />
                        Connect Gmail
                      </Button>
                    </>
                  )}

                  {/* Gmail reconnect (expired) */}
                  {isEmail && isExpired && (
                    <Button onClick={handleConnectGmail} variant="destructive">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reconnect Gmail
                    </Button>
                  )}

                  {/* Gmail disconnect */}
                  {isEmail && isConnected && connection.provider === "gmail" && (
                    <Button
                      onClick={handleDisconnectGmail}
                      variant="outline"
                      disabled={disconnecting}
                    >
                      <Unplug className="mr-2 h-4 w-4" />
                      {disconnecting ? "Disconnecting…" : "Disconnect"}
                    </Button>
                  )}

                  {/* Default reconnect for other cards */}
                  {!isShopify && !isEmail && (
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4" />
                      {isConnected ? "Reconnect" : "Connect"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function ConnectionsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading connections…</div>}>
      <ConnectionsContent />
    </Suspense>
  );
}
