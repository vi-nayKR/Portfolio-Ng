# Vinay K R — Software Engineer Portfolio

Live site: [portfolio.vinaykr.workers.dev](https://portfolio.vinaykr.workers.dev/) · [GitHub](https://github.com/vi-nayKR) · [LinkedIn](https://linkedin.com/in/vi-naykr)

This is the source for Vinay K R's portfolio: a software engineer building AI-enabled full-stack systems and reliable platform foundations. It brings together three connected lanes without blending professional employment claims with independent project evidence:

- **Full-Stack Product Engineering:** Angular, TypeScript, React, Node.js, Go, .NET, REST APIs, WebSockets, SQL, and Redis.
- **Applied AI Systems:** Python/FastAPI, LangGraph, RAG, retrieval, semantic caching, streaming, evaluation, and observability patterns.
- **Reliability & Platform:** Linux, Kubernetes, Terraform, Prometheus, Grafana, SLOs, failure exercises, and safe change.

## What is included

- A responsive recruiter-focused landing page with keyboard navigation and reduced-motion support.
- Evidence-labelled project cards linking to public source repositories.
- Conservative experience summaries for Liminal Custody and Light & Wonder.
- One context-aware resume presentation. The public default is the software-engineering resume; tailored AI or SRE views can be shared directly without exposing a visible selector.
- IEEE research publication and direct contact links.
- The original glassmorphic dark/light theme, animated navigation, timeline, and section layout with the existing orange Vinay identity.
- A generated ASCII-art symbolic portrait based on Vinay's supplied reference photo; the real photograph is not rendered in the interface.

The content intentionally separates production employment, self-hosted project work, AI reference implementations, prototypes, simulators, and bounded reliability labs. Unsupported adoption, availability, latency, accuracy, cloud ownership, and on-call claims are not presented.

## Stack

| Area | Technology |
| --- | --- |
| Application | Angular 22 standalone components and signals |
| Language | TypeScript 6 |
| Build | Vite 7 and Angular-compatible tooling |
| Styling | Tailwind CSS 4 plus project CSS |
| Hosting | Cloudflare Workers/Pages static assets |

## Local development

Node 24 LTS is recommended.

```bash
npm ci
npm run dev
```

Quality and production checks:

```bash
npm run lint
npm run build
```

The production bundle is written to `dist/` and is configured for Cloudflare static assets. Cloudflare's Git integration can build and deploy the `main` branch automatically.

## Source layout

```text
src/
├── app/app.component.ts  # original section structure
├── app/components/       # themed portfolio sections and current content
├── main.ts               # Angular bootstrap
└── styles.css            # original dark/light design system
public/
├── resumes/              # role-specific PDFs
└── vinay-ascii-portrait.png
```

## Evidence policy

- Employment bullets come from the supplied resumes and are not rewritten as AI or SRE employment.
- Independent repositories are described only at the maturity level supported by their checked-in source and evidence ledgers.
- Deterministic workers, local fallbacks, simulated fine-tuning, validation-only Terraform, and bounded lab results are labelled explicitly.
- Any future performance or repository-count claim must include a reproducible command and retained output.

## License

Personal portfolio source. Repository contents and resume artifacts are not licensed for redistribution without permission.
