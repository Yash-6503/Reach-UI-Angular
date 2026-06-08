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

export interface Partner {
  id: string;
  type: string;
  title: string;
  logo: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  region: string;
  img: string | null;
  icon: string;
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

  // ───────────────────────────────────────────────────────────────────────────
  //  TEMPLATE
  // ───────────────────────────────────────────────────────────────────────────
  template: `
<section class="trust" #trustSection aria-labelledby="trust-heading">

  <!-- ░░ Animated Background Layer ░░ -->
  <div class="trust__bg" aria-hidden="true">
    <div class="trust__bg-aurora"></div>
    <div class="trust__blob trust__blob--1"></div>
    <div class="trust__blob trust__blob--2"></div>
    <div class="trust__blob trust__blob--3"></div>
    <div class="trust__bg-grid"></div>
    <div class="trust__radial trust__radial--1"></div>
    <div class="trust__radial trust__radial--2"></div>
  </div>

  <div class="container">

    <!-- ░░ Section Header ░░ -->
    <header class="trust__header" [class.trust__header--visible]="isVisible()">
      <div class="trust__eyebrow" role="text">
        <span class="trust__eyebrow-dot"></span>
        TRUST
        <span class="trust__eyebrow-divider">•</span>
        PARTNERS
        <span class="trust__eyebrow-divider">•</span>
        CERTIFICATIONS
        <span class="trust__eyebrow-dot"></span>
      </div>
      <h2 class="trust__title" id="trust-heading">
        Trusted 
        Healthcare Technology
      </h2>
      <p class="trust__subtitle">
        Empowering healthcare delivery through certified technology,
        strategic partnerships, and secure digital infrastructure.
      </p>
    </header>

    <!-- ░░ ROW 1 — Healthcare Partners ░░ -->
    <div class="trust__block" [class.trust__block--visible]="isVisible()">
      <div class="trust__block-label">
        <span class="trust__block-label-line"></span>
        <span class="trust__block-label-text">Healthcare Partners</span>
        <span class="trust__block-label-line"></span>
      </div>

      <div class="trust__partners-grid" role="list">
        @for (partner of partners; track partner.id; let i = $index) {
          <article
            class="trust__partner-card"
            role="listitem"
            [class.trust__partner-card--visible]="isVisible()"
            [style.--delay]="(i * 0.12) + 's'"
            [attr.aria-label]="partner.title + ' - ' + partner.type"
            (mousemove)="onCardMouseMove($event, 'partner-' + partner.id)"
            (mouseleave)="onCardMouseLeave('partner-' + partner.id)"
          >
            <div class="trust__partner-card-inner">
              <div class="trust__partner-glow"></div>
              <div class="trust__partner-logo-wrap">
                <img
                  [src]="partner.logo"
                  [alt]="partner.title + ' logo'"
                  class="trust__partner-logo"
                  loading="lazy"
                  (error)="onImgError($event, partner)"
                />
              </div>
              <div class="trust__partner-info">
                <span class="trust__partner-type">{{ partner.type }}</span>
                <p class="trust__partner-title">{{ partner.title }}</p>
              </div>
              <div class="trust__partner-badge">
                <span class="trust__partner-badge-dot"></span>
                Active
              </div>
            </div>
          </article>
        }
      </div>
    </div>

    <!-- ░░ ROW 2 — Certifications ░░ -->
    <div class="trust__block trust__block--certs" [class.trust__block--visible]="isVisible()">
      <div class="trust__block-label">
        <span class="trust__block-label-line"></span>
        <span class="trust__block-label-text">Certifications &amp; Compliance</span>
        <span class="trust__block-label-line"></span>
      </div>

      <div class="trust__certs-grid" role="list">
        @for (cert of certifications; track cert.id; let i = $index) {
          <article
            class="trust__cert-card"
            role="listitem"
            [class.trust__cert-card--visible]="isVisible()"
            [style.--delay]="(i * 0.14 + 0.2) + 's'"
            [style.--float-delay]="(i * 0.6) + 's'"
            [attr.aria-label]="cert.name + ': ' + cert.description"
            (mousemove)="onCardMouseMove($event, 'cert-' + cert.id)"
            (mouseleave)="onCardMouseLeave('cert-' + cert.id)"
          >
            <div class="trust__cert-card-inner">
              <div class="trust__cert-glow"></div>
              <div class="trust__cert-shimmer"></div>

              <div class="trust__cert-icon-wrap">
                @if (cert.img) {
                  <div class="trust__cert-img-ring">
                    <img
                      [src]="cert.img"
                      [alt]="cert.name + ' certification badge'"
                      class="trust__cert-img"
                      loading="lazy"
                    />
                  </div>
                } @else {
                  <div class="trust__cert-emoji-wrap">
                    <span class="trust__cert-emoji" role="img" [attr.aria-label]="cert.name">
                      {{ cert.icon }}
                    </span>
                  </div>
                }
              </div>

              <div class="trust__cert-content">
                <h3 class="trust__cert-name">{{ cert.name }}</h3>
                <p class="trust__cert-desc">{{ cert.description }}</p>
                <div class="trust__cert-tag">
                  <span class="trust__cert-tag-dot"></span>
                  {{ cert.region }}
                </div>
              </div>

              <div class="trust__cert-verified" aria-label="Verified">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1l1.8 2.6 3-.6-1 2.9 2.2 2.1-2.8 1L12 12l-3-1.2L8 13l-1-2.2L4 12l.8-2.9-2.8-1 2.2-2.1-1-2.9 3 .6z" fill="currentColor"/>
                  <path d="M5.5 8l1.8 1.8L10.5 6.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </article>
        }
      </div>
    </div>

    <!-- ░░ Bottom Stats Bar ░░ -->
    <footer class="trust__stats" [class.trust__stats--visible]="isVisible()" role="contentinfo">
      @for (stat of stats; track stat.label) {
        <div class="trust__stat">
          <span class="trust__stat-value">{{ stat.value }}</span>
          <span class="trust__stat-label">{{ stat.label }}</span>
        </div>
        @if (!$last) {
          <div class="trust__stat-divider" aria-hidden="true"></div>
        }
      }
    </footer>

  </div>
</section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  //  STYLES
  // ───────────────────────────────────────────────────────────────────────────
  styles: [`

/* ══════════════════════════════════════════════
   TRUST CREDENTIALS — Premium Healthcare Section
   Reach AI MedTech
══════════════════════════════════════════════ */

/* ── Keyframes ─────────────────────────────── */

@keyframes aurora-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes blob-drift-1 {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(60px, -40px) scale(1.08); }
  66%  { transform: translate(-40px, 30px) scale(0.94); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes blob-drift-2 {
  0%   { transform: translate(0, 0) scale(1); }
  40%  { transform: translate(-80px, 50px) scale(1.12); }
  80%  { transform: translate(50px, -30px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes blob-drift-3 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(40px, 70px) scale(1.06); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes radial-pulse {
  0%, 100% { opacity: 0.35; transform: translate(-50%, -50%) scale(1); }
  50%       { opacity: 0.65; transform: translate(-50%, -50%) scale(1.15); }
}

@keyframes float-card {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}

@keyframes shimmer-slide {
  0%   { left: -60%; }
  100% { left: 120%; }
}

@keyframes eyebrow-dot-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.5); }
  50%       { box-shadow: 0 0 0 6px rgba(20, 184, 166, 0); }
}

@keyframes badge-dot-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
  50%       { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
}

@keyframes cert-ring-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes stagger-in {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }
}

/* ── Section ───────────────────────────────── */

.trust {
  position: relative;
  padding: 7rem 0 6rem;
  overflow: hidden;
  isolation: isolate;
  will-change: transform;
}

/* ── Background ────────────────────────────── */

.trust__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.trust__bg-aurora {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #f0fdfa 0%,
    #e0f7f4 15%,
    #f8faff 30%,
    #eff6ff 50%,
    #f0fdf4 70%,
    #ecfdf5 85%,
    #f0fdfa 100%
  );
  background-size: 400% 400%;
  animation: aurora-shift 28s ease infinite;
}

