// src/app/shared/components/who-we-serve/who-we-serve.component.ts

import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-who-we-serve',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './who-we-serve.component.html',
  styleUrls: ['./who-we-serve.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WhoWeServeComponent
implements AfterViewInit, OnDestroy {

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef
  ) {}

  solutions = [

    {
      icon: 'users',

      title:
        'Doctors & Clinics',

      description:
        'Expand your patient reach beyond physical clinic boundaries',

      benefits: [
        'Remote consultation capability',
        'Expanded patient reach',
        'New revenue opportunities',
        'Faster return on investment'
      ],

      route:
        '/solutions/doctors'
    },

    {
      icon: 'heart',

      title:
        'NGOs & Foundations',

      description:
        'Deploy affordable healthcare infrastructure in underserved communities',

      benefits: [
        'Affordable healthcare access',
        'Community health centers',
        'Scalable programs',
        'Impact tracking & reporting'
      ],

      route:
        '/solutions/ngo'
    },

    {
      icon: 'building',

      title:
        'CSR Projects',

      description:
        'Build sustainable healthcare access programs',

      benefits: [
        'Sustainable infrastructure',
        'Rural health access',
        'Community healthcare centers',
        'Social impact measurement'
      ],

      route:
        '/solutions/csr'
    },

    {
      icon: 'briefcase',

      title:
        'Corporate Wellness',

      description:
        'Enable preventive healthcare and employee wellness initiatives',

      benefits: [
        'Employee wellness centers',
        'Preventive healthcare',
        'Workforce health programs',
        'Wellness analytics'
      ],

      route:
        '/solutions/corporate'
    }

  ];

  ngAfterViewInit(): void {

    const section =
      this.el.nativeElement.querySelector(
        '.serve'
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

            /* run once */

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