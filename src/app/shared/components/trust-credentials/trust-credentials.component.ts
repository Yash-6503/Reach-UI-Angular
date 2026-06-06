// src/app/shared/components/trust-credentials/trust-credentials.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-trust-credentials',
  standalone: true,
  template: `
    <section class="trust">
      <div class="container">
        <h2 class="trust__title">Trusted Healthcare Technology</h2>
        <div class="trust__grid">
          @for (cert of certifications; track cert.name) {
            <div class="trust__card">
              <div class="trust__icon">{{ cert.icon }}</div>
              <p class="trust__name">{{ cert.name }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .trust {
      padding: 4rem 0;
      background: #2563eb;
    }
    .container { max-width: 80rem; margin: 0 auto; padding: 0 1rem; }
    @media (min-width: 640px)  { .container { padding: 0 1.5rem; } }
    @media (min-width: 1024px) { .container { padding: 0 2rem; } }
    .trust__title {
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      font-weight: 700;
      color: #fff;
      text-align: center;
      margin-bottom: 3rem;
    }
    .trust__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    @media (min-width: 768px) { .trust__grid { grid-template-columns: repeat(5, 1fr); } }
    .trust__card {
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(8px);
      border-radius: 0.5rem;
      padding: 1.5rem;
      text-align: center;
      color: #fff;
      transition: background 0.2s ease;
      &:hover { background: rgba(255,255,255,0.2); }
    }
    .trust__icon { font-size: 2.5rem; margin-bottom: 0.75rem; display: flex; justify-content: center; }
    .trust__name { font-weight: 600; font-size: 0.9375rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrustCredentialsComponent {
  certifications = [
    { name: 'CE Certified',                 icon: '🏅' },
    { name: 'CDSCO Compliant',              icon: '✓' },
    { name: 'FDA Components',               icon: '🔬' },
    { name: 'ABDM Compatible',              icon: '🔗' },
    { name: 'Secure Cloud Infrastructure',  icon: '🔒' },
  ];
}
