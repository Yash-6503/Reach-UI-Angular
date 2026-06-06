// src/app/app.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen">
      <app-header />
      <router-outlet />
      <app-footer />
    </div>
  `,
  styles: [`
    .min-h-screen { min-height: 100vh; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .flex-grow { flex-grow: 1; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
