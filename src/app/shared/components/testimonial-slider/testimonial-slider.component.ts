// src/app/shared/components/testimonial-slider/testimonial-slider.component.ts

import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

interface Testimonial {
  name: string;
  role: string;
  organization: string;
  message: string;
  avatar: string;
}

@Component({
  selector: 'app-testimonial-slider',
  standalone: true,
  templateUrl: './testimonial-slider.component.html',
  styleUrls: ['./testimonial-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  animations: [
    trigger('slide', [

      transition(':increment', [
        style({
          opacity: 0,
          transform: 'translateX(80px) scale(.95)',
          filter: 'blur(18px)'
        }),

        animate(
          '700ms cubic-bezier(.22,1,.36,1)',
          style({
            opacity: 1,
            transform: 'translateX(0) scale(1)',
            filter: 'blur(0)'
          })
        ),
      ]),

      transition(':decrement', [
        style({
          opacity: 0,
          transform: 'translateX(-80px) scale(.95)',
          filter: 'blur(18px)'
        }),

        animate(
          '700ms cubic-bezier(.22,1,.36,1)',
          style({
            opacity: 1,
            transform: 'translateX(0) scale(1)',
            filter: 'blur(0)'
          })
        ),
      ]),
    ]),
  ],
})
export class TestimonialSliderComponent
implements AfterViewInit, OnDestroy {

  private observer?: IntersectionObserver;

  visible = signal(false);

  testimonials: Testimonial[] = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Clinic Director',
      organization: 'Kumar Medical Center',
      message:
        'Reach AI has transformed our clinic. We can now serve 3x more patients with telemedicine while maintaining the highest quality of care.',
      avatar: 'RK',
    },

    {
      name: 'Priya Sharma',
      role: 'NGO Director',
      organization: 'Health for All Foundation',
      message:
        'Deploying Reach AI kiosks in rural areas was seamless. The support team was exceptional, and our impact has multiplied significantly.',
      avatar: 'PS',
    },

    {
      name: 'Anil Patel',
      role: 'CSR Manager',
      organization: 'Tech Industries Ltd',
      message:
        'Our employee wellness program took off with Reach AI. The analytics dashboard helps us track health outcomes and ROI perfectly.',
      avatar: 'AP',
    },

    {
      name: 'Dr. Meera Desai',
      role: 'Hospital Administrator',
      organization: 'Desai Multi-Specialty Hospital',
      message:
        'The Enterprise solution scaled beautifully across all our branches. Integration with existing systems was smooth and professional.',
      avatar: 'MD',
    },
  ];

  current = signal(0);

  constructor(
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {

    const alreadySeen =
      sessionStorage.getItem(
        'testimonial-animation'
      );

    if (alreadySeen) {
      this.visible.set(true);
      return;
    }

    this.observer =
      new IntersectionObserver(

        ([entry]) => {

          if (entry.isIntersecting) {

            this.visible.set(true);

            sessionStorage.setItem(
              'testimonial-animation',
              'true'
            );

            this.observer?.disconnect();
          }
        },

        {
          threshold: 0.25
        }
      );

    this.observer.observe(
      this.el.nativeElement
    );
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  get currentTestimonial(): Testimonial {
    return this.testimonials[
      this.current()
    ];
  }

  next(): void {
    this.current.update(
      v =>
        (v + 1) %
        this.testimonials.length
    );
  }

  prev(): void {
    this.current.update(
      v =>
        (
          v -
          1 +
          this.testimonials.length
        ) %
        this.testimonials.length
    );
  }

  goTo(index: number): void {
    this.current.set(index);
  }

  range(n: number): number[] {
    return Array.from(
      { length: n },
      (_, i) => i
    );
  }
}