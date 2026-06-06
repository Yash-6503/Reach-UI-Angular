import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-trust-credentials',
  standalone: true,

  template: `
<section class="trust">

  <div class="container">

    <h2 class="trust__title">
      Trusted Healthcare Technology
    </h2>

    <div class="trust__grid">

      @for (cert of certifications; track cert.name) {

        <div class="trust__card">

          <div class="trust__icon">
            {{ cert.icon }}
          </div>

          <p class="trust__name">
            {{ cert.name }}
          </p>

        </div>

      }

    </div>

  </div>

</section>
`,

  styles: [`

.trust {

  padding: 5rem 0;

  background: #2563eb;

  opacity: 0;

  filter: blur(20px);

  transform: translateY(80px);

  transition:
    opacity .9s ease,
    transform .9s ease,
    filter .9s ease;
}

.trust.visible {

  opacity: 1;

  filter: blur(0);

  transform: translateY(0);
}

.container {

  max-width: 80rem;

  margin: auto;

  padding: 0 1rem;
}

@media (min-width:640px){

.container{
padding:0 1.5rem;
}

}

@media (min-width:1024px){

.container{
padding:0 2rem;
}

}

.trust__title {

  color: white;

  text-align: center;

  font-size:
    clamp(
      1.75rem,
      3vw,
      2.5rem
    );

  margin-bottom: 3rem;

  font-weight: 700;
}

.trust__grid {

  display: grid;

  grid-template-columns:
    repeat(2,1fr);

  gap: 1.5rem;
}

@media (min-width:768px){

.trust__grid{
grid-template-columns:
repeat(5,1fr);
}

}

.trust__card {

  background:
    rgba(
      255,
      255,
      255,
      .12
    );

  backdrop-filter:
    blur(12px);

  border-radius: 12px;

  padding: 1.5rem;

  color: white;

  text-align: center;

  transition:
    .3s ease;
}

.trust__card:hover {

  transform:
    translateY(-6px);

  background:
    rgba(
      255,
      255,
      255,
      .18
    );
}

.trust__icon {

  font-size: 2.6rem;

  margin-bottom: .75rem;
}

.trust__name {

  font-weight: 600;
}

`],

  changeDetection:
    ChangeDetectionStrategy.OnPush
})

export class TrustCredentialsComponent
implements AfterViewInit {

  constructor(
    private el: ElementRef
  ) {}

  certifications = [

    {
      name:'CE Certified',
      icon:'🏅'
    },

    {
      name:'CDSCO Compliant',
      icon:'✓'
    },

    {
      name:'FDA Components',
      icon:'🔬'
    },

    {
      name:'ABDM Compatible',
      icon:'🔗'
    },

    {
      name:'Secure Cloud Infrastructure',
      icon:'🔒'
    }

  ];

  ngAfterViewInit() {

    const section =
      this.el.nativeElement.querySelector(
        '.trust'
      );

    const observer =
      new IntersectionObserver(

        ([entry]) => {

          if (
            entry.isIntersecting
          ) {

            section.classList.add(
              'visible'
            );

            observer.disconnect();

          }

        },

        {
          threshold: .25
        }

      );

    observer.observe(
      section
    );

  }

}