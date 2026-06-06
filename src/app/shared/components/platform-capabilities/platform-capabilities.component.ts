// src/app/shared/components/platform-capabilities/platform-capabilities.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-platform-capabilities',
  standalone: true,
  templateUrl: './platform-capabilities.component.html',
  styleUrls: ['./platform-capabilities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformCapabilitiesComponent {
  capabilities = [
    {
      title: 'Patient Management',
      description: 'Complete digital health records management',
      features: ['Digital registration', 'EMR system', 'Health records', 'Cloud storage'],
    },
    {
      title: 'Diagnostics Ecosystem',
      description: 'Integrated diagnostic devices and AI analysis',
      features: ['BP, Temperature, SpO2', 'ECG, Blood Glucose', 'AI Stethoscope', 'Vision testing'],
    },
    {
      title: 'Telemedicine Platform',
      description: 'Secure doctor-patient consultations',
      features: ['Video consultation', 'E-prescription', 'Specialist referral', 'Audio consultation'],
    },
    {
      title: 'Analytics & Reporting',
      description: 'Advanced insights and performance tracking',
      features: ['Usage analytics', 'Health trends', 'Device monitoring', 'Outcome tracking'],
    },
  ];

  aiFeatures = [
    { title: 'AI Health Assessment',            desc: 'Intelligent symptom analysis and risk detection' },
    { title: 'Clinical Summary Generation',      desc: 'Automated medical report creation' },
    { title: 'Smart Reporting',                  desc: 'Real-time analytics and insights' },
    { title: 'Multi-Language Support',           desc: 'Accessible to regional users' },
    { title: 'Risk Flagging',                    desc: 'Automatic alert for abnormal conditions' },
    { title: 'Voice to Text',                    desc: 'Hands-free medical documentation' },
  ];
}
