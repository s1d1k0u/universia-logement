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
  Member,
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
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  member?: Member;

  readonly checkCircle = CheckCircle;
  readonly home = Home;
  readonly chevronRight = ChevronRight;

  goHome() {
    this.router.navigate(['/']);
  }

  onContinue() {
    this.router.navigate(['/reservation']);
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      const MBR_ID = params['MBR_ID'];
      console.log(MBR_ID);
      if (MBR_ID) {
        this.reservationService.getMemberById(MBR_ID).subscribe({
          next: (member) => {
            this.member = member[0];
          },
          error: (error) => {
            alert(
              "Une erreur s'est produite lors de la vérification de l'adhérent"
            );
          },
        });
      }
    });
  }
}
