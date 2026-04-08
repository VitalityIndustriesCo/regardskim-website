"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buildEmbeddedAppPath } from "@/lib/shopify-app-bridge";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    router.replace(buildEmbeddedAppPath(query ? `/inbox?${query}` : "/inbox"));
  }, [router, searchParams]);

  return null;
}
