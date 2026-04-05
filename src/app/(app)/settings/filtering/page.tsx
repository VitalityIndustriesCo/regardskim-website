"use client";

import { SettingsNav } from "@/components/settings/settings-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function FilteringSettingsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Filtering</h1>
        <p className="text-sm text-muted-foreground">
          Email filtering and classification settings.
        </p>
      </div>

      <SettingsNav />

      <Card>
        <CardHeader>
          <CardTitle>Automatic classification</CardTitle>
          <CardDescription>Kim handles email filtering automatically.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/40">
            <Info className="mt-0.5 size-5 shrink-0 text-blue-600 dark:text-blue-400" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-blue-700 dark:text-blue-300">
                No manual configuration needed
              </p>
              <p className="text-blue-600/80 dark:text-blue-400/80">
                Kim automatically classifies incoming emails as customer inquiries or non-customer messages.
                Non-customer emails (newsletters, marketing, automated notifications) are filtered out automatically.
                There&apos;s no need to maintain whitelists or blacklists.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
