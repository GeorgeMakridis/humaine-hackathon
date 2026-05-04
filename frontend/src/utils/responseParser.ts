import type { NormalizedChatResponse, SourceDocument } from "../types/chat";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null;

const toSourceDocument = (value: unknown): SourceDocument | null => {
  if (!isRecord(value)) {
    return null;
  }

  return {
    collectionName: typeof value.collection_name === "string" ? value.collection_name : undefined,
    title:
      typeof value.doc_title === "string"
        ? value.doc_title
        : typeof value.title === "string"
          ? value.title
          : undefined,
    fileName:
      typeof value.file_name === "string"
        ? value.file_name
        : typeof value.fileName === "string"
          ? value.fileName
          : undefined,
    pdfUrl: typeof value.pdf_url === "string" ? value.pdf_url : undefined,
    pages: Array.isArray(value.pages) ? value.pages.filter((p): p is number => typeof p === "number") : undefined,
    metadata: isRecord(value.metadata) ? value.metadata : undefined,
  };
};

export const parseChatResponse = (payload: unknown): NormalizedChatResponse => {
  if (!isRecord(payload)) {
    return { answer: "The service returned an unexpected response.", raw: payload };
  }

  const answerCandidate = [payload.answer, payload.response, payload.message, payload.content].find(
    (v) => typeof v === "string" && v.trim().length > 0,
  ) as string | undefined;

  const sourcesValue = payload.sources ?? payload.source_documents ?? payload.documents;
  const sources = Array.isArray(sourcesValue)
    ? sourcesValue.map(toSourceDocument).filter((doc): doc is SourceDocument => doc !== null)
    : undefined;

  const metadata = isRecord(payload.metadata) ? payload.metadata : undefined;

  return {
    answer: answerCandidate ?? "No answer text was returned by the backend.",
    sources,
    metadata,
    raw: payload,
  };
};
