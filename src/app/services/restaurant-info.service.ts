import { AbstractControl, Validators } from '@angular/forms';
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
        key: 'operatingHours,',
        label: 'Operating Hours',
        questions: [
          {
            key: 'monday',
            type: 'text',
            controlType: 'operatingHour',
            label: 'Monday',
            value: answer?.operatingHours.monday ?? '12 AM - 12 PM',
            hint: 'Hint: Use the pattern 9 AM - 9 PM or closed',
            validators: [Validators.required, businessHourValidation()],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
            },
          },
          {
            key: 'tuesday',
            type: 'text',
            controlType: 'textbox',
            label: 'Tuesday',
            value: answer?.operatingHours.tuesday ?? '12 AM - 12 PM',
            hint: 'Hint: Use the pattern 9 AM - 9 PM or closed',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
            },
          },
          {
            key: 'wednesday',
            type: 'text',
            controlType: 'textbox',
            label: 'Wednesday',
            value: answer?.operatingHours.wednesday ?? '12 AM - 12 PM',
            hint: 'Hint: Use the pattern 9 AM - 9 PM or closed',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
            },
          },
          {
            key: 'thursday',
            type: 'text',
            controlType: 'textbox',
            label: 'Thursday',
            value: answer?.operatingHours.thursday ?? '12 AM - 12 PM',
            hint: 'Hint: Use the pattern 9 AM - 9 PM or closed',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
            },
          },
          {
            key: 'friday',
            type: 'text',
            controlType: 'textbox',
            label: 'Friday',
            value: answer?.operatingHours.friday ?? '12 AM - 12 PM',
            hint: 'Hint: Use the pattern 9 AM - 9 PM or closed',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
            },
          },
          {
            key: 'saturday',
            type: 'text',
            controlType: 'textbox',
            label: 'Saturday',
            value: answer?.operatingHours.saturday ?? '12 AM - 12 PM',
            hint: 'Hint: Use the pattern 9 AM - 9 PM or closed',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
            },
          },
          {
            key: 'sunday',
            controlType: 'textbox',
            type: 'text',
            label: 'Sunday',
            value: answer?.operatingHours.sunday ?? '12 AM - 12 PM',
            hint: 'Hint: Use the pattern 9 AM - 9 PM or closed',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
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
  return (control: AbstractControl) => {
    return null;
  };
}