.trust__bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(20, 184, 166, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 184, 166, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
}

.trust__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.32;
  pointer-events: none;
}

.trust__blob--1 {
  width: 520px; height: 520px;
  background: radial-gradient(circle, rgba(94, 234, 212, 0.9), rgba(20, 184, 166, 0.4));
  top: -120px; left: -100px;
  animation: blob-drift-1 26s ease-in-out infinite;
}

.trust__blob--2 {
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.5), rgba(20, 184, 166, 0.3));
  bottom: -80px; right: -120px;
  animation: blob-drift-2 32s ease-in-out infinite;
}

.trust__blob--3 {
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.5), transparent);
  top: 50%; left: 55%;
  animation: blob-drift-3 22s ease-in-out infinite;
}

.trust__radial {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.trust__radial--1 {
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: radial-pulse 8s ease-in-out infinite;
}

.trust__radial--2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
  bottom: 10%; right: 10%;
  animation: radial-pulse 12s ease-in-out infinite reverse;
}

/* ── Container ─────────────────────────────── */

.container {
  position: relative;
  z-index: 1;
  max-width: 82rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 768px)  { .container { padding: 0 2.5rem; } }
@media (min-width: 1280px) { .container { padding: 0 3rem; } }

/* ── Header ────────────────────────────────── */

