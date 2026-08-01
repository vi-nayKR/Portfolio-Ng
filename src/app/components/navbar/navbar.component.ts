import { Component, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="fixed left-0 right-0 z-50 apple-glass transition-all duration-500 py-3 px-6 flex items-center justify-between top-0"
      [class.border-b]="scrolled()"
      [class.border-accent/20]="scrolled()"
      [class.shadow-lg]="scrolled()"
    >
      <!-- Logo: Vinay -->
      <a href="#home" class="group flex items-center gap-2">
        <span class="text-3xl gradient-text tracking-normal" style="font-family: 'Alex Brush', cursive;">
          Vinay
        </span>
      </a>

      <!-- Desktop Nav (Glassmorphic Tabs Grid) -->
      <ul class="hidden md:flex items-center gap-1 bg-void/30 border border-border/10 p-1 rounded-2xl backdrop-blur-sm">
        @for (item of navItems; track item.label) {
          <li>
            <a
              [href]="item.href"
              class="block px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all duration-300 border border-transparent"
              [class.glass-tab-active]="activeSection() === item.id"
              [class.glass-text-secondary]="activeSection() !== item.id"
              [class.hover:glass-text-primary]="activeSection() !== item.id"
            >
              {{ item.label }}
            </a>
          </li>
        }
      </ul>

      <!-- Theme Toggle & CTA (Desktop) -->
      <div class="hidden md:flex items-center gap-4">
        <button
          (click)="toggleTheme()"
          class="p-2 rounded-lg border border-border text-muted hover:text-frost hover:border-accent/40 hover:bg-surface transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
          aria-label="Toggle theme"
        >
          @if (isDarkMode()) {
            <!-- Sun Icon -->
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
          } @else {
            <!-- Moon Icon -->
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          }
        </button>
        
        <a
          href="#contact"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-glow text-frost text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
        >
          Hire Me
        </a>
      </div>

      <!-- Mobile Toggle Box (Theme + Menu) -->
      <div class="flex items-center gap-3 md:hidden">
        <a
          href="#contact"
          class="px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent-glow text-frost text-xs font-bold transition-all duration-200 shadow-md shadow-accent/10 hover:shadow-lg hover:shadow-accent/20"
        >
          Hire Me
        </a>
        <button
          (click)="toggleTheme()"
          class="p-2 rounded-lg border border-border text-muted hover:text-frost cursor-pointer flex items-center justify-center shrink-0"
          aria-label="Toggle theme"
        >
          @if (isDarkMode()) {
            <!-- Sun Icon -->
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
          } @else {
            <!-- Moon Icon -->
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          }
        </button>

        <button
          class="text-frost flex items-center justify-center"
          (click)="toggleMenu()"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            @if (!menuOpen()) {
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            } @else {
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            }
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (menuOpen()) {
        <div class="absolute top-[calc(100%+8px)] left-0 right-0 md:hidden apple-glass rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
          @for (item of navItems; track item.label) {
            <a
              [href]="item.href"
              class="block py-2.5 px-4 text-sm font-medium rounded-xl transition-all border border-transparent"
              [class.glass-tab-active]="activeSection() === item.id"
              [class.glass-text-secondary]="activeSection() !== item.id"
              [class.hover:glass-text-primary]="activeSection() !== item.id"
              (click)="menuOpen.set(false)"
            >{{ item.label }}</a>
          }
          <a
            href="#contact"
            (click)="menuOpen.set(false)"
            class="w-full text-center py-3 bg-accent hover:bg-accent-glow text-frost font-bold text-sm rounded-xl mt-2 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
          >
            Hire Me
          </a>
        </div>
      }
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  scrolled = signal(false);
  menuOpen = signal(false);
  isDarkMode = signal(true);
  activeSection = signal('home');

  navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Resume', href: '#resume', id: 'resume' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'GitHub', href: '#github', id: 'github' },
    { label: 'Conference', href: '#conference', id: 'conference' },
    { label: 'B.E.', href: '#major-project', id: 'major-project' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    // { label: 'Gaming', href: '#gaming', id: 'gaming' },
    // { label: 'Setup', href: '#setup', id: 'setup' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

      // Default is dark mode, unless light mode is explicitly selected
      const isLight = savedTheme === 'light' || (!savedTheme && systemPrefersLight);
      this.isDarkMode.set(!isLight);
      this.applyTheme(!isLight);
      
      // Determine active section immediately on load
      setTimeout(() => this.determineActiveSection(), 100);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 50);
    this.determineActiveSection();
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
    this.applyTheme(this.isDarkMode());
  }

  private applyTheme(dark: boolean) {
    if (typeof document === 'undefined') return;

    if (dark) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  private determineActiveSection() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Add home as a default section at top of page
    const sections = ['home', 'about', 'skills', 'experience', 'resume', 'projects', 'github', 'conference', 'major-project', 'certifications', 'contact'];
    let currentActive = 'home';
    
    // Check scroll height to set threshold
    const scrollPosition = window.scrollY + window.innerHeight * 0.35; // check when section covers 35% viewport from top

    // Special case for very top
    if (window.scrollY < 100) {
      this.activeSection.set('home');
      return;
    }

    // Special case for very bottom (Contact section is at the end)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      this.activeSection.set('contact');
      return;
    }

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentActive = sectionId;
        }
      }
    }
    this.activeSection.set(currentActive);
  }
}
