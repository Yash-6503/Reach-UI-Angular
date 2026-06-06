// src/app/shared/components/call-to-action/call-to-action.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="cta">
      <div class="container">
        <h2>Ready to Deploy Your Healthcare Kiosk Network?</h2>
        <p>
          Join leading healthcare organizations using Reach AI to expand access,
          improve outcomes, and scale services efficiently.
        </p>
        <div class="cta__actions">
          <a routerLink="/contact" class="btn btn--white">
            <span>Request Demo</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a routerLink="/contact" class="btn btn--outline-white">Get Pricing</a>
          <a routerLink="/contact" class="btn btn--outline-white">Talk to an Expert</a>
        </div>
        <p class="cta__note">No credit card required. Schedule your consultation today.</p>
      </div>
    </section>
  `,
  styles: [`
    .cta {
      padding: 5rem 0;
      background: linear-gradient(135deg, #2563eb, #0d9488);
      text-align: center;
    }
    .container { max-width: 80rem; margin: 0 auto; padding: 0 1rem; }
    @media (min-width: 640px)  { .container { padding: 0 1.5rem; } }
    @media (min-width: 1024px) { .container { padding: 0 2rem; } }
    h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #fff; margin-bottom: 1.5rem; }
    p  { font-size: 1.125rem; color: rgba(255,255,255,0.85); max-width: 48rem; margin: 0 auto 2rem; line-height: 1.75; }
    .cta__actions { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
    .cta__note { font-size: 0.875rem; color: rgba(255,255,255,0.75); margin-top: 2rem; margin-bottom: 0; }
    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600;
      font-size: 1rem; text-decoration: none; transition: all 0.2s ease;
      cursor: pointer; font-family: inherit;
    }
    .btn--white { background: #fff; color: #2563eb; border: none;
      &:hover { background: #eff6ff; transform: scale(1.03); } }
    .btn--outline-white { border: 2px solid #fff; color: #fff; background: transparent;
      &:hover { background: #fff; color: #2563eb; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallToActionComponent {}
