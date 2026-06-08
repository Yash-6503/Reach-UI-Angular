// src/app/features/contact/contact.component.ts
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Particle {
  [key: string]: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;

  form: FormGroup;
  submitted  = signal(false);
  isLoading  = signal(false);
  heroVisible = signal(false);
  formVisible = signal(false);

  particles: Partial<CSSStyleDeclaration>[] = [];

  private observers: IntersectionObserver[] = [];

  constructor(private fb: FormBuilder, private el: ElementRef) {
    this.form = this.fb.group({
      name:         ['', Validators.required],
      email:        ['', [Validators.required, Validators.email]],
      organization: ['', Validators.required],
      role:         ['', Validators.required],
      phone:        ['', Validators.required],
      city:         ['', Validators.required],
      requirement:  ['', Validators.required],
      message:      [''],
    });

    // Generate random particles
    this.particles = Array.from({ length: 18 }, () => ({
      left:            `${Math.random() * 100}%`,
      top:             `${Math.random() * 100}%`,
      width:           `${2 + Math.random() * 4}px`,
      height:          `${2 + Math.random() * 4}px`,
      animationDelay:  `${Math.random() * 8}s`,
      animationDuration:`${6 + Math.random() * 8}s`,
      opacity:         `${0.08 + Math.random() * 0.18}`,
    }));
  }

  ngOnInit(): void {
    // Hero visible immediately after paint
    requestAnimationFrame(() => this.heroVisible.set(true));
  }

  ngAfterViewInit(): void {
    // Observe form section
    const formObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.formVisible.set(true);
          formObs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    const formSection = this.el.nativeElement.querySelector('.contact-layout');
    if (formSection) formObs.observe(formSection);
    this.observers.push(formObs);
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    // Simulate async submit
    setTimeout(() => {
      console.log('Form submitted:', this.form.value);
      this.isLoading.set(false);
      this.submitted.set(true);
      this.form.reset();
      setTimeout(() => this.submitted.set(false), 6000);
    }, 1400);
  }

  fieldInvalid(name: string): boolean {
    const ctrl = this.form.get(name);
    return !!(ctrl?.invalid && ctrl?.touched);
  }
}