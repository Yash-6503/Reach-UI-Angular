// src/app/shared/components/trust-credentials/trust-credentials.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TrustCredentialsComponent,
  Certification,
  Stat,
} from './trust-credentials.component';

describe('TrustCredentialsComponent', () => {

  let component: TrustCredentialsComponent;
  let fixture: ComponentFixture<TrustCredentialsComponent>;

  // ── Setup ──────────────────────────────────────────────────────────────────────

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustCredentialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrustCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Creation ───────────────────────────────────────────────────────────────────

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ── Data Integrity ─────────────────────────────────────────────────────────────

  describe('Data', () => {

    it('should have 6 certifications', () => {
      expect(component.certifications.length).toBe(6);
    });

    it('should include ISO 27001 as the last certification', () => {
      const last = component.certifications[component.certifications.length - 1];
      expect(last.id).toBe('iso27001');
      expect(last.name).toBe('ISO 27001');
    });

    it('should include CE, CDSCO, FDA, NABL, ABDM certifications', () => {
      const ids = component.certifications.map(c => c.id);
      ['ce', 'cdsco', 'fda', 'nabl', 'abdm', 'iso27001'].forEach(id => {
        expect(ids).toContain(id);
      });
    });

    it('should have unique certification ids', () => {
      const ids = component.certifications.map(c => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have 5 stats', () => {
      expect(component.stats.length).toBe(5);
    });

    it('should not have a partners array', () => {
      expect((component as any).partners).toBeUndefined();
    });

    it('should not have any certification with a large property', () => {
      component.certifications.forEach(cert => {
        expect((cert as any).large).toBeUndefined();
      });
    });

  });

  // ── Rendering ──────────────────────────────────────────────────────────────────

  describe('Rendering', () => {

    it('should render the section heading', () => {
      const heading = fixture.debugElement.query(By.css('#trust-heading'));
      expect(heading).toBeTruthy();
      expect(heading.nativeElement.textContent).toContain('Trusted Healthcare Technology');
    });

    it('should render all 6 certification cards', () => {
      const cards = fixture.debugElement.queryAll(By.css('.trust__cert-card'));
      expect(cards.length).toBe(6);
    });

    it('should NOT render any partner cards', () => {
      const partnerCards = fixture.debugElement.queryAll(By.css('.trust__partner-card'));
      expect(partnerCards.length).toBe(0);
    });

    it('should NOT render the partners grid', () => {
      const partnersGrid = fixture.debugElement.query(By.css('.trust__partners-grid'));
      expect(partnersGrid).toBeNull();
    });

    it('should render the stats bar with 5 stats', () => {
      const stats = fixture.debugElement.queryAll(By.css('.trust__stat'));
      expect(stats.length).toBe(5);
    });

    it('should render the ISO 27001 cert name in the last card', () => {
      const certNames = fixture.debugElement.queryAll(By.css('.trust__cert-name'));
      const lastName = certNames[certNames.length - 1];
      expect(lastName.nativeElement.textContent.trim()).toBe('ISO 27001');
    });

    it('should render all cert images with identical class (no --large variants)', () => {
      const imgs = fixture.debugElement.queryAll(By.css('.trust__cert-img'));
      imgs.forEach(img => {
        expect(img.classes['trust__cert-img--large']).toBeFalsy();
      });
    });

    it('should render all cert rings with identical class (no --large variants)', () => {
      const rings = fixture.debugElement.queryAll(By.css('.trust__cert-img-ring'));
      rings.forEach(ring => {
        expect(ring.classes['trust__cert-img-ring--large']).toBeFalsy();
      });
    });

  });

  // ── Visibility ─────────────────────────────────────────────────────────────────

  describe('Visibility state', () => {

    it('should start with isVisible() = false', () => {
      expect(component.isVisible()).toBeFalse();
    });

    it('should not have --visible class on header initially', () => {
      const header = fixture.debugElement.query(By.css('.trust__header'));
      expect(header.classes['trust__header--visible']).toBeFalsy();
    });

  });

  // ── Mouse Events ───────────────────────────────────────────────────────────────

  describe('Mouse interaction', () => {

    it('should call onCardMouseMove without throwing', () => {
      const card = fixture.debugElement.query(By.css('.trust__cert-card'))?.nativeElement;
      const mockEvent = { currentTarget: card, clientX: 100, clientY: 100 } as unknown as MouseEvent;
      expect(() => component.onCardMouseMove(mockEvent, 'cert-ce')).not.toThrow();
    });

    it('should call onCardMouseLeave without throwing', () => {
      expect(() => component.onCardMouseLeave('cert-ce')).not.toThrow();
    });

  });

  // ── Lifecycle ──────────────────────────────────────────────────────────────────

  describe('Lifecycle', () => {

    it('should disconnect the observer on destroy', () => {
      const disconnectSpy = jasmine.createSpy('disconnect');
      (component as any).intersectionObserver = { disconnect: disconnectSpy };
      component.ngOnDestroy();
      expect(disconnectSpy).toHaveBeenCalled();
    });

  });

});