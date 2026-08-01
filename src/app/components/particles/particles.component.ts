import { Component, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

@Component({
  selector: 'app-particles',
  standalone: true,
  template: `
    <canvas
      #canvas
      class="fixed inset-0 w-full h-full pointer-events-none z-0"
    ></canvas>
  `,
})
export class ParticlesComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private destroyRef: DestroyRef
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initParticles();
  }

  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    let particles: Particle[] = [];
    let animId: number;

    // Interactive vectors
    let mx = -1000;
    let my = -1000;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    let accentRGB = '255, 107, 0';
    let frameCount = 0;

    const updateThemeColor = () => {
      accentRGB = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-rgb').trim() || '255, 107, 0';
    };
    updateThemeColor();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = () => {
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.05,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Periodically update theme color values to adapt to light/dark triggers
      frameCount++;
      if (frameCount % 30 === 0) {
        updateThemeColor();
      }

      // Track scroll velocity with friction decay
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      scrollVelocity = scrollDiff * 0.15 + scrollVelocity * 0.85; // smooth velocity transition
      lastScrollY = currentScrollY;

      particles.forEach(p => {
        // Base drift velocity
        let dx = p.vx;
        let dy = p.vy;

        // Apply scroll float vector (particles react to viewport scroll movement)
        dy -= scrollVelocity * 0.08;

        // Apply mouse attraction vector
        if (mx > -500) {
          const distX = mx - p.x;
          const distY = my - p.y;
          const dist = Math.sqrt(distX * distX + distY * distY);
          
          if (dist < 180) {
            const pullForce = (180 - dist) / 180;
            // Pull closer particles slightly towards the mouse
            dx += (distX / dist) * pullForce * 0.12;
            dy += (distY / dist) * pullForce * 0.12;
          }
        }

        // Apply calculated velocities
        p.x += dx;
        p.y += dy;

        // Boundary wrapping
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRGB},${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines (parallax network structure)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 125) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accentRGB},${0.07 * (1 - dist / 125)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    spawn();
    draw();

    // Event listeners
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    
    const onMouseLeave = () => {
      mx = -1000;
      my = -1000;
    };

    const onResize = () => { 
      resize(); 
      spawn(); 
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    // Dynamic component cleanup
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    });
  }
}

