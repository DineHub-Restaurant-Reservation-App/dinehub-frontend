import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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
  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      date: [new Date(), [Validators.required, this.dateValidator]],
      arrivalTime: ['', [Validators.required]],
      guests: ['', [Validators.required]],
      tableNumber: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const restaurantId = this.route.snapshot.params['id'];
    this.restaurantService.fetchRestaurant(restaurantId).subscribe((data) => {
      console.log(data);
      this.restaurant = data;
      this.isLoaded = true;
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
      const reservationData: Reservation = {
        restaurant: this.restaurant._id,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhoneNumber: formData.phone,
        slotInterval: formData.arrivalTime,
        reservedDate: new Date(formData.date).toISOString().slice(0, 10),
        tableNumber: formData.tableNumber,
      };

      this.reservationService.bookReservation(reservationData).subscribe(
        (data) => {
          this.router.navigate(['/confirmation', data._id]);
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
}
