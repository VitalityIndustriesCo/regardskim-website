import { StatusBadge, type EmailStatus } from "@/components/inbox/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export type EmailDetailData = {
  customerName: string;
  customerEmail: string;
  subject: string;
  category: string;
  timeAgo: string;
  status: EmailStatus;
  originalEmail: string;
};

export function EmailDetail({ email }: { email: EmailDetailData }) {
  return (
    <Card className="h-full min-h-0 border border-border/70 shadow-sm">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>{email.subject}</CardTitle>
            <CardDescription>
              From {email.customerName} · {email.customerEmail}
            </CardDescription>
          </div>
          <StatusBadge status={email.status} />
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-col space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{email.category}</span>
          <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{email.timeAgo}</span>
        </div>

        <Separator />

        <div className="h-[min(60vh,520px)] overflow-y-auto overscroll-contain pr-1">
          <div className="whitespace-pre-wrap break-words text-sm leading-6 text-foreground">
            {email.originalEmail}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
