# Vinay K R — Applied AI Engineering Portfolio

Live site: [portfolio.vinaykr.workers.dev](https://portfolio.vinaykr.workers.dev/)

This is the source for Vinay K R’s recruiter-facing portfolio. It presents a truthful transition from nearly three years of product and backend engineering into Applied AI systems.

The site separates professional employment from independent projects. It highlights only:

- `fastapi-genai-agent-patterns`: flagship reference implementation featuring typed LangGraph routing, real model provider mode, structured outputs, hybrid retrieval (BM25 + dense semantic hash with RRF), reproducible evaluation benchmarks (30-case suite, zero unauthorized mutations), SSE, OpenTelemetry, and deterministic tests.
- `medha-platform-api`: Go, PostgreSQL/PostGIS, Redis, authentication, WebSockets, and health checks.
- `homelab-sre-observability`: a bounded observability lab that supports operational AI-service thinking.

The FastAPI project supports real provider mode alongside deterministic test workers. It proves workflow design, hybrid retrieval, and calibrated evaluation benchmarks.

## Development

```bash
npm ci
npm run lint
npm run build
```

The static build is emitted to `dist/`.
