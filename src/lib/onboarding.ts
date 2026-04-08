export const onboardingStorageKey = (storeId?: string | null) =>
  `regardskim.hasSeenOnboarding:${storeId || "unknown"}`;

export function hasSeenOnboarding(storeId?: string | null): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(onboardingStorageKey(storeId)) === "true";
}

export function markOnboardingSeen(storeId?: string | null) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(onboardingStorageKey(storeId), "true");
}

export function resetOnboardingSeen(storeId?: string | null) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(onboardingStorageKey(storeId));
}
