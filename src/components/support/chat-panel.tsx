"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, SendHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { ChatItem, ChatMessage } from "./chat-message";

interface Props {
  onClose: () => void;
}

interface ChatResponse {
  success: boolean;
  data: {
    reply: string;
    sources?: string[];
  };
}

const MAX_MESSAGES = 50;

export function ChatPanel({ onClose }: Props) {
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey — I’m Kim support. Ask me about setup, Shopify/email connections, settings, billing, or troubleshooting.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [capNoticeShown, setCapNoticeShown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, isTyping]);

  const messageCount = messages.length;
  const reachedCap = messageCount >= MAX_MESSAGES;

  const history = useMemo(
    () => messages.filter((m) => m.id !== "welcome").map(({ role, content }) => ({ role, content })),
    [messages]
  );

  const send = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    if (reachedCap) {
      if (!capNoticeShown) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "This chat is capped at 50 messages per session. Please email support@regardskim.com so we can help directly.",
          },
        ]);
        setCapNoticeShown(true);
      }
      setInput("");
      return;
    }

    const userMessage: ChatItem = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await api<ChatResponse>("/api/support/chat", {
        method: "POST",
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const reply = response?.data?.reply?.trim() || "I'm not sure about that — reach out to us at support@regardskim.com and we'll help you directly";

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I hit a temporary issue reaching support chat. Please try again in a moment or email support@regardskim.com.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="fixed bottom-20 right-4 z-50 h-[560px] w-[360px] max-w-[calc(100vw-2rem)] shadow-2xl">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm">Support chat</CardTitle>
            <p className="text-xs text-muted-foreground">Powered by Kim</p>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close support chat">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 py-3">
        <div ref={scrollRef} className="h-full space-y-3 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Kim is typing…
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 border-t bg-background">
        <div className="w-full">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask about setup, settings, billing, troubleshooting..."
            className="min-h-[72px]"
            disabled={isTyping}
          />
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-[11px] text-muted-foreground">Session-only chat • {messageCount}/{MAX_MESSAGES}</p>
          <Button size="sm" onClick={send} disabled={isTyping || !input.trim()}>
            <SendHorizontal className="mr-1 h-3.5 w-3.5" />
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
