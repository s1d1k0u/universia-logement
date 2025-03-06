import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NewReservationComponent } from './pages/reservation/new-reservation/new-reservation.component';
import { ProfileComponent } from './pages/student/profile/profile.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { ReservationListComponent } from './pages/reservation/reservation-list/reservation-list.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'nouvelle-reservation', component: NewReservationComponent },
      { path: 'profil', component: ProfileComponent },
      { path: 'reservation', component: CreateReservationComponent },
      { path: 'reservation-list/:RSV_CODE', component: ReservationListComponent },
      { path: '', component: LandingComponent },
    ],
  },
];
