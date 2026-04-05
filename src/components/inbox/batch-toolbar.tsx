"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCheck, XCircle } from "lucide-react";
import { api } from "@/lib/api";

type BatchToolbarProps = {
  selectedIds: string[];
  onComplete: () => void;
};

export function BatchToolbar({ selectedIds, onComplete }: BatchToolbarProps) {
  const [loading, setLoading] = useState<string | null>(null);

  if (selectedIds.length === 0) return null;

  const handleBulkApprove = async () => {
    setLoading("approve");
    try {
      const res = await api<{ success: boolean; data: { approved: number } }>(
        "/api/emails/bulk-approve",
        { method: "POST", body: JSON.stringify({ emailIds: selectedIds }) }
      );
      toast.success(`Approved & queued ${res.data.approved} email(s) for sending`);
      onComplete();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk approve failed");
    } finally {
      setLoading(null);
    }
  };

  const handleBulkIgnore = async () => {
    setLoading("ignore");
    try {
      const res = await api<{ success: boolean; data: { ignored: number } }>(
        "/api/emails/bulk-ignore",
        { method: "POST", body: JSON.stringify({ emailIds: selectedIds }) }
      );
      toast.success(`Ignored ${res.data.ignored} email(s)`);
      onComplete();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Bulk ignore failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium">
          {selectedIds.length} conversation{selectedIds.length !== 1 ? "s" : ""} selected
        </p>
        <p className="text-sm text-muted-foreground">
          Run a bulk action on the selected pending replies.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className="gap-2"
          onClick={handleBulkApprove}
          disabled={!!loading}
        >
          <CheckCheck className="size-4" />
          {loading === "approve" ? "Approving…" : "Approve & Send All"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-2"
          onClick={handleBulkIgnore}
          disabled={!!loading}
        >
          <XCircle className="size-4" />
          {loading === "ignore" ? "Ignoring…" : "Ignore All"}
        </Button>
      </div>
    </div>
  );
}
