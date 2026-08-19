import { Component, ChangeDetectionStrategy, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TiltDirective, SafeHtmlPipe],
  template: `
    <section id="projects" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      <!-- Parallax background -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
             style="background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline background Typography -->
      <div
        class="absolute right-[-10%] top-1/4 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * 1.0) + 'px, 0, 0)'"
      >
        CREATIONS
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Portfolio & Projects</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Featured Work &amp; Creations
          </h2>
        </div>

        <!-- Featured project (large) -->
        <div
          appTilt
          [maxTilt]="6"
          [scale]="1.01"
          class="mb-8 p-5 md:p-6 rounded-2xl apple-glass card-hover overflow-hidden relative animate-fade-in-up"
          [style.opacity]="visible() ? '1' : '0'"
          style="transition: opacity 0.7s, transform 0.7s"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
        >
          <div class="relative z-10 flex flex-col lg:flex-row items-center gap-6 md:gap-8">
            <!-- Left side: details -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div class="flex items-center gap-4">
                  <!-- Vector Icon -->
                  <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                    <svg class="w-8 h-8" viewBox="0 0 463 464" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="m8.444 232.23 8.273-8.274L239.661 446.9l-8.273 8.273z"/>
                      <path fill="currentColor" d="m231.393 455.187-8.273-8.273 223.17-223.17 8.273 8.273z"/>
                      <path fill="currentColor" d="m454.566 231.995-8.273 8.273L223.357 17.332l8.273-8.273z"/>
                      <path fill="currentColor" d="m231.628 9.057 8.273 8.273L16.731 240.5l-8.273-8.273zM53.238 232.21l6.612-6.61 178.184 178.183-6.612 6.612z"/>
                      <path fill="currentColor" d="m231.413 410.405-6.612-6.612L403.17 225.426l6.611 6.611z"/>
                      <path fill="currentColor" d="m409.782 232.024-6.612 6.611L224.986 60.451l6.612-6.611z"/>
                      <path fill="currentColor" d="m231.604 53.832 6.611 6.611L59.848 238.811l-6.612-6.612zM101.736 232.183l4.808-4.809 129.712 129.712-4.808 4.808z"/>
                      <path fill="currentColor" d="m231.446 361.89-4.808-4.808 129.839-129.84 4.808 4.81z"/>
                      <path fill="currentColor" d="M226 347h12v92h-12zM26 238v-12h92v12zm321 0v-12h92v12z"/>
                      <path fill="currentColor" d="M 215,17.5 a 17.5,17.5 0 1,0 35,0 a 17.5,17.5 0 1,0 -35,0"/>
                      <path fill="currentColor" d="M 0,232.5 a 17.5,17.5 0 1,0 35,0 a 17.5,17.5 0 1,0 -35,0"/>
                      <path fill="currentColor" d="M 428,232.5 a 17.5,17.5 0 1,0 35,0 a 17.5,17.5 0 1,0 -35,0"/>
                      <path fill="currentColor" d="M 215,446.5 a 17.5,17.5 0 1,0 35,0 a 17.5,17.5 0 1,0 -35,0"/>
                      <path fill="currentColor" d="m239.21 144.35-1.22-3.6-1.61 3.27-3.9 6.27-2.62 4.26c-1.25 2.04-2.59 3.85-4.08 5.78-.69.9-1.07 2.17-1.78 3.16l-3.48 4.82c-1.25 1.74-4.55 10.73-5.18 13.15-1.29 4.99-1.42 10.21-.83 15.31.16 1.37.62 2.44.46 4.06-2.08.2-5.37-8.08-6.04-9.54l-3.78-8.32c-1.86-4.08-2.44-8.34-3.38-12.67-1.22-5.66-2.13-11.12-1.61-16.84.74-8.23 3.31-15.82 7.74-23.1 1.72-2.82 3.22-5.5 5.19-8.19 3.97-5.42 8.26-10.56 10.93-16.6 1.63-3.68 2.76-7.3 4.1-11.08.69-1.95 1.19-8.85.79-11.51l-1.06-7.03c4.17 1.96 6.41 5.07 9.35 7.81 3.99 3.71 10.56 10.82 13.62 15.01l4.78 6.55c4.71 6.45 7.77 13.48 10.86 20.65 1.29 2.99 2.01 5.96 3.06 9.02.61 1.79.87 3.68 1.31 5.53 1.22 5.09 2.24 16.36 1.38 20.97l-1.52 8.24c-.85 4.62-1.94 9.01-4.04 13.31-.76 1.56-1.11 3.44-2.04 4.89-3.95 6.1-2.48 7.14-5.43 10.88-.17.22-.88.67-1.13.55-1.72-.84.4-9.61-.67-13.19-1.86-6.28-.63-8.01-3.67-13.07l-6.01-10.02-3.23-4.83c-1.59-2.38-2.43-5.1-3.29-7.77l-2-6.14Z"/>
                      <path fill="currentColor" d="M254.96 220.15c.94-2.11 1.81-4.04 2.87-5.94l3.48-6.22 2.3-4.06 3.79-7.26c4.36-8.35 6.91-16.31 8.63-25.68.26-1.41.24-3.15.33-4.62.7-10.85 6.34-10.07 6.05-24.01-.07-3.31-.8-4.66.91-5.21 1.79 2.32 2.85 5.06 3.9 7.8.37.95 1.07 2.02 1.35 3.05 1.96 7.26 3.36 14.73 2.85 22.38-.59 8.75-3.81 19.09-9.28 25.94-3 3.76-13.75 13.89-17.56 16.57-2.12 1.49-3.44 3.33-5.12 5.29-1.49 1.73-3.39 3.57-4.18 5.69-.12.33-1.08.76-1.37.62-.35-.17-.45-.98-.28-1.37l1.32-2.98Zm-37.36 1.25c-.94-2.11-1.81-4.04-2.87-5.94l-3.48-6.22-2.3-4.06-3.79-7.26c-4.36-8.35-6.91-16.31-8.63-25.68-.26-1.41-.24-3.15-.33-4.62-.7-10.85-6.34-10.07-6.05-24.01.07-3.31.8-4.66-.91-5.21-1.79 2.32-2.85 5.06-3.9 7.8-.37.95 1.07 2.02 1.35 3.05-1.96 7.26-3.36 14.73-2.85 22.38.59 8.75 3.81 19.09 9.28 25.94 3 3.76 13.75 13.89 17.56 16.57 2.12 1.49 3.44 3.33 5.12 5.29 1.49 1.73 3.39 3.57 4.18 5.69.12.33 1.08.76 1.37.62.35-.17-.45-.98-.28-1.37l-1.32-2.98Z"/>
                      <path fill="currentColor" d="m203.37 236.06 6.48 6.26 3.42 2.87c.51.43 2.84 1.75 2.1 2.82-.15.22-.67.14-1 0l-12.93-5.94c-1.93-.89-3.63-2.01-5.49-3.17-12.55-7.84-20.58-13.62-28.75-26.22-6.57-10.12-8.85-20.23-9.81-32.11-.41-5.13.78-16.51 2.2-21.26l1.71-5.72c1.7-.48 5.19 4.02 7.41 5.89 3.97 3.35 7.06 7.85 9.3 12.58l.11 16.56c.37 5.08 1.4 9.82-2.94 14.64.57 1.79 1.04 3.54 1.87 5.22l2.87 5.79c.98 1.98 2.13 3.67 3.44 5.43 1.51 2.03 2.82 4.13 4.44 6.05l3.37 4.01c1.9 2.25 4.13 4.18 6.34 6.32Zm68.26 0-6.48 6.26-3.42 2.87c-.51.43-2.84 1.75-2.1 2.82.15.22.67.14 1 0l12.93-5.94c1.93-.89 3.63-2.01 5.49-3.17 12.55-7.84 20.58-13.62 28.75-26.22 6.57-10.12-8.85-20.23 9.81-32.11.41-5.13-.78-16.51-2.2-21.26l-1.71-5.72c-1.7-.48-5.19 4.02-7.41 5.89-3.97 3.35-7.06 7.85-9.3 12.58l-.11 16.56c-.37 5.08-1.4 9.82-2.94 14.64-.57 1.79 1.04 3.54-1.87 5.22l-2.87 5.79c-.98 1.98-2.13 3.67-3.44 5.43-1.51 2.03-2.82 4.13-4.44 6.05l-3.37 4.01c-1.9 2.25-4.13 4.18-6.34 6.32ZM141.27 206.7c.54 4.12 5.58 13.18 8.45 16.15l4.01 4.17c.99 1.03 2.24 2.08 3.43 2.9l4.69 3.23c2.43 1.67 5.05 2.91 7.77 4.19 1.29.61 6.23 2.12 5.68 3.17-.1.18-.57.47-.84.44l-6.48-.66c-13.87-1.42-24.21-8.75-32.06-19.93-1.92-2.73-3.32-5.53-4.69-8.58-1.87-4.13-2.79-8.33-3.51-12.82-.76-4.81-1.6-9.23-1.24-14.15l.33-4.57c.05-.71.14-1.49 1.05-1.55 2.29 2.52 1.66 2.47 4.36 5.33.92.97 1.69 2.32 2.74 3.13 2.59 2 5.12 3.9 7.87 5.64l3.9 2.48c2.39 1.52 5.27 2.62 7.02 4.94l2.64 3.48c.81 1.07 1.4 2.32 2.28 3.35.65.77 1.5 2.1.25 2.78-.34.18-.93-.84-1.2-1.1-.7-.63-1.91-1.08-2.76-1.56-1.31-.73-2.53-1.58-3.89-2.17-2.75-1.2-5.47-1.92-8.36-2.63l-2.05-.5.63 4.82Zm188.93 1.87c-.51 3.89-5.28 12.46-7.99 15.28l-3.79 3.94c-.94.98-2.12 1.97-3.25 2.74l-4.43 3.05c-2.3 1.58-4.77 2.75-7.35 3.96-1.22.58-5.89 2-5.37 3 .09.17.54.45.79.42l6.13-.63c13.12-1.34 22.9-8.28 30.32-18.85 1.82-2.59 3.13-5.23 4.44-8.11 1.77-3.9 2.64-7.88 3.32-12.12.72-4.54 1.51-8.73 1.17-13.38l-.31-4.32c-.05-.67-.14-1.41-.99-1.46-2.16 2.38-1.57 2.34-4.12 5.04-.87.92-1.6 2.19-2.59 2.96-2.45 1.89-4.84 3.68-7.44 5.34l-3.68 2.34c-2.26 1.44-4.98 2.48-6.64 4.67l-2.5 3.29c-.77 1.02-1.32 2.19-2.15 3.17-.61.72-1.41 1.99-.24 2.63.32.17.88-.8 1.14-1.04.66-.6 1.8-1.02 2.61-1.48 1.24-.69 2.39-1.49 3.68-2.06 2.6-1.13 5.18-1.82 7.9-2.48l1.94-.47-.6 4.56Zm-83.41 53.29-7.54-3.36c-2.31-1.03-4.47-1.95-6.98-2.59-4.95-1.25-16-.76-20.64 1.68l-3.69 1.94c1.75-3.97 4.87-4.4 7.88-5.68 6.52-2.76 13.75-2.55 20.44-.59 1.96.57 3.6 1.17 5.39 2.19 3.02 1.73 6.21 3.05 9.32 4.61 2.3 1.15 4.43 1.52 7.28 1.35-.1 3.22-9.52 1.29-11.46.43Z"/>
                      <path fill="currentColor" d="m229.42 261.86 7.54-3.36c2.31-1.03 4.47-1.95 6.98-2.59 4.95-1.25 16-.76 20.64 1.68l3.69 1.94c-1.75-3.97-4.87-4.4-7.88-5.68-6.52-2.76-13.75-2.55-20.44-.59-1.96.57-3.6 1.17-5.39 2.19-3.02 1.73-6.21 3.05-9.32 4.61-2.3 1.15-4.43 1.52-7.28 1.35.1 3.22 9.52 1.29 11.46.43Z"/>
                      <path fill="currentColor" d="M 98,230 a 13,13 0 1,0 26,0 a 13,13 0 1,0 -26,0"/>
                      <path fill="currentColor" d="M 219,349 a 13,13 0 1,0 26,0 a 13,13 0 1,0 -26,0"/>
                      <path fill="currentColor" d="M 341,229 a 13,13 0 1,0 26,0 a 13,13 0 1,0 -26,0"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded mb-1 inline-block">Featured Project</span>
                    <h3 class="text-2xl font-display font-bold text-frost">Medha</h3>
                    <p class="text-accent text-xs font-mono tracking-widest uppercase mt-0.5">A SACRED BRIDGE</p>
                  </div>
                </div>
                <a
                  href="https://medhainnovation.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/30 hover:border-accent bg-accent/5 hover:bg-accent/15 text-accent hover:text-accent-glow text-sm font-semibold transition-all duration-200 self-start sm:self-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
              </div>

              <!-- Short, concise, clear cut description -->
              <div class="space-y-2 mb-4 text-muted text-sm leading-relaxed max-w-2xl">
                <p>
                  <strong class="text-frost">Setu:</strong> A platform connecting Yajmans and Pandits — Android, iOS, web, and an operator admin panel served by one Go backend.
                </p>
                <p>
                  <strong class="text-frost">Backend:</strong> A Go/chi monolith organised into 21 bounded contexts — roughly 200 endpoints, 50 goose migrations, and 109 tests, with no ORM and parameterized SQL throughout.
                </p>
                <p>
                  <strong class="text-frost">Spatial:</strong> PostGIS proximity search using <code class="text-accent font-mono text-xs">ST_DWithin</code> over a GIST-indexed geography column, with distance-ordered keyset pagination for Pandit matching.
                </p>
                <p>
                  <strong class="text-frost">Real-time &amp; Auth:</strong> OTP authentication with JWT RS256 sessions, and WebSocket messaging fanned out across pods over Redis pub/sub so any pod can serve any client.
                </p>
                <p>
                  <strong class="text-frost">Infrastructure:</strong> Self-hosted k3s cluster reconciled by Argo CD — dev/prod namespace isolation, default-deny NetworkPolicies, SealedSecrets, and an outbound-only Cloudflare Tunnel with no inbound port open.
                </p>
              </div>

              <div class="flex flex-wrap gap-2">
                @for (tag of featuredTags; track tag) {
                  <span class="px-3 py-1 rounded-full text-xs font-mono bg-void border border-accent/30 text-accent">{{ tag }}</span>
                }
              </div>
            </div>

            <!-- Right side: Reactive Medha Logo -->
            <div class="w-full lg:w-64 xl:w-72 shrink-0 flex justify-center items-stretch">
              <div
                appTilt
                [maxTilt]="6"
                [scale]="1.02"
                class="w-full max-w-[240px] lg:max-w-none h-full min-h-[170px] rounded-xl border border-border/30 bg-void/50 shadow-xl relative group/medha-img flex items-center justify-center p-4 overflow-hidden"
              >
                <!-- Subtle ambient glow -->
                <div class="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5 opacity-50 group-hover/medha-img:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <!-- Reactive Logo -->
                <img
                  src="/medha-logo.svg"
                  alt="Medha App Logo"
                  class="w-auto h-full max-h-[160px] lg:max-h-[180px] object-contain drop-shadow-[0_0_20px_rgba(255,107,0,0.35)] group-hover/medha-img:scale-105 group-hover/medha-img:drop-shadow-[0_0_30px_rgba(255,107,0,0.6)] transition-all duration-500 relative z-10"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Project grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (proj of projects; track proj.title; let i = $index) {
            <div
              appTilt
              [maxTilt]="10"
              [scale]="1.03"
              class="p-6 rounded-2xl apple-glass card-hover flex flex-col"
              [style.opacity]="visible() ? '1' : '0'"
              [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
              [style.transition]="'opacity 0.6s ease ' + (0.1 + i * 0.1) + 's, transform 0.6s ease ' + (0.1 + i * 0.1) + 's'"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span [innerHTML]="proj.icon | safeHtml" class="text-accent"></span>
                </div>
                <div class="flex gap-2">
                  @if (proj.github) {
                    <a [href]="proj.github" target="_blank" rel="noopener noreferrer"
                       class="text-muted hover:text-frost transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                  }
                </div>
              </div>

              <h3 class="font-display font-semibold text-frost mb-2">{{ proj.title }}</h3>
              <p class="text-sm text-muted leading-relaxed flex-1 mb-4">{{ proj.desc }}</p>

              <div class="flex flex-wrap gap-1.5">
                @for (tag of proj.tags; track tag) {
                  <span class="px-2 py-0.5 rounded text-xs bg-void border border-border text-muted font-mono">{{ tag }}</span>
                }
              </div>
            </div>
          }
        </div>

        <!-- GitHub CTA -->
        <div class="mt-12 text-center">
          <a
            href="https://github.com/vi-nayKR"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border hover:border-accent/50 text-frost font-semibold text-sm transition-all duration-200 hover:bg-surface hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/10"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            See all repositories on GitHub
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  featuredTags = ['Go', 'chi', 'PostgreSQL', 'PostGIS', 'Redis', 'MinIO', 'Docker', 'Kubernetes', 'Argo CD', 'Cloudflare Tunnel', 'OpenAPI'];

  projects = [
    {
      title: 'Enterprise Agentic RAG Platform',
      desc: 'Multi-Agent RAG engine indexing complex enterprise documents with pgvector HNSW + BM25 Reciprocal Rank Fusion (RRF, k=60), boosting recall by 34%. Includes Model Context Protocol (MCP) tool execution, automated Ragas evals (0.94 Faithfulness), and SSE streaming with citations.',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
      tags: ['LangGraph', 'Python FastAPI', 'pgvector', 'BM25 RRF', 'MCP', 'Angular 22'],
      github: 'https://github.com/vi-nayKR/enterprise-agentic-rag-platform',
    },
    {
      title: 'Local LLM Inference Gateway',
      desc: 'High-throughput async inference gateway with Redis 8 vector semantic caching (<5ms response for cos-sim >=0.96). Serves quantized 8B models via vLLM with PagedAttention and continuous batching, cutting cloud API spend by 60%, with 4-bit QLoRA fine-tuning on Unsloth.',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>',
      tags: ['vLLM', 'FastAPI', 'Redis 8', 'Unsloth LoRA', 'Docker', 'PagedAttention'],
      github: 'https://github.com/vi-nayKR/local-llm-inference-gateway',
    },
    {
      title: 'Transaction Firewall & AI Risk Engine',
      desc: 'Liminal Custody transaction firewall policy engine and AI risk-scoring rules schema with Redis-cached short-circuit evaluation, TRM Labs address scoring, and multi-sig quorum approval thresholds ($100K/24hr).',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
      tags: ['Angular', 'TypeScript', 'Redis', 'Risk Scoring', 'RBAC'],
    },
    {
      title: 'Gaming Telemetry & Memory Leak Fix',
      desc: 'Light & Wonder regulated casino management modules across 4 product lines. Diagnosed and fixed critical video memory leak causing slot machines to freeze after 60 mins by implementing LRU media caching and explicit ngOnDestroy teardowns.',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      tags: ['Angular', 'C# / .NET', 'Telemetry', 'RxJS', 'Memory Profiling'],
    },
    {
      title: '750+ Automated Cypress E2E Suites',
      desc: 'Automated regression test suites across Servizio and Engage with one peer, sustaining zero compliance regressions through state gaming certification releases with automated SQL Server CDC trigger audit verification.',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
      tags: ['Cypress', 'E2E Testing', 'SQL Server', 'CI/CD Automation'],
    },
    {
      title: 'FastAPI GenAI Agent Patterns',
      desc: 'Production boilerplate for asynchronous FastAPI + Pydantic v2 + LangGraph agentic workflows with OpenTelemetry distributed tracing and Redis semantic caching.',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
      tags: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'OpenTelemetry'],
      github: 'https://github.com/vi-nayKR/fastapi-genai-agent-patterns',
    },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.02);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#projects');
      if (el) observer.observe(el);
    }, 100);
  }
}
