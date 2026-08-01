import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TiltDirective, SafeHtmlPipe],
  template: `
    <section id="skills" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      <!-- Parallax bg element -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
             style="background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline background Typography -->
      <div
        class="absolute left-[-15%] top-1/3 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.0) + 'px, 0, 0)'"
      >
        EXPERTISE
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Technical Expertise</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Skills &amp; Technologies
          </h2>
        </div>

        <!-- Category grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (category of categories; track category.name) {
            <div
              appTilt
              [maxTilt]="10"
              [scale]="1.03"
              class="p-6 rounded-2xl apple-glass card-hover"
            >
              <div class="flex items-center gap-3 mb-5">
                <div class="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span [innerHTML]="category.icon | safeHtml" class="text-accent"></span>
                </div>
                <h3 class="font-display font-semibold text-frost">{{ category.name }}</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                @for (skill of category.skills; track skill.name) {
                  <span class="px-3 py-1.5 rounded-xl text-sm font-bold bg-void border border-border text-frost hover:border-accent/50 hover:text-accent transition-all duration-300 drop-shadow-md">
                    {{ skill.name }}
                  </span>
                }
              </div>
            </div>
          }
        </div>

        <!-- Tag cloud -->
        <div class="mt-12 text-center">
          <p class="text-muted text-sm mb-6 font-mono">Also familiar with</p>
          <div class="flex flex-wrap justify-center gap-2">
            @for (tag of extraTags; track tag) {
              <span class="px-3 py-1.5 rounded-full text-xs font-medium apple-glass text-frost hover:border-accent/50 hover:text-accent transition-all duration-200 cursor-default">
                {{ tag }}
              </span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  categories = [
    {
      name: 'Frontend',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
      skills: [
        { name: 'Angular' },
        { name: 'TypeScript' },
        { name: 'RxJS' },
        { name: 'Reactive Forms' },
        { name: 'HTML5' },
        { name: 'CSS3' },
      ],
    },
    {
      name: 'Backend',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>',
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'TypeORM' },
        { name: 'MySQL' },
        { name: 'REST API Design' },
      ],
    },
    {
      name: 'Testing & Tools',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
      skills: [
        { name: 'Git' },
        { name: 'Cypress' },
        { name: 'Docker' },
        { name: 'Postman / OpenAPI' },
        { name: 'AWS (S3, EC2)' },
      ],
    },
  ];

  // Secondary exposure — kept out of the primary Angular/Node/MySQL categories.
  extraTags = ['SQL Server', 'Go', 'PostgreSQL', 'Redis', 'WebSockets', 'C# / .NET Core'];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.03);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#skills');
      if (el) observer.observe(el);
    }, 100);
  }
}
