import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Question } from '../models/question.model';

export class RestaurantInfoService {
  getGeneralInformationQuestions(answer: any): Question[] {
    return [
      {
        key: 'name',
        controlType: 'textbox',
        type: 'text',
        label: 'Restaurant Name',
        value: answer.name ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'Restaurant Name cannot be empty.',
        },
      },
      {
        key: 'about',
        controlType: 'textbox',
        type: 'text',
        label: 'About Us',
        value: answer.about ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'About us cannot be empty.',
        },
      },
      {
        key: 'logo',
        type: 'text',
        controlType: 'textbox',
        label: 'Logo Url',
        value: answer.logo ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'Logo Url cannot be empty.',
        },
      },
      {
        key: 'banner',
        type: 'text',
        controlType: 'textbox',
        label: 'Banner Url',
        value: answer.banner ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'Banner Url cannot be empty.',
        },
      },
      {
        key: 'address',
        label: 'Address',
        questions: [
          {
            key: 'street',
            type: 'text',
            controlType: 'textbox',
            label: 'Street',
            value: answer?.address.street ?? null,
            validators: [Validators.required],
            errorMessage: {
              required: 'Street name cannot be empty.',
            },
          },
          {
            key: 'city',
            type: 'text',
            controlType: 'textbox',
            label: 'City',
            value: answer?.address.city ?? null,
            validators: [Validators.required],
            errorMessage: {
              required: 'City name cannot be empty.',
            },
          },
          {
            key: 'state',
            type: 'text',
            controlType: 'textbox',
            label: 'State',
            value: answer?.address.state ?? null,
            validators: [Validators.required],
            errorMessage: {
              required: 'State name cannot be empty.',
            },
          },
          {
            key: 'postalCode',
            type: 'text',
            controlType: 'textbox',
            label: 'PostalCode',
            value: answer?.address.postalCode ?? null,
            validators: [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(6),
            ],
            errorMessage: {
              required: 'Postal code cannot be empty.',
              minLength: 'Postal cannot be less than 6 characters',
              maxLength: 'Postal cannot be more than 6 characters',
            },
          },
        ],
      },
      {
        key: 'contactInformation',
        label: 'Contact Information',
        questions: [
          {
            key: 'websiteURL',
            type: 'text',
            controlType: 'textbox',
            label: 'WebsiteURL',
            value: answer?.contactInformation.websiteURL ?? null,
            validators: [],
          },
          {
            key: 'phoneNumber',
            type: 'tel',
            controlType: 'textbox',
            label: 'Phone Number',
            value: answer?.contactInformation.phoneNumber ?? null,
            validators: [
              Validators.required,
              Validators.min(10),
              Validators.max(10),
            ],
            errorMessage: {
              required: 'Phone number cannot be empty.',
              minLength: 'Phone number should have minimum 10 characters.',
              maxLength: 'Phone number should have maximum 10 characters.',
            },
          },
          {
            key: 'email',
            type: 'email',
            controlType: 'textbox',
            label: 'Email',
            value: answer?.contactInformation.email ?? null,
            validators: [Validators.required, Validators.email],
            errorMessage: {
              required: 'Email address cannot be empty.',
              email: 'Please enter a valid email address.',
            },
          },
        ],
      },
      {
        key: 'operatingHours',
        label: 'Operating Hours',
        hint: 'Enter timings in 24-hour format (e.g., 09:00). Use "00:00" for holidays.',
        questions: [
          {
            key: 'monday',
            type: 'text',
            controlType: 'operatingHour',
            label: 'Monday',
            startingTime: answer.operatingHours.mondayStartingTime ?? '00:00',
            endingTime: answer.operatingHours.mondayEndingTime ?? '00:00',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'tuesday',
            type: 'text',
            controlType: 'operatingHour',
            label: 'Tuesday',
            startingTime: answer?.operatingHours.tuesdayStartingTime ?? '00:00',
            endingTime: answer?.operatingHours.tuesdayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'wednesday',
            type: 'text',
            controlType: 'operatingHour',
            label: 'Wednesday',
            startingTime:
              answer?.operatingHours.wednesdayStartingTime ?? '00:00',
            endingTime: answer?.operatingHours.wednesdayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'thursday',
            type: 'text',
            controlType: 'operatingHour',
            label: 'Thursday',
            startingTime:
              answer?.operatingHours.thursdayStartingTime ?? '00:00',
            endingTime: answer?.operatingHours.thursdayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'friday',
            type: 'text',
            controlType: 'operatingHour',
            label: 'Friday',
            startingTime: answer?.operatingHours.fridayStartingTime ?? '00:00',
            endingTime: answer?.operatingHours.fridayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'saturday',
            type: 'text',
            controlType: 'operatingHour',
            label: 'Saturday',
            startingTime:
              answer?.operatingHours.saturdayStartingTime ?? '00:00',
            endingTime: answer?.operatingHours.saturdayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'sunday',
            controlType: 'operatingHour',
            type: 'text',
            label: 'Sunday',
            startingTime: answer?.operatingHours.sundayStartingTime ?? '00:00',
            endingTime: answer?.operatingHours.sundayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
        ],
      },
    ];
  }

  getManageReservationQuestions(manageReservationAnswer: any): Question[] {
    return [
      {
        key: 'slotInterval',
        controlType: 'textbox',
        type: 'number',
        label: 'Slot Interval (in mins)',
        value: manageReservationAnswer.slotInterval ?? '60',
        validators: [Validators.required],
      },
      {
        key: 'bufferTime',
        controlType: 'textbox',
        type: 'number',
        label: 'Buffer Time (in mins)',
        value: manageReservationAnswer.slotInterval ?? '0',
        validators: [Validators.required],
      },
      {
        key: 'tableCount',
        controlType: 'textbox',
        type: 'number',
        label: 'Table Count',
        value: manageReservationAnswer.tableCount ?? '0',
        validators: [Validators.required],
        errorMessage: {
          required: 'Table Count cannot be empty.',
        },
      },
      {
        key: 'capacityPerTable',
        controlType: 'textbox',
        type: 'number',
        label: 'Total Persons Per table',
        value: manageReservationAnswer.capacityPerTable ?? '0',
        validators: [Validators.required],
        errorMessage: {
          required: 'Table Capacity cannot be empty.',
        },
      },
    ];
  }
}

export function businessHourValidation() {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value >= 1 && control.value <= 24) {
      return null;
    }
    return { invalidHour: { value: control.value } };
  };
}
