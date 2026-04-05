"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { DraftEditor } from "@/components/inbox/draft-editor";
import { EmailDetail } from "@/components/inbox/email-detail";
import { ThreadView } from "@/components/inbox/thread-view";
import { type InboxEmail } from "@/components/inbox/email-row";
import { formatStatus } from "@/components/inbox/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ExternalLink,
  X,
} from "lucide-react";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { api } from "@/lib/api";

function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function InboxDetailPage() {
  const params = useParams<{ id: string }>();
  const [email, setEmail] = useState<(InboxEmail & { thread?: InboxEmail[]; kimNote?: string | null }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchEmail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ success: boolean; data: InboxEmail & { thread?: InboxEmail[]; kimNote?: string | null } }>(
        `/api/emails/${params.id}`
      );
      setEmail(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load email");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchEmail();
  }, [fetchEmail]);

  // ── Action handlers ────────────────────────────────────────────────────────

  const handleApprove = async () => {
    await api(`/api/emails/${params.id}/approve`, { method: "POST" });
    await fetchEmail();
  };

  const handleEditAndSend = async (editedResponse: string) => {
    await api(`/api/emails/${params.id}/edit`, {
      method: "POST",
      body: JSON.stringify({ editedResponse }),
    });
    await fetchEmail();
  };

  const handleRegenerate = async () => {
    await api(`/api/emails/${params.id}/regenerate`, { method: "POST" });
    await fetchEmail();
  };

  const handleIgnore = async () => {
    if (!confirm("Are you sure you want to ignore this email? No reply will be sent.")) return;
    setActionLoading("ignore");
    try {
      await api(`/api/emails/${params.id}/ignore`, { method: "POST" });
      await fetchEmail();
      toast.success("Email ignored");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to ignore");
    } finally {
      setActionLoading(null);
    }
  };

  const handleOwnerReply = async (reply: string) => {
    await api(`/api/emails/${params.id}/owner-reply`, {
      method: "POST",
      body: JSON.stringify({ reply }),
    });
    await fetchEmail();
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <section className="space-y-6">
        <LoadingState message="Loading email…" />
      </section>
    );
  }

  if (error || !email) {
    return (
      <section className="space-y-6">
        <ErrorState message={error || "Email not found"} onRetry={fetchEmail} />
      </section>
    );
  }

  const canAct = ["pending", "edited"].includes(email.status);
  const displayStatus = formatStatus(email.status);
  const draftText = email.editedResponse || email.draftResponse || "";

  return (
    <section className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <Button
            asChild
            variant="ghost"
            className="w-fit gap-2 px-0 hover:bg-transparent"
          >
            <Link href="/inbox">
              <ArrowLeft className="size-4" />
              Back to inbox
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Conversation detail
            </h1>
            <p className="text-sm text-muted-foreground">
              Review the original email, adjust the draft, and choose the next action.
            </p>
          </div>
        </div>

        {canAct && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleIgnore}
              disabled={!!actionLoading}
            >
              <X className="size-4" />
              {actionLoading === "ignore" ? "Ignoring…" : "Ignore"}
            </Button>
          </div>
        )}
      </div>

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <EmailDetail
            email={{
              customerName:
                email.customerName ||
                email.fromAddress?.split("@")[0] ||
                "Unknown",
              customerEmail: email.customerEmail || email.fromAddress || "",
              subject: email.subject || "(no subject)",
              category: email.category || "other",
              timeAgo:
                email.timeAgo ||
                new Date(email.createdAt).toLocaleString(),
              status: displayStatus,
              originalEmail:
                email.originalEmail
                || (email.bodyText && email.bodyText.trim())
                || (email.bodyHtml ? htmlToPlainText(email.bodyHtml) : "")
                || "",
            }}
          />

          {/* Thread view */}
          {email.thread && email.thread.length > 1 && (
            <ThreadView messages={email.thread} />
          )}

          {/* Order info */}
          {email.order && (
            <Card className="border border-border/70 shadow-sm">
              <CardHeader className="border-b">
                <CardTitle>Order info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Order
                  </p>
                  <p className="mt-1 font-medium">
                    {email.order.orderNumber || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Value
                  </p>
                  <p className="mt-1 font-medium">
                    {email.order.totalPrice || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Tracking
                  </p>
                  <p className="mt-1 font-medium">
                    {email.order.trackingStatus || "—"}
                  </p>
                </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {email.order?.shopifyLinks?.orderAdminUrl && (
                    <Button asChild size="sm" variant="outline" className="gap-1.5">
                      <a href={email.order.shopifyLinks.orderAdminUrl} target="_blank" rel="noreferrer noopener">
                        View in Shopify →
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  )}
                  {email.order?.shopifyLinks?.customerAdminUrl && (
                    <Button asChild size="sm" variant="outline" className="gap-1.5">
                      <a href={email.order.shopifyLinks.customerAdminUrl} target="_blank" rel="noreferrer noopener">
                        View customer →
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Draft editor / Action Required view */}
        <DraftEditor
          initialBody={draftText}
          status={email.status}
          kimNote={email.kimNote}
          onApprove={handleApprove}
          onEditAndSend={handleEditAndSend}
          onRegenerate={handleRegenerate}
          onOwnerReply={handleOwnerReply}
        />
      </div>
    </section>
  );
}
