import type { ChatRequest, NormalizedChatResponse } from "../types/chat";
import { parseChatResponse } from "../utils/responseParser";

const DEFAULT_API_BASE_URL = "https://chat-api.xr50.eu";

const mapStatusToMessage = (status: number): string => {
  if (status === 401) {
    return "Authentication failed. Please check the API token.";
  }
  if (status === 400 || status === 422) {
    return "The request format was not accepted by the API.";
  }
  if (status >= 500) {
    return "The backend service returned an error.";
  }
  return "Unexpected backend response. Please try again.";
};

export const sendChatMessage = async (request: ChatRequest): Promise<NormalizedChatResponse> => {
  const useProxy = import.meta.env.VITE_USE_PROXY === "true";
  const apiBaseUrl = import.meta.env.VITE_CHAT_API_BASE_URL ?? DEFAULT_API_BASE_URL;
  const token = import.meta.env.VITE_CHAT_API_TOKEN;

  const endpoint = useProxy ? "/api/chat" : `${apiBaseUrl}/api/chat`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (!useProxy && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(request),
    });
  } catch {
    throw new Error("Could not reach the chat backend.");
  }

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(mapStatusToMessage(response.status));
  }

  return parseChatResponse(payload);
};
