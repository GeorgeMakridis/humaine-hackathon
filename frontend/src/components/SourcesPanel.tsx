import type { SourceDocument } from "../types/chat";

interface SourcesPanelProps {
  sources: SourceDocument[];
}

export const SourcesPanel = ({ sources }: SourcesPanelProps) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <details className="mt-3 rounded-lg border border-humaine-line bg-humaine-subtle/80 p-3">
      <summary className="cursor-pointer text-sm font-bold text-humaine-ink">Sources</summary>
      <ul className="mt-2 space-y-2 text-sm text-humaine-muted">
        {sources.map((source, index) => (
          <li
            key={`${source.collectionName ?? "source"}-${index}`}
            className="rounded-md border border-humaine-line/80 bg-humaine-panel p-2 text-humaine-ink"
          >
            <p className="font-semibold">{source.title ?? source.fileName ?? source.collectionName ?? "Reference"}</p>
            {source.pages && source.pages.length > 0 ? <p className="text-humaine-muted">Pages: {source.pages.join(", ")}</p> : null}
            {source.pdfUrl ? (
              <a
                href={source.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block font-semibold text-humaine-brand underline decoration-2 underline-offset-2 hover:text-humaine-brand-hover"
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
