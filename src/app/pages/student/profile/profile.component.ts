import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReservationService,
  UpdateMember,
} from '../../../services/reservation.service';
import {
  LucideAngularModule,
  CheckCircle,
  Home,
  ChevronRight,
} from 'lucide-angular';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule, LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  reservationService: ReservationService = inject(ReservationService);
  router: Router = inject(Router);

  readonly checkCircle = CheckCircle;
  readonly home = Home;
  readonly chevronRight = ChevronRight;

  goHome() {
    this.router.navigate(['/']);
  }

  onContinue() {
    this.router.navigate(['/reservation']);
  }
}
