# HumAIne Hackathon Chatbot

Frontend chatbot for students working on XAI + Active Learning notebook tasks during the HumAIne hackathon.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- XR5.0 LLM Engine API (`POST /api/chat`)
- Optional Node/Express proxy for server-side token handling

## Install and Run Locally

```bash
npm install
npm run dev
```

By default, the app runs in direct mode and calls `https://chat-api.xr50.eu/api/chat`.

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_CHAT_API_BASE_URL=https://chat-api.xr50.eu
VITE_CHAT_API_TOKEN=
VITE_USE_PROXY=false
```

- `VITE_CHAT_API_BASE_URL`: XR5.0 API base URL.
- `VITE_CHAT_API_TOKEN`: optional bearer token for direct browser calls.
- `VITE_USE_PROXY`: set `true` to call `/api/chat` through proxy mode.

## Logo Configuration

Place your logo at:

`public/humaine-logo.png`

If missing, the UI automatically falls back to text: `HumAIne`.

## OpenAPI Notes

The XR5.0 schema is available at:

- `https://chat-api.xr50.eu/openapi.json`
- `https://chat-api.xr50.eu/docs`

This app aligns with:

- `POST /api/chat`
- request shape with at least `{ "query": "..." }`
- response normalization for `answer`, `response`, `message`, `content`, `sources`, `source_documents`, and `metadata`

## Error Handling

User-friendly messages are shown for:

- `401`: authentication failed
- `400/422`: invalid request format
- `500`: backend error
- network failures / unreachable backend

## Docker Deployment (Shared Hackathon URL)

Build and run:

```bash
docker compose up --build
```

Then open: `http://localhost:8080`

### Compose Services

- `web`: serves the built frontend with Nginx
- `proxy`: optional token-hiding proxy (`/api/chat` -> `https://chat-api.xr50.eu/api/chat`)

### Proxy Secrets Guidance

If the API token is sensitive, do not expose it in frontend `VITE_` variables. Instead:

- set `VITE_USE_PROXY=true` for frontend build
- provide `XR_API_TOKEN` to the proxy service (server-side only)

If using direct mode with `VITE_CHAT_API_TOKEN`, remember the token is visible in browser-delivered assets.
