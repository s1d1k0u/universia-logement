import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-reservation-check-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './reservation-check-form.component.html',
  styleUrl: './reservation-check-form.component.css',
})
export class ReservationCheckFormComponent {
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
      alert('Vérification de votre réservation...');
      console.log('Form submitted');
    }
  }

  constructor() {}
}
