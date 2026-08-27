import { Component, ChangeDetectionStrategy, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TiltDirective, SafeHtmlPipe],
  template: `
    <section id="about" class="relative py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Parallax decorative line -->
      <div
        class="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      ></div>

      <!-- Outline background texts -->
      <div
        class="absolute right-[-10%] top-10 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.2) + 'px, 0, 0)'"
      >
        ARCHITECTURE
      </div>
      <div
        class="absolute left-[-10%] bottom-10 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * 1.2) + 'px, 0, 0)'"
      >
        SYSTEMS
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">

          <!-- Left: Text -->
          <div [class.animate-slide-in-left]="visible()" [style.opacity]="visible() ? '1' : '0'" style="transition: opacity 0.7s">
            <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">About Me</p>
            <h2 class="text-4xl md:text-5xl font-display font-bold text-frost mb-6 leading-tight text-balance">
              Product Engineering &amp;
              <span class="gradient-text">Reliable Backends</span>
            </h2>
            <p class="text-muted leading-relaxed mb-4">
              I have 3+ years of enterprise software experience across fintech (<span class="text-frost">Liminal Custody</span>) and regulated gaming (<span class="text-frost">Light &amp; Wonder</span>), primarily delivering Angular/TypeScript applications and end-to-end product features.
            </p>
            <p class="text-muted leading-relaxed mb-4">
              My production work includes policy configuration, rule evaluation, organization-scoped authorization, approval flows, real-time RxJS/WebSocket interfaces, C#/.NET API integration, SQL-backed workflows, debugging, and Cypress regression coverage.
            </p>
            <p class="text-muted leading-relaxed mb-6">
              Outside work, I am strengthening backend and applied-AI depth through a large <span class="text-frost">Go/PostgreSQL platform</span> and reproducible <span class="text-frost">Python/FastAPI agent-pattern</span> projects. These are presented as independent projects—not as production employment claims.
            </p>

          </div>

          <!-- Right: Info cards -->
          <div class="space-y-4" [style.opacity]="visible() ? '1' : '0'" style="transition: opacity 0.9s">
            @for (card of cards; track card.title) {
              <div
                appTilt
                [maxTilt]="8"
                [scale]="1.02"
                class="p-5 rounded-xl apple-glass card-hover"
              >
                <div class="flex items-start gap-4 justify-between">
                  <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <span [innerHTML]="card.icon | safeHtml" class="text-accent"></span>
                    </div>
                    <div>
                      <h3 class="font-semibold text-frost mb-1">{{ card.title }}</h3>
                      <p class="text-sm text-muted leading-relaxed">{{ card.desc }}</p>
                    </div>
                  </div>
                  @if (card.image) {
                    <div
                      class="relative overflow-hidden rounded-xl border border-border bg-void w-16 md:w-20 aspect-[1/1.414] cursor-pointer group/edu-img shadow-lg shrink-0"
                      (click)="openCertificate(card.link)"
                    >
                      <img
                        [src]="card.image"
                        [alt]="card.title"
                        class="w-full h-full object-cover object-top transition-transform duration-500 group-hover/edu-img:scale-105"
                        loading="lazy"
                      />
                      <!-- Hover overlay indicating view -->
                      <div class="absolute inset-0 bg-void/60 opacity-0 group-hover/edu-img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span class="px-1.5 py-0.5 rounded bg-accent text-frost text-[8px] font-semibold flex items-center gap-0.5 shadow-lg">
                          <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                          View
                        </span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  cards = [
    {
      title: 'Education',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>',
      desc: 'B.E. Computer Science — Siddaganga Institute of Technology, CGPA 8.65/10 (2019–2023)',
      image: '/certificates/be_degree.png',
      link: 'https://drive.google.com/file/d/1YTTYwxIe961y7qce_SdFsRhpVS2NN-vn/view?usp=sharing'
    },
    {
      title: 'Location',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
      desc: 'Bengaluru, India — Open to remote & hybrid opportunities',
    },
    {
      title: 'Interests',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
      desc: 'Angular architecture, API design, Go backends, PostGIS, testing, and applied-AI integration',
    },
  ];

  openCertificate(link?: string) {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const offset = window.scrollY;
    this.parallaxOffset.set(offset * 0.05);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );
    setTimeout(() => {
      const el = document.querySelector('#about');
      if (el) observer.observe(el);
    }, 200);
  }
}
