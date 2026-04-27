"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SignupForm() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      router.push("/login?registered=true");
      router.refresh();
    }, 150);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate">RegardsKim</p>
          <h1 className="mt-3 text-3xl font-bold text-ink">Start your free trial</h1>
          <p className="mt-2 text-sm text-slate">7-day free trial • No credit card required</p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate/12 bg-cream p-6 shadow-[0_4px_20px_rgba(0,0,0,0.07)] sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="storeName">Store name</Label>
              <Input
                id="storeName"
                type="text"
                autoComplete="organization"
                placeholder="Your store name"
                value={storeName}
                onChange={(event) => setStoreName(event.target.value)}
                className="h-11 rounded-xl"
                required
              />
            </div>
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
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 rounded-xl"
                required
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-full bg-brass text-white shadow-[0_8px_24px_rgba(232,93,58,0.25)] hover:bg-[#D04E2E]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brass transition-colors hover:text-[#D04E2E]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
