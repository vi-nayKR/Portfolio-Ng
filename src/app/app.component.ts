import { Component, OnInit, NgZone } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { GithubComponent } from './components/github/github.component';
import { MajorProjectComponent } from './components/major-project/major-project.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ParticlesComponent } from './components/particles/particles.component';
import { ScrollNavComponent } from './components/scroll-nav/scroll-nav.component';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ResumeComponent,
    ProjectsComponent,
    GithubComponent,
    MajorProjectComponent,
    ConferenceComponent,
    CertificationsComponent,
    ContactComponent,
    FooterComponent,
    ParticlesComponent,
    ScrollNavComponent,
  ],
  template: `
    <div class="noise relative">
      <app-scroll-nav />
      <app-particles />
      <app-navbar />
      <main>
        <app-hero />
        <app-about />
        <app-skills />
        <app-experience />
        <app-resume />
        <app-projects />
        <app-github />
        <app-conference />
        <app-major-project />
        <app-certifications />
        <app-contact />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like exponential easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      (window as any).lenisInstance = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      // Smooth scroll anchor link clicks using Lenis (event delegation)
      document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        if (anchor) {
          const href = anchor.getAttribute('href');
          if (href && href.startsWith('#') && href !== '#') {
            const element = document.querySelector(href) as HTMLElement;
            if (element) {
              e.preventDefault();
              lenis.scrollTo(element, { offset: -80 });
            }
          }
        }
      });
    });
  }
}
