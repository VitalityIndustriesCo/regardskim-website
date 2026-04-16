"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function GoToInbox() {
  return (
    <div className="mx-auto max-w-lg">
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">You&apos;re all set!</h2>
            <p className="text-muted-foreground">
              Regards Kim is already pulling your emails and drafting replies. By the time you finish
              reading this, there might already be drafts waiting.
            </p>
          </div>

          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/inbox">
              Open your inbox
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
