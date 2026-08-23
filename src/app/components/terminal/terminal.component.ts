import { Component, ChangeDetectionStrategy, OnInit, signal, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TiltDirective } from '../../directives/tilt.directive';

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success' | 'info' | 'accent';
  text: string;
  isHtml?: boolean;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, TiltDirective],
  template: `
    <section id="terminal" class="relative py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-abyss/40">
      <!-- Background Ambient Glow -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full"
             style="background: radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)"></div>
        <div class="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full"
             style="background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline Typography Background -->
      <div
        class="absolute right-[-8%] top-1/4 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * 1.0) + 'px, 0, 0)'"
      >
        SANDBOX
      </div>

      <div class="relative z-10 max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-8 md:mb-12">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest mb-3">
            <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Live Systems CLI
          </div>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance mb-4">
            Systems Engineer <span class="gradient-text">Sandbox</span>
          </h2>
          <p class="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Test and inspect our production architectures directly in an interactive browser terminal. Run LangGraph supervisors, inspect Redis 8 vector caches, view Ragas evaluation scorecards, and check load-test metrics.
          </p>
        </div>

        <!-- Quick-Run Command Suggestion Chips -->
        <div class="mb-4">
          <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span class="text-xs font-mono text-muted uppercase tracking-wider shrink-0 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Quick Commands:
            </span>
            @for (cmd of quickCommands; track cmd) {
              <button
                (click)="executeCommand(cmd)"
                class="px-3 py-1.5 rounded-lg text-xs font-mono bg-void/80 border border-border hover:border-accent/60 hover:text-accent text-frost transition-all duration-200 shrink-0 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
              >
                {{ cmd }}
              </button>
            }
          </div>
        </div>

        <!-- Terminal Window Frame -->
        <div
          appTilt
          [maxTilt]="3"
          [scale]="1.005"
          class="apple-glass rounded-2xl border border-border/80 shadow-2xl overflow-hidden font-mono"
        >
          <!-- Terminal Title Bar -->
          <div class="flex items-center justify-between px-4 py-3 bg-void/90 border-b border-border/60 select-none">
            <!-- Window Control Dots -->
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span class="text-xs text-muted font-bold ml-2 hidden sm:inline">vinay&#64;arch-workstation: ~</span>
            </div>

            <!-- Terminal Tabs / Meta -->
            <div class="flex items-center gap-3 text-xs">
              <span class="text-[11px] px-2 py-0.5 rounded bg-accent/15 text-accent font-bold border border-accent/30 hidden md:inline">
                zsh 5.9 (arm64-apple-darwin)
              </span>
              <button
                (click)="clearTerminal()"
                class="text-muted hover:text-frost text-xs transition-colors cursor-pointer flex items-center gap-1"
                title="Clear screen (or type 'clear')"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Clear
              </button>
            </div>
          </div>

          <!-- Terminal Content Viewport -->
          <div
            #terminalViewport
            (click)="focusInput()"
            class="p-4 md:p-6 h-[420px] md:h-[480px] overflow-y-auto bg-void/95 text-xs md:text-sm leading-relaxed space-y-2 text-frost select-text cursor-text"
          >
            @for (line of history(); track $index) {
              @if (line.type === 'command') {
                <div class="flex items-center gap-2 pt-2">
                  <span class="text-accent font-bold">➜</span>
                  <span class="text-cyan-400 font-bold">~</span>
                  <span class="text-frost font-semibold">{{ line.text }}</span>
                </div>
              } @else if (line.type === 'error') {
                <div class="text-red-400 pl-4 border-l-2 border-red-500/50 my-1">
                  {{ line.text }}
                </div>
              } @else if (line.type === 'success') {
                <div class="text-emerald-400 pl-4 border-l-2 border-emerald-500/50 my-1">
                  {{ line.text }}
                </div>
              } @else if (line.type === 'accent') {
                <div class="text-accent pl-4 border-l-2 border-accent/50 my-1">
                  {{ line.text }}
                </div>
              } @else {
                <div class="text-muted/90 whitespace-pre-wrap font-mono" [innerHTML]="line.text"></div>
              }
            }

            <!-- Active Input Line -->
            <div class="flex items-center gap-2 pt-2 text-frost">
              <span class="text-accent font-bold">➜</span>
              <span class="text-cyan-400 font-bold">~</span>
              <div class="relative flex-1">
                <input
                  #cmdInput
                  type="text"
                  [(ngModel)]="currentInput"
                  (keydown.enter)="handleEnter()"
                  (keydown.arrowup)="navigateHistory('up')"
                  (keydown.arrowdown)="navigateHistory('down')"
                  placeholder="Type a command (or click quick options above)..."
                  class="w-full bg-transparent outline-none border-none text-frost font-mono text-xs md:text-sm p-0 placeholder:text-muted/40"
                  autocomplete="off"
                  spellcheck="false"
                />
              </div>
            </div>
          </div>

          <!-- Terminal Footer Status Bar -->
          <div class="px-4 py-2 bg-void border-t border-border/40 text-[11px] text-muted flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                RUNNER: READY
              </span>
              <span class="text-border">|</span>
              <span>Type <kbd class="px-1.5 py-0.5 rounded bg-surface border border-border text-accent font-bold text-[10px]">help</kbd> for manual</span>
            </div>
            <div class="font-mono text-muted/70 hidden sm:block">
              Host: localhost:8002 · Latency: 0.245ms
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TerminalComponent implements OnInit {
  @ViewChild('terminalViewport') terminalViewport!: ElementRef<HTMLDivElement>;
  @ViewChild('cmdInput') cmdInput!: ElementRef<HTMLInputElement>;

  parallaxOffset = signal(0);
  currentInput = '';
  commandHistory = signal<string[]>([]);
  historyIndex = -1;

  quickCommands = [
    'run agent',
    'inspect cache --redis8',
    'evals --ragas',
    'scale-test --rps 500',
    'curl /api/v1/health',
    'cat architecture',
    'whoami',
    'help',
  ];

  history = signal<TerminalLine[]>([
    {
      type: 'accent',
      text: '⚡ Vinay K R — Systems Engineer Interactive Terminal v2.4',
    },
    {
      type: 'output',
      text: 'Connected to local runtime environment (FastAPI + LangGraph + Redis 8 + k3s).\nType "help" or click any quick command above to inspect architecture benchmarks.',
    },
  ]);

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.02);
  }

  ngOnInit() {
    // Initial setup
  }

  focusInput() {
    if (this.cmdInput) {
      this.cmdInput.nativeElement.focus();
    }
  }

  handleEnter() {
    const trimmed = this.currentInput.trim();
    if (!trimmed) return;

    this.executeCommand(trimmed);
    this.currentInput = '';
    this.historyIndex = -1;
  }

  executeCommand(rawCmd: string) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add command to history
    this.commandHistory.update((prev) => [...prev, cmd]);
    this.history.update((lines) => [...lines, { type: 'command', text: cmd }]);

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      this.clearTerminal();
      return;
    }

    if (lower === 'help') {
      this.history.update((lines) => [
        ...lines,
        {
          type: 'output',
          text: `Available Commands:
  • run agent              Simulate LangGraph cyclic supervisor, worker swarm & HITL approval
  • inspect cache --redis8 Inspect Redis 8 native vector set benchmark and exact hash keys
  • evals --ragas          View Ragas Triad evaluation scores (Faithfulness, Relevance, Recall)
  • scale-test --rps 500   Display distributed load-test metrics for Medha Go modular monolith
  • curl /api/v1/health    Test application lifespan, Redis readiness & OpenTelemetry trace IDs
  • cat architecture       Print formatted ASCII system architecture diagram
  • whoami                 Display engineer profile, contact info and active credentials
  • clear                  Clear terminal viewport`,
        },
      ]);
    } else if (lower.startsWith('run agent')) {
      this.simulateAgentRun();
    } else if (lower.startsWith('inspect cache')) {
      this.inspectCache();
    } else if (lower.startsWith('evals')) {
      this.showEvals();
    } else if (lower.startsWith('scale-test')) {
      this.showScaleTest();
    } else if (lower.startsWith('curl')) {
      this.simulateCurl(lower);
    } else if (lower === 'cat architecture') {
      this.showArchitecture();
    } else if (lower === 'whoami') {
      this.showWhoami();
    } else {
      this.history.update((lines) => [
        ...lines,
        {
          type: 'error',
          text: `zsh: command not found: ${cmd}. Type "help" for a list of valid commands.`,
        },
      ]);
    }

    this.scrollToBottom();
  }

  private simulateAgentRun() {
    this.history.update((lines) => [
      ...lines,
      { type: 'info', text: 'Initializing LangGraph cyclic supervisor (thread_id=0a4f-9714)...' },
      { type: 'output', text: '  [1/4] Planner      : Deriving worker dependencies for high-risk payment API task' },
      { type: 'output', text: '  [2/4] Research     : Querying pgvector HNSW + BM25 RRF (k=60) -> 3 chunks retrieved' },
      { type: 'output', text: '  [3/4] Coding       : Generating FastAPI schema with Pydantic v2 validation' },
      { type: 'accent', text: '  [!]   INTERRUPT    : Policy requires human manager approval (Risk: HIGH)' },
      { type: 'output', text: '  [>>]  Resume cmd   : POST /runs/{thread_id}/approval payload={"approved": true}' },
      { type: 'success', text: '  [4/4] Finalize     : Emitted 48 tokens over SSE stream. Trace context injected. (Total: 34.2ms)' },
    ]);
  }

  private inspectCache() {
    this.history.update((lines) => [
      ...lines,
      { type: 'info', text: 'Connecting to Redis 8 Open Source v8.10.1 (cluster=standalone, db=0)...' },
      {
        type: 'output',
        text: `┌────────────────────────────┬───────────────────┬───────────────────┐
