"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import InboxDemo from "@/components/ui/InboxDemo";

const DASHBOARD_URL = "https://dashboard-three-indol-14.vercel.app";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 40, y: 45 });

  return (
    <section
      id="top"
      className="paper-grain overflow-hidden py-16 md:py-24"
      onMouseMove={(e) => {
        if (prefersReducedMotion) return;
        const r = e.currentTarget.getBoundingClientRect();
        setPointer({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: prefersReducedMotion
            ? "none"
            : `radial-gradient(480px circle at ${pointer.x}% ${pointer.y}%, rgba(233,124,107,0.18), transparent 50%)`,
        }}
      />

      <div className="section-shell relative grid items-center gap-14 md:grid-cols-2">
        <FadeIn>
          <p className="mb-5 inline-flex rounded-full border border-warm-taupe/40 bg-off-white-paper px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-ink-navy/70">
            Trusted by growing Shopify stores
          </p>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Post-purchase emails, handled.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-navy/85 md:text-xl">
            RegardsKim helps Shopify stores stay on top of order updates, tracking questions, returns, refunds, and exchanges — with polished draft replies ready for approval in Gmail.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <motion.a whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.98 }} href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-coral">
              Start with Kim
            </motion.a>
            <motion.a whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.98 }} href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              See how it works
            </motion.a>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-ink-navy/75">
            <li>• Connect Shopify and Gmail</li>
            <li>• Review draft replies before they send</li>
            <li>• From order questions to returns, Kim keeps things tidy</li>
          </ul>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="relative">
            <motion.div
              className="halftone-dots absolute -right-7 -top-8 h-28 w-28 rounded-full opacity-40"
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], x: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <InboxDemo />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
