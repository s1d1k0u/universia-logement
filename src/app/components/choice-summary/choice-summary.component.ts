import { Component, Input } from '@angular/core';

interface ChoiceSummaryData {
  header: string;
  residence: string;
  accomodation: string;
  building: string;
  apartment?: string;
  room?: string | number;
}

@Component({
  selector: 'app-choice-summary',
  imports: [],
  templateUrl: './choice-summary.component.html',
  styleUrl: './choice-summary.component.css',
})
export class ChoiceSummaryComponent {
  @Input() data!: ChoiceSummaryData;

  constructor() {}
}
