// src/app/features/faq/faq.component.ts
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  openIndex = signal<number | null>(0);

  faqs: FaqItem[] = [
    { category: 'Getting Started', question: 'How can I get started with Reach AI?',           answer: 'Contact our team for a demo, partnership discussion, or deployment consultation. We\'ll assess your requirements and recommend the right solution for your organization.' },
    { category: 'Getting Started', question: 'Who can use Reach AI?',                          answer: 'Reach AI can be used by clinics, hospitals, CSR programs, NGOs, government health initiatives, corporate wellness programs, and healthcare entrepreneurs.' },
    { category: 'Getting Started', question: 'What is the minimum deployment size?',           answer: 'You can start with a single kiosk at Reach AI Lite and scale up as needed. We support everything from single-clinic deployments to multi-thousand location networks.' },
    { category: 'Technical',       question: 'Can Reach AI operate in rural or low-connectivity environments?', answer: 'Yes. The system is designed to work in community clinics, remote locations, and areas with intermittent connectivity. Features are available in offline mode with automatic data synchronization.' },
    { category: 'Technical',       question: 'What internet speed is required?',               answer: 'Minimum 2 Mbps for stable operation. For high-quality telemedicine consultations, we recommend 5+ Mbps. The system works in offline mode if connectivity is interrupted.' },
    { category: 'Technical',       question: 'How secure is patient data?',                    answer: 'Patient data is encrypted with AES-256 both in transit and at rest. We comply with healthcare data privacy regulations including HIPAA guidelines and GDPR. Regular security audits are conducted.' },
    { category: 'Deployment',      question: 'How long does deployment take?',                 answer: 'Standard deployment takes 6-8 weeks from order to go-live, including installation, configuration, training, and testing. Enterprise deployments may take longer depending on customization requirements.' },
    { category: 'Deployment',      question: 'What support is included with purchase?',        answer: 'All plans include installation, staff training, technical support, software updates, and maintenance. Support tier depends on your package (Lite, Pro, or Enterprise).' },
    { category: 'Telemedicine',    question: 'Can organizations use their own doctors on the platform?', answer: 'Yes. Organizations can onboard their own doctors to provide telemedicine consultations through the Reach AI platform. Role-based access controls ensure proper authorization.' },
    { category: 'Telemedicine',    question: 'Is video consultation encrypted?',               answer: 'Yes. All telemedicine consultations are end-to-end encrypted with real-time vital data monitoring and secure data transmission.' },
    { category: 'Pricing',         question: 'What is the pricing model?',                     answer: 'Reach AI offers flexible pricing based on model (Lite/Pro/Enterprise), deployment size, and support tier. Contact our sales team for a customized quote.' },
    { category: 'Pricing',         question: 'Are there flexible payment options?',            answer: 'Yes. We offer various payment models including upfront purchase, monthly subscriptions, lease options, and custom arrangements for government and NGO projects.' },
    { category: 'Integrations',    question: 'Can Reach AI integrate with existing hospital systems?', answer: 'Yes. Reach AI integrates with EMRs, lab systems, pharmacy systems, and insurance platforms through secure APIs and HL7 standards.' },
    { category: 'Analytics',       question: 'What kind of analytics and reporting is available?', answer: 'Advanced dashboards show usage metrics, health trends, clinical outcomes, device performance, staff productivity, and financial ROI. Custom reports can be generated.' },
    { category: 'Compliance',      question: 'Is Reach AI compliant with government regulations?', answer: 'Yes. Reach AI is ABDM compatible, NHA aligned, and follows FDA guidance. It\'s CE certified and CDSCO compliant for operation in India.' },
    { category: 'Maintenance',     question: 'What are the maintenance requirements?',         answer: 'Annual Maintenance Contract (AMC) from year 2 includes software updates, bug fixes, device calibration, and preventive maintenance. Remote support is available 24/7.' },
    { category: 'Training',        question: 'How much training is required for staff?',       answer: 'We provide structured training for operators, doctors, coordinators, and administrators. Typical duration is 1-2 weeks including theory, hands-on practice, and competency assessment.' },
    { category: 'Expansion',       question: 'Can I expand to multiple locations?',            answer: 'Yes. Reach AI Pro and Enterprise support unlimited locations with centralized management dashboards. You can add new kiosks incrementally.' },
    { category: 'Support',         question: 'What if I have issues during deployment?',       answer: 'Our dedicated support team provides 24/7 assistance. We offer phone support, remote troubleshooting, and on-site support if needed. SLA guarantees ensure quick resolution.' },
    { category: 'General',         question: 'How do I contact Reach AI for more information?', answer: 'Call +91 9676413408, email info@reachaimedtech.com, or visit our contact page. We\'re available for demos, consultations, and partnership discussions.' },
  ];

  get categories(): string[] {
    return [...new Set(this.faqs.map((f) => f.category))];
  }

  faqsByCategory(cat: string): FaqItem[] {
    return this.faqs.filter((f) => f.category === cat);
  }

  globalIndex(item: FaqItem): number {
    return this.faqs.indexOf(item);
  }

  toggle(index: number): void {
    this.openIndex.update((v) => (v === index ? null : index));
  }

  isOpen(index: number): boolean {
    return this.openIndex() === index;
  }
}
