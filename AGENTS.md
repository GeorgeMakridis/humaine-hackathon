# Cursor Project Prompt

## Cursor rules
Generate appropriate Cursor rules documents inside the project so future development follows consistent standards.

Create a `.cursor/rules/` directory and add useful rule files, for example:

```text
.cursor/rules/
  frontend-architecture.mdc
  react-typescript.mdc
  api-integration.mdc
  styling-accessibility.mdc
  project-context.mdc
```

The rules should cover:

1. Project context
- This is the HumAIne Hackathon Chatbot.
- It is used by students during a hackathon to support development of an XAI Active Learning notebook.
- The frontend communicates with the XR5.0 LLM Engine API.
- Prioritize clarity, explainability, usability, and robustness.

2. Frontend architecture
- Use React + TypeScript + Vite.
- Keep components small and reusable.
- Place API logic in `src/services/`.
- Place shared types in `src/types/`.
- Place response-normalization logic in `src/utils/`.
- Avoid mixing UI rendering with API calls.

3. API integration
- Use `VITE_CHAT_API_BASE_URL` and `VITE_CHAT_API_TOKEN`.
- Never hardcode secrets.
- Use `POST /api/chat`.
- Always send `Authorization: Bearer <token>` when a token exists.
- Handle 401, 400/422, 500, and network errors with friendly messages.
- Parse backend responses defensively based on the OpenAPI schema.

4. React and TypeScript
- Use strict TypeScript.
- Avoid `any` unless unavoidable; prefer `unknown` and type guards.
- Use clear interfaces for chat messages, API requests, responses, and source documents.
- Keep state predictable and local unless a stronger need appears.
- Add comments only where they improve maintainability.

5. Styling and accessibility
- Use Tailwind CSS.
- Keep the UI responsive and accessible.
- Use semantic HTML.
- Add aria-labels for interactive elements.
- Ensure strong contrast and readable spacing.
- Keep the design aligned with a clean research-project / hackathon style.

6. Code quality
- Prefer simple, maintainable solutions.
- Avoid unnecessary libraries.
- Keep naming clear and consistent.
- Make error handling explicit.
- Update the README whenever configuration or project behavior changes.

Each rule file should be concise, actionable, and written in a way that Cursor can use as project guidance.
