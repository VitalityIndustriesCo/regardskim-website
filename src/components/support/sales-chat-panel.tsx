"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Loader2, SendHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SHOPIFY_APP_STORE_INSTALL_URL } from "@/lib/shopify-install";
import { cn } from "@/lib/utils";

type SalesChatRole = "user" | "assistant";

type SalesChatMessage = {
  id: string;
  role: SalesChatRole;
  content: string;
  actionLabel?: string;
  actionUrl?: string;
};

interface Props {
  onClose: () => void;
}

const MAX_MESSAGES = 20;
const UNKNOWN_REPLY =
  "I can help with pricing, setup, Shopify install, Gmail/Outlook, security, or what happens after install. If you want a human, leave your email and we’ll follow up.";
const EMAIL_PROMPT = "Want us to follow up? Leave your email.";
const EMAIL_CONFIRMATION = "Thanks — we’ll be in touch soon.";

const QUICK_QUESTIONS = [
  "How do I install on Shopify?",
  "What does it cost?",
  "How does setup work?",
  "Do I stay in control?",
];

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function buildReply(message: string): Omit<SalesChatMessage, "id" | "role"> & { needsEmailCapture: boolean } {
  const normalized = message.toLowerCase();

  if (includesAny(normalized, ["install", "shopify app", "app store", "get started", "start", "sign up", "signup"])) {
    return {
      content:
        "Install RegardsKim from the Shopify App Store, approve the Shopify connection, then connect your support inbox. After that, Regards Kim starts sorting customer emails and matching Shopify context.",
      actionLabel: "Install on Shopify",
      actionUrl: SHOPIFY_APP_STORE_INSTALL_URL,
      needsEmailCapture: false,
    };
  }

  if (includesAny(normalized, ["price", "pricing", "cost", "plan", "monthly", "subscription", "billing"])) {
    return {
      content: "$49/month with a 7-day free trial. Billing runs through Shopify, and you can cancel anytime.",
      actionLabel: "Install on Shopify",
      actionUrl: SHOPIFY_APP_STORE_INSTALL_URL,
      needsEmailCapture: false,
    };
  }

  if (includesAny(normalized, ["trial", "free trial", "credit card", "cancel"])) {
    return {
      content: "There’s a 7-day free trial. Billing is handled by Shopify, and you can cancel anytime from your Shopify admin.",
      actionLabel: "Start free trial",
      actionUrl: SHOPIFY_APP_STORE_INSTALL_URL,
      needsEmailCapture: false,
    };
  }

  if (includesAny(normalized, ["how it works", "how does it work", "works", "setup", "set up", "onboarding", "connect"])) {
    return {
      content:
        "Setup is simple: connect Shopify, connect Gmail or Outlook, and confirm your store policies. RegardsKim then gives you AI triage, Shopify context, saved replies, and reply helpers for tracking, returns, exchanges, order updates, and product questions.",
      needsEmailCapture: false,
    };
  }

  if (includesAny(normalized, ["gmail", "outlook", "email", "inbox", "integration", "integrations", "shopify"])) {
    return {
      content:
        "RegardsKim is built for Shopify stores and connects to your support inbox, including Gmail and Outlook. It uses store context to organise support and help you reply faster.",
      needsEmailCapture: false,
    };
  }

  if (includesAny(normalized, ["send automatically", "auto send", "autosend", "approval", "approve", "draft", "human"])) {
    return {
      content:
        "You stay in control. Regards Kim sorts the work, shows the order context, and gives AI reply help, but you decide what gets sent.",
      needsEmailCapture: false,
    };
  }

  if (includesAny(normalized, ["what kim does", "what does kim do", "what do you do", "what is kim", "what does it do"])) {
    return {
      content:
        "RegardsKim gives Shopify stores an AI-powered support cockpit for repetitive customer emails: shipping questions, returns, exchanges, order updates, tracking info, sales questions, and product questions using your real store data.",
      needsEmailCapture: false,
    };
  }

  if (includesAny(normalized, ["security", "secure", "data", "privacy", "safe", "permission", "access"])) {
    return {
      content:
        "RegardsKim only asks for the access needed to organise support, match Shopify context, and power reply helpers. Nothing is sent without your permission.",
      needsEmailCapture: false,
    };
  }

  if (includesAny(normalized, ["human", "someone", "contact", "talk to sales", "talk to a person", "demo", "call"])) {
    return {
      content: "Sure — leave your email and we’ll follow up personally.",
      needsEmailCapture: true,
    };
  }

  return {
    content: UNKNOWN_REPLY,
    needsEmailCapture: true,
  };
}

