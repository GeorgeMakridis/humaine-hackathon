export type ChatRole = "assistant" | "user";

export interface SourceDocument {
  collectionName?: string;
  title?: string;
  fileName?: string;
  pdfUrl?: string;
  pages?: number[];
  metadata?: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  sources?: SourceDocument[];
  metadata?: Record<string, unknown>;
}

export interface ChatRequest {
  query: string;
}

export interface ChatResponse {
  response: string;
  pilot?: string;
  processing_time?: number | null;
  tokens_used?: number | null;
  documents?: SourceDocument[];
  images?: Array<Record<string, unknown>>;
}

export interface NormalizedChatResponse {
  answer: string;
  sources?: SourceDocument[];
  metadata?: Record<string, unknown>;
  raw?: unknown;
}
