import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export default function BlogPostLayout({
  title,
  date,
  image,
  children,
}: {
  title: string;
  date: string;
  image?: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-brass transition-colors hover:text-oxblood"
          >
            ← Back to blog
          </Link>

          {image && (
            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={title}
                width={1536}
                height={1024}
                className="w-full object-cover"
              />
            </div>
          )}

          <header className="mt-8 border-b border-forest/10 pb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate">{date}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
              {title}
            </h1>
          </header>

          <article className="blog-prose mt-10 max-w-none text-slate">
            {children}
          </article>

          <section className="mt-16 rounded-[2rem] border border-brass/15 bg-cream/45 px-6 py-8 sm:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate">Next step</p>
            <h2 className="mt-3 text-2xl font-semibold text-forest sm:text-3xl">
              Ready to spend less time on support emails?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate">
              See how Kim helps Shopify stores handle repetitive customer emails without losing the human touch.
            </p>
            <Link href="/signup" className="btn-primary mt-6">
              Get started
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
