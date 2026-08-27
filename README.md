# Vinay K R — Software Engineer Portfolio

[Live portfolio](https://portfolio.vinaykr.workers.dev/) · [LinkedIn](https://linkedin.com/in/vi-naykr) · [GitHub](https://github.com/vi-nayKR)

A single-page portfolio for Vinay K R, a software engineer with 3+ years of enterprise experience in Angular, TypeScript, REST APIs, C#/.NET, Node.js, SQL, and production debugging. Independent Go and Python/FastAPI work is presented separately from professional experience.

## What the site contains

- A concise professional summary and role-focused skills matrix.
- Conservative experience bullets for Liminal Custody and Light & Wonder.
- A one-page ATS resume embedded from `public/resume.pdf`.
- Selected repositories with implementation status and limitations stated plainly.
- The published IEEE conference paper from Vinay's B.E. work.

The site intentionally avoids synthetic benchmark claims, unverified impact percentages, and presenting deterministic prototypes as production AI systems.

## Stack

| Area | Technology |
|---|---|
| Application | Angular 22 standalone components and signals |
| Language | TypeScript 6 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 and project-specific CSS |
| Interaction | RxJS and Lenis smooth scrolling |
| Hosting | Cloudflare Workers/Pages configuration |

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

The production bundle is written to `dist/`.

## Source layout

```text
src/app/
├── app.component.ts
├── components/
│   ├── hero/
│   ├── about/
│   ├── skills/
│   ├── experience/
│   ├── resume/
│   ├── github/
│   ├── conference/
│   └── contact/
├── directives/
└── pipes/
```

## Evidence policy

- Employment bullets describe responsibilities and shipped work without invented scale or impact.
- Repository counts are used only when they can be inspected in source.
- Provider-backed AI integrations are not claimed when the checked-in implementation uses deterministic stand-ins.
- Performance claims require a reproducible benchmark command and retained raw output.

## Contact

Vinay K R · Bengaluru, India

- [LinkedIn](https://linkedin.com/in/vi-naykr)
- [GitHub](https://github.com/vi-nayKR)
- [Email](mailto:vinayravindranatha@gmail.com)
