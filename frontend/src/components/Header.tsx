import { useState } from "react";

export const Header = () => {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="border-b border-humaine-line bg-humaine-panel shadow-card">
      <div className="h-1 w-full bg-gradient-to-r from-humaine-brand via-indigo-500 to-sky-400" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {!logoFailed ? (
            <img
              src="/humaine-logo.png"
              alt="HumAIne"
              className="h-9 w-auto max-w-[min(100%,220px)] object-contain object-left sm:h-10"
              width={220}
              height={52}
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="rounded-md border border-humaine-line bg-humaine-subtle px-3 py-2 text-sm font-bold tracking-tight text-humaine-ink">
              hum<span className="text-humaine-brand">A</span>Ine
            </span>
          )}
          <div className="min-w-0 border-l border-humaine-line pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-humaine-muted">Hackathon</p>
            <h1 className="text-lg font-bold leading-tight text-humaine-ink sm:text-xl">Chatbot</h1>
            <p className="mt-0.5 max-w-md text-sm text-humaine-muted">
              Ask questions while you build your XAI and Active Learning notebook.
            </p>
          </div>
        </div>
        <a
          className="shrink-0 rounded-md border border-humaine-line px-3 py-2 text-sm font-semibold text-humaine-brand transition hover:border-humaine-brand hover:bg-humaine-subtle"
          href="https://humaine-horizon.eu/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="HumAIne project website (opens in new tab)"
        >
          Project site
        </a>
      </div>
    </header>
  );
};
