// src/app/features/products/pro/product-pro.component.ts
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
  selector: 'app-product-pro',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-pro.component.html',
  styleUrls: ['./product-pro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductProComponent implements OnInit, AfterViewInit, OnDestroy {

  heroVisible     = signal(false);
  overviewVisible = signal(false);
  specsVisible    = signal(false);
  benefitsVisible = signal(false);
  ctaVisible      = signal(false);

  private observers: IntersectionObserver[] = [];

  features = [
    'All Lite features included',
    'Advanced diagnostics (ECG, Blood Glucose, AI Stethoscope)',
    'Full EMR integration & health records',
    'Analytics dashboard & reporting',
    'Multi-location management',
    'Specialist referral system',
    'E-prescription module',
    'Role-based access control',
  ];

  specs = [
    { label: 'Display',         value: '32" Touchscreen' },
    { label: 'Diagnostics',     value: '12+ vital devices' },
    { label: 'Connectivity',    value: 'WiFi/4G/Ethernet' },
    { label: 'Storage',         value: 'Hybrid (Local + Cloud)' },
    { label: 'Deployment Time', value: '3-4 weeks' },
    { label: 'Training',        value: 'On-site (comprehensive)' },
  ];

  benefits = [
    { title: 'Comprehensive Diagnostics', desc: 'Full suite of diagnostic devices for advanced health screening' },
    { title: 'Multi-Location Ready',      desc: 'Manage multiple sites from a centralized dashboard' },
    { title: 'Advanced Analytics',        desc: 'Detailed insights for clinical and operational optimization' },
    { title: 'Seamless Integration',      desc: 'Works with existing hospital management systems' },
    { title: 'Priority Support',          desc: '12/7 phone and email support with dedicated contact' },
    { title: 'Scalable Platform',         desc: 'Grow from Pro to Enterprise as your network expands' },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    requestAnimationFrame(() => this.heroVisible.set(true));
  }

  ngAfterViewInit(): void {
    this.observe('.overview-section',  () => this.overviewVisible.set(true));
    this.observe('.specs-section',     () => this.specsVisible.set(true));
    this.observe('.benefits-section',  () => this.benefitsVisible.set(true));
    this.observe('.cta-section',       () => this.ctaVisible.set(true));
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