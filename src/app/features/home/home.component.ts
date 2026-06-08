// src/app/features/home/home.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { TrustCredentialsComponent } from '../../shared/components/trust-credentials/trust-credentials.component';
import { ImpactMetricsComponent } from '../../shared/components/impact-metrics/impact-metrics.component';
import { ProductShowcaseComponent } from '../../shared/components/product-showcase/product-showcase.component';
import { WhoWeServeComponent } from '../../shared/components/who-we-serve/who-we-serve.component';
import { PlatformCapabilitiesComponent } from '../../shared/components/platform-capabilities/platform-capabilities.component';
import { TestimonialSliderComponent } from '../../shared/components/testimonial-slider/testimonial-slider.component';
import { CallToActionComponent } from '../../shared/components/call-to-action/call-to-action.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ImpactMetricsComponent,
    TrustCredentialsComponent,
    ProductShowcaseComponent,
    WhoWeServeComponent,
    PlatformCapabilitiesComponent,
    CallToActionComponent,
    TestimonialSliderComponent,
  ],
  template: `
    <app-hero />
    <app-impact-metrics />
    <app-trust-credentials />
    <app-product-showcase />
    <app-who-we-serve />
    <app-platform-capabilities />
    <app-call-to-action />
    <app-testimonial-slider />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
