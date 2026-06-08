// src/app/features/resources/resources.component.ts
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
  selector: 'app-resources',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesComponent implements OnInit, AfterViewInit, OnDestroy {
  heroVisible      = signal(false);
  downloadVisible  = signal(false);
  categoryVisible  = signal(false);
  kbVisible        = signal(false);
  ctaVisible       = signal(false);

  private observers: IntersectionObserver[] = [];

  resources = [
    { title: 'Product Brochure',         description: 'Complete overview of Reach AI products, features, and capabilities',      type: 'PDF',   icon: '📄' },
    { title: 'Technical Specifications', description: 'Hardware, software, and system requirements for all Reach AI models',     type: 'PDF',   icon: '⚙️' },
    { title: 'Deployment Guide',         description: 'Step-by-step guide for successful Reach AI implementation',                type: 'PDF',   icon: '📋' },
    { title: 'Solution Overview',        description: 'Solutions tailored for different customer segments and use cases',         type: 'PDF',   icon: '🎯' },
    { title: 'Partnership Guide',        description: 'Become a Reach AI partner and expand your healthcare offerings',           type: 'PDF',   icon: '🤝' },
    { title: 'Training Materials',       description: 'Comprehensive training resources for operators and staff',                  type: 'Video', icon: '🎓' },
  ];

  categories = [
    { title: 'Product Guides', items: ['Product brochure', 'Technical specs', 'Feature overview', 'Comparison guide'] },
    { title: 'Deployment',     items: ['Deployment guide', 'Installation checklist', 'Configuration guide', 'Go-live plan'] },
    { title: 'Training',       items: ['User manual', 'Video tutorials', 'Training modules', 'Best practices'] },
    { title: 'Business',       items: ['ROI calculator', 'Pricing guide', 'Partnership info', 'Case studies'] },
  ];

  knowledgeBase = [
    { title: 'Getting Started',  desc: 'Learn the basics and get up and running with Reach AI',               route: '/faq' },
    { title: 'Troubleshooting',  desc: 'Common issues and solutions for smooth operation',                    route: '/support' },
    { title: 'Best Practices',   desc: 'Tips and strategies for maximizing your Reach AI deployment',         route: '#' },
    { title: 'Integration Help', desc: 'Connect Reach AI with your existing systems',                         route: '/technology' },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    requestAnimationFrame(() => this.heroVisible.set(true));
  }

  ngAfterViewInit(): void {
    this.observe('.download-section',  () => this.downloadVisible.set(true));
    this.observe('.category-section',  () => this.categoryVisible.set(true));
    this.observe('.kb-section',        () => this.kbVisible.set(true));
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