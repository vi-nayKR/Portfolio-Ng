import { Component, OnInit, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-major-project',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  template: `
    <section id="major-project" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden bg-abyss/40">
      <!-- Background radial glows -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div
          class="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full"
          style="background: radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)"
        ></div>
        <div
          class="absolute bottom-1/4 left-10 w-[300px] h-[300px] rounded-full"
          style="background: radial-gradient(circle, rgba(255,107,0,0.03) 0%, transparent 70%)"
        ></div>
      </div>

      <!-- Outline background text -->
      <div
        class="absolute left-[-5%] top-1/2 outline-bg-text select-none pointer-events-none font-black opacity-5 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (-parallaxOffset() * 0.8) + 'px, -50%, 0)'"
      >
        CAPSTONE
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 md:mb-20">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Academic Milestones</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance mb-6">
            B.E. CSE Major Project
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-accent to-accent-glow mx-auto rounded-full"></div>
        </div>

        <!-- Main card -->
        <div
          appTilt
          [maxTilt]="2"
          [scale]="1"
          class="w-full rounded-3xl apple-glass p-5 md:p-10 border border-border/40 relative overflow-hidden shadow-2xl"
          [style.opacity]="visible() ? '1' : '0'"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(40px)'"
          style="transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        >
          <!-- Card header row -->
          <div class="pb-6 border-b border-border/30 mb-6">
            <span class="text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
              Final Semester CSE &middot; B.E. Computer Science Engineering
            </span>
            <h3 class="text-xl md:text-2xl font-display font-bold text-frost leading-tight uppercase">
              Data Visualization of Time Tradable Assets Using Machine Learning
            </h3>
          </div>

          <!-- Tab strip -->
          <div class="flex overflow-x-auto pb-3 gap-2 border-b border-border/20 mb-8">
            @for (tab of tabs; track tab.id) {
              <button
                (click)="activeTab.set(tab.id)"
                class="flex items-center gap-2 px-4 py-3 text-xs font-mono font-bold rounded-xl transition-all duration-300 border border-transparent whitespace-nowrap shrink-0 cursor-pointer"
                [class.glass-tab-active]="activeTab() === tab.id"
                [class.text-accent]="activeTab() === tab.id"
                [class.glass-text-secondary]="activeTab() !== tab.id"
              >
                <span [innerHTML]="tab.icon" class="flex items-center w-4 h-4"></span>
                {{ tab.label }}
              </button>
            }
          </div>

          <!-- Tab content -->
          <div class="min-h-[420px]">

            <!-- OVERVIEW -->
            @if (activeTab() === 'overview') {
              <div class="grid lg:grid-cols-12 gap-8 animate-fade-in-up">
                <div class="lg:col-span-7 space-y-6">
                  <div class="space-y-3">
                    <h4 class="text-lg font-display font-semibold text-frost">1. Introduction</h4>
                    <p class="text-sm text-muted leading-relaxed">
                      A stock (share/equity) represents ownership in a company. When companies raise capital, they issue stocks to investors.
                      By buying stocks, investors become partial owners, entitled to profit shares and specific privileges.
                    </p>
                    <p class="text-sm text-muted leading-relaxed">
                      Visualizing and predicting stock prices using machine learning is a highly compelling financial engineering problem.
                      Humans are irrational beings: without quantitative, data-driven models, decisions are impacted by emotions, resulting in avoidable losses.
                    </p>
                  </div>
                  <div class="space-y-3 pt-2">
                    <h4 class="text-lg font-display font-semibold text-frost">2. Problem Statement</h4>
                    <p class="text-sm text-muted leading-relaxed">
                      Financial markets (stocks, bonds, metals, crypto) are abstract and volatile. The aim of this project is to employ financial data
                      instead of daily data to lower the likelihood of uncertain noise and expand the sample size over shorter intervals.
                    </p>
                    <p class="text-sm text-muted leading-relaxed text-frost font-semibold">
                      Our goal is to examine the utility of ML algorithms in predicting asset values and to democratize these technologies via a user-friendly interface.
                    </p>
                  </div>
                </div>
                <div class="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-void/30 border border-border/30">
                  <div>
                    <h5 class="text-xs font-mono text-accent uppercase tracking-widest mb-4">Project Presenters</h5>
                    <div class="space-y-3">
                      @for (member of presenters; track member.usn) {
                        <div class="flex items-center justify-between gap-3 py-2 border-b border-border/10">
                          <div class="min-w-0">
                            <p class="text-sm font-semibold text-frost">{{ member.name }}</p>
                            <p class="text-[10px] text-muted font-mono">{{ member.usn }}</p>
                          </div>
                          <span class="text-[10px] font-mono bg-accent/10 text-accent px-2 py-0.5 rounded shrink-0">{{ member.role }}</span>
                        </div>
                      }
                    </div>
                  </div>
                  <div class="mt-6 pt-6 border-t border-border/20 text-[11px] text-muted font-mono">
                    Under the guidance of <span class="text-frost">Dr. Pramod T C</span>, SIT Computer Science Dept.
                  </div>
                </div>
              </div>
            }

            <!-- OBJECTIVES & TECH -->
            @if (activeTab() === 'objectives') {
              <div class="grid lg:grid-cols-2 gap-8 animate-fade-in-up">
                <div class="space-y-6">
                  <h4 class="text-lg font-display font-semibold text-frost">Core Objectives</h4>
                  <div class="space-y-4">
                    @for (obj of objectivesList; track obj.title; let idx = $index) {
                      <div class="flex gap-4 items-start">
                        <div class="w-6 h-6 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                          {{ idx + 1 }}
                        </div>
                        <div>
                          <h5 class="text-sm font-semibold text-frost mb-1">{{ obj.title }}</h5>
                          <p class="text-xs text-muted leading-relaxed">{{ obj.desc }}</p>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div class="p-6 rounded-2xl bg-void/30 border border-border/30 space-y-6">
                  <h4 class="text-lg font-display font-semibold text-frost">Tools &amp; Technologies</h4>
                  <div class="space-y-4">
                    <div>
                      <h5 class="text-xs font-mono text-accent uppercase tracking-wider mb-2">Back-End Environment</h5>
                      <div class="flex flex-wrap gap-2">
                        @for (t of backendTech; track t) {
                          <span class="px-3 py-1 rounded-lg bg-void border border-border text-xs font-mono text-frost">{{ t }}</span>
                        }
                      </div>
                    </div>
                    <div>
                      <h5 class="text-xs font-mono text-accent uppercase tracking-wider mb-2">Machine Learning &amp; Math</h5>
                      <div class="flex flex-wrap gap-2">
                        @for (t of mlTech; track t) {
                          <span class="px-3 py-1 rounded-lg bg-void border border-border text-xs font-mono text-frost">{{ t }}</span>
                        }
                      </div>
                    </div>
                    <div>
                      <h5 class="text-xs font-mono text-accent uppercase tracking-wider mb-2">Front-End &amp; Visualization</h5>
                      <div class="flex flex-wrap gap-2">
                        @for (t of frontendTech; track t) {
                          <span class="px-3 py-1 rounded-lg bg-void border border-accent/20 text-xs font-mono text-accent font-bold">{{ t }}</span>
                        }
                      </div>
                    </div>
                    <div class="pt-4 border-t border-border/10">
                      <h5 class="text-xs font-mono text-muted uppercase mb-2">Hardware Requirements</h5>
                      <ul class="text-xs text-muted font-mono space-y-1">
                        <li>• PROCESSOR: Intel Pentium or Higher</li>
                        <li>• RAM: 4GB minimum</li>
                        <li>• HARD DISK: 60GB and above</li>
                        <li>• DISK SPACE: 500 MB</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- LITERATURE SURVEY -->
            @if (activeTab() === 'literature') {
              <div class="space-y-6 animate-fade-in-up">
                <h4 class="text-lg font-display font-semibold text-frost">Literature Review &amp; Analysis</h4>
                <div class="grid md:grid-cols-2 gap-6">
                  @for (paper of literaturePapers; track paper.num) {
                    <div class="p-5 rounded-xl bg-void/20 border border-border/30 flex flex-col justify-between hover:border-accent/30 transition-all duration-200">
                      <div>
                        <div class="flex justify-between items-start mb-2">
                          <span class="text-2xl font-black text-accent/20">#0{{ paper.num }}</span>
                          <span class="text-[10px] font-mono bg-void border border-border px-2 py-0.5 rounded text-muted">{{ paper.ref }}</span>
                        </div>
                        <h5 class="text-sm font-bold text-frost mb-1">{{ paper.title }}</h5>
                        <p class="text-xs text-accent font-mono mb-3">Key Output: {{ paper.metric }}</p>
                        <p class="text-xs text-muted mb-2 leading-relaxed">
                          <strong class="text-frost">Strength:</strong> {{ paper.pros }}
                        </p>
                      </div>
                      <p class="text-xs text-muted leading-relaxed border-t border-border/10 pt-2 mt-2">
                        <strong class="text-accent/80 font-mono">Limit:</strong> {{ paper.cons }}
                      </p>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- METHODOLOGY -->
            @if (activeTab() === 'methodology') {
              <div class="grid lg:grid-cols-12 gap-8 animate-fade-in-up">
                <div class="lg:col-span-5 space-y-4">
                  <h4 class="text-lg font-display font-semibold text-frost">Data Pipeline &amp; Design</h4>
                  <div class="space-y-4 text-xs leading-relaxed text-muted">
                    <div class="p-4 rounded-xl bg-void/20 border border-border/20">
                      <p class="font-semibold text-accent mb-1 font-mono">Yahoo Finance Pipeline</p>
                      Download historical price quotes in CSV/Real-time. Extract Date, Open, High, Low, Adj Close, and Volume vectors.
                      Calculate dynamic Exponential Moving Averages (EMA).
                    </div>
                    <div class="p-4 rounded-xl bg-void/20 border border-border/20">
                      <p class="font-semibold text-frost mb-1 font-mono">Support Vector Regression (SVR)</p>
                      Maintains maximum margin boundaries, mapping inputs into high-dimensional space to ignore noises below threshold parameter ε.
                    </div>
                    <div class="p-4 rounded-xl bg-void/20 border border-border/20">
                      <p class="font-semibold text-frost mb-1 font-mono">Decision Tree Regression</p>
                      Flowchart structures dividing features recursively into nodes to approximate continuous outputs based on historical decision buckets.
                    </div>
                  </div>
                </div>
                <div class="lg:col-span-7 space-y-6">
                  <h4 class="text-lg font-display font-semibold text-frost">Model Formulations</h4>
                  <div class="space-y-4 font-mono text-xs">
                    <div class="p-4 rounded-xl border border-border/30 bg-void/50">
                      <p class="text-accent font-bold mb-2 uppercase text-[10px] tracking-wider">Linear Regression Model</p>
                      <p class="text-frost font-bold mb-2">y = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ + ε</p>
                      <p class="text-muted text-[11px] leading-relaxed">
                        Computes the best-fit boundary where β coefficients minimize squared errors. Plugs in historical price attributes as vectors to estimate target asset values.
                      </p>
                    </div>
                    <div class="p-4 rounded-xl border border-border/30 bg-void/50">
                      <p class="text-accent font-bold mb-2 uppercase text-[10px] tracking-wider">Radial Basis Function (RBF)</p>
                      <p class="text-frost font-bold mb-2">y = Σᵢ wᵢφ(||x - cᵢ||)</p>
                      <p class="text-muted text-[11px] leading-relaxed">
                        Approximates complex boundaries utilizing radial distances from center vectors. The Gaussian kernel φ computes weights based on localized similarity indices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- RESULTS -->
            @if (activeTab() === 'results') {
              <div class="grid lg:grid-cols-12 gap-8 animate-fade-in-up">
                <div class="lg:col-span-7 space-y-6">
                  <h4 class="text-lg font-display font-semibold text-frost">Comparative Predictions</h4>
                  <div class="overflow-x-auto">
                    <table class="w-full text-xs text-left border-collapse border border-border/30 rounded-xl overflow-hidden">
                      <thead>
                        <tr class="bg-void/60 text-muted border-b border-border/30 font-mono text-[10px] uppercase">
                          <th class="p-3">Company Name</th>
                          <th class="p-3 text-frost font-bold">Actual Close</th>
                          <th class="p-3">Linear Reg (LR)</th>
                          <th class="p-3">Decision Tree</th>
                          <th class="p-3">SVR Model</th>
                          <th class="p-3">RBF Kernel</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-border/20 text-muted font-mono">
                        @for (row of comparativeResults; track row.name) {
                          <tr class="hover:bg-void/20">
                            <td class="p-3 font-semibold text-frost">{{ row.name }}</td>
                            <td class="p-3 text-accent font-bold">{{ row.actual }}</td>
                            <td class="p-3">{{ row.lr }}</td>
                            <td class="p-3">{{ row.tree }}</td>
                            <td class="p-3">{{ row.svr }}</td>
                            <td class="p-3">{{ row.rbf }}</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                  <p class="text-[11px] text-muted italic font-mono">
                    * Values represent normalized closing metrics compiled from experimental results.
                  </p>
                </div>
                <div class="lg:col-span-5 space-y-4">
                  <h4 class="text-lg font-display font-semibold text-frost">Conclusion</h4>
                  <div class="p-5 rounded-2xl bg-accent/5 border border-accent/20 text-xs text-muted leading-relaxed space-y-3">
                    <p>
                      The implementation of emerging machine learning models for time-tradable asset forecast displays encouraging outputs,
                      optimizing margin-maximizing stock trading applications.
                    </p>
                    <p>
                      Utilizing historic sequence neural models allows developers to predict stock behaviors with enhanced accuracy.
                      In the future, expanding models with wider real-time sentiment arrays will further increase regression performance.
                    </p>
                  </div>
                </div>
              </div>
            }

            <!-- LIVE SANDBOX -->
            @if (activeTab() === 'demo') {
              <div class="animate-fade-in-up space-y-6">
                @if (!demoInitialized()) {
                  <!-- Pre-load placeholder -->
                  <div class="flex flex-col items-center justify-center p-8 rounded-2xl border border-border/30 bg-void/20 relative overflow-hidden min-h-[380px]">
                    <!-- Stock chart SVG watermark -->
                    <div class="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                      <svg class="w-full h-40 text-accent" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,80 Q15,70 30,50 T60,60 T90,20 L100,10 L100,100 L0,100 Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div class="relative z-10 text-center max-w-lg space-y-6">
                      <div class="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                        </svg>
                      </div>
                      <div class="space-y-2">
                        <h4 class="text-lg font-display font-bold text-frost">Live Streamlit Asset Predictor Sandbox</h4>
                        <p class="text-xs text-muted leading-relaxed">
                          This will launch the live, interactive stock analysis dashboard hosted on Streamlit.
                          Search ticker symbols, check volume, adjust moving averages, and run regression predictions dynamically.
                        </p>
                      </div>
                      <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          (click)="demoInitialized.set(true)"
                          class="px-6 py-3 rounded-xl bg-accent hover:bg-accent-glow text-frost text-xs font-mono font-bold transition-all duration-200 cursor-pointer shadow-lg"
                        >
                          Initialize Live Sandbox
                        </button>
                        <a
                          href="https://data-visualization-of-time-tradable-assets.streamlit.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="px-6 py-3 rounded-xl border border-border hover:border-accent/40 text-frost text-xs font-mono transition-all duration-200 hover:bg-surface flex items-center gap-2 justify-center"
                        >
                          Open in New Tab
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                } @else {
                  <!-- Active iframe state -->
                  <div class="flex justify-between items-center bg-void/50 border border-border/30 rounded-xl px-4 py-2 text-xs font-mono">
                    <div class="flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                      <span class="text-muted text-[10px] md:text-xs">Streamlit Container Active</span>
                    </div>
                    <a
                      href="https://data-visualization-of-time-tradable-assets.streamlit.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-accent hover:text-accent-glow flex items-center gap-1"
                    >
                      Open in New Tab ↗
                    </a>
                  </div>
                  <div class="relative rounded-2xl overflow-hidden border border-border/40 bg-void shadow-2xl h-[650px]">
                    @if (!iframeLoaded()) {
                      <div class="absolute inset-0 flex flex-col items-center justify-center bg-abyss text-muted space-y-4">
                        <svg class="animate-spin h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-xs font-mono">Mounting dashboard instance...</span>
                      </div>
                    }
                    <iframe
                      [src]="safeUrl"
                      class="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      (load)="iframeLoaded.set(true)"
                      title="Stock ML Dashboard App"
                    ></iframe>
                  </div>
                }
              </div>
            }

          </div>
        </div>
      </div>
    </section>
  `,
})
export class MajorProjectComponent implements OnInit {
  activeTab = signal('overview');
  visible = signal(false);
  parallaxOffset = signal(0);
  iframeLoaded = signal(false);
  demoInitialized = signal(false);

  private sanitizer = inject(DomSanitizer);
  safeUrl!: SafeResourceUrl;

  tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    },
    {
      id: 'objectives',
      label: 'Objectives & Tech',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>'
    },
    {
      id: 'literature',
      label: 'Literature Survey',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>'
    },
    {
      id: 'methodology',
      label: 'Algorithms & HLD',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>'
    },
    {
      id: 'results',
      label: 'Results & Conclusion',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/></svg>'
    },
    {
      id: 'demo',
      label: 'Live Sandbox',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>'
    }
  ];

  presenters = [
    { name: 'Vinay K R',                  usn: '1SI19CS135', role: 'Lead developer'    },
    { name: 'Nirupama Mallikarjunaiah',    usn: '1SI19CS088', role: 'Research analyst'  },
    { name: 'Rishab S Jain',              usn: '1SI19CS098', role: 'Model optimization' },
    { name: 'Sharan S Navada',            usn: '1SI19CS103', role: 'Data pre-processing' }
  ];

  objectivesList = [
    { title: 'User-Friendly Web App',     desc: 'Develop an easy-to-use Web Application where users can understand the stock trend of companies they are interested in.' },
    { title: 'Neural Network Models',     desc: 'Apply neural network-based Regressor Models to uncover hidden patterns in the trajectory of asset values.' },
    { title: 'Multiple Regressions',      desc: 'Implement Linear Regression, SVR, Polynomial Regression, and Decision Tree Regression for price prediction.' },
    { title: 'Sequence Prediction (LSTM)',desc: 'Use Recurrent Neural Networks (RNN) with Long Short-Term Memory (LSTM) cells for time-series sequence prediction.' }
  ];

  backendTech  = ['Python 3', 'Anaconda', 'Git Bash'];
  mlTech       = ['TensorFlow', 'Keras', 'Numpy', 'Pandas', 'Scikit-Learn'];
  frontendTech = ['Streamlit', 'Plotly Dash', 'Matplotlib'];

  literaturePapers = [
    {
      num: '1', title: 'High-Order Information Time Series',
      ref: 'IEEE Access (2019)', metric: 'MAE of 0.94%',
      pros: 'Outperformed linear and ARIMA models in trend accuracy.',
      cons: 'High polynomial models add complexity and lead to overfitting.'
    },
    {
      num: '2', title: 'LSTM-Based Stock Returns Prediction',
      ref: 'IEEE Big Data (2015)', metric: 'Non-linear capability',
      pros: 'Captures non-linear temporal relationships using past returns, sentiment, and volume.',
      cons: 'Requires massive history; suffers vanishing gradients if poorly regularized.'
    },
    {
      num: '3', title: 'Adaptive SVR for High-Frequency Price',
      ref: 'IEEE Access (2018)', metric: 'MAPE of 0.96%',
      pros: 'Adapts to changing market volatility; robust in high-frequency setups.',
      cons: 'Limited interpretability and requires high-density tick data.'
    },
    {
      num: '4', title: 'Sentiment Analysis & SVM Forecasting',
      ref: 'IEEE Systems Journal (2019)', metric: '59.4% Accuracy',
      pros: 'Extracts news sentiment feeds and applies SVM classification boundaries.',
      cons: 'Sentiment scoring adds linguistic noise and lacks stability across cycles.'
    }
  ];

  comparativeResults = [
    { name: 'Amazon (AMZN)',      actual: '0.61', lr: '0.68', tree: '0.61', svr: '0.26', rbf: '0.57' },
    { name: 'AT & T (T)',         actual: '0.18', lr: '0.27', tree: '0.44', svr: '0.68', rbf: '0.60' },
    { name: 'Dollar General (DG)',actual: '0.39', lr: '0.44', tree: '0.39', svr: '0.38', rbf: '0.42' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    if (typeof window !== 'undefined') {
      this.parallaxOffset.set(window.scrollY * 0.015);
    }
  }

  ngOnInit() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://data-visualization-of-time-tradable-assets.streamlit.app/?embed=true'
    );

    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
        { threshold: 0.1 }
      );
      setTimeout(() => {
        const el = document.querySelector('#major-project');
        if (el) observer.observe(el);
      }, 200);
    }
  }
}
