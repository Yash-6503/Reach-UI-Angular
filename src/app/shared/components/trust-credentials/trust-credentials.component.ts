// src/app/shared/components/trust-credentials/trust-credentials.component.ts

import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface Certification {
  id: string;
  name: string;
  description: string;
  region: string;
  img: string | null;
  icon: string;
  zoom?: boolean;  // true = fills circle fully (for logos with heavy whitespace)
  scale?: boolean; // true = scale(1.55) the image inside the fixed ring (e.g. NABL)
}

export interface Stat {
  value: string;
  label: string;
}

// ─── Component ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-trust-credentials',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trust-credentials.component.html',
  styleUrls: ['./trust-credentials.component.scss'],
})
export class TrustCredentialsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('trustSection', { static: false })
  private trustSectionRef!: ElementRef<HTMLElement>;

  // ── Animation State ──────────────────────────────────────────────────────────
  private readonly _isVisible = signal(false);
  readonly isVisible = computed(() => this._isVisible());

  private intersectionObserver: IntersectionObserver | null = null;

  // ── Certification Data ────────────────────────────────────────────────────────
  readonly certifications: Certification[] = [
    {
      id: 'ce',
      name: 'CE Certified',
      description: 'International quality standards compliance',
      region: 'European Union',
      img: 'assets/images/ce.jpg',
      icon: '',
    },
    {
      id: 'cdsco',
      name: 'CDSCO Compliant',
      description: 'Central Drugs Standard Control compliance',
      region: 'India',
      img: 'assets/images/cdsco.jpg',
      icon: '',
    },
    {
      id: 'fda',
      name: 'FDA Components',
      description: 'US Food & Drug Administration standards',
      region: 'United States',
      img: 'assets/images/fda.jpg',
      icon: '',
    },
    {
      id: 'nabl',
      name: 'NABL Accredited',
      description: 'ISO / IEC 17025 laboratory accreditation',
      region: 'India',
      img: 'assets/images/nabl.jpg',
      icon: '',
      scale: true,
    },
    {
      id: 'abdm',
      name: 'ABDM Compatible',
      description: 'Ayushman Bharat Digital Mission integration',
      region: 'India',
      img: 'assets/images/abdm.png',
      icon: '',
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'Information security management system certified',
      region: 'International',
      img: 'assets/images/iso.png',
      icon: '',
    },
  ];

  // ── Stats Data ────────────────────────────────────────────────────────────────
  readonly stats: Stat[] = [
    { value: '6+',    label: 'Active Certifications' },
    { value: '100%',  label: 'ABDM Compatible'       },
    { value: 'ISO',   label: '27001 Infrastructure'  },
    { value: 'NABL',  label: 'Accredited Labs'        },
    { value: '99.9%', label: 'Uptime SLA'            },
  ];

  // ── Lifecycle ─────────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }

  // ── Intersection Observer ─────────────────────────────────────────────────────

  private initIntersectionObserver(): void {
    const section = this.trustSectionRef?.nativeElement;
    if (!section) return;

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this._isVisible()) {
          this._isVisible.set(true);
          this.intersectionObserver?.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    this.intersectionObserver.observe(section);
  }

  // ── 3D Parallax Tilt ──────────────────────────────────────────────────────────

  onCardMouseMove(event: MouseEvent, _cardId: string): void {
    const inner = (event.currentTarget as HTMLElement)
      .querySelector('.trust__cert-card-inner') as HTMLElement | null;
    if (!inner) return;

    const rect = inner.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (event.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);

    inner.style.transform = `
      perspective(600px)
      rotateX(${(-dy * 6).toFixed(2)}deg)
      rotateY(${( dx * 6).toFixed(2)}deg)
      translateY(-6px)
      scale(1.02)
    `;
  }

  onCardMouseLeave(_cardId: string): void {
    this.trustSectionRef?.nativeElement
      ?.querySelectorAll<HTMLElement>('.trust__cert-card-inner')
      ?.forEach(el => { el.style.transform = ''; });
  }

}