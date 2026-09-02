import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-conference',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TiltDirective],
  template: `
    <section id="conference" class="relative py-16 md:py-28 px-4 md:px-6 overflow-hidden">
      <!-- Background glows -->
      <div class="absolute inset-0 pointer-events-none" [style.transform]="'translateY(' + parallaxOffset() + 'px)'">
        <div class="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style="background: radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 65%)"></div>
        <div class="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full"
          style="background: radial-gradient(circle, rgba(0,98,155,0.05) 0%, transparent 65%)"></div>
      </div>

      <!-- Parallax bg word -->
      <div
        class="absolute left-[-4%] top-1/2 outline-bg-text select-none pointer-events-none font-black opacity-5 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (-parallaxOffset() * 0.6) + 'px, -50%, 0)'"
      >PUBLISHED</div>

      <div class="relative z-10 max-w-6xl mx-auto space-y-10">
        <!-- Section header -->
        <div class="text-center mb-12 md:mb-8 md:mb-12">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Peer-Reviewed Research &amp; Live Implementation</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance mb-6">
            Conference &amp; Live Deployment
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-accent to-accent-glow mx-auto rounded-full"></div>
        </div>

        <!-- LIVE PRODUCTION DEPLOYMENT SHOWCASE HERO CARD WITH YOUTUBE-STYLE THUMBNAIL MOCKUP -->
        <div
          appTilt
          [maxTilt]="1.5"
          [scale]="1.005"
          class="w-full rounded-3xl apple-glass border border-accent/40 overflow-hidden shadow-2xl relative p-6 sm:p-8 md:p-10 space-y-8"
          [style.opacity]="visible() ? '1' : '0'"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
          style="transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <!-- Top Overview & Action Header -->
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div class="space-y-3 max-w-3xl">
              <div class="flex flex-wrap items-center gap-2.5">
                <span class="text-[10px] font-mono text-accent bg-accent/15 border border-accent/30 px-3 py-1 rounded-full uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                  LIVE CLOUDFLARE PRODUCTION
                </span>
                <span class="text-[10px] font-mono text-[#089981] bg-[#089981]/15 border border-[#089981]/30 px-3 py-1 rounded-full uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-[#089981]"></span>
                  GLOBAL EDGE OPERATIONAL
                </span>
              </div>

              <h3 class="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-frost tracking-tight">
                Data Visualization of Time-Tradable Assets Using ML
              </h3>

              <p class="text-sm text-muted leading-relaxed">
                Full-stack modernization of our IEEE-published research into a production-grade quantitative terminal. Powered by <strong>Angular 22</strong>, <strong>FastAPI</strong>, <strong>PyTorch LSTM neural networks</strong>, and <strong>Cloudflare Workers</strong> with real-time candlestick charts, drawing toolbars, Bollinger Bands, RSI, and automated multi-algorithm leaderboard benchmarking.
              </p>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-2.5 py-1 rounded-lg text-xs bg-void border border-border text-muted font-mono">Angular 22</span>
                <span class="px-2.5 py-1 rounded-lg text-xs bg-void border border-border text-muted font-mono">Cloudflare Workers</span>
                <span class="px-2.5 py-1 rounded-lg text-xs bg-void border border-border text-muted font-mono">FastAPI</span>
                <span class="px-2.5 py-1 rounded-lg text-xs bg-void border border-border text-muted font-mono">PyTorch LSTM</span>
                <span class="px-2.5 py-1 rounded-lg text-xs bg-void border border-border text-muted font-mono">Plotly.js</span>
                <span class="px-2.5 py-1 rounded-lg text-xs bg-void border border-border text-muted font-mono">Tailwind CSS</span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <a
                href="https://data-visualization-of-time-tradable-assets-using-ml.vinaykr.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-glow text-frost font-bold text-sm transition-all duration-200 shadow-lg shadow-accent/25 hover:scale-102 cursor-pointer"
              >
                <span>Launch Live Terminal</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <a
                href="https://github.com/vi-nayKR/Data-Visualization-Of-Time-Tradable-Assets-Using-ML"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border hover:border-accent/50 text-frost font-medium text-xs hover:bg-surface transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>View Source Code</span>
              </a>
            </div>
          </div>

          <!-- HIGH-IMPACT YOUTUBE-STYLE THUMBNAIL BROWSER MOCKUP (CLICKABLE WITH HOVER OVERLAY) -->
          <a
            href="https://data-visualization-of-time-tradable-assets-using-ml.vinaykr.workers.dev/"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative block w-full rounded-2xl border border-border/80 bg-void/90 overflow-hidden shadow-2xl hover:border-accent/80 hover:shadow-accent/20 transition-all duration-500 cursor-pointer"
          >
            <!-- Browser Header Bar -->
            <div class="px-4 py-3 border-b border-border/50 bg-surface/90 flex items-center justify-between text-xs font-mono">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#f23645]/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-[#ff9800]/80 inline-block"></span>
                <span class="w-3 h-3 rounded-full bg-[#089981]/80 inline-block"></span>
              </div>

              <!-- Address bar badge -->
              <div class="flex items-center gap-2 px-4 py-1 rounded-lg bg-void border border-border/40 text-[11px] text-muted truncate max-w-sm sm:max-w-md">
                <svg class="w-3 h-3 text-[#089981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span class="text-frost font-mono truncate">data-visualization-of-time-tradable-assets-using-ml.vinaykr.workers.dev</span>
              </div>

              <div class="hidden sm:flex items-center gap-1.5 text-[10px] text-[#089981] font-mono font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-[#089981] animate-pulse"></span>
                <span>Live Demo</span>
              </div>
            </div>

            <!-- Thumbnail Visual Area -->
            <div class="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-void">
              <img
                src="stock-terminal-preview.png"
                alt="Data Visualization of Time-Tradable Assets Using ML - Live SuperChart Terminal"
                class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
              />

              <!-- Gradient Vignette -->
              <div class="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"></div>

              <!-- Floating Feature Badges (YouTube-Thumbnail Style Curiosity Hooks) -->
              <div class="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none z-10">
                <span class="px-3 py-1 rounded-lg bg-accent text-white font-mono font-bold text-[11px] shadow-xl flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  </svg>
                  TRADINGVIEW SUPERTEMPLATE
                </span>
                <span class="px-3 py-1 rounded-lg bg-void/90 border border-border text-frost font-mono font-bold text-[11px] backdrop-blur-md shadow-xl hidden sm:inline-flex">
                  📈 50-DAY ML FORECASTS
                </span>
              </div>

              <!-- Bottom Preview Info Ribbon -->
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1.5 rounded-xl bg-surface/90 border border-border text-frost font-mono text-xs backdrop-blur-md font-bold shadow-lg">
                    ⚡ 5 ML Regressors (LSTM, SVM, Decision Tree)
                  </span>
                </div>
                <span class="px-3 py-1.5 rounded-xl bg-[#089981]/90 text-white font-mono text-xs font-bold shadow-lg backdrop-blur-md hidden md:inline-flex items-center gap-1">
                  <span>98.4% Model R²</span>
                </span>
              </div>

              <!-- Center Interactive Play / Launch Hover Overlay -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-void/40 backdrop-blur-[2px] z-20">
                <div class="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-accent text-white font-display font-bold text-base shadow-2xl shadow-accent/50 transform group-hover:scale-105 transition-transform duration-300">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Explore Live Interactive Terminal</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        <!-- IEEE AND RESEARCHGATE PUBLICATIONS CARD -->
        <div
          appTilt
          [maxTilt]="1.5"
          [scale]="1"
          class="w-full rounded-3xl apple-glass border border-border/40 overflow-hidden shadow-2xl"
          [style.opacity]="visible() ? '1' : '0'"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(40px)'"
          style="transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <!-- Paper title banner -->
          <div class="px-8 py-8 border-b border-border/25 bg-void/20">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="max-w-2xl">
                <span class="text-[10px] font-mono text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block font-bold">
                  Published Research Paper
                </span>
                <h3 class="text-lg md:text-xl font-display font-bold text-frost leading-snug">
                  Data Visualisation of Time Tradable Assets Using Machine Learning
                </h3>
              </div>
              <!-- Verified badge -->
              <div class="flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-xl border border-accent/20" style="background: rgba(255,107,0,0.06)">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="text-xs font-mono font-bold text-accent">Peer Verified</span>
              </div>
            </div>
          </div>

          <!-- Publication link cards -->
          <div class="p-8 grid sm:grid-cols-2 gap-5">
            <!-- IEEE Xplore -->
            <a
              href="https://ieeexplore.ieee.org/document/10275962"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative flex flex-col gap-5 p-6 rounded-2xl border border-border/40 bg-void/40 hover:bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
            >
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style="background: radial-gradient(ellipse at 30% 30%, rgba(0,98,155,0.12) 0%, transparent 70%)"></div>

              <div class="flex items-start justify-between">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style="background: rgba(0,98,155,0.12); border: 1px solid rgba(0,98,155,0.3)">
                  <svg viewBox="0 0 48 20" class="w-10 h-5" fill="none">
                    <text x="0" y="16" font-size="18" font-weight="900" fill="#00629B" font-family="Georgia,serif">IEEE</text>
                  </svg>
                </div>
                <svg class="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-200 mt-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </div>

              <div>
                <p class="text-[10px] font-mono uppercase tracking-widest mb-1" style="color: #00629B">
                  IEEE Xplore Digital Library
                </p>
                <h4 class="text-sm font-bold text-frost mb-2 leading-snug">IEEE Conference Paper</h4>
                <p class="text-xs text-muted leading-relaxed">
                  Published in the world's largest technical professional organisation's digital library.
                  DOI: 10.1109/NCNSP56992.2023.10275962
                </p>
              </div>

              <div class="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                <span class="text-[10px] font-mono text-muted">ieeexplore.ieee.org</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded"
                  style="background: rgba(0,98,155,0.1); color: #00629B">#10275962</span>
              </div>
            </a>

            <!-- ResearchGate -->
            <a
              href="https://www.researchgate.net/publication/374785535_Data_Visualisation_of_Time_Tradable_Assets_Using_Machine_Learning"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative flex flex-col gap-5 p-6 rounded-2xl border border-border/40 bg-void/40 hover:bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
            >
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style="background: radial-gradient(ellipse at 30% 30%, rgba(64,186,33,0.1) 0%, transparent 70%)"></div>

              <div class="flex items-start justify-between">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style="background: rgba(64,186,33,0.1); border: 1px solid rgba(64,186,33,0.25)">
                  <svg class="w-7 h-7" viewBox="0 0 24 24" fill="#40BA21">
                    <path d="M19.586 0H4.414A4.414 4.414 0 0 0 0 4.414v15.172A4.414 4.414 0 0 0 4.414 24h15.172A4.414 4.414 0 0 0 24 19.586V4.414A4.414 4.414 0 0 0 19.586 0zm-7.4 18.395H9.94v-7.33h2.248v7.33zm-1.124-8.332a1.304 1.304 0 1 1 0-2.608 1.304 1.304 0 0 1 0 2.608zm9.538 8.332h-2.246v-3.567c0-.849-.016-1.942-1.183-1.942-1.185 0-1.366.924-1.366 1.879v3.63h-2.246V11.065h2.156v1.001h.03c.3-.568 1.033-1.167 2.126-1.167 2.274 0 2.695 1.497 2.695 3.442v4.054z"/>
                  </svg>
                </div>
                <svg class="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-200 mt-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </div>

              <div>
                <p class="text-[10px] font-mono uppercase tracking-widest mb-1" style="color: #40BA21">
                  ResearchGate
                </p>
                <h4 class="text-sm font-bold text-frost mb-2 leading-snug">Peer-Reviewed Research Article</h4>
                <p class="text-xs text-muted leading-relaxed">
                  Open access article on ResearchGate — the global network dedicated to science and research,
                  accessible to researchers worldwide.
                </p>
              </div>

              <div class="mt-auto pt-4 border-t border-border/20 flex items-center justify-between">
                <span class="text-[10px] font-mono text-muted">researchgate.net</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded"
                  style="background: rgba(64,186,33,0.1); color: #40BA21">Open Access</span>
              </div>
            </a>
          </div>

          <!-- Bottom metadata bar -->
          <div class="px-8 py-4 border-t border-border/20 bg-void/20 flex flex-wrap gap-6 text-[10px] font-mono text-muted">
            <span>🏛 Siddaganga Institute of Technology, Tumkur</span>
            <span>👨‍🏫 Guide: Dr. Pramod T C</span>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ConferenceComponent implements OnInit, OnDestroy {
  visible = signal(false);
  parallaxOffset = signal(0);

  private observer!: IntersectionObserver;

  ngOnInit() {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#conference');
      if (el) this.observer.observe(el);
    }, 200);
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (typeof window !== 'undefined') {
      this.parallaxOffset.set(window.scrollY * 0.012);
    }
  }
}
