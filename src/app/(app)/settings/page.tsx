"use client";

import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/shopify/app-link";
import { useAppAuth } from "@/components/auth/app-auth-provider";
import { SettingsNav, settingsItems } from "@/components/settings/settings-nav";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { resetOnboardingSeen } from "@/lib/onboarding";

const sections = settingsItems.filter((item) => item.href !== "/settings");

export default function SettingsPage() {
  const { store } = useAppAuth();

  const restartGuide = () => {
    resetOnboardingSeen((store?.id as string | null | undefined) || null);
    window.dispatchEvent(new CustomEvent("app:onboarding-restart"));
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure how Kim works for your store.
        </p>
      </div>

      <SettingsNav />

      <Card>
        <CardHeader>
          <CardTitle>Setup guide</CardTitle>
          <CardDescription>Need to run through setup again? Open the step-by-step onboarding guide.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={restartGuide} className="bg-[#E85D3A] hover:bg-[#d34f2f]">Open setup guide</Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.href}>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <section.icon className="h-5 w-5" />
              </div>
              <CardTitle>{section.label}</CardTitle>
              <CardDescription>
                {section.href === "/settings/agent" && "Set your agent's name and email signature."}
                {section.href === "/settings/policies" && "Keep shipping, refund, and policy rules in one place."}
                {section.href === "/settings/store" && "Update the store details used across support workflows."}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button asChild variant="outline" className="ml-auto">
                <AppLink href={section.href}>
                  Edit {section.label}
                  <ArrowRight className="h-4 w-4" />
                </AppLink>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
