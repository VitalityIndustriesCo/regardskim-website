"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, SendHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SalesChatRole = "user" | "assistant";

type SalesChatMessage = {
  id: string;
  role: SalesChatRole;
  content: string;
};

interface Props {
  onClose: () => void;
}

const MAX_MESSAGES = 20;
const UNKNOWN_REPLY = "Great question! I'd love to help — drop your email and we'll get back to you personally.";
const EMAIL_PROMPT = "Leave your email and we'll get back to you";
const EMAIL_CONFIRMATION = "Thanks! We'll be in touch soon.";

function buildReply(message: string) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("price") ||
    normalized.includes("pricing") ||
    normalized.includes("cost") ||
    normalized.includes("plan")
  ) {
    return {
      reply: "$49/month, 7-day free trial, cancel anytime. Annual plan available at $37/month.",
      needsEmailCapture: false,
    };
  }

  if (
    normalized.includes("how it works") ||
    normalized.includes("how does it work") ||
    normalized.includes("works") ||
    normalized.includes("setup") ||
    normalized.includes("set up")
  ) {
    return {
      reply:
        "Kim connects to your Shopify store and email, reads incoming customer emails, drafts replies using your live store data, and queues them for your approval before anything sends.",
      needsEmailCapture: false,
    };
  }

  if (
    normalized.includes("integration") ||
    normalized.includes("integrations") ||
    normalized.includes("shopify") ||
    normalized.includes("gmail") ||
    normalized.includes("outlook")
  ) {
    return {
      reply: "Kim works with Shopify, Gmail, and Outlook.",
      needsEmailCapture: false,
    };
  }

  if (normalized.includes("trial") || normalized.includes("free trial") || normalized.includes("credit card")) {
    return {
      reply: "7-day free trial, no credit card required. Cancel anytime.",
      needsEmailCapture: false,
    };
  }

  if (
    normalized.includes("what kim does") ||
    normalized.includes("what does kim do") ||
    normalized.includes("what do you do") ||
    normalized.includes("what is kim") ||
    normalized.includes("what does it do")
  ) {
    return {
      reply:
        "Kim handles your customer support emails — shipping questions, returns, order updates, tracking info — using your real Shopify data.",
      needsEmailCapture: false,
    };
  }

  if (
    normalized.includes("security") ||
    normalized.includes("secure") ||
    normalized.includes("data") ||
    normalized.includes("privacy") ||
    normalized.includes("safe")
  ) {
    return {
      reply:
        "Kim only accesses the data it needs from your Shopify store. Every reply is a draft until you approve it. Nothing sends without your permission.",
      needsEmailCapture: false,
    };
  }

  if (
    normalized.includes("human") ||
    normalized.includes("someone") ||
    normalized.includes("contact") ||
    normalized.includes("talk to sales") ||
    normalized.includes("talk to a person")
  ) {
    return {
      reply: UNKNOWN_REPLY,
      needsEmailCapture: true,
    };
  }

  return {
    reply: UNKNOWN_REPLY,
    needsEmailCapture: true,
  };
}

function SalesMessageBubble({ message }: { message: SalesChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[86%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm",
          isUser ? "bg-brass text-paper" : "bg-cream text-ink"
        )}
      >
        <p>{message.content}</p>
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
        "Hey! I'm here to answer any questions about Kim. Ask me anything about pricing, setup, or how it works.",
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

  const send = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    if (reachedLimit) {
      if (!limitNoticeShown) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "This chat is capped at 20 messages per session. Leave your email and we'll get back to you.",
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
      const { reply, needsEmailCapture } = buildReply(text);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
        },
      ]);
      setShowEmailCapture(needsEmailCapture);
      if (!needsEmailCapture) {
        setEmailSubmitted(false);
      }
      setIsTyping(false);
    }, 300);
  };

  const submitEmail = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    console.log("Sales chat lead captured:", trimmedEmail);
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
    <Card className="fixed right-4 bottom-20 z-50 h-[560px] w-[380px] max-w-[calc(100vw-2rem)] border border-forest/10 bg-paper shadow-[0_24px_60px_rgba(26,26,26,0.16)]">
      <CardHeader className="border-b border-forest/10 bg-paper pb-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-semibold text-forest">Sales support</CardTitle>
            <p className="text-xs text-slate">Ask about pricing, setup, or how Kim works</p>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close sales support chat">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 py-3">
        <div ref={scrollRef} className="flex h-full flex-col gap-3 overflow-y-auto pr-1">
          {messages.map((message) => (
            <SalesMessageBubble key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-brass" />
              Kim is typing…
            </div>
          )}

          {showEmailCapture ? (
            <div className="rounded-2xl border border-forest/10 bg-cream p-3 shadow-sm">
              <p className="mb-2 text-sm font-medium text-forest">{EMAIL_PROMPT}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-10 rounded-xl border-forest/15 bg-paper"
                />
                <Button
                  type="button"
                  onClick={submitEmail}
                  disabled={!email.trim()}
                  className="h-10 rounded-xl bg-brass px-4 text-paper hover:bg-oxblood"
                >
                  Send
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 border-t border-forest/10 bg-paper">
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
            placeholder={reachedLimit ? "Message limit reached" : "Ask about pricing, setup, integrations..."}
            className="h-11 rounded-full border-forest/15 bg-paper px-4"
            disabled={isTyping || reachedLimit}
          />
          <Button
            size="lg"
            onClick={send}
            disabled={isTyping || reachedLimit || !input.trim()}
            className="h-11 rounded-full bg-brass px-4 text-paper hover:bg-oxblood"
            aria-label="Send message"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex w-full items-center justify-between gap-3 text-[11px] text-slate">
          <span>Session-only chat • {userMessageCount}/{MAX_MESSAGES}</span>
          <span className="font-medium text-forest">Powered by Kim</span>
        </div>
      </CardFooter>
    </Card>
  );
}
