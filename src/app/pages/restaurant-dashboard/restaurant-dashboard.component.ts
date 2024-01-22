import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

import { CanDeactivateType } from 'src/app/common/guards/canDeactivate.guard';
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

  selectedTabIndex: number = 0;

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

    window.onbeforeunload = () => {
      if (
        (this.selectedTabIndex == 0 && this.generalInformationForm.touched) ||
        (this.selectedTabIndex == 1 && this.manageReservationForm.touched)
      ) {
        return false;
      }

      return true;
    };
  }

  onTabChange(matTabGroup: MatTabChangeEvent) {
    this.selectedTabIndex = matTabGroup.index;
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

  canDeactivate(): CanDeactivateType {
    console.log('Inside canDeactivate');
    if (
      (this.selectedTabIndex == 0 && this.generalInformationForm.touched) ||
      (this.selectedTabIndex == 1 && this.manageReservationForm.touched)
    ) {
      return confirm(
        'Are you sure you want to leave? Your unsaved changes will be lost.'
      );
    }
    return true;
  }

  ngOnDestroy(): void {
    window.onbeforeunload = null;
  }
}
