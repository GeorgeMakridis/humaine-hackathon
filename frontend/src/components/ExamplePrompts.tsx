const PROMPTS = [
  "Explain active learning in simple terms",
  "How can I select the most informative samples?",
  "How do I combine XAI with active learning?",
  "Suggest a notebook structure for the hackathon",
  "What metrics should I use to evaluate the approach?",
  "How can SHAP or LIME support annotation decisions?",
];

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

export const ExamplePrompts = ({ onSelect }: ExamplePromptsProps) => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-3 sm:px-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-humaine-muted">Example prompts</p>
      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="rounded-full border border-humaine-line bg-humaine-panel px-3 py-1.5 text-left text-sm font-medium text-humaine-ink shadow-sm transition hover:border-humaine-brand hover:text-humaine-brand"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
