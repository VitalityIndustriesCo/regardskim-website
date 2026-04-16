"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCheck,
  Edit3,
  RefreshCw,
  RotateCcw,
  Send,
  TriangleAlert,
} from "lucide-react";

type DraftEditorProps = {
  initialBody: string;
  status: string;
  kimNote?: string | null;
  onApprove: () => Promise<void>;
  onEditAndSend: (editedResponse: string) => Promise<void>;
  onRegenerate: () => Promise<void>;
  onOwnerReply?: (reply: string) => Promise<void>;
};

export function DraftEditor({
  initialBody,
  status,
  kimNote,
  onApprove,
  onEditAndSend,
  onRegenerate,
  onOwnerReply,
}: DraftEditorProps) {
  const [body, setBody] = useState(initialBody);
  const [ownerReply, setOwnerReply] = useState(initialBody);
  const [loading, setLoading] = useState<string | null>(null);

  const isEdited = body !== initialBody;
  const canAct = ["pending", "edited"].includes(status);
  const isActionRequired = status === "action_required";

  const resetDraft = () => setBody(initialBody);

  const handleApprove = async () => {
    setLoading("approve");
    try {
      await onApprove();
      toast.success("Email approved & queued for sending");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Approve failed");
    } finally {
      setLoading(null);
    }
  };

  const handleEditAndSend = async () => {
    setLoading("edit");
    try {
      await onEditAndSend(body);
      toast.success("Edited email queued for sending");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Edit & send failed");
    } finally {
      setLoading(null);
    }
  };

  const handleRegenerate = async () => {
    setLoading("regenerate");
    try {
      await onRegenerate();
      toast.success("Draft regenerated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Regenerate failed");
    } finally {
      setLoading(null);
    }
  };

  const handleOwnerReply = async () => {
    if (!ownerReply.trim() || !onOwnerReply) return;
    setLoading("owner-reply");
    try {
      await onOwnerReply(ownerReply);
      toast.success("Reply sent");
      setOwnerReply("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setLoading(null);
    }
  };

  // ── Action Required view ─────────────────────────────────────────────────
  if (isActionRequired) {
    return (
      <Card className="h-full border border-orange-200 shadow-sm dark:border-orange-900/50">
        <CardHeader className="border-b border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/40">
          <div className="flex items-center gap-2">
            <TriangleAlert className="size-5 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-orange-700 dark:text-orange-300">
              Action Required
            </CardTitle>
          </div>
          <CardDescription className="text-orange-600/80 dark:text-orange-400/80">
            Regards Kim couldn&apos;t handle this one automatically. Please review, edit, and reply.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {/* Regards Kim note */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Regards Kim&apos;s note
            </Label>
            <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-4 text-sm dark:border-orange-900/40 dark:bg-orange-950/20">
              {kimNote || initialBody || "Regards Kim flagged this email for your attention but didn't leave a note."}
            </div>
          </div>

          {/* Owner reply */}
          <div className="space-y-2">
            <Label htmlFor="owner-reply">Your editable reply</Label>
            <Textarea
              id="owner-reply"
              value={ownerReply}
              onChange={(e) => setOwnerReply(e.target.value)}
              placeholder="Write your reply to the customer…"
              className="min-h-[200px] resize-none"
            />
          </div>

          <Button
            className="gap-2"
            onClick={handleOwnerReply}
            disabled={!ownerReply.trim() || !!loading}
          >
            <Send className="size-4" />
            {loading === "owner-reply" ? "Sending…" : "Send Reply"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Normal draft view ────────────────────────────────────────────────────
  return (
    <Card className="h-full border border-border/70 shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Reply draft</CardTitle>
        <CardDescription>
          {canAct
            ? "Edit the AI-generated response, then approve or send."
            : `This email has been ${status}.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="draft-body">Reply</Label>
          <Textarea
            id="draft-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="min-h-[320px] resize-none"
            disabled={!canAct}
          />
        </div>

        {canAct && (
          <div className="flex flex-wrap gap-2">
            {isEdited ? (
              <Button
                className="gap-2"
                onClick={handleEditAndSend}
                disabled={!!loading}
              >
                <Edit3 className="size-4" />
                {loading === "edit" ? "Sending…" : "Edit & Send"}
              </Button>
            ) : (
              <Button
                className="gap-2"
                onClick={handleApprove}
                disabled={!!loading}
              >
                <CheckCheck className="size-4" />
                {loading === "approve" ? "Approving…" : "Approve & Send"}
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleRegenerate}
              disabled={!!loading}
              className="gap-2"
            >
              <RefreshCw className={`size-4 ${loading === "regenerate" ? "animate-spin" : ""}`} />
              {loading === "regenerate" ? "Regenerating…" : "Regenerate"}
            </Button>

            {isEdited && (
              <Button
                variant="ghost"
                onClick={resetDraft}
                disabled={!!loading}
                className="gap-2"
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
