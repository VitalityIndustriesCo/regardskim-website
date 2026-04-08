"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Bot, CheckCircle2, Mail, Send, Settings2, Store } from "lucide-react";
import { API_URL, api } from "@/lib/api";
import { markOnboardingSeen } from "@/lib/onboarding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StoreData = {
  id?: string;
  shopName?: string;
  shippingTime?: string;
  shippingPolicy?: string;
  shippingPolicyUrl?: string;
  refundPolicy?: string;
  refundPolicyUrl?: string;
  returnPolicyUrl?: string;
  [key: string]: unknown;
};

type GmailStatus = {
  connected: boolean;
  email?: string;
  expired: boolean;
};

const cardStyle = "border-[#1A1A1A]/10 bg-white";

export function OnboardingGuide({ initialStoreId }: { initialStoreId?: string | null }) {
  const router = useRouter();
  const [store, setStore] = useState<StoreData | null>(null);
  const [storeId, setStoreId] = useState<string | null>(initialStoreId || null);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  const fetchStatus = useCallback(async () => {
    try {
      const [storeRes, gmailRes] = await Promise.all([
        api<{ success: boolean; data: StoreData }>("/api/store"),
        api<{ success: boolean; data: GmailStatus }>("/api/gmail/status").catch(() => null),
      ]);

      setStore(storeRes.data);
      setStoreId(storeRes.data.id || initialStoreId || null);

      const gmailOk = Boolean(gmailRes?.data?.connected && !gmailRes?.data?.expired);
      setGmailConnected(gmailOk);
      setStep(gmailOk ? 2 : 1);
    } catch {
      setStep(1);
    } finally {
      setLoading(false);
    }
  }, [initialStoreId]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      fetchStatus();
    }, 3000);

    return () => window.clearInterval(interval);
  }, [fetchStatus]);

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const connectGmail = () => {
    if (!storeId) return;
    window.open(`${API_URL}/auth/gmail/connect?storeId=${storeId}`, "_top");
  };

  const finishOnboarding = () => {
    markOnboardingSeen(storeId || store?.id);
    window.dispatchEvent(new CustomEvent("app:onboarding-completed"));
    router.push("/inbox");
  };

  const openSettings = () => {
    markOnboardingSeen(storeId || store?.id);
    window.dispatchEvent(new CustomEvent("app:onboarding-completed"));
    router.push("/settings");
  };

  const shippingTime = String(store?.shippingTime || "Not set yet");
  const returnPolicyUrl = String(
    store?.returnPolicyUrl || store?.refundPolicyUrl || store?.shippingPolicyUrl || "Not set yet"
  );

  return (
    <div className="min-h-screen bg-[#FFF8F3] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Card className={cardStyle}>
          <CardHeader>
            <div className="flex items-center justify-between text-sm text-[#1A1A1A]/70">
              <span>Step {step} of 3</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-[#1A1A1A]/10">
              <div className="h-2 rounded-full bg-[#E85D3A] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-3 flex gap-2">
              {[1, 2, 3].map((dot) => (
                <span key={dot} className={`h-2.5 w-2.5 rounded-full ${dot <= step ? "bg-[#E85D3A]" : "bg-[#1A1A1A]/15"}`} />
              ))}
            </div>
          </CardHeader>
        </Card>

        {step === 1 && (
          <Card className={cardStyle}>
            <CardHeader>
              <CardTitle className="text-2xl text-[#1A1A1A]">Connect your email</CardTitle>
              <p className="text-sm text-[#1A1A1A]/70">
                Kim reads your incoming customer emails and drafts replies for you. Connect your Gmail so Kim can get started.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-4 rounded-xl bg-[#FFF8F3] p-6">
                <div className="rounded-xl bg-white p-4 shadow-sm"><Mail className="h-8 w-8 text-[#E85D3A]" /></div>
                <ArrowRight className="h-6 w-6 text-[#1A1A1A]/40" />
                <div className="rounded-xl bg-white p-4 shadow-sm"><Bot className="h-8 w-8 text-[#E85D3A]" /></div>
              </div>

              <div className="space-y-3">
                <Button onClick={connectGmail} disabled={loading || !storeId} className="bg-[#E85D3A] hover:bg-[#d34f2f]">
                  Connect Gmail
                </Button>
                <p className="text-xs text-[#1A1A1A]/60">We only read customer emails. Kim never sends anything without your approval.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className={cardStyle}>
            <CardHeader>
              <CardTitle className="text-2xl text-[#1A1A1A]">Tell Kim about your store</CardTitle>
              <p className="text-sm text-[#1A1A1A]/70">
                Kim uses your shipping times, return policy, and store details to write accurate replies. The more Kim knows, the better the answers.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-center rounded-xl bg-[#FFF8F3] p-5">
                <div className="flex items-center gap-3 text-[#E85D3A]"><Store className="h-7 w-7" /><Settings2 className="h-7 w-7" /></div>
              </div>

              <div className="grid gap-3 rounded-xl border border-[#1A1A1A]/10 p-4 text-sm">
                <div><span className="font-medium text-[#1A1A1A]">Store name:</span> <span className="text-[#1A1A1A]/70">{store?.shopName || "Not set yet"}</span></div>
                <div><span className="font-medium text-[#1A1A1A]">Shipping time:</span> <span className="text-[#1A1A1A]/70">{shippingTime}</span></div>
                <div><span className="font-medium text-[#1A1A1A]">Return policy URL:</span> <span className="text-[#1A1A1A]/70 break-all">{returnPolicyUrl}</span></div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={openSettings} variant="outline">Edit in settings</Button>
                <Button
                  onClick={() => setStep(3)}
                  className="bg-[#E85D3A] hover:bg-[#d34f2f]"
                  disabled={!gmailConnected}
                >
                  Looks good
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className={cardStyle}>
            <CardHeader>
              <CardTitle className="text-2xl text-[#1A1A1A]">You’re ready to go</CardTitle>
              <p className="text-sm text-[#1A1A1A]/70">
                Next time a customer emails you, Kim will read it, draft a reply using your store data, and wait for you to approve it. You&apos;re always in control.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2 rounded-xl bg-[#FFF8F3] p-4 text-sm md:grid-cols-4">
                <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-3"><Mail className="h-4 w-4 text-[#E85D3A]" /> Email arrives</div>
                <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-3"><Bot className="h-4 w-4 text-[#E85D3A]" /> Kim drafts</div>
                <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-3"><CheckCircle2 className="h-4 w-4 text-[#E85D3A]" /> You approve</div>
                <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-3"><Send className="h-4 w-4 text-[#E85D3A]" /> Reply sends</div>
              </div>

              <Button onClick={finishOnboarding} className="bg-[#E85D3A] hover:bg-[#d34f2f]">
                Go to inbox
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
