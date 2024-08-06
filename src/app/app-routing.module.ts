import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canDeactivateGuard } from './common/guards/canDeactivate.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { BusinessComponent } from './pages/business/business.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { LandingComponent } from './pages/home/landing.component';
import { ReservationFormComponent } from './pages/reservation-form/reservation-form.component';
import { RestaurantDashboardComponent } from './pages/restaurant-dashboard/restaurant-dashboard.component';
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
    path: 'reserve/:id',
    component: ReservationFormComponent,
  },
  {
    path: 'confirmation/:id',
    component: ConfirmationComponent,
  },
  {
    path: 'signup',
    component: AuthComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'app',
    component: RestaurantDashboardComponent,
    canActivate: [AuthGuard],
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