.trust__header {
  text-align: center;
  margin-bottom: 5rem;
  opacity: 0;
  filter: blur(12px);
  transform: translateY(40px);
  transition:
    opacity   0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    filter    0.9s ease;
}

.trust__header--visible {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}

.trust__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #0d9488;
  text-transform: uppercase;
  background: rgba(20, 184, 166, 0.08);
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 100px;
  padding: 0.4rem 1.25rem;
  margin-bottom: 1.75rem;
}

.trust__eyebrow-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #14b8a6;
  animation: eyebrow-dot-pulse 2.4s ease-in-out infinite;
}

.trust__eyebrow-divider {
  opacity: 0.5;
  font-size: 0.55rem;
}

.trust__title {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 700;
  line-height: 1.1;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
}

.trust__title-accent {
  font-style: normal;
  background: linear-gradient(135deg, #0d9488, #6366f1 50%, #14b8a6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.trust__subtitle {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.125rem);
  color: #64748b;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Block ─────────────────────────────────── */

.trust__block {
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity   0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}

.trust__block--visible {
  opacity: 1;
  transform: translateY(0);
}

.trust__block--certs { margin-bottom: 0; }

.trust__block-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.25rem;
}

.trust__block-label-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.3), transparent);
}

.trust__block-label-text {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0d9488;
  white-space: nowrap;
}

/* ── Partners Grid ─────────────────────────── */

.trust__partners-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (min-width: 640px)  { .trust__partners-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .trust__partners-grid { grid-template-columns: repeat(5, 1fr); } }

/* ── Partner Card ──────────────────────────── */

.trust__partner-card { opacity: 0; }

.trust__partner-card--visible:nth-child(1) { animation: stagger-in .7s cubic-bezier(.22,1,.36,1) 0.00s both, float-card 5.0s ease-in-out 1.2s infinite; }
.trust__partner-card--visible:nth-child(2) { animation: stagger-in .7s cubic-bezier(.22,1,.36,1) 0.12s both, float-card 5.4s ease-in-out 1.4s infinite; }
.trust__partner-card--visible:nth-child(3) { animation: stagger-in .7s cubic-bezier(.22,1,.36,1) 0.24s both, float-card 4.8s ease-in-out 1.6s infinite; }
.trust__partner-card--visible:nth-child(4) { animation: stagger-in .7s cubic-bezier(.22,1,.36,1) 0.36s both, float-card 5.2s ease-in-out 1.8s infinite; }
.trust__partner-card--visible:nth-child(5) { animation: stagger-in .7s cubic-bezier(.22,1,.36,1) 0.48s both, float-card 5.6s ease-in-out 2.0s infinite; }

