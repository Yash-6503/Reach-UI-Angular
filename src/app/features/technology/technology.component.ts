// src/app/features/technology/technology.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-technology',
  standalone: true,
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyComponent {
  techStack = [
    { title: 'AI & ML',   items: ['PyTorch', 'TensorFlow', 'Computer Vision', 'NLP'] },
    { title: 'Backend',   items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'] },
    { title: 'Cloud',     items: ['AWS', 'Kubernetes', 'Docker', 'RDS'] },
    { title: 'Frontend',  items: ['React', 'TypeScript', 'Real-time APIs', 'PWA'] },
  ];

  capabilities = [
    { title: 'AI Health Assessment',           desc: 'Machine learning algorithms analyze patient symptoms and vital signs to suggest likely conditions and risks' },
    { title: 'Diagnostic Device Integration',  desc: 'Seamless integration with 20+ medical devices including ECG, X-Ray systems, lab analyzers' },
    { title: 'Secure Telemedicine',            desc: 'End-to-end encrypted video consultation with real-time vital data sharing' },
    { title: 'EMR & Health Records',           desc: 'Comprehensive electronic medical records with full audit trails and compliance' },
    { title: 'Analytics & Insights',           desc: 'Population health analytics, disease trends, and actionable insights' },
    { title: 'Cloud Infrastructure',           desc: 'Enterprise-grade cloud with 99.99% uptime, multi-region deployment' },
  ];

  security = [
    { title: 'Data Protection',       items: ['AES-256 encryption', 'HTTPS/TLS', 'Data at rest & in transit', 'Regular security audits'] },
    { title: 'Healthcare Compliance', items: ['HIPAA guidelines', 'GDPR compliant', 'ABDM compatible', 'FDA guidance'] },
    { title: 'Access Control',        items: ['Role-based access', 'Multi-factor auth', 'Audit logs', 'IP whitelisting'] },
    { title: 'Infrastructure',        items: ['Redundant servers', 'Auto backups', 'DDoS protection', 'ISO certifications'] },
  ];

  performance = [
    { value: '99.99%',      label: 'Uptime SLA with automatic failover' },
    { value: '<200ms',      label: 'Average API response time' },
    { value: 'Unlimited',   label: 'Concurrent kiosks & users' },
  ];

  architectureDiagram = `
┌──────────────────────────────────────────────────────┐
│               Reach AI Kiosk Layer                   │
│  (Hardware: Display, Diagnostics, Biometric Sensors) │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────┐
│          Edge & Local Processing Layer               │
│  (Patient Registration, Vital Capture, Analysis)     │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────┐
│     Cloud API & Integration Layer (REST/GraphQL)     │
│  (Data Synchronization, Security, Routing)           │
└─────────────────────┬────────────────────────────────┘
                      │
       ┌──────────────┼──────────────┐
       │              │              │
   ┌───▼────┐  ┌──────▼─────┐  ┌───▼──────┐
   │   AI   │  │Telemedicine │  │Analytics │
   │ Engine │  │  Platform  │  │Dashboard │
   └────────┘  └────────────┘  └──────────┘`;
}
