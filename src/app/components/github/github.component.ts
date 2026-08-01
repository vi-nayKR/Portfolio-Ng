import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

interface RepoHighlight {
  title: string;
  domain: string;
  desc: string;
  url: string;
  lang: string;
  langColor: string;
}

interface LangStat {
  name: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  template: `
    <section id="github" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      <!-- Outline background Typography -->
      <div
        class="absolute left-[-8%] top-1/3 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.0) + 'px, 0, 0)'"
      >
        OPEN SOURCE
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">GitHub &amp; Open Source</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            A Habit of Building
          </h2>
          <p class="text-muted text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            From Solana smart contracts to Vulkan graphics pipelines — my GitHub is where I
            explore new stacks, break things, and ship them working.
          </p>
        </div>

        <!-- Stat tiles -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          @for (stat of stats; track stat.label; let i = $index) {
            <div
              class="p-6 rounded-2xl apple-glass card-hover text-center"
              [style.opacity]="visible() ? '1' : '0'"
              [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
              [style.transition]="'opacity 0.6s ease ' + (i * 0.1) + 's, transform 0.6s ease ' + (i * 0.1) + 's'"
            >
              <p class="text-3xl md:text-4xl font-display font-bold text-accent tabular-nums">
                {{ animatedValues()[i] }}{{ stat.suffix }}
              </p>
              <p class="text-xs font-mono uppercase tracking-widest text-muted mt-2">{{ stat.label }}</p>
            </div>
          }
        </div>

        <!-- Language breakdown -->
        <div
          class="p-6 md:p-8 rounded-2xl apple-glass mb-8"
          [style.opacity]="visible() ? '1' : '0'"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
          style="transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s"
        >
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-display font-semibold text-frost">Languages Across Repositories</h3>
            <span class="text-xs font-mono text-muted hidden sm:inline">by repo count</span>
          </div>

          <!-- Stacked bar -->
          <div class="flex h-2.5 rounded-full overflow-hidden bg-void/60 mb-5" role="img" aria-label="Language distribution across repositories">
            @for (lang of langStats; track lang.name) {
              <div
                class="h-full skill-bar"
                [style.background]="lang.color"
                [style.width]="visible() ? (lang.count / totalRepos * 100) + '%' : '0%'"
              ></div>
            }
          </div>

          <!-- Legend -->
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            @for (lang of langStats; track lang.name) {
              <div class="flex items-center gap-2 text-xs font-mono">
                <span class="w-2.5 h-2.5 rounded-full shrink-0" [style.background]="lang.color"></span>
                <span class="text-frost">{{ lang.name }}</span>
                <span class="text-muted">{{ lang.count }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Repo highlights grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          @for (repo of highlights; track repo.title; let i = $index) {
            <a
              appTilt
              [maxTilt]="8"
              [scale]="1.02"
              [href]="repo.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group p-6 rounded-2xl apple-glass card-hover flex flex-col"
              [style.opacity]="visible() ? '1' : '0'"
              [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
              [style.transition]="'opacity 0.6s ease ' + (0.35 + i * 0.08) + 's, transform 0.6s ease ' + (0.35 + i * 0.08) + 's'"
            >
              <div class="flex items-start justify-between mb-4">
                <span class="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">{{ repo.domain }}</span>
                <svg class="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <h3 class="font-display font-semibold text-frost mb-2 group-hover:text-accent transition-colors duration-200">{{ repo.title }}</h3>
              <p class="text-sm text-muted leading-relaxed flex-1 mb-4">{{ repo.desc }}</p>

              <div class="flex items-center gap-2 text-xs font-mono text-muted">
                <span class="w-2.5 h-2.5 rounded-full shrink-0" [style.background]="repo.langColor"></span>
                {{ repo.lang }}
              </div>
            </a>
          }
        </div>

        <!-- Domain breadth chips -->
        <div
          class="flex flex-wrap justify-center gap-2 mb-12"
          [style.opacity]="visible() ? '1' : '0'"
          style="transition: opacity 0.8s ease 0.7s"
        >
          @for (domain of domains; track domain) {
            <span class="px-3 py-1.5 rounded-full text-xs font-mono bg-void border border-accent/30 text-accent">{{ domain }}</span>
          }
        </div>

        <!-- CTA -->
        <div class="text-center">
          <a
            href="https://github.com/vi-nayKR?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border hover:border-accent/50 text-frost font-semibold text-sm transition-all duration-200 hover:bg-surface hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/10"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Explore all 39 repositories
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class GithubComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);
  animatedValues = signal<number[]>([0, 0, 0, 0]);

  totalRepos = 39;

  stats = [
    { label: 'Public Repositories', value: 39, suffix: '' },
    { label: 'Languages Used', value: 8, suffix: '+' },
    { label: 'Organizations', value: 3, suffix: '' },
    { label: 'Tech Domains', value: 7, suffix: '' },
  ];

  langStats: LangStat[] = [
    { name: 'TypeScript', count: 9, color: '#3178c6' },
    { name: 'Python', count: 5, color: '#3572A5' },
    { name: 'C#', count: 5, color: '#178600' },
    { name: 'Rust', count: 4, color: '#dea584' },
    { name: 'Java', count: 4, color: '#b07219' },
    { name: 'JavaScript', count: 4, color: '#f1e05a' },
    { name: 'Other', count: 8, color: '#8e93a0' },
  ];

  highlights: RepoHighlight[] = [
    {
      title: 'Rust-Solana-Voting',
      domain: 'Blockchain / Web3',
      desc: 'Decentralized voting program on Solana built with the Anchor framework, backed by Rust-native integration tests on the LiteSVM simulator.',
      url: 'https://github.com/vi-nayKR/Rust-Solana-Voting',
      lang: 'Rust',
      langColor: '#dea584',
    },
    {
      title: 'Vulkan-Project',
      domain: 'Graphics',
      desc: 'Low-level GPU rendering with the Vulkan API in Rust — graphics pipeline setup, memory management, and performance tuning.',
      url: 'https://github.com/vi-nayKR/Vulkan-Project',
      lang: 'Rust',
      langColor: '#dea584',
    },
    {
      title: 'LLM',
      domain: 'AI / NLP',
      desc: 'Large-language-model experiments in Python: fine-tuning techniques, model inference, and text generation with pre-trained models.',
      url: 'https://github.com/vi-nayKR/LLM',
      lang: 'Python',
      langColor: '#3572A5',
    },
    {
      title: 'Asset Visualization with ML',
      domain: 'Machine Learning',
      desc: 'Time-series analysis of tradable assets with predictive models and rich data visualizations for market trend insights.',
      url: 'https://github.com/vi-nayKR/Data-Visualization-Of-Time-Tradable-Assets-Using-ML',
      lang: 'Python',
      langColor: '#3572A5',
    },
    {
      title: 'Spring Boot Store App',
      domain: 'Backend',
      desc: 'E-commerce backend with Java Spring Boot: product catalog, shopping cart, and order management APIs with database integration.',
      url: 'https://github.com/vi-nayKR/Java-Spring-Boot-Store-App',
      lang: 'Java',
      langColor: '#b07219',
    },
    {
      title: 'Expense Tracker',
      domain: 'Full-Stack',
      desc: 'Full-stack expense tracker pairing an Angular 18 frontend with an ASP.NET 8 Web API and persistent database storage.',
      url: 'https://github.com/vi-nayKR/Angular-18-and-Asp.Net-8-Web-Api-Expense-Tracker-Application',
      lang: 'C#',
      langColor: '#178600',
    },
  ];

  domains = [
    'Web & Frontend',
    'Backend & APIs',
    'ML & AI',
    'Blockchain / Web3',
    'Graphics (Vulkan)',
    'Messaging & DevOps',
    'Data Science',
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.02);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          this.startCountUp();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#github');
      if (el) observer.observe(el);
    }, 100);
  }

  private startCountUp() {
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.animatedValues.set(this.stats.map(s => Math.round(s.value * eased)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
