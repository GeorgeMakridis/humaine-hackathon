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
    <footer className="border-t border-humaine-line bg-humaine-panel px-4 py-3 shadow-[0_-4px_24px_rgba(17,17,17,0.04)] sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2">
        <textarea
          aria-label="Chat input"
          placeholder="Ask about XAI, active learning, uncertainty sampling…"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void submit();
            }
          }}
          className="min-h-24 w-full rounded-xl border border-humaine-line bg-humaine-subtle/50 px-3 py-2 text-sm text-humaine-ink outline-none transition placeholder:text-humaine-muted/80 focus:border-humaine-brand focus:ring-2 focus:ring-humaine-brand/25"
        />
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            aria-label="Clear conversation"
            onClick={onClear}
            className="rounded-lg border border-humaine-line bg-humaine-panel px-3 py-2 text-sm font-semibold text-humaine-muted transition hover:border-humaine-brand/40 hover:text-humaine-ink"
          >
            Clear conversation
          </button>
          <button
            type="button"
            aria-label="Send message"
            onClick={() => void submit()}
            disabled={loading}
            className="rounded-lg bg-humaine-brand px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-humaine-brand-hover disabled:cursor-not-allowed disabled:opacity-55"
          >
            Send
          </button>
        </div>
      </div>
    </footer>
  );
};
