"use client";

import { useEffect, useState, useCallback } from "react";
import { EmailList } from "@/components/inbox/email-list";
import { type InboxEmail } from "@/components/inbox/email-row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Mail, ChevronLeft, ChevronRight } from "lucide-react";

export default function InboxPage() {
  const [emails, setEmails] = useState<InboxEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("all-statuses");
  const [limit, setLimit] = useState("20");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (status !== "all-statuses") params.set("status", status);
      params.set("limit", limit);
      params.set("offset", String((page - 1) * Number(limit)));
      const query = params.toString();
      const res = await api<{ success: boolean; data: InboxEmail[]; total?: number }>(
        `/api/emails${query ? `?${query}` : ""}`
      );
      setEmails(res.data);
      if (typeof res.total === "number") {
        setTotal(res.total);
      } else {
        // If API doesn't return total, estimate from data length
        setTotal(res.data.length < Number(limit) ? (page - 1) * Number(limit) + res.data.length : (page + 1) * Number(limit));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load emails");
    } finally {
      setLoading(false);
    }
  }, [status, limit, page]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [status, limit]);

  const hasMore = emails.length === Number(limit);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            📨 Inbox
          </h1>
          <p className="text-sm text-muted-foreground">
            Your support inbox — review, approve, and send.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-[170px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-statuses">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="edited">Edited</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="action_required">Action Required</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="ignored">Ignored</SelectItem>
              <SelectItem value="send_failed">Send Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={limit} onValueChange={setLimit}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
              <SelectItem value="100">100 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading emails…" />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchEmails} />
      ) : emails.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="All clear! 🌟"
          description="No emails waiting — Kim's keeping things tidy. New messages will pop up here when they arrive."
        />
      ) : (
        <>
          <EmailList emails={emails} onRefresh={fetchEmails} />

          {/* Pagination */}
          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * Number(limit) + 1}–{(page - 1) * Number(limit) + emails.length}
              {typeof total === "number" && total > 0 && ` of ${total}`}
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="gap-1"
              >
                <ChevronLeft className="size-4" />
                Prev
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasMore}
                className="gap-1"
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
