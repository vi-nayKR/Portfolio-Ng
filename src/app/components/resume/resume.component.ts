import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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
                  <p class="text-accent font-semibold text-sm">Angular Developer · TypeScript, RxJS · Node.js/Express · MySQL</p>
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
                  <li>Full-stack developer with 3+ years of experience building Angular and TypeScript applications, including reactive forms, RxJS-driven state, and component-based UI for enterprise platforms.</li>
                  <li>Backend experience extends to REST API design with Node.js, Express, and TypeORM, and relational data modelling with MySQL and SQL Server.</li>
                  <li>Comfortable owning a feature end to end — from the Angular UI and API contract through to the MySQL database — with additional exposure to an independent Go/PostgreSQL backend project.</li>
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
                      <li>Designed and built the firewall policy engine's Angular frontend — rule configuration screens for transaction risk, transfer, and travel-rule policies, address allow/block lists, and wallet-group rules — using a shared, rule-type-aware controls component and an approval workflow for policy changes.</li>
                      <li>Implemented the backend firewall rule-evaluation engine and its database schema (a rule → condition → action composition model), with Redis-cached, short-circuit rule evaluation and TRM Labs integration for real-time address risk scoring.</li>
                      <li>Debugged and hardened the firewall/quorum transaction-approval flow end to end, including fixing a token-scoping security gap in the firewall setup endpoint and an intermittent quorum-configuration lookup failure, and implemented the quorum approve/reject API integration for firewall rule requests.</li>
                      <li>Contributed to the platform's multi-organization RBAC system — Angular route guards and an HTTP interceptor for JWT and organization context, and backend middleware for role- and organization-scoped endpoint access — with minor work on the webhook retry/delivery pipeline.</li>
                    </ul>
                  </div>

                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Senior Associate Software Engineer</h5>
                      <span class="text-xs font-mono text-muted">Aug 2023 – Jul 2025</span>
                    </div>
                    <p class="text-xs font-semibold text-accent">Light &amp; Wonder (LNW India Solutions Pvt Ltd) · Bengaluru</p>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2">
                      <li>Modernised and built Angular screens across multiple product lines — including a financial transaction system (Cage Credit), a player-data management platform (Engage), and slot-machine content and widgets (iView) — converting business workflows into reusable, typed, component-based UI.</li>
                      <li>Used RxJS and WebSocket integration for real-time UI updates on slot-machine secondary displays, and diagnosed and fixed a subscription-related memory leak that was causing device instability after extended use.</li>
                      <li>Integrated Angular front ends with backend REST APIs, including C#/.NET Core Web APIs for the Cage Credit banking and settlement workflows.</li>
                      <li>Automated audit-data capture using SQL Server database triggers and built the Angular reporting UI for generating and reviewing compliance reports.</li>
                      <li>Wrote and maintained Cypress end-to-end tests to support regression coverage across Angular application releases.</li>
                    </ul>
                  </div>

                  <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                    <div class="flex justify-between items-baseline flex-wrap gap-2">
                      <h5 class="text-base font-bold text-frost">Full Stack Intern</h5>
                      <span class="text-xs font-mono text-muted">Mar 2023 – Jul 2023</span>
                    </div>
                    <p class="text-xs font-semibold text-accent">Light &amp; Wonder (LNW India Solutions Pvt Ltd) · Bengaluru</p>
                    <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2">
                      <li>Completed a 16-week internship in C#/.NET Core and Angular, building a Game Recommendation System with user feedback and rating functionality, with hands-on exposure to REST APIs, SQL Server, and debugging.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Projects -->
              <div>
                <h4 class="text-xs font-mono uppercase tracking-widest text-accent mb-3">Projects</h4>
                <div class="border-l-2 border-accent/40 pl-4 space-y-1.5">
                  <h5 class="text-base font-bold text-frost">Medha — Independent Full-Stack Project</h5>
                  <p class="text-xs font-semibold text-accent">Go, PostgreSQL, Redis, Docker</p>
                  <ul class="text-xs text-muted list-disc list-inside space-y-1 mt-2">
                    <li>Building and maintaining a REST API backend (Go/Chi) with a PostgreSQL data layer, Redis-backed caching, and object storage, deployed through a Dockerised CI/CD pipeline to a self-hosted environment.</li>
                    <li>Designed authentication flows (OTP verification, token-based sessions) and validated API contracts using OpenAPI and Postman.</li>
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
  pdfTheme = signal<'auto' | 'dark' | 'light'>('auto');

  skillGroups = [
    { label: 'Frontend', items: 'Angular, TypeScript, RxJS, Reactive Forms, HTML5, CSS3' },
    { label: 'Backend', items: 'Node.js, Express.js, TypeORM, REST API Design' },
    { label: 'Databases', items: 'MySQL, SQL Server' },
    { label: 'Testing & Tools', items: 'Git, Cypress, Docker, Postman/OpenAPI, AWS (S3, EC2)' },
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
