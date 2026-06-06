// src/app/shared/components/product-showcase/product-showcase.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShowcaseComponent {
  products = [
    {
      name: 'Reach AI Lite',
      description: 'Entry-level solution for small clinics and rural healthcare centers',
      idealFor: ['Small Clinics', 'Rural Healthcare', 'NGOs'],
      features: [
        'Telemedicine support',
        'Basic vital signs capture',
        'Patient registration',
        'Cloud storage',
      ],
      image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      route: '/products/lite',
    },
    {
      name: 'Reach AI Pro',
      description: 'Comprehensive solution for hospitals and multi-specialty clinics',
      idealFor: ['Hospitals', 'Multi-Specialty Clinics', 'CSR Programs'],
      features: [
        'Advanced diagnostics',
        'EMR integration',
        'Analytics dashboard',
        'Multi-location management',
      ],
      image: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/products/pro',
    },
    {
      name: 'Reach AI Enterprise',
      description: 'Full-featured solution for government and large-scale deployments',
      idealFor: ['Government Projects', 'Large NGOs', 'Corporate Networks'],
      features: [
        'Enterprise integrations',
        'Advanced analytics',
        'Custom workflows',
        'Dedicated support',
      ],
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400',
      route: '/products/enterprise',
    },
  ];
}
