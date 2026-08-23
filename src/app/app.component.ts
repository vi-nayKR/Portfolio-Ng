import { Component, OnInit, NgZone } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AiLabComponent } from './components/ai-lab/ai-lab.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ResumeComponent } from './components/resume/resume.component';
import { GithubComponent } from './components/github/github.component';
import { MajorProjectComponent } from './components/major-project/major-project.component';
import { ConferenceComponent } from './components/conference/conference.component';
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
    AiLabComponent,
    ExperienceComponent,
    ResumeComponent,
    GithubComponent,
    MajorProjectComponent,
    ConferenceComponent,
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
        <app-ai-lab />
        <app-experience />
        <app-resume />
        <app-github />
        <app-conference />
        <app-major-project />
        <app-contact />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // Run Lenis outside of Angular zone for maximum scrolling smoothness
    this.ngZone.runOutsideAngular(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });
  }
}
