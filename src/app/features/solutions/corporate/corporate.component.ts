// src/app/features/solutions/corporate/corporate.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-corporate',
  standalone: true,
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateComponent {
  benefits = [
    'Employee wellness center setup',
    'Preventive health screening',
    'Workforce health tracking',
    'Remote consultation with doctors',
    'Personalized wellness insights',
    'Analytics for HR & wellness teams',
  ];

  programBenefits = [
    { title: 'Employee Health Scores', desc: 'Personalized health assessments and recommendations' },
    { title: 'Disease Prevention',     desc: 'Early detection of health risks and preventive interventions' },
    { title: 'Productivity Gains',     desc: 'Healthier workforce means better attendance and performance' },
  ];

  analytics = [
    { title: 'Employee Health Insights', metrics: ['Average health score', 'Risk population identification', 'Fitness levels', 'Wellness trends'] },
    { title: 'Program Performance',      metrics: ['Participation rates', 'Health risk reduction', 'Cost savings', 'ROI metrics'] },
  ];

  deploymentOptions = [
    { title: 'On-Site Wellness Center',  desc: 'Dedicated room in corporate office with professional staff' },
    { title: 'Multi-Location Network',   desc: 'Wellness centers across multiple office locations' },
    { title: 'Mobile Health Camps',      desc: 'Portable kiosks for periodic health screening drives' },
  ];

  roi = [
    { value: '80%+',   label: 'Employees Screened',         desc: 'Annual participation' },
    { value: '30%+',   label: 'Health Risks Detected',      desc: 'Early identification' },
    { value: '15-20%', label: 'Healthcare Cost Reduction',  desc: 'Year-over-year' },
    { value: '4.5/5',  label: 'Employee Satisfaction',      desc: 'Program rating' },
  ];
}