│ Metric                     │ Measured p50      │ Measured p95      │
├────────────────────────────┼───────────────────┼───────────────────┤
│ Exact Hash Lookup (HGET)   │ 0.148 ms          │ 0.211 ms          │
│ Vector Set Search (VSIM)   │ 1.840 ms          │ 3.210 ms          │
│ Exact Eviction (DEL+VREM)  │ 0.178 ms          │ 0.190 ms          │
│ Target SLA Threshold       │ 5.000 ms          │ 5.000 ms (PASS)   │
└────────────────────────────┴───────────────────┴───────────────────┘
Vector Dimensions: 128-D / 384-D (FLOAT32 little-endian)
Active Features   : VADD, VSIM, VREM, Distributed Redlock Stampede Guard`,
      },
      { type: 'success', text: 'Cache SLA Verification: 1,000/1,000 benchmark iterations passed under 5ms.' },
    ]);
  }

  private showEvals() {
    this.history.update((lines) => [
      ...lines,
      { type: 'info', text: 'Running automated Ragas 0.2 Triad evaluation harness on golden test set...' },
      {
        type: 'output',
        text: `Evaluation Metric Scorecard:
  • Faithfulness (Anti-Hallucination) : [====================] 0.942 / 1.000 (Target: >=0.90)
  • Answer Relevance                 : [=================== ] 0.920 / 1.000 (Target: >=0.88)
  • Context Precision (RRF Density)  : [==================  ] 0.884 / 1.000 (Target: >=0.85)
  • End-to-End Latency (p95)         : 420ms (SSE TTFT: <380ms)

