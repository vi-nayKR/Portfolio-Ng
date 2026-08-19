import { Component, ElementRef, OnInit, OnDestroy, ViewChild, signal, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

interface AiNodeData {
  id: string;
  name: string;
  category: string;
  role: string;
  color: number;
  colorHex: string;
  position: THREE.Vector3;
  metrics: { [key: string]: string };
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-ai-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="ai-lab" class="relative py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-void">
      <!-- Background glow -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
             style="background: radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(99,102,241,0.03) 50%, transparent 70%)"></div>
      </div>

      <!-- Outline Typography Background -->
      <div
        class="absolute left-[-5%] top-12 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
      >
        NEURAL 3D
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-6 md:mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest mb-3">
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Interactive 3D Simulation
          </div>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost mb-4 text-balance">
            3D GenAI &amp; Multi-Agent <span class="gradient-text">Thought Space</span>
          </h2>
          <p class="text-muted max-w-2xl mx-auto text-sm leading-relaxed">
            Real-time Three.js visualization of an enterprise GenAI architecture: 1536-D Latent Vector Space, pgvector HNSW Hybrid Retrieval, LangGraph Multi-Agent Loops, and vLLM PagedAttention. Click or hover on nodes to inspect live telemetry.
          </p>
        </div>

        <!-- 3D Canvas & Interactive HUD Container -->
        <div class="relative apple-glass rounded-2xl overflow-hidden border border-border shadow-2xl p-2 md:p-4">
          
          <!-- Control Bar / Simulation Triggers -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-abyss/80 rounded-xl border border-border/60 mb-3 z-20 relative">
            <div class="flex flex-wrap items-center gap-2">
              <button
                (click)="triggerSimulation('rag')"
                class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border"
                [class.bg-accent]="activeSimulation() === 'rag'"
                [class.text-frost]="activeSimulation() === 'rag'"
                [class.border-accent]="activeSimulation() === 'rag'"
                [class.bg-void]="activeSimulation() !== 'rag'"
                [class.text-muted]="activeSimulation() !== 'rag'"
                [class.border-border]="activeSimulation() !== 'rag'"
                [class.hover:text-frost]="activeSimulation() !== 'rag'"
              >
                <span>⚡</span> Simulate Hybrid RAG Query
              </button>

              <button
                (click)="triggerSimulation('agent')"
                class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border"
                [class.bg-accent]="activeSimulation() === 'agent'"
                [class.text-frost]="activeSimulation() === 'agent'"
                [class.border-accent]="activeSimulation() === 'agent'"
                [class.bg-void]="activeSimulation() !== 'agent'"
                [class.text-muted]="activeSimulation() !== 'agent'"
                [class.border-border]="activeSimulation() !== 'agent'"
                [class.hover:text-frost]="activeSimulation() !== 'agent'"
              >
                <span>🤖</span> Multi-Agent Reflection Loop
              </button>

              <button
                (click)="triggerSimulation('cache')"
                class="px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border"
                [class.bg-accent]="activeSimulation() === 'cache'"
                [class.text-frost]="activeSimulation() === 'cache'"
                [class.border-accent]="activeSimulation() === 'cache'"
                [class.bg-void]="activeSimulation() !== 'cache'"
                [class.text-muted]="activeSimulation() !== 'cache'"
                [class.border-border]="activeSimulation() !== 'cache'"
                [class.hover:text-frost]="activeSimulation() !== 'cache'"
              >
                <span>🚀</span> Semantic Cache Hit (<5ms)
              </button>
            </div>

            <!-- Auto-rotate toggle -->
            <button
              (click)="toggleRotation()"
              class="px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border border-border/50 bg-void/60 text-muted hover:text-frost flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <span>{{ autoRotate() ? '⏸ Pause Rotation' : '▶ Auto-Rotate' }}</span>
            </button>
          </div>

          <!-- 3D Viewport Area -->
          <div class="relative w-full h-[450px] md:h-[600px] rounded-xl overflow-hidden bg-void/90 border border-border/40 cursor-grab active:cursor-grabbing">
            <div #canvasContainer class="w-full h-full"></div>

            <!-- Live Status HUD Overlay (Top-Left) -->
            <div class="absolute top-4 left-4 pointer-events-none max-w-xs space-y-2 hidden sm:block">
              <div class="apple-glass p-3 rounded-xl border border-border/50 text-[11px] font-mono space-y-1 backdrop-blur-md">
                <div class="flex items-center justify-between text-muted">
                  <span>SYSTEM STATUS:</span>
                  <span class="text-emerald-400 font-bold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> ONLINE
                  </span>
                </div>
                <div class="flex justify-between text-muted">
                  <span>ACTIVE EMBEDDINGS:</span>
                  <span class="text-frost font-bold">1,500 (1536-D)</span>
                </div>
                <div class="flex justify-between text-muted">
                  <span>RAGAS FAITHFULNESS:</span>
                  <span class="text-accent font-bold">0.94 / 1.00</span>
                </div>
                <div class="flex justify-between text-muted">
                  <span>VLLM THROUGHPUT:</span>
                  <span class="text-frost font-bold">148.2 tok/s</span>
                </div>
              </div>
            </div>

            <!-- Selected Node Telemetry Drawer (Bottom or Floating Right) -->
            @if (selectedNode()) {
              <div class="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 apple-glass p-4 rounded-xl border border-accent/40 shadow-2xl space-y-2.5 backdrop-blur-xl transition-all duration-300 animate-fadeIn">
                <div class="flex items-center justify-between border-b border-border/60 pb-2">
                  <div>
                    <span class="text-[10px] font-mono text-accent uppercase tracking-wider block">{{ selectedNode()?.category }}</span>
                    <h4 class="text-sm font-bold text-frost">{{ selectedNode()?.name }}</h4>
                  </div>
                  <button (click)="selectNode(null)" class="text-muted hover:text-frost p-1 text-xs cursor-pointer">✕</button>
                </div>

                <p class="text-xs text-muted leading-relaxed">
                  {{ selectedNode()?.description }}
                </p>

                <!-- Metrics Grid -->
                <div class="grid grid-cols-2 gap-1.5 pt-1">
                  @for (key of objectKeys(selectedNode()?.metrics || {}); track key) {
                    <div class="p-1.5 rounded-lg bg-void/60 border border-border/40 text-[10px] font-mono">
                      <span class="text-muted block">{{ key }}</span>
                      <span class="text-frost font-bold">{{ selectedNode()?.metrics?.[key] }}</span>
                    </div>
                  }
                </div>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-1 pt-1">
                  @for (tech of selectedNode()?.technologies; track tech) {
                    <span class="px-2 py-0.5 rounded text-[10px] bg-accent/10 border border-accent/30 text-accent font-mono">{{ tech }}</span>
                  }
                </div>
              </div>
            } @else {
              <!-- Interaction Hint -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <span class="px-3 py-1.5 rounded-full apple-glass border border-border/50 text-[11px] font-mono text-muted flex items-center gap-2 shadow-lg">
                  <span>💡 Drag to rotate 3D space · Click any node to inspect telemetry</span>
                </span>
              </div>
            }
          </div>

          <!-- Quick Node Selector Chips -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
            @for (node of aiNodes; track node.id) {
              <button
                (click)="focusOnNode(node)"
                class="p-2 rounded-xl text-left border transition-all duration-200 cursor-pointer"
                [class.bg-accent/15]="selectedNode()?.id === node.id"
                [class.border-accent]="selectedNode()?.id === node.id"
                [class.bg-abyss/40]="selectedNode()?.id !== node.id"
                [class.border-border/60]="selectedNode()?.id !== node.id"
                [class.hover:border-accent/40]="selectedNode()?.id !== node.id"
              >
                <div class="flex items-center gap-1.5 mb-0.5">
                  <span class="w-2 h-2 rounded-full shrink-0" [style.backgroundColor]="node.colorHex"></span>
                  <span class="text-[11px] font-bold text-frost truncate">{{ node.name }}</span>
                </div>
                <span class="text-[9px] font-mono text-muted block truncate">{{ node.role }}</span>
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AiLabComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  selectedNode = signal<AiNodeData | null>(null);
  activeSimulation = signal<'rag' | 'agent' | 'cache' | null>(null);
  autoRotate = signal(true);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId!: number;
  private nodeMeshes: { mesh: THREE.Mesh; data: AiNodeData; halo: THREE.Mesh }[] = [];
  private particleSystem!: THREE.Points;
  private lineMesh!: THREE.LineSegments;
  private pulseParticles: { mesh: THREE.Mesh; start: THREE.Vector3; end: THREE.Vector3; progress: number; speed: number }[] = [];

  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  aiNodes: AiNodeData[] = [
    {
      id: 'langgraph',
      name: 'LangGraph Supervisor',
      category: 'Agent Orchestration',
      role: 'Stateful Reflection & Routing',
      color: 0x00f0ff,
      colorHex: '#00f0ff',
      position: new THREE.Vector3(0, 3.2, 0),
      metrics: { 'Latency': '12.4ms', 'Recursion Limit': '25', 'Checkpoints': 'Postgres' },
      description: 'Cyclic state graph coordinating specialized worker agents with human-in-the-loop validation checkpoints.',
      technologies: ['LangGraph', 'Python FastAPI', 'Asyncio', 'Pydantic v2']
    },
    {
      id: 'pgvector',
      name: 'pgvector Hybrid RAG',
      category: 'Vector Store & Search',
      role: 'Dense + Sparse Lexical RRF',
      color: 0xff6b00,
      colorHex: '#ff6b00',
      position: new THREE.Vector3(-4.2, 0.8, 1.5),
      metrics: { 'Index': 'HNSW (M=16)', 'RRF k': '60', 'Recall': '94.2%' },
      description: 'Fuses dense 1536-D embeddings with PostgreSQL BM25 keyword search via Reciprocal Rank Fusion (k=60).',
      technologies: ['PostgreSQL 18', 'pgvector', 'BM25', 'Cross-Encoder']
    },
    {
      id: 'vllm',
      name: 'vLLM Serving Cluster',
      category: 'Inference Engine',
      role: 'PagedAttention & Batching',
      color: 0xa855f7,
      colorHex: '#a855f7',
      position: new THREE.Vector3(4.2, 0.8, -1.5),
      metrics: { 'Throughput': '148 tok/s', 'Quantization': '4-bit AWQ', 'TTFT': '<380ms' },
      description: 'High-throughput local LLM inference server managing non-contiguous KV-cache memory via PagedAttention.',
      technologies: ['vLLM', 'CUDA', 'Continuous Batching', 'Llama-3.1-8B']
    },
    {
      id: 'redis',
      name: 'Redis 8 Semantic Cache',
      category: 'Caching & Memory',
      role: 'Sub-5ms Exact/ANN Match',
      color: 0xef4444,
      colorHex: '#ef4444',
      position: new THREE.Vector3(-2.8, -2.8, 2.0),
      metrics: { 'Hit Latency': '3.8ms', 'Cosine Threshold': '0.95', 'Cost Cut': '60%' },
      description: 'Vector-indexed semantic cache returning sub-5ms responses for recurring or semantically equivalent prompts.',
      technologies: ['Redis 8.10', 'Vector Search', 'TTL Eviction', 'SSE Stream']
    },
    {
      id: 'mcp',
      name: 'MCP Tool Host',
      category: 'Model Context Protocol',
      role: 'JSON-RPC Tool Server',
      color: 0xf59e0b,
      colorHex: '#f59e0b',
      position: new THREE.Vector3(2.8, -2.8, -2.0),
      metrics: { 'Protocol': 'JSON-RPC 2.0', 'Tools Active': '14', 'Sandbox': 'Isolated' },
      description: 'Standardized tool-execution server enabling agents to query enterprise databases, APIs, and file systems.',
      technologies: ['Anthropic MCP', 'stdio / SSE', 'FastAPI', 'PostgreSQL']
    },
    {
      id: 'guardrails',
      name: 'NeMo Safety Shield',
      category: 'Safety & Guardrails',
      role: 'Injection & Jailbreak Filter',
      color: 0x06b6d4,
      colorHex: '#06b6d4',
      position: new THREE.Vector3(0, -1.2, 3.5),
      metrics: { 'Filter Time': '1.2ms', 'Jailbreak Block': '99.8%', 'Sanitization': 'Regex+LLM' },
      description: 'Pre- and post-inference input validation barrier detecting prompt injections and toxic completions.',
      technologies: ['NeMo Guardrails', 'Guardrails AI', 'Regex Engine']
    }
  ];

  constructor(private ngZone: NgZone) {}

  objectKeys(obj: object): string[] {
    return Object.keys(obj);
  }

  ngOnInit() {
    this.selectedNode.set(this.aiNodes[0]);
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.animate();
    });
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThree() {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.04);

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 2, 12);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(this.renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff6b00, 2, 50);
    pointLight.position.set(0, 5, 5);
    this.scene.add(pointLight);

    // 4. Latent Space Embedding Cloud (1500 particles)
    const particleCount = 1500;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0xff6b00); // orange
    const colorB = new THREE.Color(0x6366f1); // indigo
    const colorC = new THREE.Color(0x00f0ff); // cyan

    for (let i = 0; i < particleCount; i++) {
      const radius = 6.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? colorA.clone().lerp(colorB, Math.random()) : colorB.clone().lerp(colorC, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(this.particleSystem);

    // 5. Create 6 Core AI System Nodes
    this.aiNodes.forEach((node) => {
      // Main core sphere
      const sphereGeo = new THREE.IcosahedronGeometry(0.55, 2);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: false
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.copy(node.position);
      (mesh as any).nodeData = node;

      // Outer wireframe ring/halo
      const ringGeo = new THREE.RingGeometry(0.75, 0.82, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      });
      const halo = new THREE.Mesh(ringGeo, ringMat);
      halo.position.copy(node.position);

      this.scene.add(mesh);
      this.scene.add(halo);
      this.nodeMeshes.push({ mesh, data: node, halo });
    });

    // 6. Neural Synaptic Lines
    const linePositions: number[] = [];
    for (let i = 0; i < this.aiNodes.length; i++) {
      for (let j = i + 1; j < this.aiNodes.length; j++) {
        linePositions.push(
          this.aiNodes[i].position.x, this.aiNodes[i].position.y, this.aiNodes[i].position.z,
          this.aiNodes[j].position.x, this.aiNodes[j].position.y, this.aiNodes[j].position.z
        );
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    this.lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.lineMesh);

    // 7. Event Listeners for Interaction & Drag
    const dom = this.renderer.domElement;
    dom.addEventListener('mousedown', (e) => this.onMouseDown(e));
    dom.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.isDragging = false);
    dom.addEventListener('click', (e) => this.onClick(e));

    window.addEventListener('resize', () => this.onWindowResize());
  }

  private onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  private onMouseMove(e: MouseEvent) {
    const container = this.canvasContainer.nativeElement;
    const rect = container.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

    if (this.isDragging) {
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.scene.rotation.y += deltaX * 0.006;
      this.scene.rotation.x += deltaY * 0.006;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  }

  private onClick(e: MouseEvent) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.nodeMeshes.map(n => n.mesh);
    const intersects = this.raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object as any;
      if (clickedMesh.nodeData) {
        this.ngZone.run(() => {
          this.selectedNode.set(clickedMesh.nodeData);
        });
      }
    }
  }

  private onWindowResize() {
    if (!this.canvasContainer) return;
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Auto-rotation
    if (this.autoRotate() && !this.isDragging) {
      this.scene.rotation.y += 0.0025;
      this.particleSystem.rotation.y -= 0.001;
    }

    // Orbit node rings & pulse effects
    const time = Date.now() * 0.002;
    this.nodeMeshes.forEach((item, idx) => {
      item.halo.rotation.z += 0.02 * (idx % 2 === 0 ? 1 : -1);
      item.mesh.rotation.y += 0.01;
      const scale = 1.0 + Math.sin(time + idx) * 0.06;
      item.mesh.scale.set(scale, scale, scale);
    });

    // Update simulation pulse particles
    for (let i = this.pulseParticles.length - 1; i >= 0; i--) {
      const p = this.pulseParticles[i];
      p.progress += p.speed;
      if (p.progress >= 1.0) {
        this.scene.remove(p.mesh);
        this.pulseParticles.splice(i, 1);
      } else {
        p.mesh.position.lerpVectors(p.start, p.end, p.progress);
      }
    }

    this.renderer.render(this.scene, this.camera);
  };

  selectNode(node: AiNodeData | null) {
    this.selectedNode.set(node);
  }

  focusOnNode(node: AiNodeData) {
    this.selectedNode.set(node);
  }

  toggleRotation() {
    this.autoRotate.set(!this.autoRotate());
  }

  triggerSimulation(type: 'rag' | 'agent' | 'cache') {
    this.activeSimulation.set(type);

    if (type === 'rag') {
      // Pulse: Client -> Guardrails -> pgvector -> vLLM
      this.spawnPulse(this.aiNodes[5].position, this.aiNodes[1].position, 0xff6b00);
      setTimeout(() => this.spawnPulse(this.aiNodes[1].position, this.aiNodes[2].position, 0xa855f7), 350);
      setTimeout(() => this.spawnPulse(this.aiNodes[2].position, this.aiNodes[0].position, 0x00f0ff), 700);
    } else if (type === 'agent') {
      // Pulse: LangGraph -> MCP -> LangGraph loop
      this.spawnPulse(this.aiNodes[0].position, this.aiNodes[4].position, 0xf59e0b);
      setTimeout(() => this.spawnPulse(this.aiNodes[4].position, this.aiNodes[0].position, 0x00f0ff), 400);
    } else if (type === 'cache') {
      // Pulse: Client -> Redis -> Client (immediate)
      this.spawnPulse(this.aiNodes[5].position, this.aiNodes[3].position, 0xef4444);
      setTimeout(() => this.spawnPulse(this.aiNodes[3].position, this.aiNodes[5].position, 0x00f0ff), 150);
    }

    setTimeout(() => {
      this.activeSimulation.set(null);
    }, 2000);
  }

  private spawnPulse(start: THREE.Vector3, end: THREE.Vector3, color: number) {
    const geo = new THREE.SphereGeometry(0.18, 16, 16);
    const mat = new THREE.MeshBasicMaterial({ color, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(start);
    this.scene.add(mesh);
    this.pulseParticles.push({ mesh, start, end, progress: 0, speed: 0.035 });
  }
}
