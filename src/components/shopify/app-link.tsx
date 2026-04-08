"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";
import { useEmbeddedApp } from "@/components/shopify/embedded-app-provider";
import { buildEmbeddedAppPath } from "@/lib/shopify-app-bridge";

type AppLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function AppLink({ children, href, className, onClick, ...props }: AppLinkProps) {
  const router = useRouter();
  const { embedded, navigate } = useEmbeddedApp();
  const hrefString = typeof href === "string" ? href : href.pathname || "/";
  const destination = embedded ? buildEmbeddedAppPath(hrefString) : hrefString;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (!embedded) {
      return;
    }

    event.preventDefault();
    navigate(destination);
    router.push(destination);
  };

  return (
    <Link {...props} href={destination} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

type ExternalAppLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  newContext?: boolean;
};

export function ExternalAppLink({ href, children, className, newContext = true }: ExternalAppLinkProps) {
  const { embedded, redirect } = useEmbeddedApp();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!embedded) return;

    event.preventDefault();
    redirect(href, newContext);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
}
