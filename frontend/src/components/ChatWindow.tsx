import { useEffect, useRef } from "react";
import type { ChatMessage as ChatMessageType } from "../types/chat";
import { ChatMessage } from "./ChatMessage";

interface ChatWindowProps {
  messages: ChatMessageType[];
  loading: boolean;
}

export const ChatWindow = ({ messages, loading }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading ? (
          <div className="max-w-[80%] rounded-2xl border border-humaine-line bg-humaine-panel px-4 py-3 text-sm text-humaine-muted shadow-card">
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 animate-pulse rounded-full bg-humaine-brand"
                aria-hidden="true"
              />
              Assistant is thinking…
            </span>
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>
    </section>
  );
};
