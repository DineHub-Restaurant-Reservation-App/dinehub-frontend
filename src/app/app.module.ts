import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormFieldComponent } from './components/dynamic-form-field/dynamic-form-field.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ManageMenuDialogComponent } from './components/manage-menu-dialog/manage-menu-dialog.component';
import { ManageMenuComponent } from './components/manage-menu/manage-menu.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { AuthComponent } from './pages/auth/auth.component';
import { BusinessComponent } from './pages/business/business.component';
import { LandingComponent } from './pages/home/landing.component';
import { ReservationFormComponent } from './pages/reservation-form/reservation-form.component';
import { RestaurantDashboardComponent } from './pages/restaurant-dashboard/restaurant-dashboard.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { FormatBusinessHoursPipe } from './pipes/format-business-hours.pipe';
import { AuthService } from './services/auth.service';
import { QuestionControlService } from './services/question-control.service';
import { RestaurantInfoService } from './services/restaurant-info.service';
import { RestaurantsService } from './services/restaurants.service';
import { A11yModule } from '@angular/cdk/a11y';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    FooterComponent,
    RestaurantsComponent,
    RestaurantComponent,
    ReservationFormComponent,
    FormatBusinessHoursPipe,
    AuthComponent,
    BusinessComponent,
    RestaurantDashboardComponent,
    TextFieldComponent,
    DynamicFormComponent,
    DynamicFormFieldComponent,
    ManageMenuComponent,
    ManageMenuDialogComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    MatTableModule,
  ],
  providers: [
    RestaurantsService,
    AuthService,
    RestaurantInfoService,
    QuestionControlService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
