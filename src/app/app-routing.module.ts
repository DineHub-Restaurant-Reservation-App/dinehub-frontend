import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/home/landing.component';
import { ReservationFormComponent } from './pages/reservation-form/reservation-form.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'restaurants',
    children: [
      {
        path: ':id',
        component: RestaurantComponent,
      },
      {
        path: '',
        component: RestaurantsComponent,
      },
    ],
  },
  {
    path: 'reserve',
    component: ReservationFormComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
