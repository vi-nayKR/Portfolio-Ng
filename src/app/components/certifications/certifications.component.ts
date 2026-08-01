import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  template: `
    <section id="certifications" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden bg-abyss/40">
      <!-- Parallax background -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
             style="background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline background Typography -->
      <div
        class="absolute left-[-5%] top-1/4 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -0.8) + 'px, 0, 0)'"
      >
        CREDENTIALS
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Credentials & Verification</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Professional Certifications
          </h2>
        </div>

        <!-- Certifications Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (cert of certifications; track cert.image; let i = $index) {
            <div
              appTilt
              [maxTilt]="8"
              [scale]="1.02"
              class="p-5 rounded-2xl apple-glass card-hover flex flex-col justify-between group cursor-pointer"
              (click)="openModal(cert)"
              [style.opacity]="visible() ? '1' : '0'"
              [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
              [style.transition]="'opacity 0.6s ease ' + (0.1 + i * 0.05) + 's, transform 0.6s ease ' + (0.1 + i * 0.05) + 's'"
            >
              <div>
                <!-- Always-on image preview -->
                <div class="relative overflow-hidden rounded-xl border border-border bg-void aspect-[1.414/1] mb-5 relative group/img">
                  <img
                    [src]="cert.image"
                    [alt]="cert.title"
                    class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <!-- Hover overlay indicating zoom -->
                  <div class="absolute inset-0 bg-void/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span class="px-4 py-2 rounded-xl bg-accent text-frost text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                      </svg>
                      Zoom Preview
                    </span>
                  </div>
                </div>

                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      @if (cert.icon === 'linkedin') {
                        <svg class="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      } @else {
                        <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147L12 14.283l7.74-4.136L12 6.011 4.26 10.147zm0 0a1.994 1.994 0 01-1.07-1.916V6.9a2 2 0 011.666-1.972l5.807-1.161a2 2 0 011.666 0l5.808 1.161A2 2 0 0119.8 6.9v1.33a1.994 1.994 0 01-1.07 1.917M12 14.283v6.331m-3-1.636l3 1.636 3-1.636"/>
                        </svg>
                      }
                    </div>
                    <span class="text-xs text-frost font-semibold">{{ cert.issuer }}</span>
                  </div>
                  <span class="text-xs font-mono text-muted">{{ cert.date }}</span>
                </div>

                <h3 class="font-display font-semibold text-frost text-sm leading-snug mb-4 line-clamp-2">
                  {{ cert.title }}
                </h3>
              </div>

              <!-- Action verification link button -->
              <a
                [href]="cert.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border hover:border-accent/50 hover:bg-surface text-frost font-semibold text-xs transition-all duration-200"
                (click)="$event.stopPropagation()"
              >
                Verify Certificate
                <svg class="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>

      <!-- Lightbox Modal -->
      @if (selectedCert()) {
        <div
          class="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 backdrop-blur-md px-4 py-6"
          (click)="closeModal()"
        >
          <div
            class="relative w-full max-w-4xl apple-glass rounded-2xl overflow-hidden p-3 md:p-6 shadow-2xl flex flex-col gap-4"
            (click)="$event.stopPropagation()"
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h3 class="font-display font-bold text-frost text-lg leading-tight">{{ selectedCert().title }}</h3>
                <p class="text-xs text-muted mt-1">Issued by {{ selectedCert().issuer }} &bull; {{ selectedCert().date }}</p>
              </div>
              <button
                (click)="closeModal()"
                class="p-2 rounded-lg hover:bg-surface border border-border text-muted hover:text-frost transition-colors cursor-pointer shrink-0"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Modal Body (Preview Image) -->
            <div class="flex-1 flex justify-center items-center bg-void rounded-xl border border-border overflow-hidden p-2 aspect-[1.414/1]">
              <img
                [src]="selectedCert().image"
                [alt]="selectedCert().title"
                class="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-end gap-3">
              <button
                (click)="closeModal()"
                class="px-5 py-2.5 rounded-xl border border-border hover:bg-surface text-muted hover:text-frost text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                [href]="selectedCert().link"
                target="_blank"
                rel="noopener noreferrer"
                class="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-glow text-frost text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-accent/15"
              >
                Verify Certificate
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      }
    </section>
  `,
})
export class CertificationsComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);
  selectedCert = signal<any | null>(null);

  certifications = [
    {
      title: 'Udemy :  C# .NET Core 8 with MS SQL Complete Beginner to Master',
      issuer: 'Udemy',
      date: '2025',
      image: '/certificates/cypress_testing.png',
      link: 'https://drive.google.com/file/d/1fBnj9NHAuBAFGht37Fj6RLrEZC-AHIFr/view?usp=sharing',
      icon: 'udemy'
    },
    {
      title: 'Advanced TypeScript: Generics and Conditional Types',
      issuer: 'LinkedIn Learning',
      date: '2025',
      image: '/certificates/udemy_fullstack.png',
      link: 'https://drive.google.com/file/d/1zLaWhi3YIWk5d8qtU8ZKht1OCDUAbaum/view?usp=sharing',
      icon: 'linkedin'
    },
    {
      title: 'Building Angular and ASP.NET Web API Apps',
      issuer: 'LinkedIn Learning',
      date: '2025',
      image: '/certificates/node_microservices.png',
      link: 'https://drive.google.com/file/d/1rLznVQubTvfVdeyYmwZKIV1CT5iYiOXj/view?usp=sharing',
      icon: 'linkedin'
    },
    {
      title: 'Angular Performance Optmixation Techniques',
      issuer: 'LinkedIn Learning',
      date: '2025',
      image: '/certificates/go_rest_api.png',
      link: 'https://drive.google.com/file/d/1HattQFdTma2JE7CiQRgNxW3pcwf1_5k6/view?usp=sharing',
      icon: 'linkedin'
    },
    {
      title: 'React: Creating and Hosting a Full-Stack Site',
      issuer: 'LinkedIn Learning',
      date: '2025',
      image: '/certificates/learning_go.png',
      link: 'https://drive.google.com/file/d/1xv1VjmrAav-aht41il7-1lbkxpsCgFxE/view?usp=sharing',
      icon: 'linkedin'
    },
    {
      title: 'React : Authentication',
      issuer: 'LinkedIn Learning',
      date: '2025',
      image: '/certificates/react_essential.png',
      link: 'https://drive.google.com/file/d/1R6qfbZ1LUq7IEmT3f8wDNCbdzGmHGAMC/view?usp=sharing',
      icon: 'linkedin'
    }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.025);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#certifications');
      if (el) observer.observe(el);
    }, 100);
  }

  openModal(cert: any) {
    this.selectedCert.set(cert);
  }

  closeModal() {
    this.selectedCert.set(null);
  }
}
