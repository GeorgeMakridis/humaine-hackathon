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
    <div className="mx-auto w-full max-w-5xl px-4 pt-2 sm:px-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Example prompts</p>
      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
