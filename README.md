# HumAIne Hackathon

This repository contains materials and tooling for the HumAIne hackathon, including a web chatbot that talks to the **XR5.0 LLM Engine** API for student support during XAI and Active Learning notebook work.

## Contents

| Path | Description |
|------|-------------|
| [`frontend/`](frontend/) | React + TypeScript + Vite chatbot UI, Docker deployment, optional API proxy |
| `humaine_hackathon_files /` | Hackathon notebooks, facilitator cards, RAG docs, and related assets (folder name includes a trailing space in this repo) |
| [`.cursor/rules/`](.cursor/rules/) | Cursor project rules for consistent development |
| [`AGENTS.md`](AGENTS.md) | Cursor / agent guidance for this project |

## Quick start (chatbot)

From the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

Configuration, API modes, Docker, and security notes are documented in **[`frontend/README.md`](frontend/README.md)**.

## Requirements

- **Node.js** 20+ recommended for local development and builds
- **Docker** (optional) for containerized deployment — see `frontend/docker-compose.yml`

## License

Add a license file if you need one for distribution or collaboration.
