import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  NewReservation,
  ReservationService,
} from '../../../services/reservation.service';
import { LucideAngularModule, ArrowRight, X } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-details',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent {
  readonly arrowRight = ArrowRight;
  readonly x = X;

  infoMessage = '';
  errorMessage = '';

  router: Router = inject(Router);
  reservationService: ReservationService = inject(ReservationService);
  reservation: NewReservation | undefined;

  ngOnInit() {
    if (this.reservationService.reservation) {
      this.reservation = this.reservationService.reservation;
    } else {
      const reservation = localStorage.getItem('reservation');
      if (reservation) {
        this.reservation = JSON.parse(reservation);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onCancel() {
    if (!this.reservation) return;
    this.reservationService.cancelReservation(this.reservation).subscribe({
      next: (success) => {
        this.router.navigate(['/']);
        this.infoMessage = 'Réservation annulée avec succès';
      },
      error: (error) => {
        this.errorMessage = "Erreur lors de l'annulation de la réservation";
      },
    });
  }

  onContinue() {
    this.router.navigate(['/reservation']);
  }
}
