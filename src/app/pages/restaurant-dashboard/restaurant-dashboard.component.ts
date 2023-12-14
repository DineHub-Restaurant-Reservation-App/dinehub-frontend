import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { RestaurantInfoService } from 'src/app/services/restaurant-info.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss'],
})
export class RestaurantDashboardComponent implements OnInit, OnDestroy {
  restaurant!: Restaurant;

  generalInformationQuestions!: Question[];
  manageReservationQuestions!: Question[];
  manageMenuQuestions!: Question[];

  generalInformationForm!: FormGroup;
  manageReservationForm!: FormGroup;
  manageMenuForm!: FormGroup;

  constructor(
    private restaurantQuestionService: RestaurantInfoService,
    private qcs: QuestionControlService
  ) {}
  ngOnInit(): void {
    this.generalInformationQuestions =
      this.restaurantQuestionService.getGeneralInformationQuestions();
    this.generalInformationForm = this.qcs.toFormGroup(
      this.generalInformationQuestions
    );
    this.manageReservationQuestions =
      this.restaurantQuestionService.getManageReservationQuestions();
    this.manageReservationForm = this.qcs.toFormGroup(
      this.manageReservationQuestions
    );
  }
  ngOnDestroy(): void {}
}
