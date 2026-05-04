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
        className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[80%] ${
          isUser ? "bg-blue-700 text-white" : "border border-slate-200 bg-white text-slate-900"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {!isUser && message.sources ? <SourcesPanel sources={message.sources} /> : null}
      </div>
    </article>
  );
};
