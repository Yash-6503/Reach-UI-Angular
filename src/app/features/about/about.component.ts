// src/app/features/about/about.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  NgZone,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  // Visibility signals
  heroVisible    = signal(false);
  missionVisible = signal(false);
  visionVisible  = signal(false);
  reasonVisible  = signal(false);
  ctaVisible     = signal(false);

  // Counter signals — displayed values
  stat1 = signal(0);   // target: 50
  stat2 = signal(0);   // target: 2.5 (decimal)
  stat3 = signal('');  // target: 'CE' (text, no count)

  private countersDone = false;
  private observers: IntersectionObserver[] = [];
  private rafIds: number[] = [];

  highlights = [
    'Deployed in 50+ locations across India',
    'Serving 2.5M+ patients and counting',
    'Trusted by doctors, hospitals, NGOs, and CSR programs',
    'CE certified and ABDM compatible',
  ];

  visionCards = [
    {
      icon: 'zap',
      title: 'Technology-Driven',
      desc: 'AI and automation powering intelligent health assessment, diagnostics, and telemedicine',
    },
    {
      icon: 'award',
      title: 'Quality Healthcare',
      desc: 'Enterprise-grade systems delivering reliable, secure, and compliant healthcare solutions',
    },
    {
      icon: 'users',
      title: 'Healthcare for All',
      desc: 'Scalable platforms making quality medical services accessible in rural and urban areas',
    },
  ];

  reasons = [
    { title: 'End-to-End Healthcare Platform', desc: 'From patient registration to consultation to diagnosis' },
    { title: 'AI-Powered Intelligence',         desc: 'Machine learning for smart health assessment and risk detection' },
    { title: 'Telemedicine Ready',              desc: 'Secure video consultations with real-time vital data' },
    { title: 'Scalable Architecture',           desc: 'Deploy anywhere, from single clinic to national networks' },
    { title: 'Secure Cloud Platform',           desc: 'Enterprise-grade security with HIPAA and GDPR compliance' },
    { title: 'Complete Support',                desc: 'Training, installation, maintenance, and 24/7 technical support' },
  ];

  constructor(private el: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {
    // Hero fires immediately on load
    requestAnimationFrame(() => {
      this.heroVisible.set(true);
      this.startCounters();
    });
  }

  ngAfterViewInit(): void {
    this.observe('.mission-section',  () => this.missionVisible.set(true));
    this.observe('.vision-section',   () => this.visionVisible.set(true));
    this.observe('.reasons-section',  () => this.reasonVisible.set(true));
    this.observe('.cta-section',      () => this.ctaVisible.set(true));
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
    this.rafIds.forEach(id => cancelAnimationFrame(id));
  }

  /** Animates a numeric signal from 0 → target over `duration` ms */
  private animateCount(
    setter: (v: number) => void,
    target: number,
    duration: number,
    decimals = 0
  ): void {
    const start = performance.now();
    // easeOutExpo for a snappy finish
    const ease = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const value   = parseFloat((ease(elapsed) * target).toFixed(decimals));
      this.zone.run(() => setter(value));
      if (elapsed < 1) {
        this.rafIds.push(requestAnimationFrame(tick));
      }
    };
    this.rafIds.push(requestAnimationFrame(tick));
  }

  private startCounters(): void {
    if (this.countersDone) return;
    this.countersDone = true;

    // Delay slightly so hero entrance runs first
    setTimeout(() => {
      this.animateCount(v => this.stat1.set(v), 50,  1800, 0);   // 0 → 50
      this.animateCount(v => this.stat2.set(v), 2.5, 2000, 1);   // 0.0 → 2.5

      // 'CE' is text — just pop it in after a short delay
      setTimeout(() => this.zone.run(() => this.stat3.set('CE')), 600);
    }, 350);
  }

  private observe(selector: string, callback: () => void): void {
    const el = this.el.nativeElement.querySelector(selector);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { callback(); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    this.observers.push(obs);
  }
}