.trust__partner-card-inner {
  position: relative;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 1.75rem 1.25rem 1.25rem;
  box-shadow: 0 4px 24px rgba(0,0,0,.14), 0 1px 4px rgba(0,0,0,.08);
  overflow: hidden;
  text-align: center;
  transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, border-color .35s ease;
  will-change: transform;
}

.trust__partner-card-inner:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(13,148,136,.22), 0 4px 16px rgba(0,0,0,.18);
  border-color: rgba(20, 184, 166, 0.4);
}

.trust__partner-card-inner:hover .trust__partner-glow { opacity: 1; }
.trust__partner-card-inner:hover .trust__partner-logo {
  filter: grayscale(0%) brightness(1.05);
  transform: scale(1.08);
}

.trust__partner-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(94, 234, 212, 0.18), transparent 70%);
  opacity: 0;
  transition: opacity .4s ease;
  pointer-events: none;
}

.trust__partner-logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  margin-bottom: 1rem;
}

.trust__partner-logo {
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
  filter: grayscale(25%) brightness(.9);
  transition: filter .4s ease, transform .4s cubic-bezier(.22,1,.36,1);
}

.trust__partner-info { text-align: center; }

.trust__partner-type {
  display: block;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0d9488;
  margin-bottom: 0.25rem;
}

.trust__partner-title {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
}

.trust__partner-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 100px;
  padding: 0.25rem 0.65rem;
  margin-top: 0.75rem;
}

.trust__partner-badge-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #10b981;
  animation: badge-dot-pulse 2s ease-in-out infinite;
}

/* ── Certs Grid ────────────────────────────── */

.trust__certs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (min-width: 640px)  { .trust__certs-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .trust__certs-grid { grid-template-columns: repeat(5, 1fr); } }

/* ── Cert Card ─────────────────────────────── */

.trust__cert-card { opacity: 0; }

.trust__cert-card--visible:nth-child(1) { animation: stagger-in .75s cubic-bezier(.22,1,.36,1) 0.20s both, float-card 5.2s ease-in-out 1.6s infinite; }
.trust__cert-card--visible:nth-child(2) { animation: stagger-in .75s cubic-bezier(.22,1,.36,1) 0.34s both, float-card 4.8s ease-in-out 2.0s infinite; }
.trust__cert-card--visible:nth-child(3) { animation: stagger-in .75s cubic-bezier(.22,1,.36,1) 0.48s both, float-card 5.6s ease-in-out 2.3s infinite; }
.trust__cert-card--visible:nth-child(4) { animation: stagger-in .75s cubic-bezier(.22,1,.36,1) 0.62s both, float-card 5.0s ease-in-out 2.7s infinite; }
.trust__cert-card--visible:nth-child(5) { animation: stagger-in .75s cubic-bezier(.22,1,.36,1) 0.76s both, float-card 5.4s ease-in-out 3.1s infinite; }

.trust__cert-card-inner {
  position: relative;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.88);
  border-radius: 20px;
  padding: 1.75rem 1.25rem 1.5rem;
  box-shadow: 0 4px 24px rgba(0,0,0,.14), 0 1px 4px rgba(0,0,0,.08);
  overflow: hidden;
  text-align: center;
  transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, border-color .35s ease;
  will-change: transform;
}

.trust__cert-card-inner:hover {
  transform: translateY(-10px) scale(1.03) rotate(.5deg);
  box-shadow: 0 28px 64px rgba(20,184,166,.2), 0 4px 20px rgba(0,0,0,.12);
  border-color: rgba(20, 184, 166, 0.48);
}

