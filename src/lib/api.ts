import { getShopifySessionToken, getStoredIdToken, waitForShopifySessionToken } from "@/lib/shopify-app-bridge";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://regardskim-app-production.up.railway.app";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function getAuthHeaders(
  headers: Record<string, string> = {},
  forceFresh = false,
): Promise<Record<string, string>> {
  const nextHeaders = { ...headers };

  if (typeof window === "undefined") {
    return nextHeaders;
  }

  const sessionToken = forceFresh
    ? (typeof window !== "undefined" && window.shopify
        ? await window.shopify.idToken().catch(() => getStoredIdToken())
        : await waitForShopifySessionToken())
    : await waitForShopifySessionToken();

  if (sessionToken) {
    nextHeaders.Authorization = `Bearer ${sessionToken}`;
  }

  return nextHeaders;
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  };

  const doFetch = async (forceFreshAuth = false) => {
    try {
      return await fetch(`${API_URL}${path}`, {
        ...options,
        headers: await getAuthHeaders(headers, forceFreshAuth),
      });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        0,
        "We couldn’t reach RegardsKim right now. Please try again in a moment.",
      );
    }
  };

  let res = await doFetch();

  if (res.status === 401) {
    res = await doFetch(true);
  }

  if (res.status === 401) {
    throw new ApiError(401, "Your Shopify session expired. Please reopen RegardsKim from Shopify Admin and try again.");
  }

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = (await res.json().catch(() => null)) as { error?: string; message?: string } | null;
      throw new ApiError(res.status, body?.message || body?.error || "Request failed");
    }

    throw new ApiError(res.status, "Request failed");
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
