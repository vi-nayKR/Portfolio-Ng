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
            View my professional background in dark mode or light mode, directly on the page or as an embedded PDF.
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
                PDF Document
              </button>
            </div>

            <!-- PDF Theme Selector (When in PDF View) -->
            @if (activeView() === 'pdf') {
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
          @if (activeView() === 'pdf') {
            <div 
              class="relative w-full aspect-[1/1.414] md:h-[750px] md:aspect-auto rounded-xl overflow-hidden border border-border bg-abyss shadow-inner"
              [class.force-dark-pdf]="pdfTheme() === 'dark'"
              [class.force-light-pdf]="pdfTheme() === 'light'"
            >
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                class="resume-pdf-iframe w-full h-full border-none"
                allow="autoplay"
                loading="lazy"
                title="Vinay KR — Resume"
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
                  <p class="text-accent font-semibold text-sm">Full-Stack Engineer · Angular + TypeScript · Node.js/Go · PostgreSQL</p>
                </div>
                <div class="text-xs text-muted space-y-1 font-mono">
                  <p>📍 Bengaluru, India</p>
                  <p>📞 +91-7975893210</p>
                  <p>📧 vinayravindranatha&#64;gmail.com</p>
                  <p>🔗 linkedin.com/in/vi-naykr</p>
                  <p>🔗 github.com/vi-nayKR</p>
                </div>
              </div>

              <!-- Executive Summary -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-2">Summary</h4>
                <ul class="text-sm text-muted list-disc list-inside space-y-1.5 leading-relaxed">
                  <li>Full-stack engineer with 3 years building Angular/TypeScript frontends and Node.js and Go backends for fintech and enterprise platforms.</li>
                  <li>Owns features end to end — UI, API contract, schema, and deployment.</li>
                </ul>
              </div>

              <!-- Skills -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-3">Skills</h4>
                <div class="space-y-2 text-xs">
                  @for (group of skillGroups; track group.label) {
                    <div class="flex flex-col sm:flex-row sm:gap-3">
                      <span class="font-bold text-frost sm:w-36 shrink-0">{{ group.label }}</span>
                      <span class="text-muted">{{ group.items }}</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Work Experience Summary -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-4">Work Experience</h4>
                <div class="space-y-6">
                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Software Engineer – Full Stack</h5>
                      <span class="text-xs font-mono text-muted">Nov 2025 – Mar 2026</span>
                    </div>
                    <p class="text-xs font-semibold text-accent">Liminal Custody (First Answer India Services Pvt Ltd) · Bengaluru</p>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2">
                      <li>Sole engineer on the transaction firewall policy engine, owning Angular configuration screens for transaction-risk, transfer, and travel-rule policies at 3–5 screens per family.</li>
                      <li>Implemented the backend rule-evaluation engine and rule-condition-action schema, with Redis-cached short-circuit evaluation and TRM Labs integration for real-time address risk scoring.</li>
                      <li>Built multi-organization RBAC scoping application access by token and role — Angular route guards, a JWT and organization-context HTTP interceptor, and backend authorization middleware.</li>
                      <li>Integrated quorum approve/reject into policy changes, enforcing customer thresholds such as $500K per 24 hours before high-risk transactions could execute.</li>
                    </ul>
                  </div>

                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Senior Associate Software Engineer</h5>
                      <span class="text-xs font-mono text-muted">Aug 2023 – Jul 2025</span>
                    </div>
                    <p class="text-xs font-semibold text-accent">Light &amp; Wonder (LNW India Solutions Pvt Ltd) · Bengaluru</p>
                    <p class="text-xs text-muted italic">Promoted from Associate Software Engineer</p>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2">
                      <li>Built and modernised 20 modules and 50+ Angular screens across four casino product lines — Cage Credit, Servizio, Engage player data, and iView slot-machine displays.</li>
                      <li>Fixed a video-memory leak that hung slot machines after about an hour, caching slideshow media and adding ngOnDestroy teardown for out-of-view components.</li>
                      <li>Wrote and maintained 750+ Cypress end-to-end tests across Servizio and Engage with one other engineer, holding regression coverage through compliance-certified releases.</li>
                      <li>Automated audit capture using SQL Server triggers across 100+ tables in Servizio and Engage, and built the Angular reporting UI for compliance reports.</li>
                      <li>Integrated Angular front ends with C#/.NET Core Web APIs, debugging cross-team service defects through to review and approval.</li>
                    </ul>
                  </div>

                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Full Stack Intern</h5>
                      <span class="text-xs font-mono text-muted">Mar 2023 – Jul 2023</span>
                    </div>
                    <p class="text-xs font-semibold text-accent">Light &amp; Wonder (LNW India Solutions Pvt Ltd) · Bengaluru</p>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2">
                      <li>Built a Game Recommendation System in C#/.NET Core and Angular over a 16-week internship, covering REST APIs, SQL Server, and debugging.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Projects -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-3">Projects</h4>
                <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                  <div class="flex justify-between items-baseline flex-wrap gap-2">
                    <h5 class="text-base font-bold text-frost">Medha — Independent Full-Stack Project</h5>
                    <span class="text-xs font-mono text-muted">Aug 2025 – Present</span>
                  </div>
                  <p class="text-xs font-semibold text-accent">Go · chi · PostgreSQL/PostGIS · Redis · MinIO · Docker · Kubernetes · Cloudflare Tunnel</p>
                  <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2">
                    <li>Building a Go/chi REST API deployed end to end on a self-hosted Kubernetes cluster — 21 bounded contexts, ~200 endpoints, 50 migrations, and 109 tests.</li>
                    <li>Implemented PostGIS proximity search using ST_DWithin over a GIST-indexed geography column, with distance-ordered keyset pagination for location-based matching.</li>
                    <li>Designed OTP authentication with JWT RS256 sessions and WebSocket messaging fanned out across pods over Redis pub/sub, with MinIO backing media storage.</li>
                    <li>Deployed through Argo CD GitOps with dev/prod namespace isolation, default-deny NetworkPolicies, SealedSecrets, and an outbound-only Cloudflare Tunnel.</li>
                  </ul>
                </div>
              </div>

              <!-- Education -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-2">Education</h4>
                <div class="flex justify-between items-baseline flex-wrap gap-2 text-xs">
                  <div>
                    <p class="font-bold text-frost">Bachelor of Engineering in Computer Science</p>
                    <p class="text-muted">Siddaganga Institute of Technology, Tumakuru, Karnataka</p>
                  </div>
                  <span class="font-mono text-accent font-semibold">CGPA 8.65/10 · Aug 2019 – Jul 2023</span>
                </div>
              </div>
            </div>
          }

          <!-- Buttons/Actions -->
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
              download="Vinay_KR_Resume.pdf"
              class="flex items-center justify-center gap-2.5 px-6 py-3.5 w-full sm:w-auto rounded-xl border border-border hover:border-accent/40 hover:bg-surface text-frost font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ResumeComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);
  activeView = signal<'interactive' | 'pdf'>('interactive');
  pdfTheme = signal<PdfTheme>(readStoredTheme());

  constructor() {
    // Persist the reader's PDF theme choice across visits. An effect is the right
    // tool here because writing to localStorage is a side effect outside Angular —
    // deriving state would be computed()'s job, not this.
    effect(() => {
      const theme = this.pdfTheme();
      try {
        localStorage.setItem(PDF_THEME_KEY, theme);
      } catch {
        // Storage unavailable (private mode / quota) — the toggle still works in-session.
      }
    });
  }

  skillGroups = [
    { label: 'Frontend', items: 'Angular, TypeScript, RxJS, Reactive Forms, HTML5, CSS3' },
    { label: 'Backend', items: 'Node.js, Express.js, TypeORM, Go (chi), REST API Design, WebSockets' },
    { label: 'Databases', items: 'PostgreSQL, PostGIS, MySQL, SQL Server, Redis' },
    { label: 'Infrastructure', items: 'Docker, Kubernetes (k3s), Argo CD, Cloudflare Tunnel, MinIO, AWS S3' },
    { label: 'Testing & Tools', items: 'Cypress, Git, Postman/OpenAPI' },
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
