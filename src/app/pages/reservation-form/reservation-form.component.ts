import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
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
      requests: [],
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
    }
  }
}
