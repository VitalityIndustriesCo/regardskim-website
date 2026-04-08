"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Inbox, Lock, Settings2, Store } from "lucide-react";
import { ConfirmPolicies } from "@/components/onboarding/steps/confirm-policies";
import { ConnectEmail } from "@/components/onboarding/steps/connect-email";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GmailLogo } from "@/components/ui/gmail-logo";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

type WizardState = {
  supportEmail: string | null;
  refundWindowDays: string;
  processingTime: string;
  returnAddress: string;
  signature: string;
  supportName: string;
  policies: Array<{ title: string; content: string }>;
};

type OnboardingStatusResponse = {
  success?: boolean;
  data?: {
    storeId?: string | null;
    onboardingCompleted?: boolean;
    steps?: {
      installApp?: { complete: boolean };
      connectGmail?: {
        complete: boolean;
        completedAt?: string | null;
        connectedEmail?: string | null;
        hasActiveGmailConnection?: boolean;
      };
      confirmPolicies?: {
        complete: boolean;
        completedAt?: string | null;
      };
    };
    allComplete?: boolean;
    currentStep?: "connectGmail" | "confirmPolicies" | "complete";
  };
};

type PolicyPrefillResponse = {
  success?: boolean;
  data?: {
    refundWindowDays?: number;
    processingTime?: string;
    returnAddress?: string;
    signature?: string;
    supportName?: string;
    policies?: Array<{ title: string; content: string }>;
  };
};

type StepId = "overview" | "connect-email" | "confirm-policies";

type OnboardingStatus = {
  storeId: string | null;
  gmailStepComplete: boolean;
  connectedEmail: string | null;
  hasActiveGmailConnection: boolean;
  policiesConfirmed: boolean;
  onboardingCompleted: boolean;
};

const initialState: WizardState = {
  supportEmail: null,
  refundWindowDays: "30",
  processingTime: "1-2 business days",
  returnAddress: "",
  signature: "Kind regards,\nKim",
  supportName: "Kim",
  policies: [],
};