function SalesMessageBubble({ message }: { message: SalesChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm sm:max-w-[86%]",
          isUser ? "bg-brass text-white" : "bg-cream text-ink dark:bg-[#252E42]"
        )}
      >
        <p>{message.content}</p>
        {message.actionLabel && message.actionUrl ? (
          <a
            href={message.actionUrl}
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-brass px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-oxblood"
          >
            {message.actionLabel}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function SalesChatPanel({ onClose }: Props) {
  const [messages, setMessages] = useState<SalesChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey - I can help with RegardsKim pricing, Shopify install, setup, Gmail/Outlook, and how the AI support cockpit works. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [limitNoticeShown, setLimitNoticeShown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, isTyping, showEmailCapture, emailSubmitted]);

  const userMessageCount = useMemo(() => messages.filter((message) => message.role === "user").length, [messages]);
  const reachedLimit = userMessageCount >= MAX_MESSAGES;
  const showQuickQuestions = userMessageCount === 0 && !isTyping;

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isTyping) return;

    if (reachedLimit) {
      if (!limitNoticeShown) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "This chat is capped at 20 messages per session. Leave your email and we’ll get back to you.",
          },
        ]);
        setShowEmailCapture(true);
        setLimitNoticeShown(true);
      }
      setInput("");
      return;
    }

    const userMessage: SalesChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const { needsEmailCapture, ...reply } = buildReply(text);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          ...reply,
        },
      ]);
      setShowEmailCapture(needsEmailCapture);
      if (!needsEmailCapture) {
        setEmailSubmitted(false);
      }
      setIsTyping(false);
    }, 250);
  };

  const submitEmail = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, source: "sales-chat" }),
      });
    } catch {
      // Keep the visitor experience smooth even if the lead capture backend is unavailable.
    }

    setEmail("");
    setShowEmailCapture(false);
    setEmailSubmitted(true);
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: EMAIL_CONFIRMATION,
      },
    ]);
  };

  return (
    <Card className="fixed inset-x-3 bottom-3 z-50 flex h-[min(75vh,560px)] w-auto max-w-none flex-col border border-forest/10 bg-paper shadow-[0_24px_60px_rgba(26,26,26,0.16)] dark:bg-[#202739] sm:right-4 sm:bottom-20 sm:left-auto sm:h-[560px] sm:w-[380px] sm:max-w-[calc(100vw-2rem)]">
      <CardHeader className="border-b border-forest/10 bg-paper px-4 pb-3 dark:bg-[#202739] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-sm font-semibold text-ink">RegardsKim sales</CardTitle>
            <p className="text-xs text-slate">Pricing, install, setup, and approvals</p>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close sales support chat">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 px-4 py-3 sm:px-6">
        <div ref={scrollRef} className="flex h-full flex-col gap-3 overflow-y-auto pr-1">
          {messages.map((message) => (
            <SalesMessageBubble key={message.id} message={message} />
          ))}

          {showQuickQuestions ? (
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => send(question)}
                  className="rounded-full border border-brass/25 bg-brass/10 px-3 py-1.5 text-xs font-semibold text-brass transition hover:bg-brass/20"
                >
                  {question}
                </button>
              ))}
            </div>
          ) : null}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-brass" />
              RegardsKim is typing…
            </div>
          )}

          {showEmailCapture ? (
            <div className="rounded-2xl border border-forest/10 bg-cream p-3 shadow-sm dark:bg-[#252E42]">
              <p className="mb-2 text-sm font-medium text-ink">{EMAIL_PROMPT}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-11 rounded-xl border-forest/15 bg-paper"
                />
                <Button
                  type="button"
                  onClick={submitEmail}
                  disabled={!email.trim()}
                  className="h-11 rounded-xl bg-brass px-4 text-white hover:bg-oxblood sm:self-auto"
                >
                  Send
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 border-t border-forest/10 bg-paper px-4 py-4 dark:bg-[#202739] sm:px-6">
        <div className="flex w-full items-center gap-2">
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                send();
              }
            }}
            placeholder={reachedLimit ? "Message limit reached" : "Ask about install, pricing, Gmail, Outlook..."}
            className="h-11 min-w-0 rounded-full border-forest/15 bg-paper px-4"
            disabled={isTyping || reachedLimit}
          />
          <Button
            size="lg"
            onClick={() => send()}
            disabled={isTyping || reachedLimit || !input.trim()}
            className="h-11 shrink-0 rounded-full bg-brass px-4 text-white hover:bg-oxblood"
            aria-label="Send message"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex w-full flex-col gap-1 text-[11px] text-slate sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <span>Private session • {userMessageCount}/{MAX_MESSAGES}</span>
          <span className="font-medium text-ink">Powered by RegardsKim</span>
        </div>
      </CardFooter>
    </Card>
  );
}
