"use client";

declare global {
  interface Window {
    shopify?: {
      idToken(): Promise<string>;
      toast?: {
        show(message: string, options?: { isError?: boolean }): void;
      };
    };
  }
}

const HOST_STORAGE_KEY = "shopify-host";
const ID_TOKEN_STORAGE_KEY = "shopify-id-token";

function readHostFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("host");
}

export function getEmbeddedHost(): string | null {
  if (typeof window === "undefined") return null;

  const hostFromUrl = readHostFromUrl();
  if (hostFromUrl) {
    window.sessionStorage.setItem(HOST_STORAGE_KEY, hostFromUrl);
    return hostFromUrl;
  }

  return window.sessionStorage.getItem(HOST_STORAGE_KEY);
}

export function isShopifyEmbedded(): boolean {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  if (params.get("embedded") === "1") return true;
  if (params.has("host")) return true;

  // Check for new App Bridge presence or iframe context
  if (typeof window.shopify !== "undefined") return true;

  return window.self !== window.top && Boolean(getEmbeddedHost());
}

/**
 * Get a Shopify session token using the new App Bridge (window.shopify).
 * The CDN script at https://cdn.shopify.com/shopifycloud/app-bridge.js
 * injects window.shopify automatically when the app is embedded.
 */
export function storeIdToken(token: string) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(ID_TOKEN_STORAGE_KEY, token);
  }
}

export function getStoredIdToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(ID_TOKEN_STORAGE_KEY);
}

export async function getShopifySessionToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  // Try App Bridge first
  if (window.shopify) {
    try {
      return await window.shopify.idToken();
    } catch {
      // Fall through to stored token
    }
  }

  // Fall back to stored id_token from URL
  return getStoredIdToken();
}

/**
 * Redirect to a remote URL.
 * newContext=true opens in a new tab; false breaks out of the iframe.
 */
export function redirectToRemote(url: string, newContext = true) {
  if (newContext) {
    window.open(url, "_blank");
  } else {
    window.open(url, "_top");
  }
}

/**
 * Navigate within the embedded app.
 * New App Bridge automatically syncs the iframe URL — just use the
 * browser history API and let Next.js router handle the rest.
 */
export function redirectToAppPath(path: string) {
  if (typeof window !== "undefined") {
    window.history.pushState(null, "", path);
  }
}
