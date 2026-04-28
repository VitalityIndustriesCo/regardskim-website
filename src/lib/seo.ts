import type { Metadata } from "next";

export const siteConfig = {
  name: "RegardsKim",
  url: "https://regardskim.com",
  description: "AI email customer support for Shopify stores",
  ogImage: "/logo/kim-og-logo.jpg",
  price: "$49/mo",
  foundingPrice: "$24.50/mo forever",
} as const;

export function absoluteUrl(path = "") {
  return new URL(path || "/", siteConfig.url).toString();
}

export function marketingMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
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
      locale: "en_AU",
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
