import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-check-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './reservation-check-form.component.html',
  styleUrl: './reservation-check-form.component.css',
})
export class ReservationCheckFormComponent {
  reservationService: ReservationService = inject(ReservationService);
  router: Router = inject(Router);

  errorMessage = '';
  infoMessage = '';
  loading = false;

  reservationForm: FormGroup = new FormGroup({
    reservationCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
  });
  readonly arrowRight = ArrowRight;

  get reservationCodeControl() {
    return this.reservationForm.get('reservationCode');
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      this.loading = true;
      try {
        this.reservationService
          .getReservationByCode(this.reservationCodeControl?.value)
          .subscribe({
            next: (reservations) => {
              if (reservations.length === 0) {
                this.infoMessage =
                  'Aucune réservation trouvée avec ce code. Veuillez vérifier le code.';
                this.loading = false;
                return;
              }
              this.reservationService.setReservation(reservations[0]);
              localStorage.setItem(
                'reservation',
                JSON.stringify(this.reservationService.reservation)
              );
              this.router.navigate([
                '/reservation-list',
                reservations[0].RSV_CODE,
              ]);
            },
            error: (error) => {
              error.status === 500
                ? (this.errorMessage = 'Une erreur est survenue')
                : (this.errorMessage = 'Aucune réservation trouvée');
            },
          });
      } catch (error) {
        this.errorMessage = 'Une erreur est survenue';
      } finally {
        this.loading = false;
      }
      console.log('Form submitted');
    }
  }

  constructor() {}
}
