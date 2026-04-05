"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge, formatStatus } from "@/components/inbox/status-badge";
import { type InboxEmail } from "@/components/inbox/email-row";
import { api } from "@/lib/api";
import { Check, Pencil, SkipForward, Send, X, AlertTriangle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type TriageCardProps = {
  email: InboxEmail;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onActionComplete: (emailId: string, newStatus: string) => void;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

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

export function TriageCard({ email, checked, onCheckedChange, onActionComplete }: TriageCardProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(email.editedResponse || email.draftResponse || "");
  const [ownerReply, setOwnerReply] = useState(email.editedResponse || email.draftResponse || "");
  const [loading, setLoading] = useState<string | null>(null);
  const [actionTaken, setActionTaken] = useState<string | null>(null);

  const displayName = email.customerName || email.fromAddress?.split("@")[0] || "Unknown";
  const displayEmail = email.customerEmail || email.fromAddress || "";
  const received = email.timeAgo || timeAgo(email.createdAt);
  const displayStatus = formatStatus(email.status);
  const originalEmailText = (email.bodyText && email.bodyText.trim())
    || (email.bodyHtml ? htmlToPlainText(email.bodyHtml) : "")
    || email.preview
    || "";
  const draftText = email.editedResponse || email.draftResponse || "";
  const isActionRequired = email.status === "action_required";
  const isPending = email.status === "pending";
  const isRead = email.status === "read";
  const isTerminalStatus = ["approved", "sent", "ignored", "send_failed", "read"].includes(email.status);
  const isDone = !!actionTaken || isTerminalStatus;

  const handleApprove = async () => {
    setLoading("approve");
    try {
      await api(`/api/emails/${email.id}/approve`, { method: "POST" });
      setActionTaken("approved");
      onActionComplete(email.id, "approved");
      toast.success("Approved & queued for sending");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Approve failed");
    } finally {
      setLoading(null);
    }
  };

  const handleSaveAndSend = async () => {
    setLoading("edit");
    try {
      await api(`/api/emails/${email.id}/edit`, {
        method: "POST",
        body: JSON.stringify({ editedResponse: editText }),
      });
      setActionTaken("edited");
      setEditing(false);
      onActionComplete(email.id, "edited");
      toast.success("Edited & queued for sending");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Edit failed");
    } finally {
      setLoading(null);
    }
  };

  const handleOwnerReply = async () => {
    if (!ownerReply.trim()) return;
    setLoading("owner-reply");
    try {
      await api(`/api/emails/${email.id}/owner-reply`, {
        method: "POST",
        body: JSON.stringify({ reply: ownerReply }),
      });
      setActionTaken("replied");
      onActionComplete(email.id, "edited");
      toast.success("Reply sent");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setLoading(null);
    }
  };

  const handleSkip = async () => {
    setLoading("skip");
    try {
      await api(`/api/emails/${email.id}/ignore`, { method: "POST" });
      setActionTaken("ignored");
      onActionComplete(email.id, "ignored");
      toast.success("Skipped");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Skip failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card
      className={cn(
        "border border-border/70 shadow-sm transition-all duration-300",
        isRead && "opacity-60 bg-muted/20",
        isDone && !isRead && "opacity-50"
      )}
    >
      <CardContent className="p-0">
        {/* Main content: email left, draft right */}
        <div className="flex flex-col lg:flex-row">
          {/* Left: customer email (40%) */}
          <div className="border-b p-4 lg:w-[40%] lg:border-b-0 lg:border-r">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/inbox/${email.id}`}
                  className="font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {displayName}
                </Link>
                <p className="truncate text-xs text-muted-foreground">{displayEmail}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <StatusBadge status={displayStatus} />
              </div>
            </div>

            <Link
              href={`/inbox/${email.id}`}
              className="mb-2 line-clamp-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {email.subject}
            </Link>

            <p className="text-xs text-muted-foreground">{received}</p>

            {email.order && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    Order #{email.order.orderNumber}
                  </Badge>
                  {email.order.trackingStatus && (
                    <Badge variant="outline" className="text-[10px]">
                      {email.order.trackingStatus}
                    </Badge>
                  )}
                </div>

                {isActionRequired && (
                  <div className="flex flex-wrap gap-2">
                    {email.order.shopifyLinks?.orderAdminUrl && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1.5 border-amber-300 bg-amber-50 px-2.5 text-xs text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
                      >
                        <a href={email.order.shopifyLinks.orderAdminUrl} target="_blank" rel="noreferrer noopener">
                          View in Shopify →
                          <ExternalLink className="size-3" />
                        </a>
                      </Button>
                    )}

                    {email.order.shopifyLinks?.customerAdminUrl && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1.5 border-amber-300 bg-amber-50 px-2.5 text-xs text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
                      >
                        <a href={email.order.shopifyLinks.customerAdminUrl} target="_blank" rel="noreferrer noopener">
                          View customer →
                          <ExternalLink className="size-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 max-h-56 overflow-y-auto rounded-md border border-border/60 bg-muted/20 p-3 text-sm leading-relaxed text-muted-foreground">
              {originalEmailText ? (
                originalEmailText.split("\n").map((line, i) => (
                  <p key={i}>{line || "\u00A0"}</p>
                ))
              ) : (
                <p className="italic text-muted-foreground">No email body found.</p>
              )}
            </div>
          </div>

          {/* Right: Kim's draft or note (60%) */}
          <div className="flex-1 p-4">
            {isRead ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground italic">
                  {email.kimNote || "No action needed"}
                </p>
              </div>
            ) : isActionRequired ? (
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-300">
                  <AlertTriangle className="size-4" />
                  Kim&apos;s Note
                </div>
                <p className="text-sm leading-relaxed text-orange-800 dark:text-orange-200">
                  {email.kimNote || "This email needs your attention — Kim couldn't draft a response."}
                </p>
                {!email.draftResponse && !email.editedResponse && (
                  <p className="mt-2 text-xs italic text-orange-700/80 dark:text-orange-300/80">
                    No draft was generated — write your reply below.
                  </p>
                )}
                {!actionTaken && (
                  <div className="mt-3 space-y-2">
                    <Textarea
                      value={ownerReply}
                      onChange={(e) => setOwnerReply(e.target.value)}
                      placeholder="Write your reply to the customer…"
                      className="min-h-[100px] border-orange-200 bg-white text-sm dark:border-orange-900/40 dark:bg-orange-950/20"
                    />
                    <Button
                      size="sm"
                      onClick={handleOwnerReply}
                      disabled={!ownerReply.trim() || !!loading}
                      className="gap-1.5"
                    >
                      <Send className="size-3.5" />
                      {loading === "owner-reply" ? "Sending…" : "Send Reply"}
                    </Button>
                  </div>
                )}
              </div>
            ) : editing ? (
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground">Edit Draft Response</p>
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="min-h-[160px] text-sm"
                  autoFocus
                />
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Kim&apos;s Draft Response</p>
                <div className="max-h-[200px] overflow-y-auto text-sm leading-relaxed text-foreground">
                  {draftText ? (
                    draftText.split("\n").map((line, i) => (
                      <p key={i}>{line || "\u00A0"}</p>
                    ))
                  ) : email.kimNote ? (
                    <div className="rounded-md border border-muted bg-muted/40 p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Kim&apos;s note
                      </p>
                      <p className="mt-1 text-sm text-foreground">{email.kimNote}</p>
                    </div>
                  ) : (
                    <p className="italic text-muted-foreground">No draft available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom: actions */}
        {!isRead && <div className="flex flex-wrap items-center justify-end gap-2 border-t bg-muted/30 px-4 py-2.5">
          {actionTaken ? (
            <Badge variant="outline" className="text-xs">
              {actionTaken === "approved" && "✅ Approved"}
              {actionTaken === "edited" && "✏️ Edited & Sent"}
              {actionTaken === "ignored" && "⏭️ Skipped"}
              {actionTaken === "replied" && "✉️ Reply Sent"}
            </Badge>
          ) : isPending ? (
            <div className="flex flex-wrap items-center gap-2">
              {editing ? (
                <>
                  <Button
                    size="sm"
                    onClick={handleSaveAndSend}
                    disabled={!!loading || !editText.trim()}
                    className="gap-1.5"
                  >
                    <Send className="size-3.5" />
                    {loading === "edit" ? "Saving…" : "Save & Send"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditing(false);
                      setEditText(draftText);
                    }}
                    disabled={!!loading}
                    className="gap-1.5"
                  >
                    <X className="size-3.5" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSkip}
                    disabled={!!loading}
                    className="gap-1.5 border-2 border-border"
                  >
                    <SkipForward className="size-3.5" />
                    {loading === "skip" ? "Skipping…" : "Skip"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(true)}
                    disabled={!!loading}
                    className="gap-1.5 border-2 border-border"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Button>
                  <div
                    className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-border bg-background px-3 py-1.5 transition-colors hover:bg-accent"
                    onClick={() => onCheckedChange(!checked)}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) => onCheckedChange(Boolean(value))}
                      disabled={isDone}
                      className="size-5 border-2 border-foreground/60 data-[state=checked]:border-primary"
                    />
                    <span className="text-sm font-medium">Select</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleApprove}
                    disabled={!!loading || !draftText}
                    className="gap-1.5"
                  >
                    <Check className="size-3.5" />
                    {loading === "approve" ? "Approving…" : "Approve"}
                  </Button>
                </>
              )}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">
              {displayStatus}
            </span>
          )}
        </div>}
      </CardContent>
    </Card>
  );
}
