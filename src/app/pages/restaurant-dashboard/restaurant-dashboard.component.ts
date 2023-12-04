import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantInfoService } from 'src/app/services/restaurant-info.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss'],
})
export class RestaurantDashboardComponent implements OnInit, OnDestroy {
  restaurant!: Restaurant;
  generalInfoFormQuestions!: Question[];

  constructor(
    private restaurantService: RestaurantsService,
    private fb: FormBuilder,
    private restaurantQuestionService: RestaurantInfoService
  ) {}
  ngOnInit(): void {
    this.generalInfoFormQuestions =
      this.restaurantQuestionService.getGeneralInformationQuestions();
  }
  ngOnDestroy(): void {}
}

// this.generalInfoForm = this.fb.group({
//   name: ['', Validators.required],
//   description: [''],
//   logo: ['', Validators.required],
//   address: this.fb.group({
//     street: ['', Validators.required],
//     city: ['', Validators.required],
//     state: ['', Validators.required],
//     zipCode: ['', Validators.required],
//   }),
//   contactInformation: this.fb.group({
//     websiteURL: [''],
//     phoneNumber: ['', Validators.required],
//     email: ['', [Validators.required, Validators.email]],
//   }),
//   operatingHours: this.fb.group({
//     monday: ['', Validators.required],
//     tuesday: ['', Validators.required],
//     wednesday: ['', Validators.required],
//     thursday: ['', Validators.required],
//     friday: ['', Validators.required],
//     saturday: ['', Validators.required],
//     sunday: ['', Validators.required],
//   }),
//   bufferTime: ['', Validators.required],
//   timeSlots: this.fb.group({
//     startTime: ['', Validators.required],
//     endTime: ['', Validators.required],
//     table: {
//       tableCount: ['', Validators.required],
//       capacityPerTable: ['', Validators.required],
//     },
//   }),
// });
