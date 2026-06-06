// src/app/features/products/enterprise/product-enterprise.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-enterprise',
  standalone: true,
  templateUrl: './product-enterprise.component.html',
  styleUrls: ['./product-enterprise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEnterpriseComponent {
  features = [
    'All Pro features included',
    'Unlimited location management',
    'Custom workflow configuration',
    'White-label branding options',
    'Government & ABDM integrations',
    'Enterprise SLA with dedicated team',
    'Advanced population health analytics',
    'Custom API integrations',
  ];

  specs = [
    { label: 'Display',          value: '32"–43" Touchscreen' },
    { label: 'Diagnostics',      value: '20+ devices' },
    { label: 'Connectivity',     value: 'Redundant multi-path' },
    { label: 'Storage',          value: 'Enterprise Cloud' },
    { label: 'Deployment Time',  value: '6-8 weeks' },
    { label: 'Support',          value: '24/7 dedicated SLA' },
  ];

  benefits = [
    { title: 'Government Scale Deployments', desc: 'Certified for national health programs and government tenders' },
    { title: 'Custom Integrations',          desc: 'Connect with any existing hospital or clinic management system' },
    { title: 'White-Label Branding',         desc: 'Deploy with your organization\'s branding and identity' },
    { title: '24/7 Dedicated Support',       desc: 'Dedicated account manager and round-the-clock SLA support' },
    { title: 'Population Health Tools',      desc: 'Advanced analytics for disease trends and program evaluation' },
    { title: 'Enterprise Security',          desc: 'HIPAA, GDPR, ISO 27001 compliant with full audit trails' },
  ];
}
