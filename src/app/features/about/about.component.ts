// src/app/features/about/about.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  highlights = [
    'Deployed in 50+ locations across India',
    'Serving 2.5M+ patients and counting',
    'Trusted by doctors, hospitals, NGOs, and CSR programs',
    'CE certified and ABDM compatible',
  ];

  visionCards = [
    {
      icon: 'zap',
      title: 'Technology-Driven',
      desc: 'AI and automation powering intelligent health assessment, diagnostics, and telemedicine',
    },
    {
      icon: 'award',
      title: 'Quality Healthcare',
      desc: 'Enterprise-grade systems delivering reliable, secure, and compliant healthcare solutions',
    },
    {
      icon: 'users',
      title: 'Healthcare for All',
      desc: 'Scalable platforms making quality medical services accessible in rural and urban areas',
    },
  ];

  reasons = [
    { title: 'End-to-End Healthcare Platform', desc: 'From patient registration to consultation to diagnosis' },
    { title: 'AI-Powered Intelligence',         desc: 'Machine learning for smart health assessment and risk detection' },
    { title: 'Telemedicine Ready',              desc: 'Secure video consultations with real-time vital data' },
    { title: 'Scalable Architecture',           desc: 'Deploy anywhere, from single clinic to national networks' },
    { title: 'Secure Cloud Platform',           desc: 'Enterprise-grade security with HIPAA and GDPR compliance' },
    { title: 'Complete Support',                desc: 'Training, installation, maintenance, and 24/7 technical support' },
  ];
}
