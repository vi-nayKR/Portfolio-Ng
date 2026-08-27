import { Component, ChangeDetectionStrategy, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TiltDirective],
  template: `
    <section id="experience" class="relative py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Parallax background accent -->
      <div
        class="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent pointer-events-none"
        [style.transform]="'translateY(' + (-parallaxOffset()) + 'px)'"
      ></div>

      <!-- Outline background Typography -->
      <div
        class="absolute left-[-10%] top-10 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * 1.1) + 'px, 0, 0)'"
      >
        JOURNEY
      </div>

      <div class="relative z-10 max-w-4xl mx-auto">
        <div class="text-center mb-8 md:mb-12">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Career Journey</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Work Experience
          </h2>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical base line -->
          <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/20 via-accent/10 to-transparent"></div>

          <!-- Dynamic glowing progress line -->
          <div
            class="timeline-progress-line"
            [style.height.%]="timelineProgress()"
          ></div>

          <div class="space-y-8 md:space-y-10">
            @for (exp of experiences; track exp.company + '-' + exp.role; let i = $index) {
              <div
                class="relative flex flex-col md:flex-row gap-8"
                [class.md:flex-row-reverse]="i % 2 === 1"
                [style.opacity]="visible() ? '1' : '0'"
                [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
                [style.transition]="'opacity 0.6s ease ' + (i * 0.15) + 's, transform 0.6s ease ' + (i * 0.15) + 's'"
              >
                <!-- Dot on the line -->
                <div class="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-void -translate-x-1/2 mt-6 z-10 animate-pulse-glow"></div>

                <!-- Date badge (desktop) -->
                <div class="hidden md:flex w-[calc(50%-2rem)] items-stretch"
                     [class.justify-end]="i % 2 === 0"
                     [class.justify-start]="i % 2 === 1"
                     [class.pr-8]="i % 2 === 0"
                     [class.pl-8]="i % 2 === 1">
                  <div class="flex flex-col w-full h-full" [class.items-end]="i % 2 === 0" [class.items-start]="i % 2 === 1">
                    <div class="text-right" [class.text-left]="i % 2 === 1">
                      <span class="text-sm font-mono text-accent">{{ exp.period }}</span>
                      <p class="text-xs text-muted mt-1">{{ exp.location }}</p>
                    </div>

                    @if (exp.image) {
                      <div
                        appTilt
                        [maxTilt]="6"
                        [scale]="1.03"
                        [class]="'mt-4 w-full ' + (exp.maxWidth || 'max-w-[320px]') + ' overflow-hidden rounded-xl border border-border/30 bg-void/50 group/exp-img shadow-lg cursor-pointer ' + (exp.aspect === 'aspect-[1/2]' ? 'md:aspect-auto flex-1 min-h-0 aspect-[1/2]' : (exp.aspect || 'aspect-[16/9]'))"
                      >
                        <img
                          [src]="exp.image"
                          [alt]="exp.company"
                          class="w-full h-full object-cover transition-transform duration-700 group-hover/exp-img:scale-105"
                        />
                      </div>
                    }
                  </div>
                </div>

                <!-- Card -->
                <div class="ml-14 md:ml-0 md:w-[calc(50%-2rem)]"
                     [class.md:pl-8]="i % 2 === 0"
                     [class.md:pr-8]="i % 2 === 1">
                  <div
                    appTilt
                    [maxTilt]="8"
                    [scale]="1.02"
                    class="p-6 rounded-2xl apple-glass card-hover"
                  >
                    <!-- Mobile date -->
                    <span class="md:hidden text-xs font-mono text-accent block mb-2">{{ exp.period }}</span>

                    <div class="flex items-start justify-between mb-3">
                      <div>
                        <h3 class="font-display font-semibold text-frost text-lg">{{ exp.role }}</h3>
                        <p class="text-accent text-sm font-medium">{{ exp.company }}</p>
                        @if (exp.note) {
                          <p class="text-muted text-xs mt-0.5 italic">{{ exp.note }}</p>
                        }
                      </div>
                      <span class="text-xs text-muted bg-void px-2 py-1 rounded-lg border border-border font-mono whitespace-nowrap">
                        {{ exp.type }}
                      </span>
                    </div>

                    <ul class="space-y-2 mt-4">
                      @for (point of exp.highlights; track point) {
                        <li class="flex items-start gap-2 text-sm text-muted leading-relaxed">
                          <span class="text-accent mt-1 shrink-0">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                          </span>
                          {{ point }}
                        </li>
                      }
                    </ul>

                    <div class="flex flex-wrap gap-1.5 mt-5">
                      @for (tag of exp.tags; track tag) {
                        <span class="px-2 py-0.5 rounded text-xs bg-void border border-border text-muted font-mono">{{ tag }}</span>
                      }
                    </div>

                    @if (exp.image) {
                      <div [class]="'md:hidden mt-5 relative overflow-hidden rounded-xl border border-border/30 bg-void/50 group/exp-img ' + (exp.aspect || 'aspect-[4/3]')">
                        <img
                          [src]="exp.image"
                          [alt]="exp.company"
                          class="w-full h-full object-cover transition-transform duration-700 group-hover/exp-img:scale-105"
                        />
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  experiences = [
    {
      role: 'Software Engineer – Full Stack',
      company: 'Liminal Custody (First Answer India Services Pvt Ltd)',
      period: 'Nov 2025 – Mar 2026',
      location: 'Bengaluru, India',
      type: 'Full-time',
      highlights: [
        'Built Angular policy-configuration flows for transaction-risk, transfer, travel-rule, address-list, and wallet-group rules using reusable controls and approval workflows.',
        'Implemented backend rule-condition-action evaluation and data modeling, with cached short-circuit evaluation and external address-risk integration.',
        'Debugged authorization and quorum approval flows, including organization-scoped access and approve/reject API integration.',
        'Contributed to multi-organization RBAC through Angular guards/interceptors and backend role/organization middleware.',
      ],
      tags: ['Angular', 'TypeScript', 'RxJS', 'Node.js', 'Express.js', 'TypeORM', 'Redis', 'RBAC'],
      image: 'crypto-custody.png',
      aspect: 'aspect-[1/2]',
      maxWidth: 'max-w-[320px]',
    },
    {
      role: 'Senior Associate Software Engineer',
      company: 'Light & Wonder (LNW India Solutions Pvt Ltd)',
      note: 'Promoted from Associate Software Engineer',
      period: 'Aug 2023 – Jul 2025',
      location: 'Bengaluru, India',
      type: 'Full-time',
      highlights: [
        'Built and modernized typed Angular screens across financial, player-management, and device-facing product workflows.',
        'Used RxJS and WebSocket integrations for real-time UI updates and fixed a subscription/lifecycle leak affecting long-running devices.',
        'Integrated Angular applications with C#/.NET APIs and SQL Server-backed financial workflows.',
        'Implemented audit-data capture/reporting workflows and maintained Cypress end-to-end regression coverage.',
      ],
      tags: ['Angular', 'C# / .NET Core', 'RxJS', 'WebSockets', 'SQL Server', 'Cypress', 'Telemetry'],
      image: 'slot-machine.png',
      aspect: 'aspect-[1/2]',
      maxWidth: 'max-w-[320px]',
    },
    {
      role: 'Full Stack Intern',
      company: 'Light & Wonder (LNW India Solutions Pvt Ltd)',
      period: 'Mar 2023 – Jul 2023',
      location: 'Bengaluru, India',
      type: 'Internship',
      highlights: [
        'Built a Game Recommendation System in C#/.NET Core and Angular over a 16-week internship, covering REST APIs, SQL Server, and debugging.',
      ],
      tags: ['Angular', 'C# / .NET Core', 'REST API', 'SQL Server'],
      image: 'roulette.png',
      aspect: 'aspect-[4/3]',
      maxWidth: 'max-w-[320px]',
    },
  ];

  timelineProgress = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY;
    this.parallaxOffset.set(scrollY * 0.04);

    // Calculate height of timeline progress line based on viewport bounding of experience element
    const el = document.getElementById('experience');
    if (el) {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate active scrolling within the section
      const total = rect.height;
      const current = viewportHeight * 0.4 - rect.top;

      if (rect.top < viewportHeight * 0.4 && rect.bottom > viewportHeight * 0.6) {
        const percent = Math.min(Math.max((current / total) * 100, 0), 100);
        this.timelineProgress.set(percent);
      } else if (rect.bottom <= viewportHeight * 0.6) {
        this.timelineProgress.set(100);
      } else {
        this.timelineProgress.set(0);
      }
    }
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#experience');
      if (el) observer.observe(el);
    }, 100);
  }
}
