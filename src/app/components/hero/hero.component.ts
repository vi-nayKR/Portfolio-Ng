import { Component, HostListener, signal, computed, ChangeDetectionStrategy } from '@angular/core';
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
      class="hero-section relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-12 md:pb-20"
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

      <div class="relative z-10 max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-start md:justify-between gap-6 md:gap-10 flex-none md:flex-1">
        <!-- Left Column: Name & Title Greeting (55%) -->
        <div class="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left">
          
          <div class="animate-fade-in-up" style="animation-delay:0.1s; opacity:0;">
            <h1 class="text-4xl md:text-6xl font-display font-bold leading-none mb-6 text-frost">
              Hi, I'm <span class="gradient-text">Vinay K R</span>.
            </h1>
            <p class="text-frost font-medium text-xl md:text-2xl max-w-2xl mx-auto md:mx-0 leading-relaxed mt-4">
              I build backend and Applied AI systems that are testable, observable, and useful.
            </p>
            <p class="text-muted text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed mt-4">
              Nearly three years of professional backend experience across digital-asset custody and regulated gaming, specializing in Python/FastAPI, LangGraph agent workflows, hybrid retrieval, and observable systems.
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
              href="#github"
              (mousemove)="onMagneticMove($event)"
              (mouseleave)="onMagneticLeave($event)"
              class="magnetic px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-glow text-frost font-semibold text-sm transition-colors duration-200 hover:shadow-xl hover:shadow-accent/25 text-center will-change-transform"
            >
              Explore My Work
            </a>
            <a
              href="#resume"
              class="px-8 py-3.5 rounded-xl border border-border hover:border-accent/50 text-frost font-semibold text-sm transition-all duration-200 hover:bg-surface hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2h8l4 4v16H6V2zm8 2v4h4l-4-4zM9 11v2h6v-2H9zm0 4v2h6v-2H9z"/>
              </svg>
              View Resume
            </a>
          </div>
        </div>

        <!-- Colored ASCII portrait with the full silhouette visible. -->
        <div class="w-full md:w-[45%] flex items-center justify-center relative">
          <figure class="w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
            <img
              [src]="photoUrl()"
              alt="Vinay K R rendered in ASCII characters with orange accents"
              width="800"
              height="699"
              fetchpriority="high"
              class="block w-full h-auto object-contain"
            />
          </figure>
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
export class HeroComponent {
  photoUrl = signal<string>('/vinay-ascii-portrait.png');
  parallaxY = signal(0);
  mouseX = signal(0);
  mouseY = signal(0);
  hoveredTag = signal<string | null>(null);

  readonly bgTextTransform = computed(
    () => `translate3d(calc(-50% + ${this.mouseX() * -0.04}px), calc(-50% + ${this.parallaxY() * -0.22}px), 0)`
  );
  readonly blobOneTransform = computed(
    () => `translate3d(${this.mouseX() * 0.05}px, ${this.parallaxY() * 0.45}px, 0)`
  );
  readonly blobTwoTransform = computed(
    () => `translate3d(${this.mouseX() * -0.05}px, ${this.parallaxY() * 0.22}px, 0)`
  );

  techs = ['Python', 'FastAPI', 'LangGraph', 'Hybrid RAG', 'OpenTelemetry', 'pgvector', 'PostgreSQL', 'Redis', 'PyTorch'];

  floatingTags = [
    { text: 'LangGraph', top: '14%', left: '78%', speedX: -0.06, speedY: 0.03, target: 'skills' },
    { text: 'OpenTelemetry', top: '66%', left: '6%', speedX: 0.04, speedY: -0.05, target: 'skills' },
    { text: 'Hybrid RAG', top: '78%', left: '78%', speedX: -0.05, speedY: 0.03, target: 'skills' },
    { text: 'pgvector', top: '38%', left: '86%', speedX: 0.03, speedY: -0.04, target: 'skills' },
    { text: 'FastAPI Agents', top: '84%', left: '24%', speedX: -0.03, speedY: 0.05, target: 'skills' },
  ];

  private ticking = false;

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

  scrollToSection(targetId: string) {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
