// src/app/features/support/support.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportComponent implements OnInit, AfterViewInit, OnDestroy {

  heroVisible     = signal(false);
  svcVisible      = signal(false);
  timelineVisible = signal(false);
  tiersVisible    = signal(false);
  ctaVisible      = signal(false);

  private observers: IntersectionObserver[] = [];

  services = [
    { icon: 'check', title: 'Installation Support', desc: 'On-site installation, configuration, and system setup by certified technicians' },
    { icon: 'users', title: 'Staff Training',        desc: 'Comprehensive training for operators, coordinators, and medical staff' },
    { icon: 'book',  title: 'Knowledge Resources',  desc: 'User manuals, video tutorials, FAQs, and best practice guides' },
    { icon: 'head',  title: 'Technical Support',    desc: '24/7 helpdesk with phone, email, and remote troubleshooting' },
  ];

  timeline = [
    { week: 'Week 1–2', title: 'Planning & Preparation', items: ['Requirements analysis', 'Infrastructure assessment', 'Team alignment'] },
    { week: 'Week 3–4', title: 'Installation & Setup',   items: ['Hardware deployment', 'System configuration', 'Network integration'] },
    { week: 'Week 5–6', title: 'Training & Testing',     items: ['Staff onboarding', 'Functional testing', 'Go-live readiness'] },
    { week: 'Week 7+',  title: 'Go-Live & Support',      items: ['System launch', 'Monitoring & optimization', 'Continuous support'] },
  ];

  tiers = [
    { name: 'Lite Support', price: 'Included', features: ['Email support', 'Business hours', 'Knowledge base', 'Monthly updates'],   highlight: false },
    { name: 'Professional', price: 'Premium',  features: ['Phone & email', '12/7 support', 'Dedicated contact', 'Quarterly training'], highlight: true  },
    { name: 'Enterprise',   price: 'Custom',   features: ['24/7 support', 'SLA guarantee', 'Account manager', 'On-site support'],     highlight: false },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    requestAnimationFrame(() => this.heroVisible.set(true));
  }

  ngAfterViewInit(): void {
    this.observe('.svc-section',      () => this.svcVisible.set(true));
    this.observe('.timeline-section', () => this.timelineVisible.set(true));
    this.observe('.tiers-section',    () => this.tiersVisible.set(true));
    this.observe('.cta-section',      () => this.ctaVisible.set(true));
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
  }

  private observe(selector: string, cb: () => void): void {
    const el = this.el.nativeElement.querySelector(selector);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { cb(); obs.disconnect(); } },
      { threshold: 0.10 }
    );
    obs.observe(el);
    this.observers.push(obs);
  }
}