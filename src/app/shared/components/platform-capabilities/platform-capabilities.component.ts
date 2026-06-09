// src/app/shared/components/platform-capabilities/platform-capabilities.component.ts

import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-platform-capabilities',
  standalone: true,
  templateUrl: './platform-capabilities.component.html',
  styleUrls: ['./platform-capabilities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PlatformCapabilitiesComponent
implements AfterViewInit, OnDestroy {

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef
  ) {}

  capabilities = [

    {
      title: 'Patient Management',

      description:
        'Centralized patient registration and digital health record management',

      features: [
        'Patient Registration & Onboarding',
        'ABDM Integration',
        'Vital Signs Capture',
        'Electronic Medical Records',
        'Visit History Tracking',
        'Secure Cloud Records'
      ]
    },

    {
      title: 'Telemedicine Platform',

      description:
        'Secure doctor-patient consultations from anywhere',

      features: [
        'Video & Audio Consultation',
        'Digital Prescriptions',
        'Specialist Referrals',
        'Vitals Review',
        'Consultation History'
      ]
    },

    {
      title: 'Pharmacy Management',

      description:
        'Integrated prescription and medicine fulfillment ecosystem',

      features: [
        'E-Prescriptions',
        'Medicine Ordering',
        'Inventory Tracking',
        'Medicine Dispensing',
        'Pharmacy Integration',
        'Order Tracking'
      ]
    },

    {
      title: 'Diagnostics Ecosystem',

      description:
        'End-to-end diagnostic testing and report management',

      features: [
        'Test Booking',
        'Sample Collection',
        'Device Integration',
        'Lab Connectivity',
        'Report Retrieval',
        'Result History'
      ]
    },

    {
      title: 'Analytics & Reporting',

      description:
        'Actionable insights for healthcare operations and outcomes',

      features: [
        'Health Trends',
        'Consultation Analytics',
        'Diagnostic Reports',
        'Device Monitoring',
        'Outcome Tracking',
        'Executive Dashboards'
      ]
    }

  ];

  aiFeatures = [

    {
      title: 'AI Health Assessment',
      desc:  'Predictive symptom and risk analysis'
    },

    {
      title: 'Clinical Summary Generation',
      desc:  'Automated consultation documentation'
    },

    {
      title: 'Smart Reporting',
      desc:  'Real-time healthcare intelligence'
    },

    {
      title: 'Multi-Language Support',
      desc:  'Regional language interactions'
    },

    {
      title: 'Risk Flagging',
      desc:  'Early detection of critical conditions'
    },

    {
      title: 'Voice to Text',
      desc:  'Hands-free clinical documentation'
    },
     {
      title: 'AI Clinical Review',
      desc:  'Patient history and report analysis'
    }

  ];

  ngAfterViewInit(): void {

    const section =
      this.el.nativeElement.querySelector('.platform');

    if (!section) return;

    this.observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          section.classList.add('visible');

          this.observer?.disconnect();

        }

      },

      { threshold: 0.25 }

    );

    this.observer.observe(section);

  }

  ngOnDestroy(): void {

    this.observer?.disconnect();

  }

}