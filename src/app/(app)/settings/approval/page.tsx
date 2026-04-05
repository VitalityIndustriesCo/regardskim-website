"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApprovalSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Approval Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          All customer emails are drafted by Kim and shown in your inbox for
          approval. When Kim can&apos;t answer accurately or the customer needs
          an action (refund, order change, etc.), the email is flagged as
          &quot;Action Required&quot; for you to handle directly.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Auto-send settings will be available in a future update.
        </p>
      </CardContent>
    </Card>
  );
}
