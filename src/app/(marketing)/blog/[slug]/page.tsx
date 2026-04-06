import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

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
      title: `${post.title} | RegardsKim`,
      description: post.meta,
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

  return (
    <BlogPostLayout title={post.title} date={post.date} image={post.image}>
      {post.content}
    </BlogPostLayout>
  );
}
