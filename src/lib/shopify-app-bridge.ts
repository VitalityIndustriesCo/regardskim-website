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
const TOKEN_EXPIRY_BUFFER_MS = 5_000;

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

export function buildEmbeddedAppPath(path: string): string {
  if (typeof window === "undefined") return path;

  const url = new URL(path, window.location.origin);
  const currentParams = new URLSearchParams(window.location.search);
  const host = getEmbeddedHost();

  if (host && !url.searchParams.has("host")) {
    url.searchParams.set("host", host);
  }

  if (currentParams.get("embedded") === "1" && !url.searchParams.has("embedded")) {
    url.searchParams.set("embedded", "1");
  }

  const shop = currentParams.get("shop");
  if (shop && !url.searchParams.has("shop")) {
    url.searchParams.set("shop", shop);
  }

  return `${url.pathname}${url.search}${url.hash}`;
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
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const json = window.atob(padded);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function isIdTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  const exp = typeof payload?.exp === "number" ? payload.exp : null;

  if (!exp) {
    return true;
  }

  return exp * 1000 <= Date.now() + TOKEN_EXPIRY_BUFFER_MS;
}

export function storeIdToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  if (isIdTokenExpired(token)) {
    clearStoredIdToken();
    return;
  }

  window.sessionStorage.setItem(ID_TOKEN_STORAGE_KEY, token);
}

export function getStoredIdToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = window.sessionStorage.getItem(ID_TOKEN_STORAGE_KEY);
  if (!token) {
    return null;
  }

  if (isIdTokenExpired(token)) {
    clearStoredIdToken();
    return null;
  }

  return token;
}

export function clearStoredIdToken() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(ID_TOKEN_STORAGE_KEY);
  }
}

export async function waitForShopifyBridge(timeoutMs = 5000): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (window.shopify) return true;

  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (window.shopify) {
      return true;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 150));
  }

  return false;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export async function getFreshShopifySessionToken(timeoutMs = 5000): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const bridgeReady = await waitForShopifyBridge(timeoutMs);
  if (!bridgeReady || !window.shopify) {
    return getStoredIdToken();
  }

  try {
    // window.shopify.idToken() can hang indefinitely (known App Bridge issue)
    // so we add a timeout to prevent blocking forever
    const token = await withTimeout(window.shopify.idToken(), 3000);
    if (token && !isIdTokenExpired(token)) {
      storeIdToken(token);
      return token;
    }
  } catch {
    // Fall through to a still-valid stored token only if App Bridge could not provide one.
  }

  return getStoredIdToken();
}

export async function getShopifySessionToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  return getFreshShopifySessionToken(1000);
}

export async function waitForShopifySessionToken(timeoutMs = 5000): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const token = await getFreshShopifySessionToken(250);
    if (token) {
      return token;
    }

    const storedToken = getStoredIdToken();
    if (storedToken) {
      return storedToken;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 150));
  }

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
    window.history.pushState(null, "", buildEmbeddedAppPath(path));
  }
}
