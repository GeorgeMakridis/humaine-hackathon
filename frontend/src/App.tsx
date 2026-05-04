import { useMemo, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatWindow } from "./components/ChatWindow";
import { ExamplePrompts } from "./components/ExamplePrompts";
import { Header } from "./components/Header";
import { sendChatMessage } from "./services/chatApi";
import type { ChatMessage } from "./types/chat";

const STORAGE_KEY = "humaine-chat-history";

const initialAssistantMessage: ChatMessage = {
  id: "assistant-intro",
  role: "assistant",
  content:
    "Hello! I am the HumAIne Hackathon Chatbot. I can help you understand XAI, Active Learning, uncertainty sampling, model explanations, dataset annotation strategies, and how to structure your notebook.",
  createdAt: new Date().toISOString(),
};

const getInitialMessages = (): ChatMessage[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [initialAssistantMessage];
  }
  try {
    const parsed = JSON.parse(saved) as ChatMessage[];
    return parsed.length > 0 ? parsed : [initialAssistantMessage];
  } catch {
    return [initialAssistantMessage];
  }
};

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canShowChips = useMemo(
    () => messages.length === 1 && messages[0]?.id === initialAssistantMessage.id,
    [messages],
  );

  const persistMessages = (nextMessages: ChatMessage[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMessages));
  };

  const handleSend = async (text: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    const withUser = [...messages, userMessage];
    setMessages(withUser);
    persistMessages(withUser);
    setError(null);
    setLoading(true);

    try {
      const result = await sendChatMessage({ query: text });
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.answer,
        createdAt: new Date().toISOString(),
        sources: result.sources,
        metadata: result.metadata,
      };
      const withAssistant = [...withUser, assistantMessage];
      setMessages(withAssistant);
      persistMessages(withAssistant);
    } catch (sendError) {
      const message = sendError instanceof Error ? sendError.message : "Could not reach the chat backend.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    const reset = [initialAssistantMessage];
    setMessages(reset);
    persistMessages(reset);
    setError(null);
  };

  return (
    <main className="flex h-screen flex-col">
      <Header />
      {canShowChips ? <ExamplePrompts onSelect={(prompt) => void handleSend(prompt)} /> : null}
      {error ? (
        <div className="mx-auto mt-3 w-full max-w-5xl rounded-lg border border-red-200/90 bg-red-50 px-4 py-3 text-sm text-red-900 shadow-sm">
          {error}
        </div>
      ) : null}
      <ChatWindow messages={messages} loading={loading} />
      <ChatInput loading={loading} onSend={handleSend} onClear={handleClear} />
      <footer className="border-t border-humaine-ink/10 bg-humaine-ink px-4 py-3 text-center text-xs text-white/90 sm:px-6">
        <p>
          Supporting students in XAI and Active Learning notebook development — aligned with the{" "}
          <a
            className="font-semibold text-white underline decoration-humaine-brand decoration-2 underline-offset-2 hover:text-humaine-brand"
            href="https://humaine-horizon.eu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            HumAIne project
          </a>
          .
        </p>
      </footer>
    </main>
  );
}

export default App;
