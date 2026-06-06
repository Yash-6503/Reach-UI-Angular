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
        'Complete digital health records management',

      features: [
        'Digital registration',
        'EMR system',
        'Health records',
        'Cloud storage'
      ]
    },

    {
      title: 'Diagnostics Ecosystem',

      description:
        'Integrated diagnostic devices and AI analysis',

      features: [
        'BP, Temperature, SpO2',
        'ECG, Blood Glucose',
        'AI Stethoscope',
        'Vision testing'
      ]
    },

    {
      title: 'Telemedicine Platform',

      description:
        'Secure doctor-patient consultations',

      features: [
        'Video consultation',
        'E-prescription',
        'Specialist referral',
        'Audio consultation'
      ]
    },

    {
      title: 'Analytics & Reporting',

      description:
        'Advanced insights and performance tracking',

      features: [
        'Usage analytics',
        'Health trends',
        'Device monitoring',
        'Outcome tracking'
      ]
    }

  ];

  aiFeatures = [

    {
      title:
        'AI Health Assessment',

      desc:
        'Intelligent symptom analysis and risk detection'
    },

    {
      title:
        'Clinical Summary Generation',

      desc:
        'Automated medical report creation'
    },

    {
      title:
        'Smart Reporting',

      desc:
        'Real-time analytics and insights'
    },

    {
      title:
        'Multi-Language Support',

      desc:
        'Accessible to regional users'
    },

    {
      title:
        'Risk Flagging',

      desc:
        'Automatic alert for abnormal conditions'
    },

    {
      title:
        'Voice to Text',

      desc:
        'Hands-free medical documentation'
    }

  ];

  ngAfterViewInit(): void {

    const section =
      this.el.nativeElement.querySelector(
        '.platform'
      );

    if (!section) {
      return;
    }

    this.observer =
      new IntersectionObserver(

        ([entry]) => {

          if (
            entry.isIntersecting
          ) {

            section.classList.add(
              'visible'
            );

            /* run animation once */

            this.observer?.disconnect();

          }

        },

        {
          threshold: 0.25
        }

      );

    this.observer.observe(
      section
    );

  }

  ngOnDestroy(): void {

    this.observer?.disconnect();

  }

}