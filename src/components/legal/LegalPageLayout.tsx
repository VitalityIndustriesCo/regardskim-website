import type { ReactNode } from "react";

export default function LegalPageLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-[720px]">
          <header className="border-b border-forest/10 pb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brass">Legal</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base text-slate">Last updated: {updatedAt}</p>
          </header>

          <article className="blog-prose mt-10 max-w-none text-slate">{children}</article>
        </div>
      </div>
    </main>
  );
}
