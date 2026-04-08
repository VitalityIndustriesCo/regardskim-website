import { getShopifySessionToken, isShopifyEmbedded } from "@/lib/shopify-app-bridge";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://regardskim-app-production.up.railway.app";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function getAuthHeaders(
  headers: Record<string, string> = {}
): Promise<Record<string, string>> {
  const nextHeaders = { ...headers };

  if (typeof window === "undefined") {
    return nextHeaders;
  }

  if (isShopifyEmbedded()) {
    const sessionToken = await getShopifySessionToken();
    if (sessionToken) {
      nextHeaders.Authorization = `Bearer ${sessionToken}`;
    }
    return nextHeaders;
  }

  const token = localStorage.getItem("token");
  if (token) {
    nextHeaders.Authorization = `Bearer ${token}`;
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

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: await getAuthHeaders(headers),
  });

  if (res.status === 401) {
    if (typeof window !== "undefined" && !isShopifyEmbedded()) {
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; max-age=0; samesite=lax";
      window.location.href = "/login";
    }
    throw new ApiError(401, "Unauthorized");
  }

  if (res.status === 402 && typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("app:billing-required"));
  }

  if (!res.ok) {
    const body = await res.text();
    throw new ApiError(res.status, body || "Request failed");
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
