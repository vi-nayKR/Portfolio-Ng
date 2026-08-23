import { Component, ChangeDetectionStrategy, OnInit, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';

interface BlueprintNode {
  title: string;
  role: string;
  desc: string;
  latency: string;
  badge: string;
  badgeColor: string;
}

interface BlueprintData {
  id: string;
  tabLabel: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  repoUrl: string;
  metrics: { label: string; value: string; detail: string }[];
  nodes: BlueprintNode[];
  invariants: string[];
  tags: string[];
}

@Component({
  selector: 'app-blueprints',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TiltDirective],
  template: `
    <section id="blueprints" class="relative py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-void">
      <!-- Ambient Glows -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full"
             style="background: radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(99,102,241,0.03) 50%, transparent 70%)"></div>
      </div>

      <!-- Outline Typography Background -->
      <div
        class="absolute left-[-8%] top-12 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.0) + 'px, 0, 0)'"
      >
        BLUEPRINTS
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-8 md:mb-12">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest mb-3">
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            System Architecture Deep-Dives
          </div>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance mb-4">
            Production Architecture <span class="gradient-text">Blueprints</span>
          </h2>
          <p class="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Detailed blueprints of our battle-tested system designs: cyclic multi-agent supervisors, hybrid vector retrieval with RRF, sub-5ms SLM inference gateways, and 500 RPS Go monolithic backends.
          </p>
        </div>

        <!-- Blueprint Tab Strip -->
        <div class="flex overflow-x-auto pb-3 gap-2 border-b border-border/40 mb-8 scrollbar-none">
          @for (bp of blueprints; track bp.id) {
            <button
              (click)="activeTab.set(bp.id)"
              class="flex items-center gap-2 px-4 py-3 text-xs font-mono font-bold rounded-xl transition-all duration-300 border shrink-0 cursor-pointer whitespace-nowrap"
              [class.bg-accent]="activeTab() === bp.id"
              [class.text-frost]="activeTab() === bp.id"
              [class.border-accent]="activeTab() === bp.id"
              [class.bg-void/60]="activeTab() !== bp.id"
              [class.text-muted]="activeTab() !== bp.id"
              [class.border-border/60]="activeTab() !== bp.id"
              [class.hover:text-frost]="activeTab() !== bp.id"
            >
              <span [innerHTML]="bp.icon" class="w-4 h-4 flex items-center"></span>
              {{ bp.tabLabel }}
            </button>
          }
        </div>

        <!-- Active Blueprint Card Container -->
        @if (currentBlueprint(); as bp) {
          <div
            appTilt
            [maxTilt]="2"
            [scale]="1.002"
            class="apple-glass rounded-2xl border border-border p-6 md:p-8 shadow-2xl space-y-8 animate-fade-in-up"
          >
            <!-- Blueprint Header -->
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border/60">
              <div>
                <span class="text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  {{ bp.subtitle }}
                </span>
                <h3 class="text-2xl md:text-3xl font-display font-bold text-frost">
                  {{ bp.title }}
                </h3>
                <p class="text-sm text-muted mt-2 max-w-3xl leading-relaxed">
                  {{ bp.description }}
                </p>
              </div>

              <a
                [href]="bp.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-frost font-mono text-xs font-bold transition-all duration-200 shrink-0 self-start lg:self-center shadow-lg hover:shadow-accent/20"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                View Repository ↗
              </a>
            </div>

            <!-- Key Metric Counters Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              @for (m of bp.metrics; track m.label) {
                <div class="p-4 rounded-xl bg-void/60 border border-border/60">
                  <span class="text-[11px] font-mono text-muted uppercase tracking-wider block mb-1">{{ m.label }}</span>
                  <p class="text-xl md:text-2xl font-bold font-display text-accent">{{ m.value }}</p>
                  <span class="text-[10px] text-muted font-mono block mt-0.5">{{ m.detail }}</span>
                </div>
              }
            </div>

            <!-- Interactive Architecture Pipeline Stages -->
            <div>
              <h4 class="text-sm font-mono uppercase tracking-widest text-frost font-bold mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-accent"></span>
                Architecture Pipeline &amp; Subsystem Flow
              </h4>

              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                @for (node of bp.nodes; track node.title; let idx = $index) {
                  <div
                    class="p-5 rounded-xl bg-void/70 border border-border/60 hover:border-accent/50 transition-all duration-300 flex flex-col justify-between space-y-3 relative group"
                  >
                    <div>
                      <div class="flex items-center justify-between gap-2 mb-2">
                        <span class="text-xs font-mono font-bold text-accent">0{{ idx + 1 }}.</span>
                        <span
                          class="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border"
                          [style.color]="node.badgeColor"
                          [style.borderColor]="node.badgeColor + '40'"
                          [style.backgroundColor]="node.badgeColor + '15'"
                        >
                          {{ node.badge }}
                        </span>
                      </div>
                      <h5 class="text-sm font-bold text-frost mb-0.5">{{ node.title }}</h5>
                      <span class="text-[11px] font-mono text-muted block mb-2">{{ node.role }}</span>
                      <p class="text-xs text-muted leading-relaxed">{{ node.desc }}</p>
                    </div>

                    <div class="pt-3 border-t border-border/30 flex items-center justify-between text-[11px] font-mono">
                      <span class="text-muted">Target SLA:</span>
                      <span class="text-frost font-bold">{{ node.latency }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Invariants & Technologies -->
            <div class="grid md:grid-cols-12 gap-6 pt-4 border-t border-border/40">
              <!-- System Invariants -->
              <div class="md:col-span-7 space-y-2">
                <h5 class="text-xs font-mono uppercase tracking-widest text-accent font-bold">System Guarantees &amp; Invariants</h5>
                <ul class="space-y-1.5 text-xs text-muted leading-relaxed font-mono">
                  @for (inv of bp.invariants; track inv) {
                    <li class="flex items-start gap-2">
                      <span class="text-emerald-400 shrink-0 mt-0.5">✓</span>
                      <span>{{ inv }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Tech Stack Tags -->
              <div class="md:col-span-5 space-y-2">
                <h5 class="text-xs font-mono uppercase tracking-widest text-frost font-bold">Core Stack Components</h5>
                <div class="flex flex-wrap gap-1.5">
                  @for (t of bp.tags; track t) {
                    <span class="px-2.5 py-1 rounded-lg bg-void border border-border text-xs font-mono text-frost">{{ t }}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class BlueprintsComponent implements OnInit {
  parallaxOffset = signal(0);
  activeTab = signal('agent-patterns');

  blueprints: BlueprintData[] = [
    {
      id: 'agent-patterns',
      tabLabel: 'LangGraph Supervisor',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
      title: 'Stateful LangGraph Supervisor & Specialist Swarm',
      subtitle: 'Cyclic State Graphs · HITL Approval Checkpoints · Redis 8 Vector Caching',
      description: 'A production reference architecture for cyclic LangGraph multi-agent supervisors delegating to deterministic specialist workers (Research, Coding, Compliance), pausing before high-risk mutations for human approval, and streaming tokens over Server-Sent Events.',
      repoUrl: 'https://github.com/vi-nayKR/fastapi-genai-agent-patterns',
      metrics: [
        { label: 'Exact Lookup p95', value: '0.211 ms', detail: 'Native Redis 8 hash digest' },
        { label: 'Eviction p95', value: '0.190 ms', detail: 'DEL + VREM in <0.2ms' },
        { label: 'Loop Bound SLA', value: 'Max 25 Loops', detail: 'Hard recursion safety guard' },
        { label: 'OTel Trace Overhead', value: '< 0.08 ms', detail: 'Content-scrubbed spans' },
      ],
      nodes: [
        {
          title: 'Planning & Supervisor Router',
          role: 'Dynamic Worker Delegation',
          desc: 'Derives minimal specialist worker list based on prompt content and risk. Returns to supervisor after every specialist to maintain stateful audit trails.',
          latency: '< 8.0 ms',
          badge: 'SUPERVISOR',
          badgeColor: '#00f0ff',
        },
        {
          title: 'Specialist Worker Swarm',
          role: 'Research, Coding & Compliance',
          desc: 'Asynchronous workers emitting incremental tokens via LangGraph custom stream writers and yielding control between tokens for backpressure.',
          latency: '20 - 45 ms',
          badge: 'WORKER SWARM',
          badgeColor: '#a855f7',
        },
        {
          title: 'Human-in-the-Loop Interrupt',
          role: 'State Checkpointer Pauses',
          desc: 'Pauses execution graph at policy-sensitive boundaries using LangGraph interrupt(). Stores full state in checkpointer without holding active coroutines.',
          latency: 'Zero VRAM held',
          badge: 'HITL CHECKPOINT',
          badgeColor: '#ff6b00',
        },
        {
          title: 'Command Resume Flow',
          role: 'REST Thread Resumption',
          desc: 'Explicit Command-based resume endpoint resumes suspended thread after human approval or produces terminal rejected state with feedback.',
          latency: '< 12.0 ms',
          badge: 'RESUME COMMAND',
          badgeColor: '#10b981',
        },
        {
          title: 'Redis 8 Exact + Vector Cache',
          role: 'Two-Stage Lookup Pipeline',
          desc: 'Canonical Unicode NFKC SHA-256 exact matching followed by Redis 8 native vector set similarity (VADD/VSIM) with distributed stampede locks.',
          latency: '< 0.25 ms p95',
          badge: 'REDIS 8 CACHE',
          badgeColor: '#ef4444',
        },
        {
          title: 'OpenTelemetry Spans & SSE',
          role: 'End-to-End Trace Context',
          desc: 'FastAPI server span propagates W3C context into agent runs, worker child spans, and cache metrics without leaking prompt or response content.',
          latency: '< 0.08 ms overhead',
          badge: 'OBSERVABILITY',
          badgeColor: '#3b82f6',
        },
      ],
      invariants: [
        'Hard recursion limit prevents infinite supervisor delegation loops.',
        'High-risk requests strictly mandate human approval before finalization.',
        'Telemetry excludes raw prompts and tenant data, using SHA-256 digests.',
        'Dependency readiness verifies Redis 8 VADD vector-set support at startup.',
      ],
      tags: ['Python 3.12', 'FastAPI', 'LangGraph', 'Redis 8', 'OpenTelemetry', 'Docker Compose', 'Pytest'],
    },
    {
      id: 'hybrid-rag',
      tabLabel: 'pgvector Hybrid RAG',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
      title: 'Enterprise Agentic RAG Platform with MCP',
      subtitle: 'pgvector HNSW + BM25 RRF (k=60) · Anthropic Model Context Protocol · Ragas Evals',
      description: 'An enterprise Multi-Agent RAG engine indexing complex documents (.pdf, .docx, .xlsx, .md) with hybrid retrieval fusing dense 1536-D embeddings with PostgreSQL BM25 keyword search via Reciprocal Rank Fusion ($k=60$), boosting recall by +34%.',
      repoUrl: 'https://github.com/vi-nayKR/enterprise-agentic-rag-platform',
      metrics: [
        { label: 'Domain Recall Boost', value: '+34.0%', detail: 'RRF vs pure dense search' },
        { label: 'Ragas Faithfulness', value: '0.942', detail: 'Zero hallucination target' },
        { label: 'Context Precision', value: '0.884', detail: 'Top-5 reranked chunks' },
        { label: 'Time-to-First-Token', value: '< 380 ms', detail: 'Async SSE streaming' },
      ],
      nodes: [
        {
          title: 'Document Ingestion & Chunking',
          role: 'Contextual Semantic Chunker',
          desc: 'Parses multi-format documents, splits on semantic paragraph boundaries with sliding window overlaps, and generates 1536-D normalized embeddings.',
          latency: '25 ms / page',
          badge: 'INGESTION',
          badgeColor: '#00f0ff',
        },
        {
          title: 'pgvector HNSW Cosine Search',
          role: 'Dense Semantic Vector Index',
          desc: 'Executes approximate nearest neighbor vector search across HNSW indexes ($M=16, efSearch=64$) for conceptual similarity.',
          latency: '14.2 ms',
          badge: 'DENSE VECTOR',
          badgeColor: '#ff6b00',
        },
        {
          title: 'PostgreSQL BM25 Keyword Search',
          role: 'Sparse Lexical tsvector Search',
          desc: 'Executes PostgreSQL full-text search with dictionary stemming to guarantee exact keyword, acronym, and serial number matches.',
          latency: '6.8 ms',
          badge: 'SPARSE BM25',
          badgeColor: '#3b82f6',
        },
        {
          title: 'Reciprocal Rank Fusion (RRF, k=60)',
          role: 'Rank Fusion & Cross-Encoder Rerank',
          desc: 'Fuses ranked lists using RRF score formula: RRF(d) = Σ 1/(60 + r(d)). Cross-encoder selects top-5 citation chunks.',
          latency: '4.5 ms',
          badge: 'RRF FUSION',
          badgeColor: '#10b981',
        },
        {
          title: 'Model Context Protocol (MCP) Host',
          role: 'JSON-RPC 2.0 Tool Execution',
          desc: 'Standardized client interface executing tools across enterprise SQL databases, REST APIs, and external compliance endpoints.',
          latency: '18.4 ms',
          badge: 'MCP PROTOCOL',
          badgeColor: '#f59e0b',
        },
        {
          title: 'Ragas Quality Evaluation Triad',
          role: 'Continuous CI/CD Quality Gate',
          desc: 'Automated evaluation pipeline measuring Faithfulness, Answer Relevance, and Context Precision on golden test sets.',
          latency: 'Pre-merge Gate',
          badge: 'EVALUATION',
          badgeColor: '#a855f7',
        },
      ],
      invariants: [
        'Every answer token is strictly grounded in retrieved source document citations.',
        'RRF rank fusion eliminates bias between sparse BM25 and dense cosine scores.',
        'Self-reflective RAG loop detects missing context and triggers query rewriting.',
      ],
      tags: ['FastAPI', 'LangGraph', 'PostgreSQL 18', 'pgvector HNSW', 'BM25', 'Anthropic MCP', 'Ragas'],
    },
    {
      id: 'local-slm',
      tabLabel: 'Local SLM Gateway',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
      title: 'High-Throughput Local SLM Inference Gateway',
      subtitle: 'vLLM PagedAttention · Sub-5ms Redis 8 Vector Semantic Cache · 4-Bit QLoRA',
      description: 'An enterprise inference gateway engineered to serve modern Small Language Models (Llama 3.2 1B/3B, Qwen 2.5 1.5B) on commodity edge hardware, accelerated by sub-5ms Redis 8 vector semantic caching and protected by NeMo input/output guardrails.',
      repoUrl: 'https://github.com/vi-nayKR/local-llm-inference-gateway',
      metrics: [
        { label: 'Cache Latency (p95)', value: '0.245 ms', detail: 'Sub-5ms response' },
        { label: 'Cloud Cost Cut', value: '62.5%', detail: '40%+ cache hit rate' },
        { label: 'vLLM Throughput', value: '148 tok/s', detail: 'Continuous batching' },
        { label: 'Gateway Throughput', value: '1,040 RPS', detail: 'Async FastAPI proxy' },
      ],
      nodes: [
        {
          title: 'NeMo Input Safety Guardrails',
          role: 'Prompt Injection & PII Filter',
          desc: 'Pre-inference sanitization barrier intercepting prompt injections, toxic patterns, and sensitive PII before GPU processing.',
          latency: '1.2 ms',
          badge: 'SAFETY SHIELD',
          badgeColor: '#00f0ff',
        },
        {
          title: 'Redis 8 Vector Semantic Cache',
          role: 'Sub-5ms Cosine Similarity Hit',
          desc: 'Checks 384-D vector distance. Queries with Cosine Sim >= 0.90 return cached completion directly in <4ms, bypassing GPU execution.',
          latency: '< 0.50 ms p50',
          badge: 'SEMANTIC CACHE',
          badgeColor: '#ef4444',
        },
        {
          title: 'vLLM PagedAttention Serving',
          role: 'Continuous Batching Engine',
          desc: 'Dynamically allocates non-contiguous KV-cache memory in blocks, eliminating fragmentation and sustaining 148 tok/s throughput.',
          latency: '45.8 ms p50',
          badge: 'VLLM INFERENCE',
          badgeColor: '#a855f7',
        },
        {
          title: 'Local SLM Tier (1B - 3.8B)',
          role: '4-bit Quantized Models',
          desc: 'Runs Llama-3.2-1B (155 tok/s, ~1.2GB VRAM) and Qwen-2.5-1.5B (140 tok/s, ~1.5GB VRAM) on lightweight hardware.',
          latency: '~1.5 GB VRAM',
          badge: 'SLM TIER',
          badgeColor: '#ff6b00',
        },
        {
          title: '4-Bit QLoRA Fine-Tuning',
          role: 'Unsloth Domain Adaptation',
          desc: 'Fine-tunes specialized domain instruction weights with Unsloth and PEFT (r=16, alpha=32) and exports directly to 4-bit AWQ/GGUF.',
          latency: '12 min / epoch',
          badge: 'QLORA PIPELINE',
          badgeColor: '#10b981',
        },
        {
          title: 'Async Cache Write-Back & SSE',
          role: 'Non-Blocking Token Streamer',
          desc: 'Streams generated tokens over Server-Sent Events while asynchronously saving completion embedding back to Redis 8.',
          latency: '< 400 ms TTFT',
          badge: 'SSE STREAMER',
          badgeColor: '#3b82f6',
        },
      ],
      invariants: [
        'Semantically identical queries bypass GPU execution in <4ms directly from Redis.',
        'PagedAttention eliminates KV-cache memory waste and prevents out-of-memory crashes.',
        'NeMo safety shield intercepts prompt injections with 99.8% detection accuracy.',
      ],
      tags: ['FastAPI', 'vLLM PagedAttention', 'Redis 8', 'Unsloth 4-bit QLoRA', 'NeMo Guardrails', 'Docker'],
    },
    {
      id: 'medha-platform',
      tabLabel: 'Medha Go Monolith',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>',
      title: 'Medha 21-Domain Go Monolith & Kubernetes GitOps',
      subtitle: 'Domain-Driven Monolith · PostGIS Proximity Search · k3s Argo CD GitOps',
      description: 'A high-performance, single-binary Go backend engineered with 21 strictly isolated bounded contexts, PostGIS geospatial discovery (ST_DWithin), Redis pub/sub WebSocket messaging, and validated under distributed load testing at 500 RPS with 100% success rate (p95 latency <85ms).',
      repoUrl: 'https://github.com/vi-nayKR/medha-platform-api',
      metrics: [
        { label: 'Scale Proof (k6)', value: '500 RPS', detail: 'p95 latency < 85ms' },
        { label: 'Bounded Contexts', value: '21 Domains', detail: 'Strict 4-layer isolation' },
        { label: 'Geospatial Discovery', value: '< 15 ms', detail: 'PostGIS ST_DWithin' },
        { label: 'GitOps Perimeter', value: '0 Open Ports', detail: 'Cloudflare Zero Trust' },
      ],
      nodes: [
        {
          title: 'Cloudflare Zero Trust Perimeter',
          role: 'Outbound Tunnel Ingress',
          desc: 'Cloudflare Tunnel (cloudflared) forwards traffic with zero inbound firewall ports open, backed by Traefik rate-limiting.',
          latency: '< 12.0 ms',
          badge: 'EDGE INGRESS',
          badgeColor: '#00f0ff',
        },
        {
          title: '21 Isolated Bounded Contexts',
          role: 'Domain-Driven Modular Monolith',
          desc: 'Single compiled Go binary organized into 21 domain packages (~200 endpoints, 50 goose migrations, zero ORM overhead).',
          latency: '< 85 ms p95',
          badge: 'GO MONOLITH',
          badgeColor: '#00ADD8',
        },
        {
          title: 'PostGIS Geospatial Engine',
          role: 'Proximity Matching via ST_DWithin',
          desc: 'Performs spatial proximity queries over GIST-indexed geography coordinates with distance-ordered keyset pagination.',
          latency: '12.8 ms avg',
          badge: 'POSTGIS ENGINE',
          badgeColor: '#ff6b00',
        },
        {
          title: 'Redis 8 Pub/Sub WebSocket Backplane',
          role: 'Cross-Pod Real-Time Messaging',
          desc: 'Decouples WebSocket connections so any pod can broadcast instant event notifications to connected mobile and web clients.',
          latency: '< 2.4 ms fanout',
          badge: 'REDIS PUB/SUB',
          badgeColor: '#ef4444',
        },
        {
          title: 'Argo CD GitOps Pull-Reconciliation',
          role: 'Declarative Kubernetes Delivery',
          desc: 'Argo CD continuously synchronizes staging and production namespace manifests on self-hosted k3s with SealedSecrets.',
          latency: 'Automated Sync',
          badge: 'ARGO CD GITOPS',
          badgeColor: '#f59e0b',
        },
        {
          title: 'SeaweedFS Distributed S3 Storage',
          role: 'Presigned Direct Client Uploads',
          desc: 'High-performance distributed object store issuing presigned S3 upload URLs to offload high-bandwidth media from the Go API.',
          latency: 'Direct S3 Stream',
          badge: 'SEAWEEDFS S3',
          badgeColor: '#10b981',
        },
      ],
      invariants: [
        'All database queries use parameterized SQL with zero reflection or ORM overhead.',
        'Zero open inbound ports — all cluster ingress is mediated via outbound Cloudflare Tunnels.',
        '500 RPS load tested under distributed k6 harness with 0.00% connection error rate.',
      ],
      tags: ['Go (chi)', 'PostgreSQL 17', 'PostGIS', 'Redis 8', 'Kubernetes (k3s)', 'Argo CD', 'Cloudflare Zero Trust', 'SeaweedFS'],
    },
  ];

  currentBlueprint = computed(
    () => this.blueprints.find((b) => b.id === this.activeTab()) || this.blueprints[0]
  );

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.02);
  }

  ngOnInit() {
    // Initial setup
  }
}
