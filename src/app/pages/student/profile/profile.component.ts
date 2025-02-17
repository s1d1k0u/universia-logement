import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
  });
  isSubmitting = false;

  constructor(private router: Router) {
    this.profileForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
    });
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get genre() {
    return this.profileForm.get('genre');
  }

  onSubmit() {
    //@TODO: Implement onSubmit method
    if (!this.profileForm.invalid) {
      this.isSubmitting = true;
      console.log(this.profileForm.value);
      this.isSubmitting = false;
      this.router.navigate(['/choix-logement']);
      return;
    }
  }
}
