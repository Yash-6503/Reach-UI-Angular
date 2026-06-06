// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'products/lite',
    loadComponent: () =>
      import('./features/products/lite/product-lite.component').then((m) => m.ProductLiteComponent),
  },
  {
    path: 'products/pro',
    loadComponent: () =>
      import('./features/products/pro/product-pro.component').then((m) => m.ProductProComponent),
  },
  {
    path: 'products/enterprise',
    loadComponent: () =>
      import('./features/products/enterprise/product-enterprise.component').then(
        (m) => m.ProductEnterpriseComponent
      ),
  },
  {
    path: 'solutions/doctors',
    loadComponent: () =>
      import('./features/solutions/doctors/doctors.component').then((m) => m.DoctorsComponent),
  },
  {
    path: 'solutions/ngo',
    loadComponent: () =>
      import('./features/solutions/ngo/ngo.component').then((m) => m.NgoComponent),
  },
  {
    path: 'solutions/csr',
    loadComponent: () =>
      import('./features/solutions/csr/csr.component').then((m) => m.CsrComponent),
  },
  {
    path: 'solutions/corporate',
    loadComponent: () =>
      import('./features/solutions/corporate/corporate.component').then(
        (m) => m.CorporateComponent
      ),
  },
  {
    path: 'technology',
    loadComponent: () =>
      import('./features/technology/technology.component').then((m) => m.TechnologyComponent),
  },
  {
    path: 'support',
    loadComponent: () =>
      import('./features/support/support.component').then((m) => m.SupportComponent),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./features/faq/faq.component').then((m) => m.FaqComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: 'resources',
    loadComponent: () =>
      import('./features/resources/resources.component').then((m) => m.ResourcesComponent),
  },
  { path: '**', redirectTo: '' },
];
