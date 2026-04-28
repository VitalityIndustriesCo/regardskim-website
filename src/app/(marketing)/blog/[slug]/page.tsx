import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostLayout from "@/components/blog/BlogPostLayout";
import StructuredData from "@/components/seo/StructuredData";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { absoluteUrl, siteConfig } from "@/lib/seo";

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

  return (
    <>
      <StructuredData data={articleSchema} />
      <BlogPostLayout title={post.title} date={post.date} image={post.image}>
        {post.content}
      </BlogPostLayout>
    </>
  );
}
