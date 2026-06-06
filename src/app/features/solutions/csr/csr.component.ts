// src/app/features/solutions/csr/csr.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-csr',
  standalone: true,
  templateUrl: './csr.component.html',
  styleUrls: ['./csr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsrComponent {
  benefits = [
    'Build sustainable healthcare centers',
    'Rural health access programs',
    'Community healthcare centers',
    'Social impact measurement',
    'Scalable across multiple villages',
    'Long-term community partnership',
  ];

  models = [
    { title: 'Primary Health Center', desc: 'Deploy kiosks in rural PHCs for basic screening' },
    { title: 'Community Outreach',    desc: 'Mobile kiosks for health camps and awareness' },
    { title: 'Wellness Hub Network',  desc: 'Multiple centers across villages and districts' },
  ];

  impactMetrics = [
    { metric: 'Lives Impacted',    details: ['Patients screened', 'Health conditions detected', 'Communities served'] },
    { metric: 'Health Equity',     details: ['Rural healthcare access', 'Gender-based screening', 'Underserved population reach'] },
    { metric: 'Sustainable Value', details: ['Long-term community benefit', 'Local employment', 'Healthcare awareness'] },
  ];

  stories = [
    { title: 'Tech Company CSR Initiative',       desc: 'Deployed 10 kiosks across 5 villages, served 50,000+ patients, created 25 local jobs' },
    { title: 'Healthcare Company Foundation',     desc: 'Established wellness centers in 20 locations, trained 100+ community health workers' },
  ];
}
