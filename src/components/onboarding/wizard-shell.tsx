import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type WizardShellProps = {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
  isNextLoading?: boolean;
  hideFooter?: boolean;
};

export function WizardShell({
  currentStep,
  totalSteps,
  title,
  description,
  children,
  onBack,
  onNext,
  nextLabel = currentStep === totalSteps ? "Finish" : "Next",
  backLabel = "Back",
  isNextDisabled,
  isNextLoading,
  hideFooter = false,
}: WizardShellProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Almost there — one clean setup pass and Kim is ready.</p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="space-y-8 p-6 sm:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
              <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
            </div>

            <div>{children}</div>

            {!hideFooter ? (
              <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={!onBack}
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {backLabel}
                </Button>

                <Button
                  type="button"
                  onClick={onNext}
                  disabled={isNextDisabled || !onNext}
                  className="w-full sm:w-auto"
                >
                  {isNextLoading ? "Saving..." : nextLabel}
                  {!isNextLoading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
