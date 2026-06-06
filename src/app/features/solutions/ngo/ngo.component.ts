// src/app/features/solutions/ngo/ngo.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ngo',
  standalone: true,
  templateUrl: './ngo.component.html',
  styleUrls: ['./ngo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgoComponent {
  benefits = [
    'Affordable healthcare deployment cost',
    'Community health center setup',
    'Scalable programs across locations',
    'Remote monitoring & reporting',
    'Impact tracking & analytics',
    'Flexible payment & grant options',
  ];

  models = [
    { title: 'Standalone Community Center', desc: 'Single or multiple kiosks serving rural communities' },
    { title: 'Mobile Health Camps',         desc: 'Portable kiosks for health outreach programs' },
    { title: 'Clinic Network',              desc: 'Multiple locations with centralized management' },
  ];

  impact = [
    { metric: 'Patients Served',      example: 'Track cumulative patient count' },
    { metric: 'Communities Reached',  example: 'Monitor geographic coverage' },
    { metric: 'Health Outcomes',      example: 'Track disease detection rates' },
    { metric: 'Program ROI',          example: 'Measure cost-effectiveness' },
  ];
}