.trust__cert-card-inner:hover .trust__cert-glow { opacity: 1; }
.trust__cert-card-inner:hover .trust__cert-shimmer { animation: shimmer-slide .8s ease forwards; }
.trust__cert-card-inner:hover .trust__cert-img-ring::before {
  animation: cert-ring-rotate 3s linear infinite;
  opacity: 0.65;
}

.trust__cert-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 20%, rgba(153,246,228,.22), transparent 65%);
  opacity: 0;
  transition: opacity .4s ease;
  pointer-events: none;
}

.trust__cert-shimmer {
  position: absolute;
  top: 0; bottom: 0; left: -60%;
  width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent);
  pointer-events: none;
  transform: skewX(-12deg);
}

.trust__cert-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 116px;
  margin-bottom: 1rem;
}

.trust__cert-img-ring {
  position: relative;
  width: 100px; height: 100px;
}

.trust__cert-img-ring::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(#14b8a6 0%, #6366f1 30%, #5eead4 60%, #14b8a6 100%);
  opacity: 0;
  transition: opacity .3s ease;
  z-index: 0;
}

.trust__cert-img-ring::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  z-index: 1;
}

.trust__cert-img {
  position: relative;
  z-index: 2;
  width: 94px; height: 94px;
  object-fit: contain;
  border-radius: 50%;
  background: white;
  padding: 0.25rem;
  display: block;
  margin: 3px auto 0;
}

.trust__cert-emoji-wrap {
  width: 76px; height: 76px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(94,234,212,.2), rgba(99,102,241,.12));
  border: 1.5px solid rgba(20, 184, 166, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.trust__cert-emoji { font-size: 2.2rem; line-height: 1; }

.trust__cert-content { position: relative; z-index: 1; }

.trust__cert-name {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.35rem;
  line-height: 1.25;
}

.trust__cert-desc {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.75rem;
  color: #64748b;
  margin: 0 0 0.75rem;
  line-height: 1.5;
}

.trust__cert-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0d9488;
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(20, 184, 166, 0.22);
  border-radius: 100px;
  padding: 0.2rem 0.6rem;
}

.trust__cert-tag-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: #14b8a6;
}

.trust__cert-verified {
  position: absolute;
  top: 0.75rem; right: 0.75rem;
  width: 22px; height: 22px;
  background: linear-gradient(135deg, #14b8a6, #6366f1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.4);
}

.trust__cert-verified svg { width: 12px; height: 12px; }

/* ── Stats Bar ─────────────────────────────── */

.trust__stats {
  margin-top: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 1.25rem;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.88);
  border-radius: 20px;
  padding: 1.75rem 2rem;
  box-shadow: 0 4px 24px rgba(0,0,0,.14), 0 1px 4px rgba(0,0,0,.08);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .8s ease .6s, transform .8s cubic-bezier(.22,1,.36,1) .6s;
}

.trust__stats--visible { opacity: 1; transform: translateY(0); }

.trust__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0 1.75rem;
  min-width: 100px;
}

.trust__stat-value {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #0d9488, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.trust__stat-label {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.72rem;
  color: #64748b;
  letter-spacing: 0.04em;
  text-align: center;
}

.trust__stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, transparent, rgba(203,213,225,.7), transparent);
}

/* ── Mobile: Horizontal Scroll Slider ──────── */

@media (max-width: 540px) {
  .trust__partners-grid,
  .trust__certs-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 1rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .trust__partners-grid::-webkit-scrollbar,
  .trust__certs-grid::-webkit-scrollbar { display: none; }

  .trust__partner-card,
  .trust__cert-card {
    flex: 0 0 72vw;
    scroll-snap-align: center;
  }

  .trust__stat-divider { display: none; }
}

