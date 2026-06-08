// // src/app/shared/components/call-to-action/call-to-action.component.ts
// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-call-to-action',
//   standalone: true,
//   imports: [RouterLink],
//   template: `
//     <section class="cta">
//       <div class="container">
//         <h2>Ready to Deploy Your Healthcare Kiosk Network?</h2>
//         <p>
//           Join leading healthcare organizations using Reach AI to expand access,
//           improve outcomes, and scale services efficiently.
//         </p>
//         <div class="cta__actions">
//           <a routerLink="/contact" class="btn btn--white">
//             <span>Request Demo</span>
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
//             </svg>
//           </a>
//           <a routerLink="/contact" class="btn btn--outline-white">Get Pricing</a>
//           <a routerLink="/contact" class="btn btn--outline-white">Talk to an Expert</a>
//         </div>
//         <p class="cta__note">No credit card required. Schedule your consultation today.</p>
//       </div>
//     </section>
//   `,
//   styles: [`
//     .cta {
//       padding: 5rem 0;
//       background: linear-gradient(135deg, #2563eb, #0d9488);
//       text-align: center;
//     }
//     .container { max-width: 80rem; margin: 0 auto; padding: 0 1rem; }
//     @media (min-width: 640px)  { .container { padding: 0 1.5rem; } }
//     @media (min-width: 1024px) { .container { padding: 0 2rem; } }
//     h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #fff; margin-bottom: 1.5rem; }
//     p  { font-size: 1.125rem; color: rgba(255,255,255,0.85); max-width: 48rem; margin: 0 auto 2rem; line-height: 1.75; }
//     .cta__actions { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
//     .cta__note { font-size: 0.875rem; color: rgba(255,255,255,0.75); margin-top: 2rem; margin-bottom: 0; }
//     .btn {
//       display: inline-flex; align-items: center; gap: 0.5rem;
//       padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600;
//       font-size: 1rem; text-decoration: none; transition: all 0.2s ease;
//       cursor: pointer; font-family: inherit;
//     }
//     .btn--white { background: #fff; color: #2563eb; border: none;
//       &:hover { background: #eff6ff; transform: scale(1.03); } }
//     .btn--outline-white { border: 2px solid #fff; color: #fff; background: transparent;
//       &:hover { background: #fff; color: #2563eb; } }
//   `],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class CallToActionComponent {}


