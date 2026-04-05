"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge, formatStatus } from "@/components/inbox/status-badge";

/** Shape returned by the API (raw DB record + joined order) */
export type InboxEmail = {
  id: string;
  storeId: string;
  threadId?: string | null;
  direction: string;
  fromAddress: string | null;
  toAddress: string | null;
  subject: string | null;
  bodyText: string | null;
  bodyHtml: string | null;
  category: string | null;
  confidence: number | null;
  priority: string | null;
  sentiment: string | null;
  draftResponse: string | null;
  draftModel: string | null;
  editedResponse: string | null;
  status: string;
  sentAt: string | null;
  kimNote: string | null;
  messageId: string | null;
  inReplyTo: string | null;
  createdAt: string;
  updatedAt: string;
  order?: {
    orderNumber: string;
    totalPrice: string;
    trackingStatus: string | null;
    shopifyOrderId?: string;
    shopifyLinks?: {
      orderAdminUrl?: string | null;
      customerAdminUrl?: string | null;
    };
  } | null;
  thread?: InboxEmail[];

  // Legacy display fields (kept for backwards compat with detail page)
  customerName?: string;
  customerEmail?: string;
  preview?: string;
  timeAgo?: string;
  orderNumber?: string;
  orderValue?: string;
  orderDate?: string;
  originalEmail?: string;
  draftReply?: string;
};

type EmailRowProps = {
  email: InboxEmail;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
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

export function EmailRow({ email, checked, onCheckedChange }: EmailRowProps) {
  const displayName = email.customerName || email.fromAddress?.split("@")[0] || "Unknown";
  const displayEmail = email.customerEmail || email.fromAddress || "";
  const preview = email.preview || email.bodyText?.substring(0, 120) || "";
  const received = email.timeAgo || timeAgo(email.createdAt);
  const displayStatus = formatStatus(email.status);

  return (
    <TableRow data-state={checked ? "selected" : undefined}>
      <TableCell className="w-10">
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(Boolean(value))}
        />
      </TableCell>
      <TableCell>
        <div className="flex min-w-0 flex-col gap-0.5 whitespace-normal">
          <Link
            href={`/inbox/${email.id}`}
            className="font-medium text-foreground transition-colors hover:text-primary"
          >
            {displayName}
          </Link>
          <span className="text-xs text-muted-foreground">{displayEmail}</span>
        </div>
      </TableCell>
      <TableCell className="max-w-[300px]">
        <div className="space-y-1 whitespace-normal">
          <Link
            href={`/inbox/${email.id}`}
            className="line-clamp-1 font-medium text-foreground transition-colors hover:text-primary"
          >
            {email.subject}
          </Link>
          <p className="line-clamp-1 text-xs text-muted-foreground">{preview}</p>
        </div>
      </TableCell>

      <TableCell className="text-xs text-muted-foreground">{received}</TableCell>
      <TableCell>
        <StatusBadge status={displayStatus} />
      </TableCell>
    </TableRow>
  );
}
