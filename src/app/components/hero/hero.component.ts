import { Component, HostListener, signal, computed, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TiltDirective],
  template: `
    <section
      id="home"
      class="hero-section relative min-h-screen flex flex-col items-center justify-start md:justify-center overflow-hidden px-4 md:px-6 pt-24 pb-12 md:pb-24"
    >
      <!-- Huge Parallax Background Text -->
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 outline-bg-text select-none pointer-events-none will-change-transform"
        [style.transform]="bgTextTransform()"
        style="opacity: 0.25;"
      >
        VINAY KR
      </div>

      <!-- Parallax background blobs -->
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none will-change-transform"
        [style.background]="'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)'"
        [style.transform]="blobOneTransform()"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none will-change-transform"
        [style.background]="'radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)'"
        [style.transform]="blobTwoTransform()"
      ></div>

      <!-- Floating Interactive Code Tags -->
      @for (tag of floatingTags; track tag.text) {
        <div
          (click)="scrollToSection(tag.target)"
          (mouseenter)="hoveredTag.set(tag.text)"
          (mouseleave)="hoveredTag.set(null)"
          class="absolute pointer-events-auto text-accent/70 hover:text-accent font-mono text-xs md:text-sm border border-accent/25 hover:border-accent/70 px-4 py-2 rounded-xl select-none backdrop-blur-[4px] bg-void/25 shadow-sm hover:shadow-xl hover:shadow-accent/15 cursor-pointer transition-all duration-300 ease-out hidden sm:block"
          [style.top]="tag.top"
          [style.left]="tag.left"
          [style.transform]="'translate3d(' + (mouseX() * tag.speedX) + 'px, ' + (mouseY() * tag.speedY + parallaxY() * (tag.speedY * 4.5)) + 'px, 0) scale(' + (hoveredTag() === tag.text ? '1.12' : '1') + ')'"
        >
          {{ tag.text }}
        </div>
      }

      <div class="relative z-10 max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-start md:justify-between gap-8 md:gap-12 flex-none md:flex-1">
        <!-- Left Column: Name & Title Greeting (55%) -->
        <div class="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left">
          
          <div class="animate-fade-in-up" style="animation-delay:0.1s; opacity:0;">
            <h1 class="text-4xl md:text-6xl font-display font-bold leading-none mb-6 text-frost">
              👋 Hi, I'm <span class="gradient-text">Vinay</span>!
            </h1>
            <p class="text-accent font-mono text-xs md:text-sm tracking-widest mb-4 uppercase h-5 overflow-hidden">
              <span
                class="inline-block"
                [style.opacity]="roleVisible() ? '1' : '0'"
                [style.transform]="roleVisible() ? 'translateY(0)' : 'translateY(-100%)'"
                style="transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);"
              >
                {{ currentRole() }}
              </span>
            </p>
            <p class="text-muted text-lg md:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed mt-4">
              Senior GenAI & Applied AI Systems Engineer architecting production <span class="text-frost font-medium">Agentic RAG</span> platforms (pgvector + BM25 RRF), <span class="text-frost font-medium">LangGraph</span> multi-agent state machines, <span class="text-frost font-medium">vLLM</span> local serving with Redis semantic caching, and distributed microservices (Medha — 500 RPS).
            </p>
          </div>

          <!-- Tech badges -->
          <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-8 animate-fade-in-up" style="animation-delay:0.3s; opacity:0;">
            @for (tech of techs; track tech) {
              <span class="px-3 py-1 rounded-full text-xs font-medium bg-surface border border-border text-muted hover:border-accent/50 hover:text-frost transition-all duration-200">
                {{ tech }}
              </span>
            }
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up" style="animation-delay:0.5s; opacity:0;">
            <a
              href="#projects"
              (mousemove)="onMagneticMove($event)"
              (mouseleave)="onMagneticLeave($event)"
              class="magnetic px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-glow text-frost font-semibold text-sm transition-colors duration-200 hover:shadow-xl hover:shadow-accent/25 text-center will-change-transform"
            >
              View Projects
            </a>
            <a
              href="https://github.com/vi-nayKR"
              target="_blank"
              rel="noopener noreferrer"
              class="px-8 py-3.5 rounded-xl border border-border hover:border-accent/50 text-frost font-semibold text-sm transition-all duration-200 hover:bg-surface hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <!-- Right Column: Profile Photo (45%) -->
        <div class="w-full md:w-[45%] flex items-center justify-center relative min-h-[280px] md:min-h-[500px]">
          <!-- Ambient glow behind photo -->
          <div
            class="absolute w-64 h-64 rounded-full pointer-events-none"
            style="background: radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 65%); filter: blur(28px);"
            [style.transform]="'translate3d(' + (mouseX() * 0.03) + 'px, ' + (mouseY() * 0.03) + 'px, 0)'"
          ></div>

          <!-- Rotating dashed outer rings -->
          <div
            class="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border border-accent/20 pointer-events-none"
            style="border-style: dashed; transition: transform 0.6s ease-out;"
            [style.transform]="'rotate(' + (mouseX() * 0.04) + 'deg)'"
          ></div>
          <div
            class="absolute w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full border border-accent/10 pointer-events-none"
            style="border-style: dashed; transition: transform 0.8s ease-out;"
            [style.transform]="'rotate(' + (-mouseX() * 0.06) + 'deg)'"
          ></div>

          <!-- Profile photo -->
          <div class="relative z-10 animate-float" style="animation-delay: 0s;">
            <div
              class="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full"
              style="transition: transform 0.3s ease-out;"
              [style.transform]="'translate3d(' + (mouseX() * 0.015) + 'px, ' + (mouseY() * 0.015) + 'px, 0)'"
            >
              <!-- Glow ring -->
              <div class="absolute inset-0 rounded-full animate-pulse-glow" style="background: radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 60%);"></div>
              <!-- Accent border rings -->
              <div class="absolute -inset-2 rounded-full border-2 border-accent/30"></div>
              <div class="absolute -inset-4 rounded-full border border-accent/15"></div>
              <!-- Photo -->
              <img
                [src]="photoUrl()"
                alt="Vinay KR"
                class="w-full h-full rounded-full object-cover border-2 border-accent/50 shadow-2xl shadow-accent/20"
                style="object-position: center top;"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator (absolute bottom) -->
      <div class="relative z-10 mt-10 md:mt-16 flex flex-col items-center gap-2 text-muted animate-fade-in-up" style="animation-delay:0.7s; opacity:0;">
        <span class="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div class="w-px h-10 bg-gradient-to-b from-accent to-transparent animate-pulse"></div>
      </div>
    </section>
  `,
})
export class HeroComponent implements OnDestroy {
  photoUrl = signal<string>('/profile-photo.webp');
  parallaxY = signal(0);
  mouseX = signal(0);
  mouseY = signal(0);
  hoveredTag = signal<string | null>(null);

