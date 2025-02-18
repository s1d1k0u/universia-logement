import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NewReservationComponent } from './pages/reservation/new-reservation/new-reservation.component';
import { ProfileComponent } from './pages/student/profile/profile.component';
import { ReservationLayoutComponent } from './layouts/reservation-layout/reservation-layout.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';

export const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationLayoutComponent,
    children: [],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'nouvelle-reservation',
        component: NewReservationComponent,
      },
      { path: 'profil', component: ProfileComponent },
      { path: 'choix-logement', component: CreateReservationComponent },
      { path: '', component: LandingComponent },
    ],
  },
];
