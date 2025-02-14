import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-reservation',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-reservation.component.html',
  styleUrl: './new-reservation.component.css',
})
export class NewReservationComponent {
  studentForm: FormGroup = new FormGroup({
    registrationNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z]{3}[A-Z][0-9]{8}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get registrationNumber() {
    return this.studentForm.get('registrationNumber');
  }

  get email() {
    return this.studentForm.get('email');
  }

  onSubmit() {
    console.log(this.studentForm.value);
  }
}
