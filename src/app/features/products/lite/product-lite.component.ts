// src/app/features/products/lite/product-lite.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-lite',
  standalone: true,
  templateUrl: './product-lite.component.html',
  styleUrls: ['./product-lite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLiteComponent {
  features = [
    'Telemedicine video consultation',
    'Basic vital signs capture (BP, Temp, SpO2)',
    'Patient registration & EMR',
    'Cloud-based data storage',
    'Multi-language support',
    'Offline mode capability',
  ];

  specs = [
    { label: 'Display',          value: '24" Touchscreen' },
    { label: 'Diagnostics',      value: '5+ vital devices' },
    { label: 'Connectivity',     value: 'WiFi/4G' },
    { label: 'Storage',          value: 'Cloud-based' },
    { label: 'Deployment Time',  value: '1-2 weeks' },
    { label: 'Training',         value: 'Online & on-site' },
  ];

  benefits = [
    { title: 'Affordable Entry Point',  desc: 'Lower upfront investment with flexible payment options' },
    { title: 'Quick Deployment',        desc: 'Ready to operate in 1-2 weeks with minimal setup' },
    { title: 'Essential Features',      desc: 'Core telemedicine and health screening capabilities' },
    { title: 'Scalable Growth',         desc: 'Upgrade to Pro or Enterprise as your needs grow' },
    { title: 'Complete Support',        desc: 'Training, maintenance, and technical support included' },
    { title: 'Proven Results',          desc: 'Trusted by 50+ small clinics and health centers' },
  ];
}
