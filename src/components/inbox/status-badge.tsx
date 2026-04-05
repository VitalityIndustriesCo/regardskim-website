import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type EmailStatus =
  | "Pending"
  | "Approved"
  | "Edited"
  | "Sent"
  | "Action Required"
  | "Read"
  | "Ignored"
  | "Send Failed";

const statusStyles: Record<EmailStatus, string> = {
  Pending:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300",
  Approved:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300",
  Edited:
    "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300",
  Sent: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300",
  "Action Required":
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-300",
  Read:
    "border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400",
  Ignored:
    "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
  "Send Failed":
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300",
};

/** Map raw DB status values to display labels */
export function formatStatus(raw: string): EmailStatus {
  const map: Record<string, EmailStatus> = {
    pending: "Pending",
    approved: "Approved",
    edited: "Edited",
    sent: "Sent",
    action_required: "Action Required",
    read: "Read",
    ignored: "Ignored",
    send_failed: "Send Failed",
  };
  return map[raw] ?? ("Pending" as EmailStatus);
}

export type { EmailStatus };

export function StatusBadge({ status }: { status: EmailStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-medium",
        statusStyles[status]
      )}
    >
      {status === "Action Required" && "⚠️ "}
      {status}
    </Badge>
  );
}
