// src/app/features/products/lite/product-lite.component.ts
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
  selector: 'app-product-lite',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-lite.component.html',
  styleUrls: ['./product-lite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLiteComponent implements OnInit, AfterViewInit, OnDestroy {

  heroVisible    = signal(false);
  overviewVisible = signal(false);
  specsVisible   = signal(false);
  benefitsVisible = signal(false);
  ctaVisible     = signal(false);

  private observers: IntersectionObserver[] = [];

  features = [
    'Telemedicine video consultation',
    'Basic vital signs capture (BP, Temp, SpO2)',
    'Patient registration & EMR',
    'Cloud-based data storage',
    'Multi-language support',
    'Offline mode capability',
  ];

  specs = [
    { label: 'Display',         value: '24" Touchscreen' },
    { label: 'Diagnostics',     value: '5+ vital devices' },
    { label: 'Connectivity',    value: 'WiFi / 4G' },
    { label: 'Storage',         value: 'Cloud-based' },
    { label: 'Deployment Time', value: '1–2 weeks' },
    { label: 'Training',        value: 'Online & on-site' },
  ];

  benefits = [
    { title: 'Affordable Entry Point', desc: 'Lower upfront investment with flexible payment options' },
    { title: 'Quick Deployment',       desc: 'Ready to operate in 1–2 weeks with minimal setup' },
    { title: 'Essential Features',     desc: 'Core telemedicine and health screening capabilities' },
    { title: 'Scalable Growth',        desc: 'Upgrade to Pro or Enterprise as your needs grow' },
    { title: 'Complete Support',       desc: 'Training, maintenance, and technical support included' },
    { title: 'Proven Results',         desc: 'Trusted by 50+ small clinics and health centers' },
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