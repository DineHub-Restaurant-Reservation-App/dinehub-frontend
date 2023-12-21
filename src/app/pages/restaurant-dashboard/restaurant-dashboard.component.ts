import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/models/question.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { RestaurantInfoService } from 'src/app/services/restaurant-info.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss'],
})
export class RestaurantDashboardComponent implements OnInit, OnDestroy {
  restaurant!: Restaurant;

  generalInformationQuestions!: Question[];
  manageReservationQuestions!: Question[];

  generalInformationForm!: FormGroup;
  manageReservationForm!: FormGroup;

  constructor(
    private restaurantQuestionService: RestaurantInfoService,
    private qcs: QuestionControlService,
    private dashboardService: DashboardService
  ) {}
  ngOnInit(): void {
    const generalInfoAppData = this.dashboardService.getGeneralInfoData();

    const manageReservationAppData =
      this.dashboardService.getReservationInfoData();

    this.dashboardService.generalInfoSubject.subscribe((appData: any) => {
      this.createOrUpdateGeneralInfoForm(appData);
    });
    this.dashboardService.reservationInfoSubject.subscribe((appData) => {
      this.createOrUpdateManageReservationForm(appData);
    });

    this.createOrUpdateGeneralInfoForm(generalInfoAppData);
    this.createOrUpdateManageReservationForm(manageReservationAppData);
  }

  createOrUpdateGeneralInfoForm(answer: any) {
    this.generalInformationQuestions =
      this.restaurantQuestionService.getGeneralInformationQuestions(answer);
    this.generalInformationForm = this.qcs.toFormGroup(
      this.generalInformationQuestions
    );
  }

  createOrUpdateManageReservationForm(answer: any) {
    this.manageReservationQuestions =
      this.restaurantQuestionService.getManageReservationQuestions(answer);
    this.manageReservationForm = this.qcs.toFormGroup(
      this.manageReservationQuestions
    );
  }
  ngOnDestroy(): void {}
}
