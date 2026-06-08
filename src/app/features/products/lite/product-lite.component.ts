// src/app/features/products/lite/product-lite.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'app-product-lite',
  standalone: true,
  templateUrl: './product-lite.component.html',
  styleUrls: ['./product-lite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLiteComponent implements AfterViewInit, OnDestroy {

  private observer: IntersectionObserver | null = null;

  features = [
    'Telemedicine video consultation',
    'Basic vital signs capture (BP, Temp, SpO2)',
    'Patient registration & EMR',
    'Cloud-based data storage',
    'Multi-language support',
    'Offline mode capability',
  ];

  specs = [
    { label: 'Display',         value: '24" Touchscreen' },
    { label: 'Diagnostics',     value: '5+ vital devices' },
    { label: 'Connectivity',    value: 'WiFi / 4G' },
    { label: 'Storage',         value: 'Cloud-based' },
    { label: 'Deployment Time', value: '1–2 weeks' },
    { label: 'Training',        value: 'Online & on-site' },
  ];

  benefits = [
    { title: 'Affordable Entry Point', desc: 'Lower upfront investment with flexible payment options' },
    { title: 'Quick Deployment',       desc: 'Ready to operate in 1–2 weeks with minimal setup' },
    { title: 'Essential Features',     desc: 'Core telemedicine and health screening capabilities' },
    { title: 'Scalable Growth',        desc: 'Upgrade to Pro or Enterprise as your needs grow' },
    { title: 'Complete Support',       desc: 'Training, maintenance, and technical support included' },
    { title: 'Proven Results',         desc: 'Trusted by 50+ small clinics and health centers' },
  ];

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    // Run outside Angular zone for performance
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Once visible, stop observing this section
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      // Observe every section marked as reveal-section
      document
        .querySelectorAll('.reveal-section')
        .forEach((el) => this.observer!.observe(el));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}