"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ConfirmPolicies } from "@/components/onboarding/steps/confirm-policies";
import { ConnectEmail } from "@/components/onboarding/steps/connect-email";
import { GoToInbox } from "@/components/onboarding/steps/go-to-inbox";
import { WizardShell } from "@/components/onboarding/wizard-shell";

type WizardState = {
  supportEmail: string | null;
  refundWindowDays: string;
  processingTime: string;
  returnAddress: string;
  signature: string;
  supportName: string;
  policies: Array<{ title: string; content: string }>;
};

const TOTAL_STEPS = 3;

const stepCopy = {
  1: {
    title: "Connect your support inbox",
    description:
      "Connect your email provider to finish setup. Kim needs inbox access before she can start helping your customers.",
  },
  2: {
    title: "Confirm policy details",
    description:
      "We’ve pre-filled the essentials from your Shopify integration. Give everything a quick review so Kim replies with the right policy details.",
  },
  3: {
    title: "You're ready to go!",
    description:
      "Your account is set up and connected. Head to your inbox to review and send customer replies.",
  },
} as const;

function OnboardingContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<WizardState>({
    supportEmail: null,
    refundWindowDays: "30",
    processingTime: "1-2 business days",
    returnAddress: "",
    signature: "Kind regards,\nKim",
    supportName: "Kim",
    policies: [],
  });

  useEffect(() => {
    const step = Number(searchParams.get("step"));
    const supportEmail = searchParams.get("email");

    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
    }

    if (supportEmail) {
      setState((current) => ({ ...current, supportEmail }));
    }
  }, [searchParams]);

  const copy = useMemo(() => stepCopy[currentStep as keyof typeof stepCopy], [currentStep]);

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
    []
  );

  const handleNext = () => {
    setCurrentStep((current) => Math.min(current + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setCurrentStep((current) => Math.max(current - 1, 1));
  };

  const nextDisabled = currentStep === 1 && !state.supportEmail;

  return (
    <WizardShell
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      title={copy.title}
      description={copy.description}
      onBack={currentStep > 1 ? handleBack : undefined}
      onNext={currentStep === 1 ? handleNext : undefined}
      isNextDisabled={nextDisabled}
      nextLabel="Next: confirm policies"
      hideFooter={currentStep >= 2}
    >
      {currentStep === 1 ? (
        <ConnectEmail
          connectedEmail={state.supportEmail}
          onConnected={(supportEmail) => {
            setState((current) => ({ ...current, supportEmail }));
            setCurrentStep(2);
          }}
        />
      ) : null}

      {currentStep === 2 ? (
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
          onConfirmed={() => setCurrentStep(3)}
        />
      ) : null}

      {currentStep === 3 ? <GoToInbox /> : null}
    </WizardShell>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-24 text-muted-foreground">Loading…</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
