export const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3">
        <img
          src="/humaine-logo.png"
          alt="HumAIne logo"
          className="h-10 w-10 rounded object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            const fallback = document.getElementById("humaine-logo-fallback");
            if (fallback) {
              fallback.classList.remove("hidden");
            }
          }}
        />
        <span
          id="humaine-logo-fallback"
          className="hidden rounded bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700"
        >
          HumAIne
        </span>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">HumAIne Hackathon Chatbot</h1>
          <p className="text-sm text-slate-600">
            Ask better questions while building your XAI Active Learning notebook.
          </p>
        </div>
      </div>
    </header>
  );
};
