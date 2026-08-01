import { Component, DestroyRef, HostListener, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

interface StreamEmission {
  id: number;
  time: string;
  value: string;
}

const MAX_LOG_ENTRIES = 5;
const SEARCH_DEBOUNCE_MS = 300;

@Component({
  selector: 'app-angular-showcase',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TiltDirective, SafeHtmlPipe],
  template: `
    <section id="angular" class="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      <!-- Parallax background accent -->
      <div
        class="absolute inset-0 pointer-events-none"
        [style.transform]="'translateY(' + parallaxOffset() + 'px)'"
      >
        <div class="absolute top-1/3 right-0 w-[520px] h-[520px] rounded-full"
             style="background: radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)"></div>
      </div>

      <!-- Outline background Typography -->
      <div
        class="absolute left-[-12%] top-16 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        [style.transform]="'translate3d(' + (parallaxOffset() * 1.1) + 'px, 0, 0)'"
      >
        ANGULAR
      </div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-12 md:mb-16">
          <p class="text-accent font-mono text-xs tracking-widest uppercase mb-4">Angular Engineering</p>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-frost text-balance mb-4">
            Reactive Forms &amp; <span class="gradient-text">RxJS</span>, Running Live
          </h2>
          <p class="text-muted max-w-2xl mx-auto text-sm leading-relaxed">
            Everything below is real Angular running in this page — not a screenshot. Type into it.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-6 mb-6">
          <!-- Live Reactive Form -->
          <div
            appTilt
            [maxTilt]="4"
            [scale]="1.01"
            class="p-6 rounded-2xl apple-glass card-hover"
            [style.opacity]="visible() ? '1' : '0'"
            [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
            style="transition: opacity 0.6s ease, transform 0.6s ease"
          >
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 class="font-display font-semibold text-frost">Reactive Form</h3>
              </div>
              <span
                class="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-colors duration-200"
                [class]="formValid()
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-accent/10 border-accent/40 text-accent'"
              >
                {{ formValid() ? 'VALID' : 'INVALID' }}
              </span>
            </div>

            <p class="text-xs text-muted mb-5 leading-relaxed">
              A firewall-style rule form — <span class="text-frost font-medium">FormBuilder</span>,
              <span class="text-frost font-medium">Validators</span>, and per-control error state,
              the same pattern I used for policy configuration screens at Liminal Custody.
            </p>

            <form [formGroup]="ruleForm" class="space-y-4">
              <!-- Rule name -->
              <div>
                <label for="ruleName" class="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                  Rule Name
                </label>
                <input
                  id="ruleName"
                  type="text"
                  formControlName="ruleName"
                  placeholder="high-value-transfer-block"
                  class="w-full px-3 py-2.5 rounded-lg bg-void border border-border text-frost text-sm font-mono placeholder:text-muted/50 focus:border-accent/60 focus:outline-none transition-colors duration-200"
                />
                @if (ruleForm.controls.ruleName.touched && ruleForm.controls.ruleName.invalid) {
                  <p class="text-[11px] text-accent mt-1.5 font-mono">
                    @if (ruleForm.controls.ruleName.hasError('required')) {
                      Required.
                    } @else if (ruleForm.controls.ruleName.hasError('minlength')) {
                      Minimum 3 characters.
                    }
                  </p>
                }
              </div>

              <!-- Risk threshold -->
              <div>
                <label for="riskThreshold" class="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                  Risk Threshold (0–100)
                </label>
                <input
                  id="riskThreshold"
                  type="number"
                  formControlName="riskThreshold"
                  class="w-full px-3 py-2.5 rounded-lg bg-void border border-border text-frost text-sm font-mono focus:border-accent/60 focus:outline-none transition-colors duration-200"
                />
                @if (ruleForm.controls.riskThreshold.touched && ruleForm.controls.riskThreshold.invalid) {
                  <p class="text-[11px] text-accent mt-1.5 font-mono">Must be between 0 and 100.</p>
                }
              </div>

              <!-- Action -->
              <div>
                <label for="action" class="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                  Action
                </label>
                <select
                  id="action"
                  formControlName="action"
                  class="w-full px-3 py-2.5 rounded-lg bg-void border border-border text-frost text-sm font-mono focus:border-accent/60 focus:outline-none transition-colors duration-200 cursor-pointer"
                >
                  <option value="">Select an action…</option>
                  @for (option of actionOptions; track option) {
                    <option [value]="option">{{ option }}</option>
                  }
                </select>
                @if (ruleForm.controls.action.touched && ruleForm.controls.action.invalid) {
                  <p class="text-[11px] text-accent mt-1.5 font-mono">Pick an action.</p>
                }
              </div>

              <!-- Live value preview, driven by valueChanges -->
              <div>
                <p class="text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">
                  form.valueChanges →
                </p>
                <pre class="px-3 py-2.5 rounded-lg bg-void border border-border text-[11px] font-mono text-accent overflow-x-auto leading-relaxed">{{ formPreview() }}</pre>
              </div>

              <button
                type="button"
                [disabled]="!formValid()"
                (click)="onSubmit()"
                class="w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-accent hover:bg-accent-glow text-frost cursor-pointer"
              >
                {{ submitted() ? 'Rule staged for approval ✓' : 'Submit Rule' }}
              </button>
            </form>
          </div>

          <!-- Live RxJS pipeline -->
          <div
            appTilt
            [maxTilt]="4"
            [scale]="1.01"
            class="p-6 rounded-2xl apple-glass card-hover flex flex-col"
            [style.opacity]="visible() ? '1' : '0'"
            [style.transform]="visible() ? 'translateY(0)' : 'translateY(30px)'"
            style="transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s"
          >
            <div class="flex items-center gap-3 mb-5">
              <div class="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="font-display font-semibold text-frost">RxJS Pipeline</h3>
            </div>

            <p class="text-xs text-muted mb-5 leading-relaxed">
              Type quickly — the log only records after you pause. Same debounce-and-dedupe chain
              I use for search and filter streams.
            </p>

            <input
              type="text"
              [formControl]="searchControl"
              placeholder="Search addresses…"
              class="w-full px-3 py-2.5 rounded-lg bg-void border border-border text-frost text-sm font-mono placeholder:text-muted/50 focus:border-accent/60 focus:outline-none transition-colors duration-200 mb-4"
            />

            <pre class="px-3 py-3 rounded-lg bg-void border border-border text-[11px] font-mono text-muted overflow-x-auto leading-relaxed mb-4">{{ pipelineCode }}</pre>

            <div class="flex-1">
              <p class="text-[11px] font-mono uppercase tracking-wider text-muted mb-2">
                Emissions ({{ emissions().length }})
              </p>
              @if (emissions().length === 0) {
                <p class="text-xs text-muted/60 font-mono italic py-3">
                  Nothing emitted yet — start typing above.
                </p>
              } @else {
                <div class="space-y-1.5">
                  @for (item of emissions(); track item.id) {
                    <div class="flex items-center gap-3 px-3 py-2 rounded-lg bg-void border border-border/60 animate-fade-in-up">
                      <span class="text-[10px] font-mono text-muted shrink-0">{{ item.time }}</span>
                      <span class="text-xs font-mono text-accent truncate">"{{ item.value }}"</span>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Capability cards -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          @for (cap of capabilities; track cap.title; let i = $index) {
            <div
              appTilt
              [maxTilt]="8"
              [scale]="1.02"
              class="p-5 rounded-xl apple-glass card-hover"
              [style.opacity]="visible() ? '1' : '0'"
              [style.transform]="visible() ? 'translateY(0)' : 'translateY(20px)'"
              [style.transition]="'opacity 0.5s ease ' + (0.25 + i * 0.07) + 's, transform 0.5s ease ' + (0.25 + i * 0.07) + 's'"
            >
              <div class="flex items-center gap-2.5 mb-2.5">
                <span [innerHTML]="cap.icon | safeHtml" class="text-accent shrink-0"></span>
                <h4 class="font-semibold text-frost text-sm">{{ cap.title }}</h4>
              </div>
              <p class="text-xs text-muted leading-relaxed">{{ cap.desc }}</p>
            </div>
          }
        </div>

        <!-- This site is the artefact -->
        <div class="p-5 md:p-6 rounded-2xl apple-glass">
          <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div class="shrink-0">
              <p class="text-[11px] font-mono uppercase tracking-wider text-accent mb-1">Built with it</p>
              <p class="text-sm text-frost font-semibold">This portfolio is an Angular app</p>
            </div>
            <div class="flex flex-wrap gap-2">
              @for (tag of builtWith; track tag) {
                <span class="px-3 py-1.5 rounded-full text-xs font-mono bg-void border border-border text-muted hover:border-accent/50 hover:text-accent transition-all duration-200">
                  {{ tag }}
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AngularShowcaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  visible = signal(false);
  parallaxOffset = signal(0);
  formValid = signal(false);
  formPreview = signal('{}');
  submitted = signal(false);
  emissions = signal<StreamEmission[]>([]);
  private nextEmissionId = 0;

  actionOptions = ['BLOCK', 'REQUIRE_APPROVAL', 'FLAG_FOR_REVIEW', 'ALLOW'];

  ruleForm = this.fb.nonNullable.group({
    ruleName: ['', [Validators.required, Validators.minLength(3)]],
    riskThreshold: [75, [Validators.required, Validators.min(0), Validators.max(100)]],
    action: ['', Validators.required],
  });

  searchControl = this.fb.nonNullable.control('');

  pipelineCode = [
    'searchControl.valueChanges.pipe(',
    `  debounceTime(${SEARCH_DEBOUNCE_MS}),`,
    '  distinctUntilChanged(),',
    '  map(v => v.trim()),',
    '  takeUntilDestroyed(destroyRef),',
    ').subscribe(...)',
  ].join('\n');

  capabilities = [
    {
      title: 'Standalone + Signals',
      desc: 'Standalone components with signal-driven state and OnPush change detection — no NgModule boilerplate.',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>',
    },
    {
      title: 'Reactive Forms',
      desc: 'Typed FormGroups, cross-field and async validators, and rule-type-aware dynamic controls shared across policy screens.',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
    },
    {
      title: 'RxJS State',
      desc: 'switchMap for search, exhaustMap for submits, shareReplay for cached streams — and takeUntilDestroyed so nothing leaks.',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>',
    },
    {
      title: 'Guards & Interceptors',
      desc: 'Functional route guards and an HTTP interceptor attaching JWT and organization context for multi-org RBAC.',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    },
    {
      title: 'Real-Time UI',
      desc: 'WebSocket-fed observables driving live displays — including tracking down a subscription leak that destabilised devices.',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    },
    {
      title: 'Cypress E2E',
      desc: 'End-to-end suites giving regression coverage across Angular releases, wired into the delivery pipeline.',
      icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
    },
  ];

  builtWith = [
    'Angular 22',
    'Standalone Components',
    'Signals',
    'Native Control Flow',
    'Reactive Forms',
    'RxJS',
    'Custom Directive',
    'Custom Pipe',
    'TypeScript',
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.parallaxOffset.set(window.scrollY * 0.03);
  }

  ngOnInit() {
    // Mirror form state into signals so the template reflects validity and value live.
    this.ruleForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.formPreview.set(JSON.stringify(value, null, 2));
        this.submitted.set(false);
      });

    this.ruleForm.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.formValid.set(this.ruleForm.valid));

    this.formPreview.set(JSON.stringify(this.ruleForm.value, null, 2));
    this.formValid.set(this.ruleForm.valid);

    // The debounced, deduped stream the code panel describes.
    this.searchControl.valueChanges
      .pipe(
        debounceTime(SEARCH_DEBOUNCE_MS),
        distinctUntilChanged(),
        map((value) => value.trim()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        if (!value) return;
        const entry: StreamEmission = {
          id: this.nextEmissionId++,
          time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
          value,
        };
        this.emissions.update((log) => [entry, ...log].slice(0, MAX_LOG_ENTRIES));
      });

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) this.visible.set(true); },
      { threshold: 0.1 }
    );
    setTimeout(() => {
      const el = document.querySelector('#angular');
      if (el) observer.observe(el);
    }, 100);
  }

  onSubmit() {
    if (!this.ruleForm.valid) return;
    this.submitted.set(true);
  }
}
