"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { InboxEmail } from "@/components/inbox/email-row";

type ThreadViewProps = {
  messages: InboxEmail[];
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ThreadView({ messages }: ThreadViewProps) {
  if (messages.length <= 1) return null;

  return (
    <Card className="border border-border/70 shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>Conversation thread ({messages.length} messages)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0 divide-y">
        {messages.map((msg) => {
          const isInbound = msg.direction === "inbound";
          return (
            <div key={msg.id} className="py-4 first:pt-2 last:pb-2">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                {isInbound ? (
                  <ArrowDownLeft className="size-3.5 text-blue-500" />
                ) : (
                  <ArrowUpRight className="size-3.5 text-emerald-500" />
                )}
                <span className="font-medium">
                  {isInbound ? msg.fromAddress : "You"}
                </span>
                <span>·</span>
                <span>{formatDate(msg.createdAt)}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {isInbound
                  ? msg.bodyText?.substring(0, 500)
                  : msg.editedResponse || msg.draftResponse || msg.bodyText?.substring(0, 500)}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
