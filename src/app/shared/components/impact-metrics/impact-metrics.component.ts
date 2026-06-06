// src/app/shared/components/impact-metrics/impact-metrics.component.ts

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ElementRef,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

interface StatItem {
  label: string;
  target: number;
  decimals: number;
  suffix: string;
  display: string;
}

@Component({
  selector: 'app-impact-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact-metrics.component.html',
  styleUrls: ['./impact-metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactMetricsComponent
implements OnInit, OnDestroy {

  private observer?: IntersectionObserver;

  private intervals:
    ReturnType<typeof setInterval>[] = [];

  animated =
    signal(false);

  visible =
    signal(false);

  stats =
    signal<StatItem[]>([
      {
        label: 'Healthcare Kiosks Deployed',
        target: 500,
        decimals: 0,
        suffix: '+',
        display: '0+'
      },

      {
        label: 'Patients Served',
        target: 2.5,
        decimals: 1,
        suffix: 'M+',
        display: '0M+'
      },

      {
        label: 'Partner Organizations',
        target: 150,
        decimals: 0,
        suffix: '+',
        display: '0+'
      },

      {
        label: 'Teleconsultations Enabled',
        target: 1.2,
        decimals: 1,
        suffix: 'M+',
        display: '0M+'
      }
    ]);

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit(): void {

    const metrics =
      this.el.nativeElement.querySelector(
        '.metrics'
      );

    this.observer =
      new IntersectionObserver(
        ([entry]) => {

          if (
            entry.isIntersecting &&
            !this.animated()
          ) {

            this.visible.set(true);

            metrics.classList.add(
              'visible'
            );

            this.startCounting();

            this.observer?.disconnect();
          }

        },
        {
          threshold: 0.25
        }
      );

    if (metrics) {
      this.observer.observe(
        metrics
      );
    }
  }

  ngOnDestroy(): void {

    this.observer?.disconnect();

    this.intervals.forEach(
      clearInterval
    );
  }

  private startCounting(): void {

    this.animated.set(true);

    this.stats().forEach(
      (stat, index) => {

        let current = 0;

        const steps = 60;

        const increment =
          stat.target / steps;

        const interval =
          setInterval(() => {

            current =
              Math.min(
                current + increment,
                stat.target
              );

            this.stats.update(
              (items) =>
                items.map(
                  (item, i) =>
                    i === index
                      ? {
                          ...item,
                          display:
                            `${current.toFixed(
                              stat.decimals
                            )}${stat.suffix}`
                        }
                      : item
                )
            );

            if (
              current >=
              stat.target
            ) {
              clearInterval(
                interval
              );
            }

          }, 25);

        this.intervals.push(
          interval
        );
      }
    );
  }
}