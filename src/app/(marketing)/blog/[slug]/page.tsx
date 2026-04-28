import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostLayout from "@/components/blog/BlogPostLayout";
import StructuredData from "@/components/seo/StructuredData";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { absoluteUrl, siteConfig } from "@/lib/seo";

const relatedPostsMap: Record<string, string[]> = {
  "best-shopify-customer-service-apps-2026": [
    "automate-shopify-support-emails",
    "true-cost-of-shopify-customer-support",
    "ai-vs-virtual-assistant-ecommerce-support",
  ],
  "automate-shopify-support-emails": [
    "reduce-where-is-my-order-emails",
    "scale-customer-support-without-hiring",
    "true-cost-of-shopify-customer-support",
  ],
  "ai-vs-virtual-assistant-ecommerce-support": [
    "true-cost-of-shopify-customer-support",
    "scale-customer-support-without-hiring",
    "automate-shopify-support-emails",
  ],
  "true-cost-of-shopify-customer-support": [
    "automate-shopify-support-emails",
    "ai-vs-virtual-assistant-ecommerce-support",
    "scale-customer-support-without-hiring",
  ],
  "chatgpt-shopping-shopify-store": [
    "ai-storefront-post-sale-support",
    "automate-shopify-support-emails",
    "true-cost-of-shopify-customer-support",
  ],
  "ai-storefront-post-sale-support": [
    "chatgpt-shopping-shopify-store",
    "automate-shopify-support-emails",
    "why-kim-is-different",
  ],
  "customer-support-solo-shopify-founder": [
    "reduce-where-is-my-order-emails",
    "scale-customer-support-without-hiring",
    "automate-shopify-support-emails",
  ],
  "reduce-where-is-my-order-emails": [
    "automate-shopify-support-emails",
    "customer-support-solo-shopify-founder",
    "scale-customer-support-without-hiring",
  ],
  "scale-customer-support-without-hiring": [
    "customer-support-solo-shopify-founder",
    "automate-shopify-support-emails",
    "true-cost-of-shopify-customer-support",
  ],
  "why-kim-is-different": [
    "best-shopify-customer-service-apps-2026",
    "automate-shopify-support-emails",
    "ai-storefront-post-sale-support",
  ],
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPost(slug);

    if (!post) {
      return {
        title: "Blog | RegardsKim",
      };
    }

    return {
      title: post.title,
      description: post.meta,
      alternates: {
        canonical: absoluteUrl(`/blog/${post.slug}`),
      },
      openGraph: {
        title: post.title,
        description: post.meta,
        url: absoluteUrl(`/blog/${post.slug}`),
        siteName: siteConfig.name,
        type: "article",
        publishedTime: post.date,
        images: post.image
          ? [
              {
                url: absoluteUrl(post.image),
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.meta,
        images: post.image ? [absoluteUrl(post.image)] : undefined,
      },
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    description: post.meta,
    image: post.image ? [absoluteUrl(post.image)] : undefined,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo/rk-mark.svg"),
      },
    },
  };

  const relatedPosts = (relatedPostsMap[post.slug] ?? [])
    .map((relatedSlug) => getBlogPost(relatedSlug))
    .filter((relatedPost) => Boolean(relatedPost && relatedPost.slug !== post.slug))
    .slice(0, 3);

  return (
    <>
      <StructuredData data={articleSchema} />
      <BlogPostLayout title={post.title} date={post.date} image={post.image}>
        {post.content}

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-slate/15 pt-12">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate">Related posts</p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">Keep reading</h2>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost!.slug}
                  className="rounded-[1.5rem] border border-slate/10 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate">{relatedPost!.date}</p>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{relatedPost!.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{relatedPost!.meta}</p>
                  <a
                    href={`/blog/${relatedPost!.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-brass transition-colors hover:text-oxblood"
                  >
                    Read post →
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}
      </BlogPostLayout>
    </>
  );
}
