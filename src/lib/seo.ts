import type { Metadata } from "next";

export const siteConfig = {
  name: "RegardsKim",
  url: "https://regardskim.com",
  description: "AI email replies for Shopify support, drafted from real order context and reviewed before sending",
  ogImage: "/logo/kim-og-logo.jpg",
  price: "$49/mo",
  foundingPrice: "$49/mo founding offer",
} as const;

export function absoluteUrl(path = "") {
  return new URL(path || "/", siteConfig.url).toString();
}

export function marketingMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  languages,
  locale = "en_AU",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  languages?: Record<string, string>;
  locale?: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl(image),
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
