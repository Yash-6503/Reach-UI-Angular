// src/app/shared/components/hero/hero.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

export interface HeroSlide {
  id: number;
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  primaryCtaLink: string;
  secondaryCta: string;
  secondaryCtaLink: string;
  image: string;
  accentColor: string;
  stats: { value: string; label: string }[];
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentReveal', [
      transition('* => *', [
        query(
          '.hero__badge, .hero__headline, .hero__sub, .hero__actions, .hero__stats',
          [
            style({ opacity: 0, transform: 'translateY(28px)' }),
            stagger(90, [
              animate(
                '550ms cubic-bezier(0.22,1,0.36,1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: HeroSlide[] = [
    {
      id: 1,
      badge: '🚀 AI-Powered Healthcare',
      headline: 'Deploy Your Own AI-Powered Healthcare Kiosk Network',
      subheadline:
        'Launch telemedicine-enabled healthcare services using Reach AI Kiosks. Designed for clinics, hospitals, NGOs, CSR initiatives, and corporate wellness programs.',
      primaryCta: 'Request Demo',
      primaryCtaLink: '/contact',
      secondaryCta: 'Get Pricing',
      secondaryCtaLink: '/contact',
      image: 'assets/images/Home.png',
      accentColor: '#2563EB',
      stats: [
        { value: '500+', label: 'Kiosks Deployed' },
        { value: '1.2M+', label: 'Patients Served' },
        { value: '98%', label: 'Uptime SLA' },
      ],
    },
    {
      id: 2,
      badge: '🏥 For Doctors & Clinics',
      headline: 'Expand Your Practice Beyond Four Walls',
      subheadline:
        'Launch satellite healthcare centers, offer teleconsultations, and serve more patients using Reach AI Healthcare Kiosks.',
      primaryCta: 'Partner With Reach AI',
      primaryCtaLink: '/contact',
      secondaryCta: 'Get Pricing',
      secondaryCtaLink: '/pricing',
      image: 'assets/images/docs.jpg',
      accentColor: '#0891B2',
      stats: [
        { value: '3x', label: 'Patient Reach' },
        { value: '60%', label: 'Cost Reduction' },
        { value: '24/7', label: 'Availability' },
      ],
    },
    {
      id: 3,
      badge: '🌍 For NGOs & CSR Projects',
      headline: 'Build Sustainable Healthcare Access for Communities',
      subheadline:
        'Deploy healthcare kiosks in villages, schools, and underserved communities with a scalable technology platform.',
      primaryCta: 'Explore Solutions',
      primaryCtaLink: '/solutions',
      secondaryCta: 'Talk to Our Team',
      secondaryCtaLink: '/contact',
      image: 'assets/images/pro.png',
      accentColor: '#059669',
      stats: [
        { value: '200+', label: 'Villages Covered' },
        { value: '50K+', label: 'Rural Patients' },
        { value: '40+', label: 'NGO Partners' },
      ],
    },
    {
      id: 4,
      badge: '🏢 Corporate Wellness',
      headline: 'Bring Preventive Healthcare Closer to Employees',
      subheadline:
        'Establish workplace health centers with digital health assessments, telemedicine access, and centralized reporting.',
      primaryCta: 'Book a Demo',
      primaryCtaLink: '/contact',
      secondaryCta: 'Request Proposal',
      secondaryCtaLink: '/contact',
      image: 'assets/images/image.png',
      accentColor: '#7C3AED',
      stats: [
        { value: '35%', label: 'Absenteeism Drop' },
        { value: '4.8★', label: 'Employee Rating' },
        { value: '300+', label: 'Corporates' },
      ],
    },
    {
      id: 5,
      badge: '🤖 Technology & AI',
      headline: 'More Than a Kiosk. A Complete Healthcare Technology Platform.',
      subheadline:
        'AI-powered diagnostics, telemedicine, EMR, analytics, reporting, and multi-location healthcare management in one ecosystem.',
      primaryCta: 'Explore Technology',
      primaryCtaLink: '/technology',
      secondaryCta: 'Watch Demo',
      secondaryCtaLink: '/demo',
      image: 'assets/images/aimed.jpg',
      accentColor: '#DB2777',
      stats: [
        { value: '50+', label: 'AI Parameters' },
        { value: '99.2%', label: 'Accuracy Rate' },
        { value: 'HIPAA', label: 'Compliant' },
      ],
    },
  ];

  current = signal(0);
  isAnimating = signal(false);
  isPaused = signal(false);
  direction = signal<'next' | 'prev'>('next');

  currentSlide = computed(() => this.slides[this.current()]);
  animTrigger = computed(() => this.current());

  private interval: ReturnType<typeof setInterval> | null = null;
  private readonly AUTO_DELAY = 5000;

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {}

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.zone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        if (!this.isPaused()) {
          this.zone.run(() => this.goNext());
        }
      }, this.AUTO_DELAY);
    });
  }

  stopAutoplay(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  pauseAutoplay(): void {
    this.isPaused.set(true);
  }

  resumeAutoplay(): void {
    this.isPaused.set(false);
  }

  goNext(): void {
    if (this.isAnimating()) return;
    this.direction.set('next');
    this.isAnimating.set(true);
    this.current.update((v) => (v + 1) % this.slides.length);
    this.restartProgress();
    setTimeout(() => this.isAnimating.set(false), 600);
  }

  goPrev(): void {
    if (this.isAnimating()) return;
    this.direction.set('prev');
    this.isAnimating.set(true);
    this.current.update((v) => (v - 1 + this.slides.length) % this.slides.length);
    this.restartProgress();
    setTimeout(() => this.isAnimating.set(false), 600);
  }

  goTo(index: number): void {
    if (this.isAnimating() || index === this.current()) return;
    this.direction.set(index > this.current() ? 'next' : 'prev');
    this.isAnimating.set(true);
    this.current.set(index);
    this.restartProgress();
    setTimeout(() => this.isAnimating.set(false), 600);
  }

  private restartProgress(): void {
    this.isPaused.set(true);
    setTimeout(() => this.isPaused.set(false), 50);
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}