import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-personalization',
  imports: [CommonModule],
  templateUrl: './personalization.component.html',
  styleUrl: './personalization.component.css'
})
export class PersonalizationComponent {
categories: any;
selectedCategory: any;
getCategoryLabel(_t9: any) {
throw new Error('Method not implemented.');
}
filteredEquipments: any;
isSelected(_t14: any) {
throw new Error('Method not implemented.');
}
toggleEquipment(_t14: any) {
throw new Error('Method not implemented.');
}
selectedEquipments: any;
totalPrice: string|number = 0;

}
