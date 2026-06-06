// src/app/features/products/pro/product-pro.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-pro',
  standalone: true,
  templateUrl: './product-pro.component.html',
  styleUrls: ['./product-pro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductProComponent {
  features = [
    'All Lite features included',
    'Advanced diagnostics (ECG, Blood Glucose, AI Stethoscope)',
    'Full EMR integration & health records',
    'Analytics dashboard & reporting',
    'Multi-location management',
    'Specialist referral system',
    'E-prescription module',
    'Role-based access control',
  ];

  specs = [
    { label: 'Display',          value: '32" Touchscreen' },
    { label: 'Diagnostics',      value: '12+ vital devices' },
    { label: 'Connectivity',     value: 'WiFi/4G/Ethernet' },
    { label: 'Storage',          value: 'Hybrid (Local + Cloud)' },
    { label: 'Deployment Time',  value: '3-4 weeks' },
    { label: 'Training',         value: 'On-site (comprehensive)' },
  ];

  benefits = [
    { title: 'Comprehensive Diagnostics', desc: 'Full suite of diagnostic devices for advanced health screening' },
    { title: 'Multi-Location Ready',      desc: 'Manage multiple sites from a centralized dashboard' },
    { title: 'Advanced Analytics',        desc: 'Detailed insights for clinical and operational optimization' },
    { title: 'Seamless Integration',      desc: 'Works with existing hospital management systems' },
    { title: 'Priority Support',          desc: '12/7 phone and email support with dedicated contact' },
    { title: 'Scalable Platform',         desc: 'Grow from Pro to Enterprise as your network expands' },
  ];
}
