"use client";

import Link from "next/link";
import { useState } from "react";

const tones = [
  "More Friendly",
  "More Professional",
  "More Apologetic",
  "More Concise",
  "More Empathetic",
] as const;

type ToneOption = (typeof tones)[number];

function normaliseSpacing(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();
}

function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function rewriteMessage(message: string, tone: ToneOption) {
  const trimmed = normaliseSpacing(message);
  if (!trimmed) return "";

  const sentences = splitSentences(trimmed);
  const firstSentence = sentences[0] ?? trimmed;

  switch (tone) {
    case "More Friendly":
      return [
        "Hi there,",
        "",
        `Thanks so much for your message. ${firstSentence.charAt(0).toUpperCase()}${firstSentence.slice(1)}`,
        ...sentences.slice(1),
        "",
        "If there is anything else you need, we are happy to help.",
        "",
        "Best,",
        "[Your Team]",
      ]
        .filter(Boolean)
        .join("\n");

    case "More Professional":
      return [
        "Hello,",
        "",
        trimmed
          .replace(/can’t/gi, "cannot")
          .replace(/can't/gi, "cannot")
          .replace(/won’t/gi, "will not")
          .replace(/won't/gi, "will not")
          .replace(/ASAP/gi, "as soon as possible"),
        "",
        "Kind regards,",
        "[Your Team]",
      ].join("\n");

    case "More Apologetic":
      return [
        "Hi,",
        "",
        "I am sorry for the frustration here.",
        trimmed,
        "",
        "We understand this is not ideal, and we appreciate the chance to help make it right.",
        "",
        "Sincerely,",
        "[Your Team]",
      ].join("\n");

    case "More Concise":
      return [
        "Hi,",
        "",
        sentences.slice(0, 2).join(" ") || trimmed,
        "",
        "Best,",
        "[Your Team]",
      ].join("\n");

    case "More Empathetic":
      return [
        "Hi,",
        "",
        "I understand why this would be frustrating.",
        trimmed,
        "",
        "Thank you for your patience while we work through it with you.",
        "",
        "Warm regards,",
        "[Your Team]",
      ].join("\n");

    default:
      return trimmed;
  }
}

const helperCopy: Record<ToneOption, string> = {
  "More Friendly": "Adds warmth, softens phrasing, and closes with a more welcoming tone.",
  "More Professional": "Tightens the language and makes the message feel more formal and polished.",
  "More Apologetic": "Adds a clearer apology and more ownership for a disappointing experience.",
  "More Concise": "Cuts the message down to the core point so it is easier to send fast.",
  "More Empathetic": "Acknowledges the customer feeling first, then keeps the response supportive.",
};

export default function AIToneRewriterClient() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<ToneOption>("More Friendly");
  const [output, setOutput] = useState("");

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[2rem] border border-slate/10 dark:border-slate/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="grid gap-6">
          <label className="block">
            <span className="text-sm font-medium text-ink">Paste the message you want to rewrite</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={9}
              placeholder="We can't refund this because your order is outside the return window..."
              className="mt-2 w-full rounded-[1.5rem] border border-slate/15 bg-mist dark:bg-[#2A3347] dark:border-slate/40 dark:text-white px-4 py-3 text-ink placeholder:text-slate/50 focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#2A3347] focus:outline-none focus:ring-2 focus:ring-brass/30"
            />
          </label>

          <label className="block max-w-sm">
            <span className="text-sm font-medium text-ink">Target tone</span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneOption)}
              className="mt-2 w-full rounded-2xl border border-slate/15 bg-mist dark:bg-[#2A3347] dark:border-slate/40 dark:text-white px-4 py-3 text-ink focus:border-brass focus:bg-white dark:bg-[#20283A] dark:focus:bg-[#2A3347] focus:outline-none focus:ring-2 focus:ring-brass/30"
            >
              {tones.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-[1.5rem] border border-brass/20 bg-[#FFF9F3] dark:bg-[#2A2520] dark:text-white/80 p-5 text-sm leading-7 text-slate">
            <p className="font-medium text-ink">What this rewrite does</p>
            <p className="mt-1">{helperCopy[tone]}</p>
          </div>

          <button
            type="button"
            onClick={() => setOutput(rewriteMessage(input, tone))}
            disabled={!input.trim()}
            className="btn-primary inline-flex w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Rewrite
          </button>
        </div>
      </section>

      <aside className="rounded-[2rem] border border-brass/20 bg-white dark:bg-[#20283A] p-8 shadow-[0_8px_32px_rgba(176,141,87,0.12)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate">Rewritten message</p>
        <div className="mt-5 rounded-[1.5rem] bg-[#FFF4E8] dark:bg-[#2A2520] dark:text-white/80 p-5">
          {output ? (
            <pre className="whitespace-pre-wrap font-sans text-base leading-7 text-ink">{output}</pre>
          ) : (
            <p className="text-base leading-7 text-slate">
              Paste a message and choose a target tone to generate a more polished version.
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-slate/10 dark:border-slate/20 pt-6">
          <Link href="/#install" className="text-sm font-semibold text-brass hover:text-oxblood">
            Regards Kim automatically matches the right tone for every customer →
          </Link>
        </div>
      </aside>
    </div>
  );
}
