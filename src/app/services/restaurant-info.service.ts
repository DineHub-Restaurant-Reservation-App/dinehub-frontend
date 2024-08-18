import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
        key: 'logoHref',
        type: 'text',
        controlType: 'textbox',
        label: 'Logo Url',
        value: answer.logoHref ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'Logo Url cannot be empty.',
        },
      },
      {
        key: 'bannerImageHref',
        type: 'text',
        controlType: 'textbox',
        label: 'Banner Url',
        value: answer.bannerImageHref ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'Banner Url cannot be empty.',
        },
      },
      {
        key: 'url',
        type: 'text',
        controlType: 'textbox',
        label: 'Website URL',
        value: answer?.url ?? null,
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
          Validators.minLength(10),
          Validators.maxLength(10),
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
        key: 'cuisine',
        type: 'text',
        controlType: 'textbox',
        label: 'Cuisine',
        value: answer?.cuisine ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'Cuisine cannot be empty.',
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
            value: answer?.address?.street ?? null,
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
            value: answer?.address?.city ?? null,
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
            value: answer?.address?.province ?? null,
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
            value: answer?.address?.postalCode ?? null,
            validators: [
              Validators.required,
              Validators.pattern(/^\w{3} \w{3}$/)
            ],
            errorMessage: {
              required: 'Postal code cannot be empty.',
              pattern: 'Postal should be of the format ABC DEF',
            },
          },
          {
            key: 'country',
            type: 'text',
            controlType: 'textbox',
            label: 'Country',
            value: answer?.address?.country ?? 'Canada',
            validators: [Validators.required],
            errorMessage: {
              required: 'country name cannot be empty.',
            },
          },
        ],
      },
      {
        key: 'businessHours',
        label: 'Operating Hours',
        hint: 'Enter timings in 12-hour format (e.g., 09:00 AM). Use "00:00 AM" for holidays.',
        questions: [
          {
            key: 'sunday',
            controlType: 'businessHour',
            type: 'text',
            label: 'Sunday',
            startingTime:
              answer?.businessHours[0]?.from ?? '00:00',
            endingTime: answer?.businessHours[0]?.to ?? '00:00',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (00:00 - 24:00).',
            },
          },
          {
            key: 'monday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Monday',
            startingTime:
              answer?.businessHours[1]?.from ?? '00:00 AM',
            endingTime:
              answer?.businessHours[1]?.to ?? '00:00 AM',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (00:00 - 24:00).',
            },
          },
          {
            key: 'tuesday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Tuesday',
            startingTime:
              answer?.businessHours[2]?.from ?? '00:00 AM',
            endingTime:
              answer?.businessHours[2]?.to ?? '00:00 AM',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (00:00 - 24:00).',
            },
          },
          {
            key: 'wednesday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Wednesday',
            startingTime:
              answer?.businessHours[3]?.from ?? '00:00 AM',
            endingTime:
              answer?.businessHours[3]?.to ?? '00:00 AM',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (00:00 - 24:00).',
            },
          },
          {
            key: 'thursday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Thursday',
            startingTime:
              answer?.businessHours[4]?.from ?? '00:00 AM',
            endingTime:
              answer?.businessHours[4]?.to ?? '00:00 AM',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (00:00 - 24:00).',
            },
          },
          {
            key: 'friday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Friday',
            startingTime:
              answer?.businessHours[5]?.from ?? '00:00',
            endingTime: answer?.businessHours[5]?.to ?? '00:00',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (00:00 - 24:00).',
            },
          },
          {
            key: 'saturday',
            type: 'text',
            controlType: 'businessHour',
            label: 'Saturday',
            startingTime:
              answer?.businessHours[6]?.from ?? '00:00',
            endingTime: answer?.businessHours[6]?.to ?? '00:00',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
              invalidHour: 'Enter a valid time (00:00 - 24:00).',
            },
          }
        ],
      },
      {
        key: 'slotInterval',
        type: 'text',
        controlType: 'textbox',
        label: 'Slot Interval (Please add 30, 60, 90, etc...',
        value: answer?.slotInterval ?? null,
        validators: [Validators.required],
        errorMessage: {
          required: 'Slot Interval cannot be empty.',
        },
      },
      {
        key: 'seatingArrangements',
        controlType: 'seatingArrangements',
        label: 'Seating Arrangements',
        formArray: answer?.seatingArrangements ?? [],
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

export function businessHourValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const timeRegex = /^(0|1?[0-9]|2[0-4]):([0-5][0-9])$/;
    const isValidFormat = timeRegex.test(control.value);

    if (isValidFormat) {
      return null;
    }

    return { invalidHour: { value: control.value } };
  };
}
