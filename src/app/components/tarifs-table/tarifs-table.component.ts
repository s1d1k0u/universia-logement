import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarifs-table',
  imports: [CommonModule],
  templateUrl: './tarifs-table.component.html',
  styleUrl: './tarifs-table.component.css',
})
export class TarifsTableComponent {
  @Input() fees: any[] = [];
  @Input() title: string = '';
}
