// src/app/features/contact/contact.component.ts
import {
  Component, ChangeDetectionStrategy, signal
} from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  form: FormGroup;
  submitted = signal(false);

  constructor(private fb: FormBuilder) {
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
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    console.log('Form submitted:', this.form.value);
    this.submitted.set(true);
    this.form.reset();
    setTimeout(() => this.submitted.set(false), 5000);
  }

  fieldInvalid(name: string): boolean {
    const ctrl = this.form.get(name);
    return !!(ctrl?.invalid && ctrl?.touched);
  }
}
