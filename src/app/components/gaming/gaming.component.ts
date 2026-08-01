import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

interface GameInfo {
  name: string;
  stats: string;
  subStat: string;
  rank: string;
  icon: string;
  color: string;
  glow: string;
}



@Component({
  selector: 'app-gaming',
  standalone: true,
  imports: [CommonModule, TiltDirective, SafeHtmlPipe],
  template: `
    <section id="gaming" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden bg-void">
      <!-- Glow background decors -->
      <div class="absolute top-1/4 left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 filter blur-[100px]"
           style="background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);"></div>
      <div class="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 filter blur-[120px]"
           style="background: radial-gradient(circle, #7f00ff 0%, transparent 70%);"></div>

      <!-- Large Outline Parallax Text -->
      <div
        class="absolute left-[-5%] top-[15%] outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * 1.3) + 'px, 0, 0)'"
      >
        PLAYGROUND
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Hobbies &amp; Play</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            My Gaming <span class="gradient-text">Dashboard</span>
          </h2>
        </div>

        <div class="grid lg:grid-cols-12 gap-8 items-start mb-16">
          <!-- Left: Supercell ID Profile & Stats (7 columns on desktop) -->
          <div class="lg:col-span-7 space-y-6"
               [style.opacity]="visible() ? '1' : '0'"
               [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
               style="transition: opacity 0.7s, transform 0.7s;">
            
            <div class="apple-glass rounded-2xl p-6 relative overflow-hidden border border-border/40">
              <!-- Grid background -->
              <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div class="flex items-center gap-4">
                  <div class="relative w-14 h-14 rounded-full border-2 border-accent/60 overflow-hidden bg-abyss flex items-center justify-center shrink-0">
                    <!-- Custom King Avatar -->
                    <svg class="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3 5.5L21 6l-1.5 7.5h-15L3 6l6 1.5L12 2zm8 13.5c0 .8-.7 1.5-1.5 1.5h-13c-.8 0-1.5-.7-1.5-1.5V15h16v.5zM4 18h16v1c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1v-1z"/>
                    </svg>
                    <span class="absolute bottom-0 right-0 w-4.5 h-4.5 bg-green-500 rounded-full border-2 border-void"></span>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="font-display font-bold text-lg text-frost">VINAYKR</h3>
                      <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-accent/25 text-accent border border-accent/30">ID VERIFIED</span>
                    </div>
                    <p class="text-xs font-mono text-muted">Supercell ID Tag: VINAY.K.R</p>
                  </div>
                </div>
                
                <div class="text-left sm:text-right shrink-0">
                  <span class="text-[10px] font-mono text-muted block">GAMING STATUS</span>
                  <span class="text-sm font-semibold text-green-400 flex items-center gap-1.5 justify-start sm:justify-end">
                    <span class="w-2 h-2 rounded-full bg-green-400 animate-ping"></span> Active Player
                  </span>
                </div>
              </div>

              <!-- Game Stats Cards -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                @for (game of supercellGames; track game.name) {
                  <div
                    appTilt
                    [maxTilt]="10"
                    [scale]="1.04"
                    [glowColor]="game.glow"
                    class="p-4 rounded-xl border border-border/30 bg-void/50 hover:bg-void/85 relative transition-all duration-300 group cursor-pointer"
                  >
                    <!-- Visual Game Theme Border -->
                    <div class="absolute inset-x-0 bottom-0 h-1 rounded-b-xl" [style.background]="game.color"></div>
                    
                    <div class="flex items-center justify-between mb-3">
                      <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-void" [style.color]="game.color" [innerHTML]="game.icon | safeHtml"></div>
                      <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted group-hover:text-frost transition-colors">{{ game.rank }}</span>
                    </div>
                    <h4 class="font-bold text-frost text-sm mb-1">{{ game.name }}</h4>
                    <p class="text-xl font-display font-black tracking-tight" [style.color]="game.color">{{ game.stats }}</p>
                    <p class="text-[10px] text-muted font-mono leading-tight mt-1">{{ game.subStat }}</p>
                  </div>
                }
              </div>
            </div>

            <!-- Description Copy -->
            <div class="apple-glass rounded-2xl p-6 border border-border/40 relative">
              <div class="absolute top-3 right-4">
                <svg class="w-8 h-8 text-white/5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <h4 class="text-frost font-semibold mb-2">Tactical Thinker &amp; Reflex Battler</h4>
              <p class="text-muted text-sm leading-relaxed">
                Supercell games have been my primary source of digital adrenaline. Whether I am orchestrating precise heavy-zooka combinations at HQ 23 in <span class="text-accent font-semibold">Boom Beach</span>, grinding solos with tactical brawlers in <span class="text-[#f1c40f] font-semibold">Brawl Stars</span> (hitting a legendary peak of 44K+ trophies), or timing spell combinations in <span class="text-[#3498db] font-semibold">Clash Royale</span>, I love game mechanics that demand real-time strategic foresight, resource optimization, and rapid decision-making.
              </p>
            </div>
          </div>

          <!-- Right: Interactive Game ID Screenshot Container (5 columns on desktop) -->
          <div class="lg:col-span-5"
               [style.opacity]="visible() ? '1' : '0'"
               [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
               style="transition: opacity 0.9s, transform 0.9s;">
            
            <div
              appTilt
              [maxTilt]="6"
              [scale]="1.02"
              class="apple-glass rounded-2xl overflow-hidden border border-border/40 group relative aspect-[3/4] max-w-sm mx-auto shadow-2xl"
            >
              <!-- Glowing neon background -->
              <div class="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <!-- Image element -->
              <img
                src="supercell-id.jpg"
                alt="Supercell ID Rewards VINAYKR"
                class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              
              <!-- Glass bar at the bottom -->
              <div class="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-void via-void/80 to-transparent pt-12 backdrop-blur-[3px] flex flex-col justify-end text-left">
                <span class="text-accent font-mono text-[10px] tracking-widest uppercase mb-1">Supercell ID</span>
                <h4 class="text-frost font-display font-bold text-lg leading-tight">Official Rewards Dashboard</h4>
                <p class="text-muted text-xs mt-1">Verified Supercell ID account profile showing active status and rewards balance (2,355 Points).</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Photography Row -->
        <div class="grid md:grid-cols-12 gap-8 items-center mt-16 pt-16 border-t border-border/20"
             [style.opacity]="visible() ? '1' : '0'"
             [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
             style="transition: opacity 0.8s, transform 0.8s; transition-delay: 0.1s;">
          
           <!-- Left Content: Photograph (6 columns) -->
          <div class="md:col-span-6 relative group">
            <div
              appTilt
              [maxTilt]="6"
              [scale]="1.03"
              class="apple-glass rounded-2xl overflow-hidden border border-border/30 p-3 bg-void/50 cursor-pointer shadow-xl relative"
            >
              <div class="relative overflow-hidden rounded-xl h-64 md:h-[300px]">
                <img
                  src="photography-pool.jpg"
                  alt="Poolside photography by Vinay"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="mt-3 p-1 flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold text-frost">Poolside Symphony</h4>
                  <p class="text-[9px] text-muted font-mono mt-0.5">Shot by Vinay — Natural Light & Reflection</p>
                </div>
                <div class="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                  <svg class="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content: Text Description (6 columns) -->
          <div class="md:col-span-6 space-y-4 text-left">
            <div>
              <p class="text-accent font-mono text-xs tracking-widest uppercase mb-2">Visual Inspirations</p>
              <h3 class="text-2xl md:text-3xl font-display font-bold text-frost leading-tight">
                Capturing Perspectives through the <span class="gradient-text">Lens</span>
              </h3>
            </div>
            <p class="text-muted text-sm leading-relaxed">
              When I step away from compiling code or refining interfaces, I find myself looking at the world through a camera lens. Photography is my creative escape—a way to freeze-frame geometry, balance, and light. 
            </p>
            <p class="text-muted text-sm leading-relaxed">
              Whether it's capturing the calm reflections of a pool against a vast blue sky, discovering architectural lines, or exploring street symmetry, it keeps my details-oriented mind sharp. I believe a good eye for composition in photography translates directly into cleaner UI design and structured software architecture.
            </p>
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
export class GamingComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);


  supercellGames: GameInfo[] = [
    {
      name: 'Brawl Stars',
      stats: '44,679',
      subStat: 'Trophies Peak',
      rank: 'LEGENDARY',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
      color: '#f1c40f',
      glow: 'rgba(241, 196, 15, 0.18)'
    },
    {
      name: 'Clash Royale',
      stats: '12,604',
      subStat: 'Trophies | Arena 30',
      rank: 'ELITE',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>',
      color: '#3498db',
      glow: 'rgba(52, 152, 219, 0.18)'
    },
    {
      name: 'Boom Beach',
      stats: 'HQ 23',
      subStat: 'Level 59 | Exp 59',
      rank: 'GENERAL',
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V8a2.5 2.5 0 00-2.5-2.5H16A2.5 2.5 0 0113.5 3h-1.127M3.104 7.5A9 9 0 1121 12a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 01.104-4.5z"/></svg>',
      color: '#2ecc71',
      glow: 'rgba(46, 204, 113, 0.18)'
    }
  ];



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
      const el = document.querySelector('#gaming');
      if (el) observer.observe(el);
    }, 150);
  }


}
