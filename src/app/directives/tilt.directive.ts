import { Directive, ElementRef, HostListener, Input, Renderer2, signal } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  @Input() maxTilt = 12; // Maximum tilt rotation in degrees
  @Input() scale = 1.03;  // Scale on hover
  @Input() glowColor = ''; // Glow color override (pulls from theme by default)

  private isHovered = false;
  private resolvedGlowColor = 'rgba(255, 107, 0, 0.15)';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Set up initial style transitions
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease');
    this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isTouchDevice()) return;
    this.isHovered = true;

    // Dynamically retrieve theme accent color rgb string
    if (this.glowColor) {
      this.resolvedGlowColor = this.glowColor;
    } else {
      const accentRGB = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-rgb').trim() || '255, 107, 0';
      this.resolvedGlowColor = `rgba(${accentRGB}, 0.15)`;
    }

    // Speed up transitions during movement
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease');
    this.createGlowOverlay();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isHovered) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate normalized position relative to center (-0.5 to 0.5)
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    // Calculate tilt angles (rotation around X and Y axes)
    const rX = -(py * this.maxTilt);
    const rY = px * this.maxTilt;

    // Apply 3D transform
    const transformStyle = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(${this.scale}, ${this.scale}, ${this.scale})`;
    this.renderer.setStyle(this.el.nativeElement, 'transform', transformStyle);

    // Update glow overlay position
    const glowEl = this.el.nativeElement.querySelector('.tilt-glow-overlay');
    if (glowEl) {
      this.renderer.setStyle(glowEl, 'background', `radial-gradient(circle at ${x}px ${y}px, ${this.resolvedGlowColor} 0%, transparent 60%)`);
      this.renderer.setStyle(glowEl, 'opacity', '1');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
    // Restore smooth transition when resetting
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

    const glowEl = this.el.nativeElement.querySelector('.tilt-glow-overlay');
    if (glowEl) {
      this.renderer.setStyle(glowEl, 'opacity', '0');
    }
  }

  private createGlowOverlay() {
    // Avoid duplicate overlays
    if (this.el.nativeElement.querySelector('.tilt-glow-overlay')) return;

    // Make sure parent is relative/absolute/fixed for absolute child overlay
    const position = window.getComputedStyle(this.el.nativeElement).position;
    if (position === 'static') {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }

    const glowEl = this.renderer.createElement('div');
    this.renderer.addClass(glowEl, 'tilt-glow-overlay');
    
    // Inline styling for the glow overlay so we don't depend entirely on CSS imports
    this.renderer.setStyle(glowEl, 'position', 'absolute');
    this.renderer.setStyle(glowEl, 'top', '0');
    this.renderer.setStyle(glowEl, 'left', '0');
    this.renderer.setStyle(glowEl, 'width', '100%');
    this.renderer.setStyle(glowEl, 'height', '100%');
    this.renderer.setStyle(glowEl, 'pointer-events', 'none');
    this.renderer.setStyle(glowEl, 'z-index', '2');
    this.renderer.setStyle(glowEl, 'opacity', '0');
    this.renderer.setStyle(glowEl, 'transition', 'opacity 0.4s ease');
    this.renderer.setStyle(glowEl, 'mix-blend-mode', 'screen');
    this.renderer.setStyle(glowEl, 'border-radius', window.getComputedStyle(this.el.nativeElement).borderRadius);

    this.renderer.appendChild(this.el.nativeElement, glowEl);
  }

  private isTouchDevice(): boolean {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(hover: none)').matches)
    );
  }
}
