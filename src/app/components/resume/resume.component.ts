import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="resume" class="relative py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-void">
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div
          class="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style="background: radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)"
        ></div>
      </div>

      <div
        class="absolute right-[-5%] top-1/3 outline-bg-text select-none pointer-events-none font-black opacity-10 hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -0.5) + 'px, 0, 0)'"
      >
        RESUME
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-8 md:mb-12">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-3">Curriculum Vitae</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost mb-4 text-balance">
            Resume &amp; Qualifications
          </h2>
          <p class="text-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A structured overview of professional experience, engineering projects, and technical skills.
          </p>
        </div>

        <div
          class="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 items-start"
          [style.opacity]="visible() ? '1' : '0'"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
          style="transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <div class="p-6 md:p-8 rounded-2xl apple-glass space-y-7">
            <div>
              <p class="text-xs font-mono uppercase tracking-widest text-accent mb-3">Professional Background</p>
              <p class="text-muted leading-relaxed">
                {{ selectedResume().professionalCore }}
              </p>
            </div>

            <div>
              <p class="text-xs font-mono uppercase tracking-widest text-accent mb-3">Engineering Projects</p>
              <p class="text-muted leading-relaxed">
                {{ selectedResume().projectEvidence }}
              </p>
            </div>

            <div class="space-y-3">
              @for (group of selectedResume().skillGroups; track group.label) {
                <div class="p-3.5 rounded-xl bg-void/50 border border-border/40">
                  <p class="text-xs font-semibold text-frost mb-1">{{ group.label }}</p>
                  <p class="text-xs text-muted leading-relaxed">{{ group.items }}</p>
                </div>
              }
            </div>

            <p class="text-xs text-muted leading-relaxed border-l-2 border-accent/40 pl-3">
              Professional experience and project implementations are verified with reproducible test harnesses and local validation benchmarks.
            </p>
          </div>

          <div class="apple-glass rounded-2xl overflow-hidden p-3 md:p-4 shadow-2xl">
            <iframe
              [src]="selectedResume().preview"
              [title]="selectedResume().title"
              class="w-full h-[620px] md:h-[780px] rounded-xl bg-white border border-border"
            ></iframe>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                [href]="selectedResume().url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto rounded-xl bg-accent hover:bg-accent-glow text-frost font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Open Resume
              </a>

              <a
                [href]="selectedResume().url"
                [download]="selectedResume().download"
                class="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto rounded-xl border border-border hover:border-accent/40 hover:bg-surface text-frost font-bold text-sm transition-all duration-300"
              >
                <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ResumeComponent {
  visible = signal(false);
  parallaxOffset = signal(0);
  private readonly sanitizer = inject(DomSanitizer);

  resumes = [
    {
      title: 'Vinay K R applied AI engineer resume',
      url: '/resumes/vinay-kr-applied-ai.pdf',
      preview: this.sanitizer.bypassSecurityTrustResourceUrl('/resumes/vinay-kr-applied-ai.pdf#view=FitH'),
      download: 'Vinay_KR_Applied_AI_Resume.pdf',
      professionalCore: 'Nearly three years of software engineering across fintech and regulated gaming, specializing in Applied AI systems, typed APIs, ML recommendation pipelines, authorization, caching, real-time interfaces, and production telemetry.',
      projectEvidence: 'Flagship FastAPI project features typed LangGraph multi-agent routing, real model provider mode with structured outputs, hybrid retrieval (BM25 + dense semantic hashing with RRF), and a 30-case reproducible evaluation benchmark with zero unauthorized mutations.',
      skillGroups: [
        { label: 'Applied AI & Agents', items: 'Python, FastAPI, LangGraph, multi-agent routing, structured outputs, hybrid RAG, BM25, RRF, SSE, vector caching' },
        { label: 'Evaluation & Telemetry', items: 'Reproducible benchmarks, Recall@k, MRR, abstention calibration, OpenTelemetry, guardrails' },
        { label: 'Backend & Data Systems', items: 'Go, PostgreSQL, pgvector, PostGIS, Redis Pub/Sub, Node.js, C#/.NET, Docker, CI/CD' },
      ],
    }
  ];
  selectedResume = signal(this.resumes[0]);

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.02);
  }

  constructor() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const element = document.querySelector('#resume');
      if (element) observer.observe(element);
    }, 100);
  }
}