// src/app/shared/components/call-to-action/call-to-action.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="cta" [class.is-visible]="isVisible()">

      <!-- Animated background orbs -->
      <div class="cta__orb cta__orb--1" aria-hidden="true"></div>
      <div class="cta__orb cta__orb--2" aria-hidden="true"></div>
      <div class="cta__orb cta__orb--3" aria-hidden="true"></div>

      <!-- Blur overlay that fades away on scroll-into-view -->
      <div class="cta__blur-veil" aria-hidden="true"></div>

      <!-- Dot grid texture -->
      <div class="cta__grid" aria-hidden="true"></div>

      <div class="cta__container">

        <!-- Badge -->
        <span class="cta__badge">
          <span class="cta__badge-dot"></span>
          Trusted by 500+ Healthcare Organizations
        </span>

        <h2 class="cta__headline">
          Ready to Deploy Your<br/>
          <span class="cta__headline-accent">Healthcare Kiosk Network?</span>
        </h2>

        <p class="cta__sub">
          Join leading healthcare organizations using Reach AI to expand access,
          improve outcomes, and scale services efficiently.
        </p>

        <div class="cta__actions">
          <a routerLink="/contact" class="cta-btn cta-btn--primary">
            <span>Request Demo</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a routerLink="/contact" class="cta-btn cta-btn--outline">Get Pricing</a>
          <a routerLink="/contact" class="cta-btn cta-btn--outline">Talk to an Expert</a>
        </div>

        <p class="cta__note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          No credit card required. Schedule your consultation today.
        </p>

      </div>
    </section>
  `,
  styles: [`
    /* ── Tokens ───────────────────────────────── */
    :host {
      --teal-1: rgba(94, 234, 212, 0.90);
      --teal-2: rgba(20, 184, 166, 0.40);
      --teal-dark: #0d9488;
      --teal-mid:  #14b8a6;
      --teal-light: #5eead4;
      --white: #fff;
      --white-80: rgba(255,255,255,0.80);
      --white-60: rgba(255,255,255,0.60);
      --white-15: rgba(255,255,255,0.15);
      --white-08: rgba(255,255,255,0.08);
      --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
      --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* ── Keyframes ────────────────────────────── */
    @keyframes blobDrift1 {
      0%   { transform: translate(0, 0) scale(1); }
      25%  { transform: translate(40px, -30px) scale(1.08); }
      50%  { transform: translate(20px, 20px) scale(0.95); }
      75%  { transform: translate(-30px, -10px) scale(1.04); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes blobDrift2 {
      0%   { transform: translate(0, 0) scale(1); }
      30%  { transform: translate(-35px, 25px) scale(1.06); }
      60%  { transform: translate(20px, -20px) scale(0.97); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes blobDrift3 {
      0%   { transform: translate(0, 0) scale(1); }
      40%  { transform: translate(30px, 30px) scale(1.05); }
      70%  { transform: translate(-20px, -15px) scale(0.98); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes dotBlink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes veilFade {
      from { opacity: 1; backdrop-filter: blur(18px); }
      to   { opacity: 0; backdrop-filter: blur(0px); pointer-events: none; }
    }

    /* ── Section Shell ────────────────────────── */
    .cta {
      position: relative;
      padding: 6rem 0;
      overflow: hidden;
      text-align: center;
      isolation: isolate;
      /* White base so the teal blobs look like the reference image */
      background: #f0fdfb;
    }

    /* ── Blur veil — removed on .is-visible ──── */
    .cta__blur-veil {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: rgba(240, 253, 251, 0.45);
      backdrop-filter: blur(18px);
      transition: none;
      pointer-events: none;
    }

    .cta.is-visible .cta__blur-veil {
      animation: veilFade 900ms 200ms var(--ease-out) forwards;
    }

    /* ── Dot grid — very subtle on light bg ──── */
    .cta__grid {
      position: absolute;
      inset: 0;
      z-index: 0;
      background-image: radial-gradient(circle, rgba(20,184,166,0.12) 1px, transparent 1px);
      background-size: 28px 28px;
      mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
    }

    /* ── Orbs — matching reference: teal glow left, fades right ── */
    .cta__orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      z-index: 1;
      will-change: transform;
    }

    /* Large primary teal blob — left side, reference has the strongest glow here */
    .cta__orb--1 {
            animation: blobDrift1 26s ease-in-out infinite;
      animation-delay: 0s;
    }

    /* Secondary softer blob — center, adds depth */
    .cta__orb--2 {
      animation: blobDrift2 22s ease-in-out infinite;
      animation-delay: -8s;
    }

    /* Faintest blob — right edge, very subtle as in reference */
    .cta__orb--3 {
      animation: blobDrift3 30s ease-in-out infinite;
      animation-delay: -14s;
    }

    /* ── Container ────────────────────────────── */
    .cta__container {
      position: relative;
      z-index: 5;
      max-width: 760px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* ── Content stagger animations ───────────── */
    .cta__badge,
    .cta__headline,
    .cta__sub,
    .cta__actions,
    .cta__note {
      opacity: 0;
    }

    .cta.is-visible .cta__badge    { animation: fadeSlideUp 560ms 300ms  var(--ease-spring) forwards; }
    .cta.is-visible .cta__headline { animation: fadeSlideUp 560ms 420ms  var(--ease-spring) forwards; }
    .cta.is-visible .cta__sub      { animation: fadeSlideUp 560ms 540ms  var(--ease-spring) forwards; }
    .cta.is-visible .cta__actions  { animation: fadeSlideUp 560ms 640ms  var(--ease-spring) forwards; }
    .cta.is-visible .cta__note     { animation: fadeSlideUp 560ms 760ms  var(--ease-spring) forwards; }

    /* ── Badge ────────────────────────────────── */
    .cta__badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.38rem 1rem;
      background: rgba(20, 184, 166, 0.10);
      border: 1px solid rgba(20, 184, 166, 0.30);
      border-radius: 100px;
      color: #0d9488;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      margin-bottom: 1.6rem;
      backdrop-filter: blur(10px);
    }
    .cta__badge-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #14b8a6;
      display: inline-block;
      animation: dotBlink 1.6s ease-in-out infinite;
    }

    /* ── Headline ─────────────────────────────── */
    .cta__headline {
      font-size: clamp(1.9rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.12;
      letter-spacing: -0.025em;
      color: #0f2d3a;
      margin: 0 0 1.4rem;
    }
    .cta__headline-accent {
      display: inline-block;
      background: linear-gradient(90deg, #0d9488 0%, #14b8a6 50%, #0d9488 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3.5s linear infinite;
    }

    /* ── Sub ──────────────────────────────────── */
    .cta__sub {
      font-size: clamp(0.97rem, 1.5vw, 1.1rem);
      color: #4b7280;
      line-height: 1.78;
      max-width: 540px;
      margin: 0 auto 2.4rem;
    }

    /* ── Actions ──────────────────────────────── */
    .cta__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
      justify-content: center;
      margin-bottom: 1.8rem;
    }

    /* ── Buttons ──────────────────────────────── */
    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.82rem 1.9rem;
      border-radius: 0.65rem;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: transform 260ms var(--ease-spring), box-shadow 260ms ease, background 260ms ease;
      position: relative;
      overflow: hidden;

      svg { transition: transform 260ms var(--ease-spring); flex-shrink: 0; }
      &:hover svg { transform: translateX(4px); }
    }

    /* Primary — solid teal */
    .cta-btn--primary {
      background: linear-gradient(135deg, #0d9488, #14b8a6);
      color: #fff;
      box-shadow: 0 4px 20px rgba(20, 184, 166, 0.30);

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        opacity: 0;
        transition: opacity 260ms ease;
      }
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 14px 36px rgba(20, 184, 166, 0.40);
        &::after { opacity: 1; }
      }
      &:active { transform: translateY(-1px); }
    }

    /* Outline — teal bordered */
    .cta-btn--outline {
      background: rgba(255,255,255,0.70);
      color: #0d9488;
      border: 1.5px solid rgba(20, 184, 166, 0.35);
      backdrop-filter: blur(12px);

      &:hover {
        transform: translateY(-3px);
        background: #fff;
        border-color: #14b8a6;
        box-shadow: 0 8px 24px rgba(20, 184, 166, 0.18);
      }
    }

    /* ── Note ─────────────────────────────────── */
    .cta__note {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.82rem;
      color: #6b9ea4;
      margin: 0;

      svg { flex-shrink: 0; opacity: 0.65; color: #0d9488; }
    }

    /* ── Responsive ───────────────────────────── */
    @media (max-width: 600px) {
      .cta { padding: 4.5rem 0; }
      .cta__actions { flex-direction: column; align-items: center; }
      .cta-btn { width: 100%; max-width: 280px; justify-content: center; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallToActionComponent implements OnInit, OnDestroy {
  isVisible = signal(false);
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          this.observer.disconnect();
        }
      },
      { threshold: 0.20 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}