import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Loader, CheckCircle, AlertTriangle, LucideAngularModule } from 'lucide-angular';

import {
  ReservationService,
} from '../../../services/reservation.service';

@Component({
  selector: 'app-new-reservation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LucideAngularModule],
  templateUrl: './new-reservation.component.html',
  styleUrl: './new-reservation.component.css',
})
export class NewReservationComponent {
  private readonly router: Router = inject(Router);
  private readonly reservationService: ReservationService =
    inject(ReservationService);

  readonly loader = Loader;
  readonly checkCircle = CheckCircle;
  readonly alertTriangle = AlertTriangle;
  
  errorMessage = '';
  loading = false;
  isSuccessful = false;

  studentForm: FormGroup = new FormGroup({
    registrationNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z]{3}[A-Za-z][0-9]{8}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {}

  get registrationNumber() {
    return this.studentForm.get('registrationNumber');
  }

  get email() {
    return this.studentForm.get('email');
  }

  onSubmit() {
    // @TODO: Implement onSubmit method for new reservation
    /**
     * 1. Check if the form is valid
     * 2. Get the member with the registration number
     * 3. Verify the matricule and the the email
     */
    if (!this.studentForm.invalid) {
      try {
        this.loading = true;
        this.reservationService
          .getMember(this.registrationNumber?.value, this.email?.value)
          .subscribe((member) => {
            if (member.length > 0) {
              this.isSuccessful = true;
              this.errorMessage = '';
              this.reservationService.setMember(member[0]);
              setTimeout(() => {
                console.log(this.reservationService.member);
                this.reservationService.member;
                this.router.navigate(['/']);
              }, 2000);
            } else {
              this.isSuccessful = false;
              this.errorMessage = 'Veuillez vérifier vos informations';
            }
          });
      } catch (error) {
        this.errorMessage = 'Une erreur est survenue';
      } finally {
        this.loading = false;
      }
    }
  }
}
