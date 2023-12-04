import { Validators } from '@angular/forms';
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
      },
      {
        key: 'about',
        controlType: 'textbox',
        type: 'text',
        label: 'About Us',
        validators: [Validators.required],
      },
      {
        key: 'logo',
        type: 'text',
        controlType: 'textbox',
        label: 'Logo Name',
        validators: [Validators.required],
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
          },
          {
            key: 'city',
            type: 'text',
            controlType: 'textbox',
            label: 'City',
            validators: [Validators.required],
          },
          {
            key: 'state',
            type: 'text',
            controlType: 'textbox',
            label: 'State',
            validators: [Validators.required],
          },
          {
            key: 'postalCode',
            type: 'text',
            controlType: 'textbox',
            label: 'PostalCode',
            validators: [Validators.required],
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
            validators: [Validators.required],
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
          },
          {
            key: 'email',
            type: 'email',
            controlType: 'textbox',
            label: 'Email',
            validators: [Validators.required, Validators.email],
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
            controlType: 'textbox',
            label: 'Monday',
            validators: [Validators.required],
          },
          {
            key: 'tuesday',
            type: 'text',
            controlType: 'textbox',
            label: 'Tuesday',
            validators: [Validators.required],
          },
          {
            key: 'wednesday',
            type: 'text',
            controlType: 'textbox',
            label: 'Wednesday',
            validators: [Validators.required],
          },
          {
            key: 'thursday',
            type: 'text',
            controlType: 'textbox',
            label: 'Thursday',
            validators: [Validators.required],
          },
          {
            key: 'friday',
            type: 'text',
            controlType: 'textbox',
            label: 'Friday',
            validators: [Validators.required],
          },
          {
            key: 'saturday',
            type: 'text',
            controlType: 'textbox',
            label: 'Saturday',
            validators: [Validators.required],
          },
          {
            key: 'sunday',
            controlType: 'textbox',
            type: 'text',
            label: 'Sunday',
            validators: [Validators.required],
          },
        ],
      },
    ];
  }
}