/* ── Reduced Motion ────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .trust__bg-aurora,
  .trust__blob,
  .trust__radial,
  .trust__eyebrow-dot,
  .trust__partner-badge-dot { animation: none !important; }

  .trust__partner-card,
  .trust__cert-card { animation: none !important; opacity: 1 !important; }

  .trust__header,
  .trust__block,
  .trust__stats {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
    transition: none !important;
  }
}
  `]
})
export class TrustCredentialsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('trustSection', { static: false })
  private trustSectionRef!: ElementRef<HTMLElement>;

  // ── Animation State ──────────────────────────────────────────────────────────
  private readonly _isVisible = signal(false);
  readonly isVisible = computed(() => this._isVisible());

  private intersectionObserver: IntersectionObserver | null = null;

  // ── Partner Data ─────────────────────────────────────────────────────────────
  readonly partners: Partner[] = [
    { id: 'p1', type: 'Hospital Partner',     title: 'Hospital Network',    logo: 'assets/images/partners/partner1.png' },
    { id: 'p2', type: 'Diagnostic Partner',   title: 'Diagnostic Centre',   logo: 'assets/images/partners/partner2.png' },
    { id: 'p3', type: 'Technology Partner',   title: 'Tech Ecosystem',      logo: 'assets/images/partners/partner3.png' },
    { id: 'p4', type: 'Telemedicine Partner', title: 'Telehealth Platform', logo: 'assets/images/partners/partner4.png' },
    { id: 'p5', type: 'Government Partner',   title: 'Institution Body',    logo: 'assets/images/partners/partner5.png' },
  ];

  // ── Certification Data ────────────────────────────────────────────────────────
  readonly certifications: Certification[] = [
    { id: 'ce',    name: 'CE Certified',     description: 'International quality standards compliance',   region: 'European Union', img: 'assets/images/ce.jpg',    icon: '' },
    { id: 'cdsco', name: 'CDSCO Compliant',  description: 'Central Drugs Standard Control compliance',   region: 'India',          img: 'assets/images/cdsco.jpg', icon: '' },
    { id: 'fda',   name: 'FDA Components',   description: 'US Food & Drug Administration standards',     region: 'United States',  img: 'assets/images/fda.jpg',   icon: '' },
    { id: 'nabl',  name: 'NABL Accredited',  description: 'ISO / IEC 17025 laboratory accreditation',    region: 'India',          img: 'assets/images/nabl.jpg',  icon: '' },
    { id: 'abdm',  name: 'ABDM Compatible',  description: 'Ayushman Bharat Digital Mission integration', region: 'India',          img: 'assets/images/abdm.png',   icon: '' },
  ];

  // ── Stats Data ────────────────────────────────────────────────────────────────
  readonly stats: Stat[] = [
    { value: '4+',    label: 'Active Certifications' },
    { value: '5+',    label: 'Healthcare Partners'   },
    { value: '100%',  label: 'ABDM Compatible'       },
    { value: 'ISO',   label: '27001 Infrastructure'  },
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
    const inner = (event.currentTarget as HTMLElement).querySelector(
      '.trust__partner-card-inner, .trust__cert-card-inner'
    ) as HTMLElement | null;
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
      ?.querySelectorAll<HTMLElement>('.trust__partner-card-inner, .trust__cert-card-inner')
      ?.forEach(el => { el.style.transform = ''; });
  }

  // ── Partner Logo Fallback ─────────────────────────────────────────────────────

  onImgError(event: Event, partner: Partner): void {
    const img = event.target as HTMLImageElement;
    const initials = partner.title
      .split(' ')
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase();

    img.style.display = 'none';
    const wrap = img.parentElement;
    if (wrap && !wrap.querySelector('.trust__partner-fallback')) {
      const fallback = document.createElement('div');
      fallback.className = 'trust__partner-fallback';
      fallback.style.cssText = `
        width:56px; height:56px; border-radius:12px;
        background:linear-gradient(135deg,#0d9488,#6366f1);
        display:flex; align-items:center; justify-content:center;
        font-family:'Inter','Segoe UI',sans-serif; font-weight:700;
        font-size:1.1rem; color:white; letter-spacing:.05em;
      `;
      fallback.textContent = initials;
      wrap.appendChild(fallback);
    }
  }
}