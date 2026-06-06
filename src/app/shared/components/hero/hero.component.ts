// src/app/shared/components/hero/hero.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  trigger, style, animate, transition, sequence, stagger, query
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('heroContent', [
      transition(':enter', [
        query('.hero__text > *', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' }))]),
        ], { optional: true }),
      ]),
    ]),
    trigger('heroImage', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('700ms 200ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class HeroComponent {}
