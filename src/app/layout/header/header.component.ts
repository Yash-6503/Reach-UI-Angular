// src/app/layout/header/header.component.ts
import {
  Component, ChangeDetectionStrategy, signal, HostListener, inject
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import {
  trigger, state, style, transition, animate
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('mobileMenu', [
      state('void', style({ opacity: 0, transform: 'translateY(-8px)' })),
      state('*',    style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void <=> *', animate('200ms ease')),
    ]),
  ],
})
export class HeaderComponent {
  private readonly nav = inject(NavigationService);

  isOpen = signal(false);

  navItems = this.nav.navItems;

  products = [
    { label: 'Reach AI Lite',       route: '/products/lite' },
    { label: 'Reach AI Pro',        route: '/products/pro' },
    { label: 'Reach AI Enterprise', route: '/products/enterprise' },
  ];

  solutions = [
    { label: 'Doctors & Clinics',  route: '/solutions/doctors' },
    { label: 'NGOs & Foundations', route: '/solutions/ngo' },
    { label: 'CSR Projects',       route: '/solutions/csr' },
    { label: 'Corporate Wellness', route: '/solutions/corporate' },
  ];

  mobileLinks = [
    { label: 'Home',                route: '/' },
    { label: 'Reach AI Lite',       route: '/products/lite' },
    { label: 'Reach AI Pro',        route: '/products/pro' },
    { label: 'Reach AI Enterprise', route: '/products/enterprise' },
    { label: 'Doctors & Clinics',   route: '/solutions/doctors' },
    { label: 'NGOs & Foundations',  route: '/solutions/ngo' },
    { label: 'CSR Projects',        route: '/solutions/csr' },
    { label: 'Corporate Wellness',  route: '/solutions/corporate' },
    { label: 'Technology',          route: '/technology' },
    { label: 'Support',             route: '/support' },
    { label: 'Resources',           route: '/resources' },
    { label: 'About',               route: '/about' },
  ];

  toggleMenu(): void {
    this.isOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { this.isOpen.set(false); }
}