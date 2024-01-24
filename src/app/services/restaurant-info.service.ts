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
        value: answer.bannerImage ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'Banner Url cannot be empty.',
        },
      },
      {
        key: 'websiteURL',
        type: 'text',
        controlType: 'textbox',
        label: 'WebsiteURL',
        value: answer?.websiteURL ?? null,
        validators: [],
      },
      {
        key: 'phoneNumber',
        type: 'tel',
        controlType: 'textbox',
        label: 'Phone Number',
        value: answer?.phoneNumber ?? null,
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
        value: answer?.email ?? null,
        validators: [Validators.required, Validators.email],
        errorMessage: {
          required: 'Email address cannot be empty.',
          email: 'Please enter a valid email address.',
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
            key: 'province',
            type: 'text',
            controlType: 'textbox',
            label: 'Province',
            value: answer?.address.province ?? null,
            validators: [Validators.required],
            errorMessage: {
              required: 'Province name cannot be empty.',
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
          {
            key: 'country',
            type: 'text',
            controlType: 'textbox',
            label: 'Country',
            value: answer?.address.country ?? 'Canada',
            validators: [Validators.required],
            errorMessage: {
              required: 'country name cannot be empty.',
            },
          },
        ],
      },
      {
        key: 'businessHour',
        label: 'Operating Hours',
        hint: 'Enter timings in 24-hour format (e.g., 09:00). Use "00:00" for holidays.',
        questions: [
          {
            key: 'monday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Monday',
            startingTime: answer.businessHour.mondayStartingTime ?? '00:00',
            endingTime: answer.businessHour.mondayEndingTime ?? '00:00',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'tuesday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Tuesday',
            startingTime: answer?.businessHour.tuesdayStartingTime ?? '00:00',
            endingTime: answer?.businessHour.tuesdayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'wednesday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Wednesday',
            startingTime: answer?.businessHour.wednesdayStartingTime ?? '00:00',
            endingTime: answer?.businessHour.wednesdayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'thursday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Thursday',
            startingTime: answer?.businessHour.thursdayStartingTime ?? '00:00',
            endingTime: answer?.businessHour.thursdayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'friday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Friday',
            startingTime: answer?.businessHour.fridayStartingTime ?? '00:00',
            endingTime: answer?.businessHour.fridayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'saturday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Saturday',
            startingTime: answer?.businessHour.saturdayStartingTime ?? '00:00',
            endingTime: answer?.businessHour.saturdayEndingTime ?? '00:00',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (1:00 - 24:59)',
            },
          },
          {
            key: 'sunday',
            controlType: 'businessHour',
            type: 'text',
            label: 'Sunday',
            startingTime: answer?.businessHour.sundayStartingTime ?? '00:00',
            endingTime: answer?.businessHour.sundayEndingTime ?? '00:00',
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
