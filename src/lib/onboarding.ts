export type SetupState = "needsSubscription" | "needsGmail" | "needsPolicies" | "ready";

export type OnboardingStepStatus = {
  complete: boolean;
  completedAt?: string | null;
};

export type OnboardingStatusResponse = {
  success?: boolean;
  data?: {
    storeId?: string | null;
    setupState?: SetupState;
    onboardingCompleted?: boolean;
    onboardingCompletedAt?: string | null;
    allComplete?: boolean;
    currentStep?: "subscription" | "connectGmail" | "confirmPolicies" | "complete";
    steps?: {
      installApp?: { complete: boolean };
      subscription?: {
        complete: boolean;
        exempt?: boolean;
        reason?: string | null;
        status?: string | null;
        shopifySubscriptionId?: string | null;
        subscription?: {
          id?: string | null;
          status?: string | null;
          test?: boolean;
          currentPeriodEnd?: string | null;
        } | null;
      };
      connectGmail?: {
        complete: boolean;
        completedAt?: string | null;
        connectedEmail?: string | null;
        hasActiveGmailConnection?: boolean;
      };
      confirmPolicies?: OnboardingStepStatus;
    };
  };
};