CI/CD Quality Gate Status:
  ✓ Delta vs Main: +0.024
  ✓ Regression Gate: PASS (Exit Code: 0)`,
      },
      { type: 'success', text: 'Automated CI/CD Quality Gate: Merge allowed to main.' },
    ]);
  }

  private showScaleTest() {
    this.history.update((lines) => [
      ...lines,
      { type: 'info', text: 'Inspecting Medha distributed k6 concurrency load-test report (21 bounded contexts)...' },
      {
        type: 'output',
        text: `Load Test Parameters:
  • Target Concurrency : 500 Requests Per Second (RPS)
  • Duration           : 10m 00s (300,000 total requests)
  • Error Rate         : 0.00% (0 dropped connections)

Latency Histogram:
  • p50 Latency        : 22.4 ms
  • p90 Latency        : 58.1 ms
  • p95 Latency        : 81.6 ms (< 85ms SLA)
  • p99 Latency        : 114.2 ms
  • PostGIS Discovery  : ST_DWithin avg 12.8ms (GIST Indexed)`,
      },
      { type: 'success', text: 'Scale Proof: System sustained 500 RPS with 100% data integrity.' },
    ]);
  }

  private simulateCurl(urlCmd: string) {
    if (urlCmd.includes('health') || urlCmd.includes('ready')) {
      this.history.update((lines) => [
        ...lines,
        {
          type: 'output',
          text: `HTTP/1.1 200 OK
