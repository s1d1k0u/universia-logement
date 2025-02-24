import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reservation-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './reservation-layout.component.html',
  styleUrl: './reservation-layout.component.css',
})
export class ReservationLayoutComponent {
  isMenuOpen = false;

  logout() {
    // @TODO: Implement logout method
    console.log('logout');
  }
}
