import Link from "next/link";
import Image from "next/image";

import { blogPosts } from "@/lib/blog-posts";

export const metadata = {
  title: "Blog | RegardsKim",
  description: "Practical advice for Shopify store owners handling support, shipping questions, and growth.",
};

export default function BlogPage() {
  return (
    <main className="bg-cream py-16 sm:py-20">
      <section className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brass">Resources</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-forest sm:text-5xl">Blog</h1>
          <p className="mt-5 text-lg leading-8 text-slate sm:text-xl">
            Practical advice for Shopify store owners
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col rounded-[1.75rem] border border-forest/10 bg-white p-7 shadow-[0_18px_40px_rgba(26,26,26,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(26,26,26,0.08)]"
            >
              {post.image && (
                <div className="-mx-7 -mt-7 mb-5 overflow-hidden rounded-t-[1.75rem]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={768}
                    height={512}
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate">{post.date}</p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-forest">
                <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-brass">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-4 flex-1 text-base leading-7 text-slate">{post.meta}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-8 inline-flex items-center text-sm font-medium text-brass transition-colors hover:text-oxblood"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
