export default function AppStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        [data-nextjs-toast],
        nextjs-portal,
        [data-next-mark] { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
