import { Component, OnInit, signal, effect, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

const PDF_THEME_KEY = 'resume-pdf-theme';
type PdfTheme = 'auto' | 'dark' | 'light';

/** Restores the visitor's saved PDF theme, falling back to 'auto'. */
function readStoredTheme(): PdfTheme {
  try {
    const stored = localStorage.getItem(PDF_THEME_KEY);
    if (stored === 'auto' || stored === 'dark' || stored === 'light') return stored;
  } catch {
    // Storage unavailable — fall through to the default.
  }
  return 'auto';
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="resume" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden bg-void">
      <!-- Parallax background decorative elements -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
             style="background: radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline background Typography -->
      <div
        class="absolute right-[-5%] top-1/3 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -0.5) + 'px, 0, 0)'"
      >
        RESUME
      </div>

      <div class="relative z-10 max-w-5xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8 md:mb-12">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-3">Curriculum Vitae</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost mb-4 text-balance">
            Interactive Resume
          </h2>
          <p class="text-muted max-w-xl mx-auto text-sm leading-relaxed">
            Senior GenAI &amp; Applied AI Systems Engineer — View interactive web resume or download official publication PDF.
          </p>
        </div>

        <!-- Resume Container -->
        <div 
          class="apple-glass rounded-2xl overflow-hidden p-4 md:p-6 shadow-2xl flex flex-col gap-6"
          [style.opacity]="visible() ? '1' : '0'"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
          style="transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <!-- Controls Bar: View Mode Switcher + PDF Theme Switcher -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-abyss/80 p-3 rounded-xl border border-border">
            <!-- View Mode Switcher -->
            <div class="flex items-center gap-1 bg-void/60 p-1 rounded-lg border border-border/40 w-full sm:w-auto justify-center">
              @if (pdfAvailable) {
              <button
                (click)="activeView.set('interactive')"
                class="px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                [class.bg-accent]="activeView() === 'interactive'"
                [class.text-frost]="activeView() === 'interactive'"
                [class.text-muted]="activeView() !== 'interactive'"
                [class.hover:text-frost]="activeView() !== 'interactive'"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Web Resume
              </button>
              <button
                (click)="activeView.set('pdf')"
                class="px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                [class.bg-accent]="activeView() === 'pdf'"
                [class.text-frost]="activeView() === 'pdf'"
                [class.text-muted]="activeView() !== 'pdf'"
                [class.hover:text-frost]="activeView() !== 'pdf'"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                PDF Document (Times New Roman)
              </button>
              } @else {
                <span class="px-3.5 py-1.5 text-xs font-semibold text-muted flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Web Resume
                </span>
              }
            </div>

            <!-- PDF Theme Selector (When in PDF View) -->
            @if (pdfAvailable && activeView() === 'pdf') {
              <div class="flex items-center gap-2 text-xs text-muted">
                <span class="font-mono text-[11px] uppercase tracking-wider hidden md:inline">PDF Color Mode:</span>
                <div class="flex items-center gap-1 bg-void/60 p-1 rounded-lg border border-border/40">
                  <button
                    (click)="pdfTheme.set('auto')"
                    class="px-2.5 py-1 rounded text-xs transition-all duration-200 cursor-pointer"
                    [class.bg-surface]="pdfTheme() === 'auto'"
                    [class.text-accent]="pdfTheme() === 'auto'"
                    [class.text-muted]="pdfTheme() !== 'auto'"
                    title="Auto (Matches site dark/light theme)"
                  >
                    Auto
                  </button>
                  <button
                    (click)="pdfTheme.set('dark')"
                    class="px-2.5 py-1 rounded text-xs transition-all duration-200 flex items-center gap-1 cursor-pointer"
                    [class.bg-surface]="pdfTheme() === 'dark'"
                    [class.text-accent]="pdfTheme() === 'dark'"
                    [class.text-muted]="pdfTheme() !== 'dark'"
                    title="Force Dark Mode PDF"
                  >
                    🌙 Dark
                  </button>
                  <button
                    (click)="pdfTheme.set('light')"
                    class="px-2.5 py-1 rounded text-xs transition-all duration-200 flex items-center gap-1 cursor-pointer"
                    [class.bg-surface]="pdfTheme() === 'light'"
                    [class.text-accent]="pdfTheme() === 'light'"
                    [class.text-muted]="pdfTheme() !== 'light'"
                    title="Force Light Mode PDF"
                  >
                    ☀️ Light
                  </button>
                </div>
              </div>
            }
          </div>

          <!-- PDF Document View -->
          @if (pdfAvailable && activeView() === 'pdf') {
            <div 
              class="relative w-full aspect-[1/1.414] md:h-[800px] md:aspect-auto rounded-xl overflow-hidden border border-border bg-abyss shadow-inner"
              [class.force-dark-pdf]="pdfTheme() === 'dark'"
              [class.force-light-pdf]="pdfTheme() === 'light'"
            >
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                class="resume-pdf-iframe w-full h-full border-none"
                allow="autoplay"
                loading="lazy"
                title="Vinay KR — Senior AI Engineer Resume"
              ></iframe>
            </div>
          }

          <!-- Interactive Web Resume View -->
          @if (activeView() === 'interactive') {
            <div class="bg-surface/90 rounded-xl p-6 md:p-10 border border-border/80 text-frost space-y-8 font-sans transition-colors duration-300">
              <!-- Resume Web Header -->
              <div class="border-b border-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 class="text-3xl font-display font-bold text-frost mb-1">Vinay K R</h3>
                  <p class="text-accent font-semibold text-sm font-mono">Senior GenAI &amp; Applied AI Systems Engineer</p>
                </div>
                <div class="text-xs text-muted space-y-1 font-mono">
                  <p>📍 Bengaluru, India (Hybrid / Remote)</p>
                  <p>📞 +91 7975893210</p>
                  <p>📧 vinayravindranatha&#64;gmail.com</p>
                  <p>🔗 linkedin.com/in/vi-naykr</p>
                  <p>🔗 github.com/vi-nayKR</p>
                  <p>🌐 vinaykr.dev</p>
                </div>
              </div>

              <!-- Executive Summary -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-2">Professional Summary</h4>
                <p class="text-sm text-muted leading-relaxed text-justify">
                  Senior GenAI &amp; Applied AI Systems Engineer with <strong class="text-frost">3+ years of enterprise experience</strong> architecting high-throughput distributed microservices, autonomous agentic workflows, and production Generative AI platforms across fintech (<strong class="text-frost">Liminal Custody</strong>) and gaming technologies (<strong class="text-frost">Light &amp; Wonder</strong>). Specialized in <strong class="text-frost">Advanced Hybrid RAG (pgvector HNSW + BM25 + Reciprocal Rank Fusion)</strong>, <strong class="text-frost">Multi-Agent Orchestration (LangGraph, Semantic Kernel, Model Context Protocol [MCP])</strong>, and <strong class="text-frost">Local LLM Serving (vLLM PagedAttention, Redis semantic caching, LoRA/QLoRA 4-bit fine-tuning)</strong>. Creator of an independent <strong class="text-frost">21-service microservices platform load-tested at 500 RPS (p95 &lt;85ms)</strong>; authored <strong class="text-frost">750+ automated E2E test suites</strong> with zero production compliance regressions.
                </p>
              </div>

              <!-- Technical Expertise -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-3">Technical Expertise</h4>
                <div class="space-y-2.5 text-xs">
                  @for (group of skillGroups; track group.label) {
                    <div class="flex flex-col sm:flex-row sm:gap-4 p-2 rounded-lg bg-void/40 border border-border/30">
                      <span class="font-bold text-frost sm:w-44 shrink-0 font-mono">{{ group.label }}</span>
                      <span class="text-muted leading-relaxed">{{ group.items }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Work Experience Summary -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-4">Professional Experience</h4>
                <div class="space-y-6">
                  <!-- Liminal Custody -->
                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Software Engineer – Full Stack &amp; AI Systems</h5>
                      <span class="text-xs font-mono text-accent font-bold">Nov 2025 – Mar 2026 | Bengaluru, India</span>
                    </div>
                    <p class="text-xs font-semibold text-muted">Liminal Custody (First Answer India Services Pvt Ltd)</p>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1.5 mt-2 leading-relaxed">
                      <li>Architected and shipped the core <strong class="text-frost">Transaction Firewall Policy Engine</strong> and AI risk-scoring rules engine, enabling real-time threat detection and crypto asset transfer governance across 5 enterprise screen families.</li>
                      <li>Designed rule-condition-action evaluation pipelines with <strong class="text-frost">Redis 8 vector and memory caching</strong>, reducing rule evaluation latency by <strong class="text-frost">65%</strong> and integrating TRM Labs threat intelligence for real-time cryptocurrency address risk scoring.</li>
                      <li>Engineered multi-organization RBAC and claim-scoping middleware with JWT authorization, Angular route guards, and HTTP interceptors, securing multi-tenant digital asset custody operations.</li>
                      <li>Implemented multi-signature quorum consensus validation for policy mutations, enforcing enterprise threshold controls (e.g., $100K/24hr window) prior to critical transaction execution.</li>
                    </ul>
                  </div>

                  <!-- Light & Wonder Senior Associate -->
                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Senior Associate Software Engineer</h5>
                      <span class="text-xs font-mono text-accent font-bold">Aug 2023 – Jul 2025 | Bengaluru, India</span>
                    </div>
                    <p class="text-xs font-semibold text-muted">Light &amp; Wonder (LNW India Solutions Pvt Ltd) <span class="italic text-accent/80">(Promoted from Associate Software Engineer)</span></p>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1.5 mt-2 leading-relaxed">
                      <li>Modernized 20 enterprise modules and 50+ UI screens across 4 casino product lines (Cage Credit, Servizio, Engage telemetry, iView displays) interfacing with high-throughput C#/.NET Core Web APIs.</li>
                      <li>Architected a <strong class="text-frost">Game Recommendation Engine</strong> utilizing semantic clustering and real-time player telemetry, increasing user engagement by <strong class="text-frost">18%</strong>.</li>
                      <li>Eliminated critical video-memory leak causing slot-machine crashes during long-running media playback by engineering media caching and explicit <code class="text-accent">ngOnDestroy</code> lifecycle teardowns.</li>
                      <li>Authored and maintained <strong class="text-frost">750+ Cypress automated E2E regression test suites</strong> across Servizio (~300 tests) and Engage with one peer, sustaining zero-defect compliance through regulated gaming certification releases.</li>
                      <li>Built real-time SQL Server CDC and trigger audit telemetry across 100+ database tables with custom reporting interfaces for strict regulatory compliance audits.</li>
                    </ul>
                  </div>

                  <!-- Light & Wonder Intern -->
                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Full Stack Intern</h5>
                      <span class="text-xs font-mono text-accent font-bold">Mar 2023 – Jul 2023 | Bengaluru, India</span>
                    </div>
                    <p class="text-xs font-semibold text-muted">Light &amp; Wonder (LNW India Solutions Pvt Ltd)</p>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1.5 mt-2 leading-relaxed">
                      <li>Developed a Game Recommendation System using C#/.NET Core Minimal APIs and Angular, mastering asynchronous programming, database query optimization, and REST API design.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Production AI & Systems Projects -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-4">Production AI &amp; Systems Projects</h4>
                <div class="space-y-6">
                  <!-- Enterprise Agentic RAG -->
                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Enterprise Agentic RAG Platform</h5>
                      <span class="text-xs font-mono text-muted">Python FastAPI · LangGraph · pgvector · MCP · Angular 22 | 2026</span>
                    </div>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2 leading-relaxed">
                      <li>Designed an enterprise Multi-Agent RAG platform supporting multi-format document ingestion (.pdf, .docx, .xlsx, .md) with <strong class="text-frost">pgvector HNSW indexing</strong> and citation-grounded SSE streaming.</li>
                      <li>Implemented <strong class="text-frost">Hybrid Retrieval</strong> fusing dense embeddings with PostgreSQL BM25 via <strong class="text-frost">Reciprocal Rank Fusion (RRF, k=60)</strong>, improving domain retrieval recall by <strong class="text-frost">34%</strong>.</li>
                      <li>Integrated <strong class="text-frost">Model Context Protocol (MCP)</strong> tool execution, enabling AI agents to autonomously query enterprise databases and external compliance APIs.</li>
                      <li>Built continuous evaluation pipelines using <strong class="text-frost">Ragas</strong> (Faithfulness &gt; 0.92, Context Recall &gt; 0.88) with end-to-end OpenTelemetry distributed tracing.</li>
                    </ul>
                  </div>

                  <!-- Local LLM Inference Gateway -->
                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">High-Throughput Local LLM Inference Gateway &amp; LoRA Pipeline</h5>
                      <span class="text-xs font-mono text-muted">FastAPI · vLLM · Redis · Unsloth · PEFT | 2026</span>
                    </div>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2 leading-relaxed">
                      <li>Built an asynchronous Python FastAPI inference gateway with <strong class="text-frost">Redis 8 vector semantic caching</strong>, returning <strong class="text-frost">sub-5ms cached responses</strong> for 40%+ of repetitive queries.</li>
                      <li>Deployed quantized 8B local models via <strong class="text-frost">vLLM with PagedAttention and continuous batching</strong>, slashing cloud LLM API costs by <strong class="text-frost">60%</strong>.</li>
                      <li>Engineered an automated <strong class="text-frost">4-bit QLoRA fine-tuning pipeline</strong> using Unsloth and PEFT on specialized domain instruction datasets with NeMo Guardrails for input sanitization and prompt injection defense.</li>
                    </ul>
                  </div>

                  <!-- Medha -->
                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Medha — Distributed Microservices Platform (Scale Proof)</h5>
                      <span class="text-xs font-mono text-muted">Go · PostgreSQL/PostGIS · Redis · Docker · k3s · Argo CD | Aug 2025 – Present</span>
                    </div>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2 leading-relaxed">
                      <li>Architected an independent distributed backend with <strong class="text-frost">21 bounded microservices, ~200 REST endpoints</strong>, 50 database migrations, and 109 automated integration tests.</li>
                      <li>Validated high-concurrency throughput under distributed load testing at <strong class="text-frost">500 RPS with 100% success rate and p95 latency &lt;85ms</strong>.</li>
                      <li>Implemented PostGIS proximity search using <code>ST_DWithin</code> over GIST spatial indexes with distance-ordered keyset pagination.</li>
                      <li>Deployed via <strong class="text-frost">Argo CD GitOps on Kubernetes (k3s)</strong> with dev/prod namespace isolation, default-deny NetworkPolicies, SealedSecrets, and Cloudflare Tunnels.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Education -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-2">Education &amp; Academic Credentials</h4>
                <div class="p-4 rounded-xl bg-void/50 border border-border/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                  <div>
                    <p class="font-bold text-frost text-sm">Siddaganga Institute of Technology (SIT), Tumakuru, Karnataka, India</p>
                    <p class="text-muted mt-0.5">Bachelor of Engineering (B.E.) in Computer Science &amp; Engineering</p>
                  </div>
                  <div class="text-right sm:text-right font-mono">
                    <span class="text-accent font-bold block text-sm">CGPA: 8.65 / 10.0</span>
                    <span class="text-muted text-[11px]">Aug 2019 – Jul 2023</span>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Buttons/Actions -->
          @if (pdfAvailable) {
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-border/60 pt-6">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2.5 px-6 py-3.5 w-full sm:w-auto rounded-xl bg-accent hover:bg-accent-glow text-frost font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Open PDF in New Tab
            </a>

            <a
              href="/resume.pdf"
              download="Vinay_KR_Senior_AI_Engineer_Resume.pdf"
              class="flex items-center justify-center gap-2.5 px-6 py-3.5 w-full sm:w-auto rounded-xl border border-border hover:border-accent/40 hover:bg-surface text-frost font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download PDF (Times New Roman)
            </a>
          </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ResumeComponent implements OnInit {
  readonly pdfAvailable = true;

  visible = signal(false);
  parallaxOffset = signal(0);
  activeView = signal<'interactive' | 'pdf'>('interactive');
  pdfTheme = signal<PdfTheme>(readStoredTheme());

  constructor() {
    effect(() => {
      const theme = this.pdfTheme();
      try {
        localStorage.setItem(PDF_THEME_KEY, theme);
      } catch {
        // Storage unavailable — fallback
      }
    });
  }

  skillGroups = [
    { label: 'GenAI & Agents', items: 'LangGraph (Cyclic Graphs, Reflection), Semantic Kernel 1.79, Model Context Protocol (MCP), ReAct Loops, Tool Calling, PydanticAI, NeMo Guardrails' },
    { label: 'RAG & Vector Stores', items: 'Advanced Modular RAG, PostgreSQL 18 + pgvector (HNSW Cosine), Qdrant, BM25 Lexical Search, Reciprocal Rank Fusion (RRF, k=60), Contextual Chunking' },
    { label: 'Inference & Tuning', items: 'vLLM (PagedAttention, Continuous Batching), Ollama, 4-bit QLoRA/LoRA (Unsloth, PEFT), Redis 8 Vector Semantic Caching (<5ms), SSE Streaming' },
    { label: 'Evals & Observability', items: 'Ragas 0.2 (Faithfulness, Answer Relevance, Context Recall), DeepEval, LLM-as-a-Judge, OpenTelemetry, Arize Phoenix, Jaeger Tracing' },
    { label: 'Backend & Cloud', items: 'Python 3.12+ (FastAPI, Pydantic v2, Asyncio), C# 14 (.NET 10 LTS Minimal APIs), Go (chi), PostgreSQL 18, Redis 8.10, Docker, Kubernetes (k3s), Argo CD' },
    { label: 'Frontend & Testing', items: 'Angular 22 (Signals, linkedSignal, resource, Zoneless CD), TypeScript 7, Cypress (750+ E2E Tests), Pytest-asyncio, xUnit v3' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.02);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#resume');
      if (el) observer.observe(el);
    }, 100);
  }
}
