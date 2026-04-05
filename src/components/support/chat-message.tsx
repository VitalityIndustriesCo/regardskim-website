"use client";

import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

export type ChatRole = "user" | "assistant";

export interface ChatItem {
  id: string;
  role: ChatRole;
  content: string;
}

function renderInline(text: string): (string | ReactElement)[] {
  const parts: (string | ReactElement)[] = [];
  const regex = /(\[[^\]]+\]\((https?:\/\/[^\s)]+)\)|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("[")) {
      const [, label, url] = token.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/) || [];
      if (label && url) {
        parts.push(
          <a key={`${url}-${match.index}`} href={url} target="_blank" rel="noreferrer" className="text-primary underline">
            {label}
          </a>
        );
      } else {
        parts.push(token);
      }
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code key={`code-${match.index}`} className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(token);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const output: ReactElement[] = [];
  let listBuffer: string[] = [];
  let codeBuffer: string[] = [];
  let inCode = false;

  const flushList = () => {
    if (!listBuffer.length) return;
    output.push(
      <ul key={`list-${output.length}`} className="ml-5 list-disc space-y-1">
        {listBuffer.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  const flushCode = () => {
    if (!codeBuffer.length) return;
    output.push(
      <pre key={`code-${output.length}`} className="overflow-x-auto rounded-md bg-muted p-2 text-xs">
        <code>{codeBuffer.join("\n")}</code>
      </pre>
    );
    codeBuffer = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    const listMatch = line.match(/^\s*[-*]\s+(.+)$/);
    if (listMatch) {
      listBuffer.push(listMatch[1]);
      continue;
    }

    flushList();

    if (!line.trim()) {
      output.push(<div key={`spacer-${output.length}`} className="h-2" />);
      continue;
    }

    output.push(
      <p key={`p-${output.length}`} className="leading-relaxed">
        {renderInline(line)}
      </p>
    );
  }

  flushList();
  flushCode();

  return output;
}

export function ChatMessage({ message }: { message: ChatItem }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        )}
      >
        {isUser ? <p>{message.content}</p> : <div className="space-y-1">{renderMarkdown(message.content)}</div>}
      </div>
    </div>
  );
}
