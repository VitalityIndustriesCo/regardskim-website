"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Mail, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onClose: () => void;
}

type FormState = {
  name: string;
  email: string;
  storeUrl: string;
  monthlyOrders: string;
  message: string;
  website: string;
};

const SUPPORT_EMAIL = "support@regardskim.com";
const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  storeUrl: "",
  monthlyOrders: "",
  message: "",
  website: "",
};

function buildMailto(form: FormState) {
  const subject = encodeURIComponent("RegardsKim website enquiry");
  const body = encodeURIComponent(
    [
      "New website enquiry",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Store URL: ${form.storeUrl || "Not provided"}`,
      `Monthly order volume: ${form.monthlyOrders || "Not provided"}`,
      "",
      "Message:",
      form.message || "Not provided",
    ].join("\n")
  );

  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

export function SalesChatPanel({ onClose }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const mailtoHref = useMemo(() => buildMailto(form), [form]);
  const canSubmit = form.name.trim() && form.email.trim();

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status === "error") {
      setStatus("idle");
      setError("");
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || status === "submitting") return;

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/sales-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        if (response.status === 503) {
          window.location.href = mailtoHref;
          throw new Error("Email delivery is not configured yet, so we opened a prefilled email instead.");
        }
        throw new Error(data?.error || "Could not send your details.");
      }

      setStatus("sent");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send your details.");
    }
  };

  return (
    <Card className="fixed inset-x-3 bottom-3 z-50 flex h-auto max-h-[calc(100vh-1.5rem)] w-auto max-w-none flex-col overflow-hidden border border-forest/10 bg-paper shadow-[0_24px_60px_rgba(26,26,26,0.16)] dark:bg-[#202739] sm:right-4 sm:bottom-20 sm:left-auto sm:w-[400px] sm:max-w-[calc(100vw-2rem)]">
      <CardHeader className="border-b border-forest/10 bg-paper px-4 pb-3 dark:bg-[#202739] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-sm font-semibold text-ink">Contact RegardsKim</CardTitle>
            <p className="text-xs text-slate">Send a few details and we will reply by email</p>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close contact form">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="overflow-y-auto px-4 py-4 sm:px-6">
        {status === "sent" ? (
          <div className="space-y-4 py-2">
            <div className="flex items-start gap-3 rounded-lg border border-brass/20 bg-brass/10 p-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
              <div>
                <p className="text-sm font-semibold text-ink">Details sent</p>
                <p className="mt-1 text-sm leading-relaxed text-slate">
                  Thanks - this has gone to {SUPPORT_EMAIL}. We will get back to you shortly.
                </p>
              </div>
            </div>
            <Button
              type="button"
              onClick={onClose}
              className="h-10 w-full rounded-full bg-brass text-white hover:bg-oxblood"
            >
              Done
            </Button>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={submit}>
            <div className="grid gap-2">
              <Label htmlFor="sales-contact-name">Name</Label>
              <Input
                id="sales-contact-name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="h-10 border-forest/15 bg-paper"
                required
                maxLength={120}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sales-contact-email">Email</Label>
              <Input
                id="sales-contact-email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="h-10 border-forest/15 bg-paper"
                required
                maxLength={254}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sales-contact-store">Store URL</Label>
              <Input
                id="sales-contact-store"
                value={form.storeUrl}
                onChange={(event) => updateField("storeUrl", event.target.value)}
                placeholder="yourstore.com"
                autoComplete="url"
                className="h-10 border-forest/15 bg-paper"
                maxLength={180}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sales-contact-orders">Monthly orders</Label>
              <Input
                id="sales-contact-orders"
                value={form.monthlyOrders}
                onChange={(event) => updateField("monthlyOrders", event.target.value)}
                placeholder="e.g. 500"
                inputMode="numeric"
                className="h-10 border-forest/15 bg-paper"
                maxLength={40}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sales-contact-message">What can we help with?</Label>
              <Textarea
                id="sales-contact-message"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Pricing, setup, Gmail, Shopify install..."
                className="min-h-24 resize-none border-forest/15 bg-paper"
                maxLength={1200}
              />
            </div>

            <input
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
              aria-hidden="true"
            />

            {status === "error" ? (
              <div className="rounded-lg border border-oxblood/20 bg-oxblood/10 p-3 text-xs leading-relaxed text-oxblood">
                {error} You can also email us directly at{" "}
                <a className="font-semibold underline" href={mailtoHref}>
                  {SUPPORT_EMAIL}
                </a>
                .
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={!canSubmit || status === "submitting"}
              className="h-11 w-full rounded-full bg-brass text-white hover:bg-oxblood"
            >
              {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              Send details
            </Button>

            <p className="text-center text-[11px] leading-relaxed text-slate">
              Goes to {SUPPORT_EMAIL}. No chatbot, just enough context to reply properly.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
