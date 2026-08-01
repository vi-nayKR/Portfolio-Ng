import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  template: `
    <section id="setup" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden bg-void">
      <!-- Glow background decors -->
      <div class="absolute top-1/3 right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 filter blur-[100px]"
           style="background: radial-gradient(circle, #ff007f 0%, transparent 70%);"></div>
      <div class="absolute bottom-1/3 left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 filter blur-[100px]"
           style="background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);"></div>

      <!-- Large Outline Parallax Text -->
      <div
        class="absolute right-[-5%] top-[25%] outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.3) + 'px, 0, 0)'"
      >
        DAILY DRIVER
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Workspace &amp; Environment</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Favourite <span class="gradient-text">OS Setup</span>
          </h2>
        </div>

        <!-- Favourite Operating System: Garuda Linux Section -->
        <div class="grid md:grid-cols-12 gap-8 items-center"
             [style.opacity]="visible() ? '1' : '0'"
             [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
             style="transition: opacity 0.8s, transform 0.8s;">
          
          <!-- Left Content: Words & Tech Stats (7 columns) -->
          <div class="md:col-span-7 space-y-6 text-left">
            <div>
              <p class="text-[#ff007f] font-mono text-xs tracking-widest uppercase mb-4">My Custom Environment</p>
              <h3 class="text-3xl md:text-4xl font-display font-bold text-frost leading-tight">
                Daily Driving <span class="text-[#ff007f] font-black">Garuda</span> <span class="gradient-text font-black">Dr460nized</span>
              </h3>
            </div>

            <!-- Terminal Card -->
            <div class="apple-glass rounded-xl p-5 border border-[#ff007f]/20 shadow-lg relative bg-void/70 overflow-hidden">
              <div class="absolute -right-12 -top-12 w-36 h-36 rounded-full opacity-10 bg-[#ff007f] blur-2xl"></div>
              
              <!-- Terminal Header -->
              <div class="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>
                <span class="font-mono text-[10px] text-muted">vinay&#64;garuda-dr460nized</span>
              </div>

              <!-- Terminal Body / Creative Copy -->
              <div class="font-mono text-xs space-y-3">
                <p class="text-muted"><span class="text-green-400">~</span> neofetch</p>
                <div class="grid grid-cols-3 gap-2 border-l-2 border-[#ff007f]/40 pl-3">
                  <div class="text-[#ff007f] font-bold">OS:</div>
                  <div class="col-span-2 text-frost">Garuda Linux x86_64</div>
                  
                  <div class="text-[#ff007f] font-bold">Edition:</div>
                  <div class="col-span-2 text-[#ff9242]">Dr460nized (KDE Git)</div>
                  
                  <div class="text-[#ff007f] font-bold">Kernel:</div>
                  <div class="col-span-2 text-frost">Linux-Zen (High Performance)</div>
                  
                  <div class="text-[#ff007f] font-bold">Shell:</div>
                  <div class="col-span-2 text-frost">fish (highly customized)</div>
                  
                  <div class="text-[#ff007f] font-bold">Theme:</div>
                  <div class="col-span-2 text-purple-400">Sweet-Amber-KDE (Neon Pink)</div>
                </div>

                <p class="text-muted leading-relaxed mt-4 text-justify">
                  <span class="text-green-400">#</span> "When it comes to my computing environment, I refuse to compromise on visual flair or sheer performance. Garuda Dr460nized Linux is the ultimate daily driver—coupling the lightning speed of an optimized <span class="text-frost font-bold">Linux-Zen kernel</span> with a customized, glowing cyberpunk desktop environment. Under the hood, it's Arch Linux speed. On the outside, it is absolute, beautiful chaotic neon energy that fuels my coding fires."
                </p>
              </div>
            </div>

            <!-- Features details tags -->
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-mono bg-void border border-[#ff007f]/40 text-[#ff007f] shadow-sm shadow-[#ff007f]/5">Arch Linux Base</span>
              <span class="px-3 py-1 rounded-full text-xs font-mono bg-void border border-accent/40 text-accent">Linux-Zen Kernel</span>
              <span class="px-3 py-1 rounded-full text-xs font-mono bg-void border border-purple-500/40 text-purple-400">KDE Plasma Dr460nized</span>
              <span class="px-3 py-1 rounded-full text-xs font-mono bg-void border border-blue-500/40 text-blue-400">Btrfs Auto-Snapshots</span>
            </div>
          </div>

          <!-- Right Content: Desk & Wallpaper Showcase (5 columns) -->
          <div class="md:col-span-5 space-y-6">
            <!-- Setup Card -->
            <div
              appTilt
              [maxTilt]="6"
              [scale]="1.03"
              [glowColor]="'rgba(255, 107, 0, 0.15)'"
              class="apple-glass rounded-2xl overflow-hidden border border-border/30 p-3 bg-void/50 cursor-pointer shadow-xl relative group"
            >
              <div class="relative overflow-hidden rounded-xl h-64 md:h-96">
                <img
                  src="desk-setup.png"
                  alt="Vinay Desk Setup with Garuda Linux"
                  class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="mt-3 p-1 flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold text-frost">My Daily Workspace</h4>
                  <p class="text-[9px] text-muted font-mono mt-0.5">Custom desk setup running Garuda OS</p>
                </div>
                <div class="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                  <svg class="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SetupComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.03);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.08 }
    );
    setTimeout(() => {
      const el = document.querySelector('#setup');
      if (el) observer.observe(el);
    }, 150);
  }
}
