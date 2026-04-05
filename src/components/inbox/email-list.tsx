"use client";

import { useState } from "react";
import { type InboxEmail } from "@/components/inbox/email-row";
import { TriageCard } from "@/components/inbox/triage-card";
import { BatchToolbar } from "@/components/inbox/batch-toolbar";

type EmailListProps = {
  emails: InboxEmail[];
  onRefresh?: () => void;
};

export function EmailList({ emails, onRefresh }: EmailListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedIdSet = new Set(selectedIds);

  const toggleOne = (emailId: string, checked: boolean) => {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(emailId) ? current : [...current, emailId];
      }
      return current.filter((id) => id !== emailId);
    });
  };

  const handleBulkComplete = () => {
    setSelectedIds([]);
    onRefresh?.();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleActionComplete = (emailId: string, _newStatus: string) => {
    setSelectedIds((current) => current.filter((id) => id !== emailId));
  };

  return (
    <div className="space-y-4">
      <BatchToolbar selectedIds={selectedIds} onComplete={handleBulkComplete} />

      <div className="space-y-3">
        {emails.map((email) => (
          <TriageCard
            key={email.id}
            email={email}
            checked={selectedIdSet.has(email.id)}
            onCheckedChange={(checked) => toggleOne(email.id, checked)}
            onActionComplete={handleActionComplete}
          />
        ))}
      </div>
    </div>
  );
}