content-type: application/json
x-request-id: 8f2b3c10-5e8a-4d21-998f-43187c320e1a
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01

{
  "status": "ready",
  "version": "0.1.0",
  "dependencies": {
    "redis": {
      "status": "healthy",
      "vector_sets_supported": true,
      "latency_ms": 0.42
    },
    "supervisor": {
      "status": "ready",
      "checkpointer": "in_memory_lifespan"
    },
    "tracing": {
      "provider": "opentelemetry",
      "exporter": "otlp_http"
    }
  }
}`,
        },
      ]);
    } else {
      this.history.update((lines) => [
        ...lines,
        { type: 'output', text: `curl: connected to API gateway. Endpoint OK.` },
      ]);
    }
  }

  private showArchitecture() {
    this.history.update((lines) => [
      ...lines,
      {
        type: 'output',
        text: `┌─────────────────────────────────────────────────────────────────────────┐
│                     PRODUCTION ARCHITECTURE TOPOLOGY                    │
├─────────────────────────────────────────────────────────────────────────┤
│ [Client / Webhook] ───► [FastAPI Gateway / chi Router]                 │
│                                │                                        │
│          ┌─────────────────────┴─────────────────────┐                  │
│          ▼                                           ▼                  │
│ [LangGraph Supervisor]                     [Redis 8 Vector Cache]       │
│   ├── Research Agent (pgvector)              ├── Canonical Exact Key    │
│   ├── Coding Agent (Sandbox)                 └── Vector Set (VSIM)      │
│   └── Compliance Agent (HITL)                        │                  │
│          │                                           │                  │
│          └─────────────────────┬─────────────────────┘                  │
│                                ▼                                        │
│                 [OpenTelemetry Jaeger Tracing]                          │
└─────────────────────────────────────────────────────────────────────────┘`,
      },
    ]);
  }

  private showWhoami() {
    this.history.update((lines) => [
      ...lines,
      {
        type: 'accent',
        text: 'Vinay K R — Senior GenAI & Applied AI Systems Engineer',
      },
      {
        type: 'output',
        text: `• Location  : Bengaluru, India (Hybrid / Remote)
• Portfolio : https://portfolio.vinaykr.workers.dev
• GitHub    : https://github.com/vi-nayKR
• LinkedIn  : https://linkedin.com/in/vi-naykr
• Core Focus: Multi-Agent Systems (LangGraph), Hybrid RAG (pgvector), Redis 8 & Go Monoliths`,
      },
    ]);
  }

  clearTerminal() {
    this.history.set([
      { type: 'accent', text: '⚡ Terminal screen cleared. Ready for commands.' },
    ]);
    this.scrollToBottom();
  }

  navigateHistory(direction: 'up' | 'down') {
    const list = this.commandHistory();
    if (list.length === 0) return;

    if (direction === 'up') {
      if (this.historyIndex === -1) {
        this.historyIndex = list.length - 1;
      } else if (this.historyIndex > 0) {
        this.historyIndex--;
      }
    } else {
      if (this.historyIndex !== -1) {
        if (this.historyIndex < list.length - 1) {
          this.historyIndex++;
        } else {
          this.historyIndex = -1;
          this.currentInput = '';
          return;
        }
      }
    }

    if (this.historyIndex >= 0 && this.historyIndex < list.length) {
      this.currentInput = list[this.historyIndex];
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.terminalViewport) {
        this.terminalViewport.nativeElement.scrollTop =
          this.terminalViewport.nativeElement.scrollHeight;
      }
    }, 50);
  }
}
