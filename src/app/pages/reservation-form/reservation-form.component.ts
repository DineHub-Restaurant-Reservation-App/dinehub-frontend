import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  form: FormGroup;
  isLoaded: boolean = false;
  restaurant: any;
  arrivalTimings: string[] = []

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private snackBar: MatSnackBar
  ) {
    const today = new Date();
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      date: [today, [Validators.required, this.dateValidator]],
      arrivalTime: [{ value: '', disabled: true }, [Validators.required]],
      guests: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    const restaurantId = this.route.snapshot.params['id'];
    this.restaurantService.fetchRestaurant(restaurantId).subscribe((data) => {
      this.restaurant = data;
      this.isLoaded = true;
    });

    this.form.get('guests')?.valueChanges.subscribe((date) => {
      this.enableDisableArrivalTimeControl();
    });

    this.form.get('date')?.valueChanges.subscribe((date) => {
      this.enableDisableArrivalTimeControl();
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    const seletedDaate: Date = <Date>control.value;
    seletedDaate.setHours(0, 0, 0, 0);
    if (seletedDaate < today) {
      return {
        invalidDate: { value: 'Please enter a date that is not passed.' },
      };
    }
    return null;
  }

  getDateErrorMessage() {
    const dateControl: AbstractControl = this.form.controls['date'];
    if (dateControl.hasError('invalidDate')) {
      return 'Please enter a date that is not passed.';
    }

    return 'Please select a valid date.';
  }

  submitReservation() {
    if (this.form.valid) {
      const formData = this.form.value;
      const reservationData = {
        restaurantId: this.restaurant._id,
        reservationName: formData.name,
        slotInterval: formData.arrivalTime,
        date: formData.date.toLocaleDateString(),
        tableNumber: formData.tableNumber,
        totalNumberOfPersons: formData.guests,
        time: formData.arrivalTime,
        email: formData.email,
        phoneNumber: formData.phoneNumber
      };

      this.reservationService.bookReservation(reservationData).subscribe(
        (data :any) => {
          const encodedDate = encodeURIComponent(data.date);
          this.router.navigate(['/confirmation', data.restaurantId, data._id, encodedDate, data.time]);
        },
        (errorMessage) => {
          this.snackBar.open(errorMessage, 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  enableDisableArrivalTimeControl() {
    const arrivalTimeControl = this.form.get('arrivalTime');

    if (this.form.get('guests')?.value && this.form.get('date')?.value) {
    const { guests, date } = this.form.value;
      const seatRequest = {
        restaurantId: this.restaurant._id,
        totalNumberOfPersons: guests,
        date: date.toLocaleDateString(),
      };

      this.reservationService
        .getAvailableSeats(seatRequest)
        .subscribe((availableTimings) => {
          this.arrivalTimings = availableTimings;
          arrivalTimeControl?.enable();
        },(error)=>{
          console.log("Error: ", error);
          this.snackBar.open(error.error?.message || 'An error occurred!', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
        });
    } else {
      arrivalTimeControl?.disable();
    }
  }
}
