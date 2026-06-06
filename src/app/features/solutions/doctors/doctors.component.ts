// src/app/features/solutions/doctors/doctors.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-doctors',
  standalone: true,
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsComponent {
  benefits = [
    'Remote consultation capability',
    'New revenue opportunities from teleconsultations',
    'Expanded patient reach without new clinic location',
    'Faster return on investment',
    'Multi-location growth potential',
    'Complete patient health records',
  ];

  steps = [
    { step: '1', title: 'Patient Registration', desc: 'Digital patient intake and health history' },
    { step: '2', title: 'Diagnostics',           desc: 'Auto vital capture and health screening' },
    { step: '3', title: 'Consultation',          desc: 'Secure telemedicine with remote doctors' },
    { step: '4', title: 'Follow-up',             desc: 'Prescriptions, reports, and tracking' },
  ];

  roi = [
    { title: 'New Revenue Streams', desc: 'Generate revenue from remote consultations and health screening' },
    { title: 'Efficiency Gains',    desc: 'Reduce patient wait time and increase throughput' },
    { title: 'Patient Retention',   desc: 'Better patient experience and higher retention rates' },
  ];
}
