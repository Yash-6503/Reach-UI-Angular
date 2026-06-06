# Reach AI MedTech – Angular Application

Complete React → Angular migration for the Reach AI MedTech website.

## Tech Stack
- **Angular 17** (Standalone Components)
- **TypeScript 5.4**
- **SCSS** (no Tailwind)
- **Angular Animations** (@angular/animations)
- **Angular Router** with lazy-loaded routes
- **Reactive Forms** (@angular/forms)
- **Angular Signals** for reactive state
- **OnPush** Change Detection throughout

## Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── models/index.ts              # Shared TypeScript interfaces
│   │   └── services/navigation.service.ts
│   ├── layout/
│   │   ├── header/                      # Sticky nav with dropdowns + mobile menu
│   │   └── footer/                      # 5-column footer
│   ├── shared/components/
│   │   ├── hero/                        # Full-screen hero with Angular animations
│   │   ├── impact-metrics/              # IntersectionObserver counter animation
│   │   ├── trust-credentials/           # Certification badges
│   │   ├── product-showcase/            # 3-card product grid
│   │   ├── who-we-serve/                # 4-card solution grid
│   │   ├── platform-capabilities/       # Feature grid + AI highlights
│   │   ├── testimonial-slider/          # Animated slide carousel (Signals)
│   │   └── call-to-action/              # Gradient CTA banner
│   ├── features/
│   │   ├── home/                        # Composes all shared components
│   │   ├── about/
│   │   ├── contact/                     # Reactive Forms with validation
│   │   ├── faq/                         # Accordion with Signals
│   │   ├── technology/
│   │   ├── support/
│   │   ├── resources/
│   │   ├── products/
│   │   │   ├── lite/
│   │   │   ├── pro/
│   │   │   └── enterprise/
│   │   └── solutions/
│   │       ├── doctors/
│   │       ├── ngo/
│   │       ├── csr/
│   │       └── corporate/
│   ├── app.component.ts
│   ├── app.routes.ts                    # Lazy-loaded routes
│   └── app.config.ts
├── assets/images/                       # Logo + kiosk images
└── styles/styles.scss                   # Global design tokens + utilities
```

## Getting Started

```bash
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200)

## Build for Production

```bash
ng build --configuration production
```

## Key Angular Features Used

| React Pattern | Angular Equivalent |
|---|---|
| `useState` | `signal()` |
| `useEffect` + IntersectionObserver | `OnInit` + native `IntersectionObserver` |
| `useEffect` cleanup | `OnDestroy` |
| React Router `<Link>` | `routerLink` |
| Props | `@Input()` |
| Context | Injectable Service |
| Conditional render | `@if` / `@else` |
| `.map()` in JSX | `@for ... track` |
| CSS Modules / Tailwind | Component SCSS + global tokens |
| `useState` toggle | `signal<boolean>` |

## Animations

All Angular animations use `@angular/animations`:
- Hero content staggered entrance (`stagger` + `query`)
- Hero image slide-in from right
- Testimonial slide transition (`:increment` / `:decrement`)
- Mobile menu fade-in (`trigger('mobileMenu')`)
- FAQ accordion slide-down (CSS keyframes)
- ImpactMetrics counter animation (IntersectionObserver + `setInterval`)
- Card hover elevations (CSS transitions)
