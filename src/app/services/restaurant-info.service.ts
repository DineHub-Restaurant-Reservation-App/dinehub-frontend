import { AbstractControl, Validators } from '@angular/forms';
import { Question } from '../models/question.model';

export class RestaurantInfoService {
  getGeneralInformationQuestions(): Question[] {
    return [
      {
        key: 'name',
        controlType: 'textbox',
        type: 'text',
        label: 'Restaurant Name',
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
            validators: [],
          },
          {
            key: 'phoneNumber',
            type: 'tel',
            controlType: 'textbox',
            label: 'Phone Number',
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
            hint: 'Hint: Use the pattern 9AM - 9PM or closed',
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
            hint: 'Hint: Use the pattern 9AM - 9PM or closed',
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
            hint: 'Hint: Use the pattern 9AM - 9PM or closed',
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
            hint: 'Hint: Use the pattern 9AM - 9PM or closed',
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
            hint: 'Hint: Use the pattern 9AM - 9PM or closed',
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
            hint: 'Hint: Use the pattern 9AM - 9PM or closed',
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
            hint: 'Hint: Use the pattern 9AM - 9PM or closed',
            validators: [Validators.required],
            errorMessage: {
              required: 'Operating Hours cannot be empty.',
            },
          },
        ],
      },
    ];
  }

  getManageReservationQuestions(): Question[] {
    return [
      {
        key: 'slotInterval',
        controlType: 'textbox',
        type: 'number',
        label: 'Slot Interval (in mins)',
        value: '60',
        validators: [Validators.required],
      },
      {
        key: 'bufferTime',
        controlType: 'textbox',
        type: 'number',
        label: 'Buffer Time (in mins)',
        value: '0',
        validators: [Validators.required],
      },
      {
        key: 'tableCount',
        controlType: 'textbox',
        type: 'number',
        label: 'Table Count',
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