function OnboardingContent() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<StepId>("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [status, setStatus] = useState<OnboardingStatus>({
    storeId: null,
    gmailStepComplete: false,
    connectedEmail: null,
    hasActiveGmailConnection: false,
    policiesConfirmed: false,
    onboardingCompleted: false,
  });
  const [state, setState] = useState<WizardState>(initialState);

  const refreshStatus = useCallback(async () => {
    setIsLoading(true);

    try {
      const [statusRes, policyRes] = await Promise.all([
        api<OnboardingStatusResponse>("/api/onboarding/status"),
        api<PolicyPrefillResponse>("/api/onboarding/policies").catch(() => null),
      ]);

      const nextStatus: OnboardingStatus = {
        storeId: statusRes?.data?.storeId || null,
        gmailStepComplete: Boolean(statusRes?.data?.steps?.connectGmail?.complete),
        connectedEmail: statusRes?.data?.steps?.connectGmail?.connectedEmail || null,
        hasActiveGmailConnection: Boolean(statusRes?.data?.steps?.connectGmail?.hasActiveGmailConnection),
        policiesConfirmed: Boolean(statusRes?.data?.steps?.confirmPolicies?.complete),
        onboardingCompleted: Boolean(statusRes?.data?.onboardingCompleted),
      };

      setStatus(nextStatus);
      setState((current) => ({
        ...current,
        supportEmail: nextStatus.connectedEmail || current.supportEmail,
        refundWindowDays: String(policyRes?.data?.refundWindowDays ?? current.refundWindowDays ?? 30),
        processingTime: policyRes?.data?.processingTime ?? current.processingTime,
        returnAddress: policyRes?.data?.returnAddress ?? current.returnAddress,
        signature: policyRes?.data?.signature ?? current.signature,
        supportName: policyRes?.data?.supportName ?? current.supportName,
        policies: policyRes?.data?.policies ?? current.policies,
      }));

      return nextStatus;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  const completedCount = useMemo(() => {
    return [true, status.gmailStepComplete, status.policiesConfirmed].filter(Boolean).length;
  }, [status.gmailStepComplete, status.policiesConfirmed]);

  const currentStepNumber = useMemo(() => {
    if (!status.gmailStepComplete) return 2;
    if (!status.policiesConfirmed) return 3;
    return 4;
  }, [status.gmailStepComplete, status.policiesConfirmed]);

  const updatePoliciesForm = useCallback(
    (nextValue: {
      refundWindowDays: string;
      processingTime: string;
      returnAddress: string;
      signature: string;
      supportName: string;
    }) => {
      setState((current) => ({ ...current, ...nextValue }));
    },
    [],
  );

  const openStep = (step: StepId) => {
    setActiveView(step);
  };

  const completeAndReturn = async () => {
    await refreshStatus();
    setActiveView("overview");
  };

  const handleFinish = async () => {
    setIsFinishing(true);
    try {
      await api("/api/onboarding/complete", { method: "POST" });
      window.dispatchEvent(new CustomEvent("app:onboarding-completed"));
      router.push("/inbox");
    } finally {
      setIsFinishing(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: "Install RegardsKim",
      subtitle: "You’ve installed Kim on your Shopify store.",
      icon: Store,
      state: "completed" as const,
      onClick: undefined,
      cta: undefined,
    },
    {
      number: 2,
      title: "Connect your email",
      subtitle: "Connect your Gmail so Kim can read customer emails and draft replies.",
      icon: GmailLogo,
      state: status.gmailStepComplete ? ("completed" as const) : currentStepNumber === 2 ? ("active" as const) : ("locked" as const),
      onClick: currentStepNumber === 2 ? () => openStep("connect-email") : undefined,
      cta: status.gmailStepComplete ? undefined : "Start",
    },
    {
      number: 3,
      title: "Confirm your store policies",
      subtitle: "Review your shipping times, return policy, and reply settings.",
      icon: Settings2,
      state: status.policiesConfirmed ? ("completed" as const) : currentStepNumber === 3 ? ("active" as const) : ("locked" as const),
      onClick: currentStepNumber === 3 ? () => openStep("confirm-policies") : undefined,
      cta: status.policiesConfirmed ? undefined : status.gmailStepComplete ? "Continue" : undefined,
    },
    {
      number: 4,
      title: "Go to your inbox",
      subtitle: "See Kim’s drafted replies and start approving them.",
      icon: Inbox,
      state: currentStepNumber === 4 ? ("active" as const) : ("locked" as const),
      onClick: currentStepNumber === 4 ? () => void handleFinish() : undefined,
      cta: currentStepNumber === 4 ? "Open inbox" : undefined,
    },
  ];

  if (activeView === "connect-email") {
    return (
      <main className="min-h-screen bg-[#FFF8F3] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
          <Button
            type="button"
            variant="ghost"
            className="w-fit text-[#1A1A1A] hover:bg-white/70"
            onClick={() => setActiveView("overview")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to overview
          </Button>

          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#1A1A1A]/45">Step 2</p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A]">Connect your email</h1>
            <p className="max-w-2xl text-sm text-[#1A1A1A]/65">
              Connect your Gmail so Kim can read customer emails and draft replies for approval.
            </p>
          </div>

          <ConnectEmail storeId={status.storeId} />
        </div>
      </main>
    );
  }

  if (activeView === "confirm-policies") {
    return (
      <main className="min-h-screen bg-[#FFF8F3] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <Button
            type="button"
            variant="ghost"
            className="w-fit text-[#1A1A1A] hover:bg-white/70"
            onClick={() => setActiveView("overview")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to overview
          </Button>

          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#1A1A1A]/45">Step 3</p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A]">Confirm your store policies</h1>
            <p className="max-w-2xl text-sm text-[#1A1A1A]/65">
              Review the core details Kim uses when drafting replies so customers get accurate answers.
            </p>
          </div>

          <ConfirmPolicies
            value={{
              refundWindowDays: state.refundWindowDays,
              processingTime: state.processingTime,
              returnAddress: state.returnAddress,
              signature: state.signature,
              supportName: state.supportName,
            }}
            policies={state.policies}
            onChange={updatePoliciesForm}
            onPoliciesLoaded={(policies) => setState((current) => ({ ...current, policies }))}
            onConfirmed={() => {
              void completeAndReturn();
            }}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#1A1A1A]/45">Onboarding</p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">Get started with Kim</h1>
            <p className="max-w-2xl text-sm text-[#1A1A1A]/65 sm:text-base">
              Complete these steps to start handling your customer emails.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step) => {
            const isCompleted = step.state === "completed";
            const isActive = step.state === "active";
            const isLocked = step.state === "locked";
            const Icon = step.icon;
            const Wrapper = step.onClick ? "button" : "div";

            return (
              <Wrapper
                key={step.number}
                {...(step.onClick
                  ? {
                      type: "button",
                      onClick: step.onClick,
                    }
                  : {})}
                className={cn(
                  "block w-full text-left transition-transform duration-150",
                  step.onClick ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default",
                )}
              >
                <Card
                  className={cn(
                    "border bg-white py-0 shadow-sm transition-colors",
                    isCompleted && "border-emerald-500/25 bg-emerald-50/70",
                    isActive && "border-[#E85D3A]/25 ring-1 ring-[#E85D3A]/10",
                    isLocked && "border-[#1A1A1A]/10 opacity-60",
                  )}
                >
                  <CardContent className="flex items-center gap-4 p-4 sm:gap-5 sm:p-5">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white",
                        isCompleted && "bg-emerald-500",
                        isActive && "bg-[#E85D3A]",
                        isLocked && "bg-[#D9D3CD] text-[#6B675F]",
                      )}
                    >
                      {isCompleted ? <Check className="h-5 w-5" /> : isLocked ? <Lock className="h-4 w-4" /> : step.number}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold text-[#1A1A1A]">{step.title}</h2>
                        {isCompleted && (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            Complete
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#1A1A1A]/65">{step.subtitle}</p>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                      {step.cta ? (
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium",
                            isActive ? "bg-[#E85D3A] text-white" : "bg-[#1A1A1A]/6 text-[#1A1A1A]/60",
                          )}
                        >
                          {step.cta}
                          {isActive ? <ChevronRight className="ml-1 h-4 w-4" /> : null}
                        </span>
                      ) : null}

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF8F3] text-[#E85D3A] ring-1 ring-[#1A1A1A]/8">
                        {step.icon === GmailLogo ? (
                          <GmailLogo className="h-6 w-6" imageClassName="h-6 w-6" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Wrapper>
            );
          })}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#1A1A1A]/10 bg-white/70 px-4 py-3 text-sm text-[#1A1A1A]/70">
          <span>{completedCount} of 4 complete</span>
          {isLoading ? (
            <span>Refreshing status…</span>
          ) : (
            <span>
              {status.gmailStepComplete
                ? "Gmail confirmed"
                : status.hasActiveGmailConnection
                  ? "Gmail connected — confirm it in setup"
                  : "Waiting on Gmail"}
            </span>
          )}
        </div>

        {currentStepNumber === 4 ? (
          <div className="rounded-2xl border border-[#E85D3A]/15 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#1A1A1A]">Everything’s ready</h2>
                <p className="text-sm text-[#1A1A1A]/65">
                  Open your inbox to review Kim’s drafted replies and start approving them.
                </p>
              </div>
              <Button className="bg-[#E85D3A] text-white hover:bg-[#d34f2f]" onClick={() => void handleFinish()} disabled={isFinishing}>
                {isFinishing ? "Opening…" : "Go to inbox"}
              </Button>
            </div>
          </div>
        ) : null}

        <p className="text-center text-xs text-[#1A1A1A]/45">
          Need to adjust something later? You can always update settings from your app once setup is done.{" "}
          <Link href="/settings" className="underline underline-offset-4">
            Open settings
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return <OnboardingContent />;
}
