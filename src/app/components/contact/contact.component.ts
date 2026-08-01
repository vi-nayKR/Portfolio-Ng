import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TiltDirective, SafeHtmlPipe],
  template: `
    <section id="contact" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      <!-- Parallax glow -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        [style.transform]="'translate(-50%, calc(-50% + ' + parallaxOffset() + 'px))'"
        style="background: radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)"
      ></div>

      <!-- Outline background Typography -->
      <div
        class="absolute right-[-10%] bottom-10 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.1) + 'px, 0, 0)'"
      >
        CONNECT
      </div>

      <div class="relative z-10 max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Let&apos;s Build Something
          </h2>
          <p class="text-muted mt-4 max-w-xl mx-auto leading-relaxed">
            Open to new opportunities. Whether it&apos;s a full-time role, freelance project, or just a chat about tech &mdash; I&apos;d love to hear from you.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-start">

          <!-- Contact Info -->
          <div
            [style.opacity]="visible() ? '1' : '0'"
            style="transition: opacity 0.7s, transform 0.7s"
            [style.transform]="visible() ? 'translateX(0)' : 'translateX(-30px)'"
          >
            <div class="space-y-5">
              @for (link of contactLinks; track link.label) {
                <a
                  appTilt
                  [maxTilt]="8"
                  [scale]="1.02"
                  [href]="link.href"
                  [target]="link.external ? '_blank' : '_self'"
                  rel="noopener noreferrer"
                  class="flex items-center gap-4 p-4 rounded-xl apple-glass hover:border-accent/40 transition-all duration-200 group card-hover"
                >
                  <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <span [innerHTML]="link.icon | safeHtml" class="text-accent"></span>
                  </div>
                  <div>
                    <p class="text-xs text-muted font-mono uppercase tracking-wider">{{ link.label }}</p>
                    <p class="text-frost font-medium text-sm mt-0.5">{{ link.value }}</p>
                  </div>
                  <svg class="w-4 h-4 text-muted ml-auto group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              }
            </div>

            <!-- GitHub activity banner -->
            <div class="mt-8 p-5 rounded-xl apple-glass">
              <p class="text-xs text-muted font-mono mb-3">GitHub Activity</p>
              <img
                src="https://ghchart.rshah.org/ff6b00/vi-nayKR"
                alt="GitHub contribution graph"
                class="w-full rounded opacity-80"
              />
            </div>
          </div>

          <!-- Contact Form -->
          <div
            [style.opacity]="visible() ? '1' : '0'"
            style="transition: opacity 0.9s, transform 0.9s"
            [style.transform]="visible() ? 'translateX(0)' : 'translateX(30px)'"
          >
            <form (ngSubmit)="submitForm()" class="space-y-5">
              <div>
                <label class="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Name</label>
                <input
                  [(ngModel)]="form.name" name="name"
                  type="text"
                  placeholder="John Doe"
                  class="w-full px-4 py-3 rounded-xl bg-surface/40 border border-border/80 text-frost placeholder:text-muted/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Email</label>
                <input
                  [(ngModel)]="form.email" name="email"
                  type="email"
                  placeholder="john@example.com"
                  class="w-full px-4 py-3 rounded-xl bg-surface/40 border border-border/80 text-frost placeholder:text-muted/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Message</label>
                <textarea
                  [(ngModel)]="form.message" name="message"
                  rows="11"
                  placeholder="Tell me about the project or opportunity..."
                  class="w-full px-4 py-3 rounded-xl bg-surface/40 border border-border/80 text-frost placeholder:text-muted/50 text-sm focus:outline-none focus:border-accent/60 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                [disabled]="submitted()"
                class="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                [class.bg-accent]="!submitted()"
                [class.hover:bg-accent-glow]="!submitted()"
                [class.text-frost]="true"
                [class.bg-surface]="submitted()"
                [class.text-muted]="submitted()"
                [class.border]="submitted()"
                [class.border-border]="submitted()"
              >
                @if (!submitted()) {
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Send Message
                } @else {
                  <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Message Sent!
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent implements OnInit {
  visible = signal(false);
  submitted = signal(false);
  parallaxOffset = signal(0);

  form = { name: '', email: '', message: '' };

  contactLinks = [
    {
      label: 'Email',
      value: 'vinayravindranatha@gmail.com',
      href: 'mailto:vinayravindranatha@gmail.com',
      external: false,
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    },
    {
      label: 'Phone',
      value: '+91 79758 93210',
      href: 'tel:+917975893210',
      external: false,
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/vinay-k-r',
      href: 'https://linkedin.com/in/vinay-k-r-a6bb51243',
      external: true,
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>',
    },
    {
      label: 'GitHub',
      value: 'github.com/vi-nayKR',
      href: 'https://github.com/vi-nayKR',
      external: true,
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>',
    },
  ];

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
      const el = document.querySelector('#contact');
      if (el) observer.observe(el);
    }, 100);
  }

  submitForm() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.submitted.set(true);

    const accessKey = '2ac57ee9-4b3e-49fe-b359-dc35b95a705f'; // Web3Forms access key

    if (accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      console.warn('Please set your Web3Forms access key to receive form emails.');
      // Local testing success fallback
      setTimeout(() => {
        this.form = { name: '', email: '', message: '' };
        this.submitted.set(false);
      }, 3000);
      return;
    }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: this.form.name,
        email: this.form.email,
        message: this.form.message,
        subject: `New Portfolio Message from ${this.form.name}`
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.form = { name: '', email: '', message: '' };
      } else {
        console.error('Email submission failed:', data.message);
      }
      this.submitted.set(false);
    })
    .catch(error => {
      console.error('Error submitting contact form:', error);
      this.submitted.set(false);
    });
  }
}
