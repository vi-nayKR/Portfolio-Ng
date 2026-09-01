import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type Track = 'All' | 'Full-Stack' | 'Applied AI' | 'Reliability';

interface Project {
  title: string;
  track: Exclude<Track, 'All'>;
  status: string;
  summary: string;
  evidence: string;
  stack: string[];
  url: string;
  color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="site-shell">
      <a class="skip-link" href="#main-content">Skip to content</a>
      <header class="site-header">
        <a class="brand" href="#top" aria-label="Vinay K R home"><span class="brand-mark">V</span><span>VINAY K R</span></a>
        <nav aria-label="Primary navigation" class="desktop-nav">@for (item of navItems; track item.href) { <a [href]="item.href">{{ item.label }}</a> }</nav>
        <a class="header-cta" href="mailto:vinayravindranatha@gmail.com?subject=Opportunity%20for%20Vinay%20K%20R">Let's talk <span aria-hidden="true">↗</span></a>
      </header>
      <main id="main-content">
        <section id="top" class="hero section-wrap">
          <div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span> Software engineer · Bengaluru, India</p><h1>Building products that are <em>useful, intelligent,</em> and resilient.</h1><p class="hero-lede">I build AI-enabled full-stack systems and the platform foundations that keep them dependable. My work spans Angular, TypeScript, Go, Python/FastAPI, APIs, data, and operational evidence.</p><div class="hero-actions"><a class="button button-primary" href="#work">Explore selected work <span aria-hidden="true">↓</span></a><a class="button button-quiet" href="#resumes">Choose a resume <span aria-hidden="true">↗</span></a></div><div class="hero-proof" aria-label="Professional highlights"><div><strong>03</strong><span>engineering lanes</span></div><div><strong>03</strong><span>years of product work</span></div><div><strong>01</strong><span>IEEE publication</span></div></div></div>
          <div class="hero-visual" aria-label="Portrait of Vinay K R"><div class="portrait-frame"><img src="/profile-photo-real.webp" alt="Vinay K R" fetchpriority="high"></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="hero-note note-one">Angular / Go / Python</div><div class="hero-note note-two">systems with receipts</div></div>
        </section>
        <section id="about" class="section-wrap intro-section"><div class="section-kicker">01 / The throughline</div><div class="intro-grid"><h2>One engineer.<br><em>Three connected strengths.</em></h2><div><p>I have nearly three years of professional software experience across fintech and regulated gaming, shipping Angular/TypeScript features, Node.js and .NET APIs, authorization workflows, real-time interfaces, SQL-backed systems, and regression coverage.</p><p>Alongside that work, I build inspectable Go, Python/FastAPI, and reliability projects. They are clearly separated from employment claims and documented with their evidence boundaries.</p></div></div><div class="track-grid">@for (track of tracks; track track.number) { <article class="track-card" [class]="track.tone"><span class="track-number">{{ track.number }}</span><h3>{{ track.title }}</h3><p>{{ track.description }}</p><a [href]="track.href">See the work <span aria-hidden="true">↗</span></a></article> }</div></section>
        <section id="work" class="section-wrap work-section"><div class="section-heading"><div><div class="section-kicker">02 / Selected work</div><h2>Built to be inspected.</h2></div><p>Public projects are presented with their implementation maturity and limits stated plainly.</p></div><div class="filter-row" aria-label="Filter projects">@for (filter of filters; track filter) { <button type="button" [class.active]="selectedTrack() === filter" (click)="selectedTrack.set(filter)">{{ filter }}</button> }</div><div class="project-grid">@for (project of filteredProjects(); track project.title) { <a class="project-card" [href]="project.url" target="_blank" rel="noopener noreferrer"><div class="project-top"><span class="project-index">{{ project.track }}</span><span class="project-arrow" aria-hidden="true">↗</span></div><h3>{{ project.title }}</h3><p>{{ project.summary }}</p><div class="evidence"><span class="evidence-dot" [style.background]="project.color"></span>{{ project.status }} · {{ project.evidence }}</div><div class="stack-list">@for (item of project.stack; track item) { <span>{{ item }}</span> }</div></a> }</div><a class="text-link" href="https://github.com/vi-nayKR?tab=repositories" target="_blank" rel="noopener noreferrer">Browse all public repositories <span aria-hidden="true">↗</span></a></section>
        <section id="experience" class="section-wrap experience-section"><div class="section-kicker">03 / Experience</div><h2>Professional work, <em>clearly stated.</em></h2><div class="experience-list">@for (experience of experiences; track experience.company) { <article class="experience-row"><div class="experience-date">{{ experience.period }}<span>{{ experience.location }}</span></div><div><h3>{{ experience.role }}</h3><p class="company">{{ experience.company }}</p><p>{{ experience.summary }}</p><div class="stack-list">@for (tag of experience.tags; track tag) { <span>{{ tag }}</span> }</div></div></article> }</div></section>
        <section id="resumes" class="section-wrap resume-section"><div class="section-heading"><div><div class="section-kicker">04 / Role-specific resumes</div><h2>Choose your lens.</h2></div><p>Three supplied resume versions, each tuned to a different conversation.</p></div><div class="resume-grid">@for (resume of resumes; track resume.title) { <article class="resume-card"><span class="resume-label">{{ resume.label }}</span><h3>{{ resume.title }}</h3><p>{{ resume.description }}</p><div><a class="button button-primary" [href]="resume.url" target="_blank" rel="noopener noreferrer">Open PDF ↗</a><a class="download-link" [href]="resume.url" [download]="resume.download">Download</a></div></article> }</div></section>
        <section id="research" class="section-wrap research-section"><div class="research-mark">IEEE<br><span>2023</span></div><div><div class="section-kicker">05 / Research</div><h2>Data visualisation of time-tradable assets using machine learning.</h2><p>Co-author of a peer-reviewed IEEE publication from my B.E. Computer Science research.</p><a class="text-link" href="https://ieeexplore.ieee.org/document/10275962" target="_blank" rel="noopener noreferrer">Read the paper <span aria-hidden="true">↗</span></a></div></section>
        <section id="contact" class="section-wrap contact-section"><div class="section-kicker">06 / Contact</div><h2>Have a hard problem?<br><em>Let's talk about it.</em></h2><p>Open to full-time roles and thoughtful conversations around product engineering, applied AI, and platform reliability.</p><div class="contact-links"><a href="mailto:vinayravindranatha@gmail.com">vinayravindranatha@gmail.com ↗</a><a href="https://linkedin.com/in/vi-naykr" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/vi-nayKR" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></section>
      </main>
      <footer class="site-footer"><span>© {{ year }} Vinay K R</span><span>Angular · Go · Python · Reliability</span><a href="#top">Back to top ↑</a></footer>
    </div>
  `,
})
export class AppComponent {
  readonly year = new Date().getFullYear();
  readonly selectedTrack = signal<Track>('All');
  readonly filters: Track[] = ['All', 'Full-Stack', 'Applied AI', 'Reliability'];
  readonly navItems = [{ label: 'About', href: '#about' }, { label: 'Work', href: '#work' }, { label: 'Experience', href: '#experience' }, { label: 'Resumes', href: '#resumes' }, { label: 'Contact', href: '#contact' }];
  readonly tracks = [
    { number: '01', title: 'Full-Stack Product Engineering', description: 'Angular, React, Node.js, Go, .NET, APIs, real-time interfaces, and data-backed features.', href: '#work', tone: 'tone-blue' },
    { number: '02', title: 'Applied AI Systems', description: 'FastAPI, LangGraph, RAG, semantic caching, streaming, evaluation, and observability patterns.', href: '#work', tone: 'tone-violet' },
    { number: '03', title: 'Reliability & Platform', description: 'Linux, Kubernetes, Terraform, SLOs, incident drills, safe change, and operational evidence.', href: '#work', tone: 'tone-green' },
  ];
  readonly projects: Project[] = [
    { title: 'Medha Platform API', track: 'Full-Stack', status: 'Self-hosted platform', evidence: 'Go backend', summary: 'Domain-driven Go API with PostgreSQL/PostGIS, Redis-backed WebSockets, object storage, auth, and operational safeguards.', stack: ['Go', 'Chi', 'PostgreSQL', 'Redis', 'WebSockets'], url: 'https://github.com/vi-nayKR/medha-platform-api', color: '#57c7e8' },
    { title: 'FastAPI Agent Patterns', track: 'Applied AI', status: 'Reference implementation', evidence: 'reproducible local tests', summary: 'Typed LangGraph supervisor with specialist routing, human approval checkpoints, SSE events, caching interfaces, and tracing.', stack: ['Python', 'FastAPI', 'LangGraph', 'Redis', 'OTel'], url: 'https://github.com/vi-nayKR/fastapi-genai-agent-patterns', color: '#a78bfa' },
    { title: 'Enterprise Agentic RAG', track: 'Applied AI', status: 'Prototype', evidence: 'deterministic retrieval', summary: 'Hybrid vector and lexical retrieval, RRF ranking, relevance grading, query rewriting, citations, and local tool-shaped flows.', stack: ['Python', 'RAG', 'BM25', 'RRF', 'MCP-shaped tools'], url: 'https://github.com/vi-nayKR/enterprise-agentic-rag-platform', color: '#a78bfa' },
    { title: 'SRE Observability Lab', track: 'Reliability', status: 'CI-verified lab', evidence: 'alert lifecycle', summary: 'Go instrumentation, Prometheus SLOs, Grafana dashboards, Alertmanager delivery, black-box probes, and a completed postmortem.', stack: ['Go', 'Prometheus', 'Grafana', 'Alertmanager'], url: 'https://github.com/vi-nayKR/homelab-sre-observability', color: '#61d095' },
    { title: 'Kubernetes Reliability Game Days', track: 'Reliability', status: 'Bounded failure lab', evidence: 'seven scenarios', summary: 'Reproducible readiness, image, config, DNS, OOM, rollout, drain, policy, diagnosis, and rollback exercises on kind.', stack: ['Kubernetes', 'kind', 'Kustomize', 'Conftest'], url: 'https://github.com/vi-nayKR/kubernetes-reliability-gamedays', color: '#61d095' },
    { title: 'Terraform AWS Baseline', track: 'Reliability', status: 'Validation-only', evidence: 'policy-checked plans', summary: 'Cost-bounded two-AZ Terraform design with budgets, optional ECS/ALB, mocked plans, and documented security exceptions.', stack: ['Terraform', 'AWS', 'ECS', 'Checkov'], url: 'https://github.com/vi-nayKR/terraform-aws-reliability-baseline', color: '#61d095' },
    { title: 'Linux Operations Toolkit', track: 'Reliability', status: 'Bounded operations lab', evidence: 'six recovery drills', summary: 'Ansible baselines, systemd services, guarded diagnostics, checksum-verified backups, and cross-distribution recovery practice.', stack: ['Ansible', 'Linux', 'systemd', 'Bash'], url: 'https://github.com/vi-nayKR/linux-operations-toolkit', color: '#61d095' },
    { title: 'Local LLM Inference Gateway', track: 'Applied AI', status: 'Prototype', evidence: 'OpenAI-shaped API', summary: 'Provider-neutral FastAPI gateway shapes, SSE delivery, local fallback, semantic cache utilities, safety checks, and fine-tuning simulations.', stack: ['Python', 'FastAPI', 'SSE', 'Caching'], url: 'https://github.com/vi-nayKR/local-llm-inference-gateway', color: '#a78bfa' },
  ];
  readonly experiences = [
    { role: 'Software Engineer — Full Stack', company: 'Liminal Custody · First Answer India Services', period: 'Nov 2025 – Mar 2026', location: 'Bengaluru, India', summary: 'Built Angular policy workflows and Node.js/TypeScript APIs for custody controls, atomic operations, cached risk checks, organization-scoped RBAC, quorum, and step-up authentication.', tags: ['Angular', 'TypeScript', 'Node.js', 'Redis', 'RBAC'] },
    { role: 'Senior Associate Software Engineer', company: 'Light & Wonder · LNW India Solutions', period: 'Aug 2023 – Jul 2025', location: 'Bengaluru, India', summary: 'Delivered typed Angular and React product workflows, C#/.NET APIs, WebSocket interfaces, centralized telemetry, audit reporting, and Cypress regression coverage.', tags: ['Angular', 'React', 'C#/.NET', 'RxJS', 'Cypress'] },
    { role: 'Full-Stack Intern', company: 'Light & Wonder · LNW India Solutions', period: 'Mar 2023 – Jul 2023', location: 'Bengaluru, India', summary: 'Completed a 16-week C#/.NET Core and Angular internship and delivered a game-recommendation system with feedback and ratings.', tags: ['Angular', 'C#/.NET', 'REST APIs', 'SQL Server'] },
  ];
  readonly resumes = [
    { label: 'Product / Backend', title: 'Full-Stack Resume', description: 'Angular, React, Node.js, Go, .NET, APIs, data, and end-to-end delivery.', url: '/resumes/vinay-kr-full-stack.pdf', download: 'Vinay_KR_Full_Stack_Resume.pdf' },
    { label: 'Intelligence', title: 'Applied AI Resume', description: 'Agentic workflows, RAG, FastAPI, retrieval, evaluation, and observability.', url: '/resumes/vinay-kr-applied-ai.pdf', download: 'Vinay_KR_Applied_AI_Resume.pdf' },
    { label: 'Platform', title: 'SRE / Platform Resume', description: 'Linux operations, Kubernetes, Terraform, SLOs, incident drills, and safe change.', url: '/resumes/vinay-kr-sre.pdf', download: 'Vinay_KR_SRE_Resume.pdf' },
  ];
  filteredProjects = () => this.selectedTrack() === 'All' ? this.projects : this.projects.filter((project) => project.track === this.selectedTrack());
}
