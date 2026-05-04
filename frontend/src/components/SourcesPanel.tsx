import type { SourceDocument } from "../types/chat";

interface SourcesPanelProps {
  sources: SourceDocument[];
}

export const SourcesPanel = ({ sources }: SourcesPanelProps) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <details className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3">
      <summary className="cursor-pointer text-sm font-medium text-slate-700">Sources</summary>
      <ul className="mt-2 space-y-2 text-sm text-slate-700">
        {sources.map((source, index) => (
          <li key={`${source.collectionName ?? "source"}-${index}`} className="rounded bg-white p-2">
            <p className="font-medium">{source.title ?? source.fileName ?? source.collectionName ?? "Reference"}</p>
            {source.pages && source.pages.length > 0 ? <p>Pages: {source.pages.join(", ")}</p> : null}
            {source.pdfUrl ? (
              <a
                href={source.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline"
              >
                Open source
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </details>
  );
};
