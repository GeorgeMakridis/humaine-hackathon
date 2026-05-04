import { useState } from "react";

interface ChatInputProps {
  loading: boolean;
  onSend: (message: string) => Promise<void>;
  onClear: () => void;
}

export const ChatInput = ({ loading, onSend, onClear }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const submit = async () => {
    const message = value.trim();
    if (!message || loading) {
      return;
    }

    await onSend(message);
    setValue("");
  };

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2">
        <textarea
          aria-label="Chat input"
          placeholder="Ask about XAI, active learning, uncertainty sampling..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void submit();
            }
          }}
          className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Clear conversation"
            onClick={onClear}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Clear conversation
          </button>
          <button
            type="button"
            aria-label="Send message"
            onClick={() => void submit()}
            disabled={loading}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </div>
    </footer>
  );
};
