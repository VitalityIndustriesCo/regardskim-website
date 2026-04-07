"use client";

import createApp, { type ClientApplication } from "@shopify/app-bridge";
import { Redirect, SessionToken } from "@shopify/app-bridge/actions";

const SHOPIFY_API_KEY = "327e4daf19a338e5b04707172c2b39bc";
const HOST_STORAGE_KEY = "shopify-host";

type ShopifyWindow = Window & {
  __REGARDSKIM_APP_BRIDGE__?: ClientApplication;
};

function getShopifyWindow(): ShopifyWindow | null {
  if (typeof window === "undefined") return null;
  return window as ShopifyWindow;
}

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

  return window.self !== window.top && Boolean(getEmbeddedHost());
}

export function getShopifyApp(): ClientApplication | null {
  const shopifyWindow = getShopifyWindow();
  const host = getEmbeddedHost();

  if (!shopifyWindow || !host) return null;
  if (shopifyWindow.__REGARDSKIM_APP_BRIDGE__) {
    return shopifyWindow.__REGARDSKIM_APP_BRIDGE__;
  }

  shopifyWindow.__REGARDSKIM_APP_BRIDGE__ = createApp({
    apiKey: SHOPIFY_API_KEY,
    host,
    forceRedirect: true,
  });

  return shopifyWindow.__REGARDSKIM_APP_BRIDGE__;
}

export async function getShopifySessionToken(): Promise<string | null> {
  const app = getShopifyApp();
  if (!app) return null;

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = app.subscribe(SessionToken.Action.RESPOND, (payload) => {
      unsubscribe();

      const token = payload?.sessionToken;
      if (typeof token === "string" && token.length > 0) {
        resolve(token);
        return;
      }

      reject(new Error("Shopify session token was not returned."));
    });

    app.dispatch(SessionToken.request());
  });
}

export function redirectToRemote(url: string, newContext = true) {
  const app = getShopifyApp();

  if (!app) {
    window.location.assign(url);
    return;
  }

  const redirect = Redirect.create(app);
  redirect.dispatch(Redirect.Action.REMOTE, { url, newContext });
}

export function redirectToAppPath(path: string) {
  const app = getShopifyApp();

  if (!app) {
    window.location.assign(path);
    return;
  }

  const redirect = Redirect.create(app);
  redirect.dispatch(Redirect.Action.APP, path);
}
