export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // App Bridge meta + CDN script are in root layout (src/app/layout.tsx)
  return <>{children}</>;
}
