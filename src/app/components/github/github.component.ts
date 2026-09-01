import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, signal } from '@angular/core';
import { TiltDirective } from '../../directives/tilt.directive';

interface RepoHighlight {
  title: string;
  domain: string;
  desc: string;
  url: string;
  lang: string;
  langColor: string;
}

@Component({
  selector: 'app-github',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TiltDirective],
  template: `
    <section id="github" class="relative py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        class="absolute left-[-8%] top-1/3 outline-bg-text select-none pointer-events-none font-black opacity-10 hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * -1.0) + 'px, 0, 0)'"
      >
        PROJECTS
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-8 md:mb-12">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Selected source repositories</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Built to Be Inspected
          </h2>
          <p class="text-muted text-sm md:text-base mt-4 max-w-3xl mx-auto leading-relaxed">
            The strongest repositories are listed first. Each description separates implemented behavior from planned integrations and avoids synthetic performance claims.
          </p>
        </div>

        <div
          class="mb-8 p-5 md:p-6 rounded-2xl apple-glass border-l-2 border-accent/50"
          [style.opacity]="visible() ? '1' : '0'"
          [style.transform]="visible() ? 'translateY(0)' : 'translateY(24px)'"
          style="transition: opacity 0.6s ease, transform 0.6s ease"
        >
          <p class="text-xs font-mono uppercase tracking-widest text-accent mb-2">Evidence policy</p>
          <p class="text-sm text-muted leading-relaxed">
            Professional work is described from shipped responsibilities. Repository counts are static evidence. AI repositories that use deterministic stand-ins are labeled as reference implementations or prototypes, not production deployments.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-10">
          @for (repo of highlights; track repo.title; let i = $index) {
            <a
              appTilt
              [maxTilt]="8"
              [scale]="1.02"
              [href]="repo.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group p-6 rounded-2xl apple-glass card-hover flex flex-col"
              [style.opacity]="visible() ? '1' : '0'"
              [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
              [style.transition]="'opacity 0.6s ease ' + (0.12 + i * 0.08) + 's, transform 0.6s ease ' + (0.12 + i * 0.08) + 's'"
            >
              <div class="flex items-start justify-between mb-4">
                <span class="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">{{ repo.domain }}</span>
                <svg class="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              <h3 class="font-display font-semibold text-frost mb-2 group-hover:text-accent transition-colors duration-200">{{ repo.title }}</h3>
              <p class="text-sm text-muted leading-relaxed flex-1 mb-4">{{ repo.desc }}</p>

              <div class="flex items-center gap-2 text-xs font-mono text-muted">
                <span class="w-2.5 h-2.5 rounded-full shrink-0" [style.background]="repo.langColor"></span>
                {{ repo.lang }}
              </div>
            </a>
          }
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-10">
          @for (domain of domains; track domain) {
            <span class="px-3 py-1.5 rounded-full text-xs font-mono bg-void border border-accent/30 text-accent">{{ domain }}</span>
          }
        </div>

        <div class="text-center">
          <a
            href="https://github.com/vi-nayKR?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border hover:border-accent/50 text-frost font-semibold text-sm transition-all duration-200 hover:bg-surface hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/10"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Explore the Source
          </a>
        </div>
      </div>
    </section>
  `,
})
export class GithubComponent implements OnInit {
  visible = signal(false);
  parallaxOffset = signal(0);

  highlights: RepoHighlight[] = [
    {
      title: 'medha-platform-api',
      domain: 'Full-stack · self-hosted',
      desc: 'Domain-driven Go API with PostgreSQL/PostGIS, Redis-backed WebSockets, object storage, authentication, and operational safeguards.',
      url: 'https://github.com/vi-nayKR/medha-platform-api',
      lang: 'Go',
      langColor: '#00ADD8',
    },
    {
      title: 'fastapi-genai-agent-patterns',
      domain: 'Applied AI · reference',
      desc: 'Typed LangGraph supervisor with specialist routing, human-approval checkpoints, SSE events, caching interfaces, tracing, and reproducible local tests.',
      url: 'https://github.com/vi-nayKR/fastapi-genai-agent-patterns',
      lang: 'Python',
      langColor: '#3572A5',
    },
    {
      title: 'enterprise-agentic-rag-platform',
      domain: 'Applied AI · prototype',
      desc: 'Hybrid vector and lexical retrieval, RRF ranking, relevance grading, deterministic query rewriting, citation-formatted answers, and local tool-shaped flows.',
      url: 'https://github.com/vi-nayKR/enterprise-agentic-rag-platform',
      lang: 'Python',
      langColor: '#3572A5',
    },
    {
      title: 'homelab-sre-observability',
      domain: 'Reliability · CI-verified lab',
      desc: 'Go instrumentation, Prometheus SLOs, Grafana dashboards, Alertmanager delivery, black-box probes, rule tests, runbooks, and a completed postmortem.',
      url: 'https://github.com/vi-nayKR/homelab-sre-observability',
      lang: 'Go / PromQL',
      langColor: '#00ADD8',
    },
    {
      title: 'kubernetes-reliability-gamedays',
      domain: 'Reliability · bounded lab',
      desc: 'Seven reproducible Kubernetes failure, diagnosis, and rollback scenarios covering probes, images, configuration, DNS, OOM, rollout, drain, and policy controls.',
      url: 'https://github.com/vi-nayKR/kubernetes-reliability-gamedays',
      lang: 'Kubernetes / Shell',
      langColor: '#326CE5',
    },
    {
      title: 'terraform-aws-reliability-baseline',
      domain: 'Reliability · validation-only',
      desc: 'Cost-bounded two-AZ Terraform design with budgets, optional ECS/ALB, mocked plans, policy checks, and documented security exceptions; no AWS deployment claim.',
      url: 'https://github.com/vi-nayKR/terraform-aws-reliability-baseline',
      lang: 'Terraform',
      langColor: '#7B42BC',
    },
    {
      title: 'linux-operations-toolkit',
      domain: 'Reliability · operations lab',
      desc: 'Ansible baselines, systemd services, guarded diagnostics, checksum-verified backups, and six bounded cross-distribution recovery drills.',
      url: 'https://github.com/vi-nayKR/linux-operations-toolkit',
      lang: 'Ansible / Shell',
      langColor: '#89e051',
    },
    {
      title: 'local-llm-inference-gateway',
      domain: 'Applied AI · prototype',
      desc: 'Provider-neutral FastAPI gateway shapes, SSE delivery, local fallback, semantic-cache utilities, safety checks, and fine-tuning simulations.',
      url: 'https://github.com/vi-nayKR/local-llm-inference-gateway',
      lang: 'Python',
      langColor: '#3572A5',
    },
  ];

  domains = [
    'Angular & TypeScript',
    'REST API Design',
    'Authentication & RBAC',
    'Go & PostgreSQL/PostGIS',
    'Python & FastAPI',
    'RAG & Agent Workflows',
    'Linux & Kubernetes',
    'Terraform & SLOs',
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.02);
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const element = document.querySelector('#github');
      if (element) observer.observe(element);
    }, 100);
  }
}
