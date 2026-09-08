import { Component, ChangeDetectionStrategy, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TiltDirective, SafeHtmlPipe],
  template: `
    <section id="skills" class="relative py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Parallax bg element -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
             style="background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline background Typography -->
      <div
        class="absolute left-[-15%] top-1/3 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.0) + 'px, 0, 0)'"
      >
        EXPERTISE
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-8 md:mb-12">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Technical Expertise</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Skills &amp; Technologies
          </h2>
        </div>

        <!-- Category grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (category of categories; track category.name) {
            <div
              appTilt
              [maxTilt]="10"
              [scale]="1.03"
              class="p-6 rounded-2xl apple-glass card-hover"
            >
              <div class="flex items-center gap-3 mb-5">
                <div class="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span [innerHTML]="category.icon | safeHtml" class="text-accent"></span>
                </div>
                <h3 class="font-display font-semibold text-frost">{{ category.name }}</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                @for (skill of category.skills; track skill.name) {
                  <span class="px-3 py-1.5 rounded-xl text-sm font-bold bg-void border border-border text-frost hover:border-accent/50 hover:text-accent transition-all duration-300 drop-shadow-md">
                    {{ skill.name }}
                  </span>
                }
              </div>
            </div>
          }
        </div>

        <!-- Tag cloud -->
        <div class="mt-12 text-center">
          <p class="text-muted text-sm mb-6 font-mono">Also familiar with</p>
          <div class="flex flex-wrap justify-center gap-2">
            @for (tag of extraTags; track tag) {
              <span class="px-3 py-1.5 rounded-full text-xs font-medium apple-glass text-frost hover:border-accent/50 hover:text-accent transition-all duration-200 cursor-default">
                {{ tag }}
              </span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  categories = [
    {
      name: 'LLM & Agent Architectures',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/></svg>',
      skills: [
        { name: 'Python & FastAPI' },
        { name: 'LangGraph' },
        { name: 'Multi-Agent Routing' },
        { name: 'Structured Outputs' },
        { name: 'Tool Calling & Actions' },
        { name: 'SSE Streaming' },
      ],
    },
    {
      name: 'Retrieval & Vector Search',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
      skills: [
        { name: 'Hybrid RAG' },
        { name: 'Okapi BM25' },
        { name: 'Dense Semantic Search' },
        { name: 'RRF Reranking' },
        { name: 'Vector Caching' },
        { name: 'Context Compression' },
      ],
    },
    {
      name: 'AI Evaluation & Guardrails',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
      skills: [
        { name: 'Benchmark Evals' },
        { name: 'Recall@k & MRR' },
        { name: 'Abstention Calibration' },
        { name: 'Hallucination Defense' },
        { name: 'Prompt Injection Guard' },
        { name: 'Pydantic Guardrails' },
      ],
    },
    {
      name: 'AI Backend & Data Systems',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
      skills: [
        { name: 'Go / chi' },
        { name: 'PostgreSQL & pgvector' },
        { name: 'PostGIS Proximity' },
        { name: 'Redis Pub/Sub' },
        { name: 'Asynchronous Workers' },
        { name: 'Distributed Caching' },
      ],
    },
    {
      name: 'Observability & AI Telemetry',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
      skills: [
        { name: 'OpenTelemetry' },
        { name: 'Trace & Span Modeling' },
        { name: 'Token & Cost Tracking' },
        { name: 'Latency Profiling' },
        { name: 'Prometheus & Grafana' },
        { name: 'Alertmanager SLOs' },
      ],
    },
    {
      name: 'Machine Learning & Deep Learning',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 12H15.25M12 8.75V15.25"/></svg>',
      skills: [
        { name: 'PyTorch & LSTM' },
        { name: 'Collaborative Filtering' },
        { name: 'Computer Vision (YOLO)' },
        { name: 'Recommender Systems' },
        { name: 'Matrix Factorization' },
        { name: 'Model Serving' },
      ],
    },
  ];

  extraTags = ['Docker', 'GitHub Actions CI', 'Strict Mypy', 'Pytest', 'JWT & RBAC', 'Node.js', 'C# / .NET Core', 'SQL Server', 'Cypress', 'Tailwind CSS'];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.03);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#skills');
      if (el) observer.observe(el);
    }, 100);
  }
}