  // Rotating role title — cycles every 2.6s for a living, animated headline.
  roles = ['Senior GenAI Engineer', 'Applied AI Systems Architect', 'LangGraph & Agentic RAG', 'FastAPI · vLLM · pgvector', 'Angular 22 Signals UI'];
  roleIndex = signal(0);
  roleVisible = signal(true);
  private roleTimer?: ReturnType<typeof setInterval>;

  // Derived state — cached, and only recomputed when its dependencies change.
  // Previously these transform strings were concatenated inline in the template,
  // which rebuilt every string on every change-detection cycle.
  readonly currentRole = computed(() => this.roles[this.roleIndex()]);

  readonly bgTextTransform = computed(
    () => `translate3d(calc(-50% + ${this.mouseX() * -0.04}px), calc(-50% + ${this.parallaxY() * -0.22}px), 0)`
  );
  readonly blobOneTransform = computed(
    () => `translate3d(${this.mouseX() * 0.05}px, ${this.parallaxY() * 0.45}px, 0)`
  );
  readonly blobTwoTransform = computed(
    () => `translate3d(${this.mouseX() * -0.05}px, ${this.parallaxY() * 0.22}px, 0)`
  );

  techs = ['LangGraph', 'Python FastAPI', 'pgvector HNSW', 'vLLM', 'Semantic Kernel', 'Model Context Protocol (MCP)', 'Redis 8', 'Angular 22', 'Docker', 'k3s'];

  floatingTags = [
    { text: 'LangGraph', top: '16%', left: '78%', speedX: -0.06, speedY: 0.03, target: 'skills' },
    { text: 'pgvector', top: '68%', left: '8%', speedX: 0.04, speedY: -0.05, target: 'skills' },
    { text: 'vLLM', top: '78%', left: '80%', speedX: -0.05, speedY: 0.03, target: 'skills' },
    { text: 'MCP', top: '42%', left: '86%', speedX: 0.03, speedY: -0.04, target: 'skills' },
    { text: 'Angular 22', top: '82%', left: '22%', speedX: -0.03, speedY: 0.05, target: 'skills' },
  ];

  private ticking = false;

  constructor() {
    // Start the rotating role ticker (skipped for reduced-motion users).
    const reduceMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      this.roleTimer = setInterval(() => {
        this.roleVisible.set(false); // fade out
        setTimeout(() => {
          this.roleIndex.update((i) => (i + 1) % this.roles.length);
          this.roleVisible.set(true); // fade in with new role
        }, 350);
      }, 2600);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    // rAF throttle: coalesce scroll bursts into a single frame for jank-free parallax.
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.parallaxY.set(window.scrollY);
      this.ticking = false;
    });
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX.set(event.clientX - window.innerWidth / 2);
    this.mouseY.set(event.clientY - window.innerHeight / 2);
  }

  // Magnetic pointer attraction for the primary CTA.
  onMagneticMove(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    // Translate at 30% of the pointer offset — a subtle, premium pull.
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }
  onMagneticLeave(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    if (el) el.style.transform = 'translate(0px, 0px)';
  }

  ngOnDestroy() {
    if (this.roleTimer) clearInterval(this.roleTimer);
  }

  scrollToSection(targetId: string) {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

