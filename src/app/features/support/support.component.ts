// src/app/features/support/support.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-support',
  standalone: true,
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportComponent {
  services = [
    { icon: 'check', title: 'Installation Support',  desc: 'On-site installation, configuration, and system setup by certified technicians' },
    { icon: 'users', title: 'Staff Training',         desc: 'Comprehensive training for operators, coordinators, and medical staff' },
    { icon: 'book',  title: 'Knowledge Resources',   desc: 'User manuals, video tutorials, FAQs, and best practice guides' },
    { icon: 'head',  title: 'Technical Support',     desc: '24/7 helpdesk with phone, email, and remote troubleshooting' },
  ];

  timeline = [
    { week: 'Week 1-2', title: 'Planning & Preparation', items: ['Requirements analysis', 'Infrastructure assessment', 'Team alignment'] },
    { week: 'Week 3-4', title: 'Installation & Setup',   items: ['Hardware deployment', 'System configuration', 'Network integration'] },
    { week: 'Week 5-6', title: 'Training & Testing',     items: ['Staff onboarding', 'Functional testing', 'Go-live readiness'] },
    { week: 'Week 7+',  title: 'Go-Live & Support',      items: ['System launch', 'Monitoring & optimization', 'Continuous support'] },
  ];

  tiers = [
    { name: 'Lite Support',  price: 'Included', features: ['Email support', 'Business hours', 'Knowledge base', 'Monthly updates'],   highlight: false },
    { name: 'Professional',  price: 'Premium',  features: ['Phone & email', '12/7 support', 'Dedicated contact', 'Quarterly training'], highlight: true  },
    { name: 'Enterprise',    price: 'Custom',   features: ['24/7 support', 'SLA guarantee', 'Account manager', 'On-site support'],     highlight: false },
  ];
}
