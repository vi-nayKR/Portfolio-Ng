import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import type * as THREE from 'three';

@Component({
  selector: 'app-model3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-full min-h-[400px] flex items-center justify-center pointer-events-none">
      <canvas #canvas class="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"></canvas>
      
      <!-- Overlay Blueprint Details to feel like CAD interface -->
      <div class="absolute left-6 bottom-6 font-mono text-[10px] text-accent/40 select-none hidden md:block">
        <div>SYS_MODEL: CONSTELLATION_V3</div>
        <div>RENDER_MODE: WIREFRAME_GL</div>
        <div>VERTICES: 120 // EDGES: 340</div>
        <div>ROT_Z: <span class="text-accent/60">{{ rotationZ() }}</span></div>
      </div>
      <div class="absolute right-6 top-6 font-mono text-[10px] text-accent/40 select-none hidden md:block">
        <div>COORD_GRID: ACTIVE</div>
        <div>SCALE: 1.000</div>
        <div>ANTIALIAS: ON</div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class Model3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private modelGroup!: THREE.Group;
  private gridHelper!: THREE.GridHelper;
  private ring1!: THREE.Line;
  private ring2!: THREE.Line;
  private animationFrameId!: number;

  private targetRotationX = 0;
  private targetRotationY = 0;
  private mouseX = 0;
  private mouseY = 0;

  rotationZStr = '0.00';
  private destroyed = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  rotationZ() {
    return this.rotationZStr;
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    void this.initThree();
  }

  private async initThree() {
    // three.js is loaded on demand so it ships as a separate chunk
    const T = await import('three');
    if (this.destroyed) return;
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // 1. Scene
    this.scene = new T.Scene();

    // 2. Camera
    this.camera = new T.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.z = 8;

    // 3. Renderer
    this.renderer = new T.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Model Group
    this.modelGroup = new T.Group();
    this.scene.add(this.modelGroup);

    // 5. Engineering Wireframe Polyhedron
    // Let's create an Icosahedron (geodesic structure)
    const geometry = new T.IcosahedronGeometry(2.0, 1);
    
    // Wireframe Mesh
    const wireframeMaterial = new T.MeshBasicMaterial({
      color: 0xff6b00, // Accent Orange
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const mesh = new T.Mesh(geometry, wireframeMaterial);
    this.modelGroup.add(mesh);

    // Glow Points (Vertices)
    const pointsMaterial = new T.PointsMaterial({
      color: 0xffaa66, // Light orange
      size: 0.08,
      transparent: true,
      opacity: 0.8
    });
    const points = new T.Points(geometry, pointsMaterial);
    this.modelGroup.add(points);

    // 6. Gyroscopic Orbit Rings
    // Ring 1 (Horizontal Orbit)
    const ringGeom1 = new T.BufferGeometry();
    const pointsRing1: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pointsRing1.push(new T.Vector3(Math.cos(theta) * 2.8, 0, Math.sin(theta) * 2.8));
    }
    ringGeom1.setFromPoints(pointsRing1);
    const ringMat1 = new T.LineBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.15 });
    this.ring1 = new T.Line(ringGeom1, ringMat1);
    this.modelGroup.add(this.ring1);

    // Ring 2 (Vertical Orbit)
    const ringGeom2 = new T.BufferGeometry();
    const pointsRing2: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pointsRing2.push(new T.Vector3(0, Math.cos(theta) * 2.8, Math.sin(theta) * 2.8));
    }
    ringGeom2.setFromPoints(pointsRing2);
    const ringMat2 = new T.LineBasicMaterial({ color: 0xff9242, transparent: true, opacity: 0.15 });
    this.ring2 = new T.Line(ringGeom2, ringMat2);
    this.modelGroup.add(this.ring2);

    // 7. Coordinate Blueprint Grid
    this.gridHelper = new T.GridHelper(10, 10, 0xff6b00, 0x1a1a24);
    this.gridHelper.position.y = -2.5;
    // Set grid transparency
    if (Array.isArray(this.gridHelper.material)) {
      this.gridHelper.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 0.08;
      });
    } else {
      this.gridHelper.material.transparent = true;
      this.gridHelper.material.opacity = 0.08;
    }
    this.modelGroup.add(this.gridHelper);

    // 8. Add light mouse tracking
    canvas.addEventListener('mousemove', this.onCanvasMouseMove.bind(this));

    // 9. Animation Loop
    this.animate();
  }

  private onCanvasMouseMove(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.targetRotationX = y * 0.4;
    this.targetRotationY = x * 0.4;
  }

  @HostListener('window:mousemove', ['$event'])
  onWindowMouseMove(event: MouseEvent) {
    // Broad window tracking to tilt model even when not directly hovering the canvas
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.mouseX = x * 0.25;
    this.mouseY = y * 0.25;
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.renderer) return;
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || 500;

    this.camera.aspect = width / height;
    if ('updateProjectionMatrix' in this.camera) {
      this.camera.updateProjectionMatrix();
    }
    this.renderer.setSize(width, height, false);
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Base rotation
    this.modelGroup.rotation.y += 0.003;
    this.modelGroup.rotation.x += 0.001;

    // Rotate orbits in counter directions
    this.ring1.rotation.y -= 0.005;
    this.ring2.rotation.z += 0.004;

    // Smooth hover tilt physics interpolation (Damping)
    const lerpRotationX = this.targetRotationX + this.mouseY;
    const lerpRotationY = this.targetRotationY + this.mouseX;
    this.modelGroup.rotation.x += (lerpRotationX - this.modelGroup.rotation.x) * 0.05;
    this.modelGroup.rotation.y += (lerpRotationY - this.modelGroup.rotation.y) * 0.05;

    // Update metadata rotation string
    this.rotationZStr = this.modelGroup.rotation.y.toFixed(2);

    this.renderer.render(this.scene, this.camera);
  };

  ngOnDestroy() {
    this.destroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
