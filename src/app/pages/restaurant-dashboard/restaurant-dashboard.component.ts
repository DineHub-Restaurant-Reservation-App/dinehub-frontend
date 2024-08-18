import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';

import { CanDeactivateType } from 'src/app/common/guards/canDeactivate.guard';
import { Question } from 'src/app/models/question.model';
import { Reservation } from 'src/app/models/reservation.model';
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
  isLoading: boolean = false;
  restaurant!: Restaurant;
  reservations: Reservation[] = [];
  displayedColumns: string[] = [
    '_id',
    'customerName',
    'customerEmail',
    'phoneNumber',
    'reservedDate',
    'slotInterval',
    'tableNumber',
  ];
  generalInformationQuestions!: Question[];
  manageReservationQuestions!: Question[];

  generalInformationForm!: FormGroup;
  manageReservationForm!: FormGroup;

  selectedTabIndex: number = 0;

  constructor(
    private restaurantQuestionService: RestaurantInfoService,
    private qcs: QuestionControlService,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    const fetchDashboardInfo = this.dashboardService.getGeneralInfoData();

    const fetchReservationInfo = this.dashboardService.getReservations();


    forkJoin([fetchDashboardInfo, fetchReservationInfo]).subscribe(([dashBoardData, reservations]) => {

      this.createOrUpdateGeneralInfoForm(dashBoardData);
      console.log("reservations: ", reservations);
      this.reservations = reservations;

      this.isLoading = true;
    });

    window.onbeforeunload = () => {
      if (this.selectedTabIndex == 0 && this.generalInformationForm.touched) {
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

  submitGeneralInfoForm() {
    this.snackBar.open('Saving changes...!', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
    this.dashboardService
      .updateGeneralInfoData(this.generalInformationForm.value)
      .subscribe((data) => {
        this.createOrUpdateGeneralInfoForm(data);
        this.snackBar.open('Restaurant Info updated!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
        });
      });
  }

  getDate(date: string){
    return new Date(date).toLocaleDateString();
  }

  ngOnDestroy(): void {
    window.onbeforeunload = null;
  }
}
