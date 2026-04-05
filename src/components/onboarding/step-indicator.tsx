type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  label?: string;
};

export function StepIndicator({
  currentStep,
  totalSteps,
  label = "Onboarding",
}: StepIndicatorProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Step {currentStep} of {totalSteps}
          </h1>
          <p className="text-sm text-muted-foreground">
            Connect your integrations, wire up inbox access, and make sure Kim sounds right.
          </p>
        </div>
        <div className="hidden rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground sm:block">
          {currentStep}/{totalSteps}
        </div>
      </div>
    </div>
  );
}
