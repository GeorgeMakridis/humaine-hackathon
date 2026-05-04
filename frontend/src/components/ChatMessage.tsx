import type { ChatMessage as ChatMessageType } from "../types/chat";
import { SourcesPanel } from "./SourcesPanel";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <article className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[80%] ${
          isUser
            ? "bg-humaine-brand text-white shadow-card"
            : "border border-humaine-line bg-humaine-panel text-humaine-ink shadow-card"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {!isUser && message.sources ? <SourcesPanel sources={message.sources} /> : null}
      </div>
    </article>
  );
};
