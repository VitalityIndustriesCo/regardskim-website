"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/api";
import { setToken } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type LoginResponse = {
  token?: string;
  jwt?: string;
  accessToken?: string;
};

type LoginFormProps = {
  redirectTo: string;
};

function getErrorMessage(payload: unknown, fallback: string) {
  if (typeof payload === "string" && payload.trim()) return payload;
  if (payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" && payload.error.trim()) return payload.error;
  if (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string" && payload.message.trim()) return payload.message;
  return fallback;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let payload: unknown = null;
        try { payload = await response.json(); } catch { payload = await response.text(); }
        throw new Error(getErrorMessage(payload, "Invalid email or password."));
      }

      const data = (await response.json()) as LoginResponse;
      const token = data.token || data.jwt || data.accessToken;

      if (!token) throw new Error("Login response did not include a token.");

      setToken(token);
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate">RegardsKim</p>
          <h1 className="mt-3 text-3xl font-bold text-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-slate">Sign in to your RegardsKim account.</p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate/12 bg-[#0F1B2E] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.07)] sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 rounded-xl"
                required
              />
            </div>

            {error ? (
              <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              className="h-11 w-full rounded-full bg-brass text-white shadow-[0_8px_24px_rgba(232,93,58,0.25)] hover:bg-[#D04E2E]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-brass transition-colors hover:text-[#D04E2E]">
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
