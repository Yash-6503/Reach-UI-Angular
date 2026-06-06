// src/app/core/services/navigation.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavItem } from '../models';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    {
      label: 'Products',
      children: [
        { label: 'Reach AI Lite',       route: '/products/lite' },
        { label: 'Reach AI Pro',        route: '/products/pro' },
        { label: 'Reach AI Enterprise', route: '/products/enterprise' },
      ],
    },
    {
      label: 'Solutions',
      children: [
        { label: 'Doctors & Clinics',  route: '/solutions/doctors' },
        { label: 'NGOs & Foundations', route: '/solutions/ngo' },
        { label: 'CSR Projects',       route: '/solutions/csr' },
        { label: 'Corporate Wellness', route: '/solutions/corporate' },
      ],
    },
    { label: 'Technology', route: '/technology' },
    { label: 'Support',    route: '/support' },
    { label: 'Resources',  route: '/resources' },
    { label: 'About',      route: '/about' },
  ];

  constructor(private router: Router) {}

  navigate(route: string): void {
    this.router.navigate([route]).then(() => window.scrollTo(0, 0));
  }

  onNavigationEnd(callback: (url: string) => void): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => callback((e as NavigationEnd).urlAfterRedirects));
  }
}
