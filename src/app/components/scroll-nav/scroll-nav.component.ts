import { Component, OnInit, OnDestroy, signal, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- On this page text navigation (Desktop only) -->
    <div 
      class="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1.5 w-[180px] text-left transition-all duration-300"
      [class.opacity-0]="hideNav()"
      [class.pointer-events-none]="hideNav()"
    >
      <h4 class="text-xs font-mono font-bold tracking-widest text-accent uppercase mb-2">On this page</h4>
      <div class="relative border-l border-border/60 pl-4 py-1 flex flex-col gap-2.5">
        @for (sec of navSections; track sec.id) {
          <a
            (click)="scrollTo(sec.id); $event.preventDefault();"
            [href]="'#' + sec.id"
            class="block text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer relative -ml-[17px] pl-[16px] border-l-2"
            [class.text-accent]="activeSection() === sec.id"
            [class.font-semibold]="activeSection() === sec.id"
            [class.border-accent]="activeSection() === sec.id"
            [class.text-muted]="activeSection() !== sec.id"
            [class.border-transparent]="activeSection() !== sec.id"
            [class.hover:text-frost]="activeSection() !== sec.id"
          >
            {{ sec.label }}
          </a>
        }
      </div>
    </div>

    <!-- Floating Circular Scroll Progress / Back to Top Widget -->
    <button
      (click)="handleWidgetClick()"
      class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full apple-glass border border-border/50 hover:border-accent/50 shadow-2xl hover:shadow-accent/15 group cursor-pointer transition-all duration-300 active:scale-95"
      [class.opacity-0]="scrollPercentage() < 3"
      [class.pointer-events-none]="scrollPercentage() < 3"
      aria-label="Scroll helper widget"
    >
      <!-- SVG Circular Progress Ring -->
      <svg class="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path
          class="text-border/20"
          stroke="currentColor"
          stroke-width="2.5"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="text-accent transition-all duration-100"
          stroke="currentColor"
          stroke-width="2.5"
          [attr.stroke-dasharray]="scrollPercentage() + ', 100'"
          stroke-linecap="round"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      <!-- Central Icon (Up/Down double arrow depending on scroll depth, perfectly centered) -->
      @if (scrollPercentage() > 80) {
        <!-- Double Up Arrow -->
        <svg class="w-5 h-5 text-accent group-hover:text-accent-glow transition-colors duration-200 z-10 animate-pulse" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 11.25l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
        </svg>
      } @else {
        <!-- Double Down Arrow -->
        <svg class="w-5 h-5 text-accent group-hover:text-accent-glow transition-colors duration-200 z-10 animate-bounce" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5 7.5 7.5-7.5m-15-6l7.5 7.5 7.5-7.5" />
        </svg>
      }
    </button>
  `,
  styles: [`
    .shadow-glow {
      box-shadow: 0 0 12px 3px var(--color-accent);
    }
  `]
})
export class ScrollNavComponent implements OnInit, OnDestroy {
  activeSection = signal('home');
  scrollPercentage = signal(0);
  hideNav = signal(false);

  navSections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills & Technologies' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'resume', label: 'Interactive Resume' },
    { id: 'projects', label: 'Featured Projects' },
    { id: 'github', label: 'GitHub & Open Source' },
    { id: 'conference', label: 'Conference & Paper' },
    { id: 'major-project', label: 'B.E. Major Project' },
    { id: 'certifications', label: 'Certifications' },
    // { id: 'gaming', label: 'Playground / Gaming' },
    // { id: 'setup', label: 'OS Workspace' },
    { id: 'contact', label: 'Get in Touch' }
  ];

  private observer!: IntersectionObserver;
  private ngZone = inject(NgZone);

  ngOnInit() {
    if (typeof window === 'undefined') return;

    // 1. Setup Intersection Observer for Scroll Spy
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    // Observe all section elements
    this.navSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        this.observer.observe(element);
      }
    });

    // 2. Track scroll percentage and footer collision outside Angular Zone
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScrollWindow, { passive: true });
      // Run once initially
      this.onScrollWindow();
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScrollWindow);
    }
  }

  private onScrollWindow = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Calculate scroll percentage
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const pct = Math.round((window.scrollY / docHeight) * 100);
      this.scrollPercentage.set(pct);
    }

    // Hide navigation when colliding with footer
    const footer = document.querySelector('footer');
    if (footer) {
      const footerTop = footer.getBoundingClientRect().top;
      this.hideNav.set(footerTop < window.innerHeight - 100);
    }
  };

  scrollTo(targetId: string) {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(targetId);
    if (el) {
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  handleWidgetClick() {
    if (this.scrollPercentage() > 80) {
      this.scrollTo('home');
    } else {
      const currentIdx = this.navSections.findIndex(s => s.id === this.activeSection());
      if (currentIdx !== -1 && currentIdx < this.navSections.length - 1) {
        this.scrollTo(this.navSections[currentIdx + 1].id);
      }
    }
  }
}
