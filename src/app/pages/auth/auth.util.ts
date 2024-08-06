import { ValidatorFn, Validators } from '@angular/forms';

export interface FormControlObject {
  controlName: string;
  controlType: string;
  label: string;
  validators: ValidatorFn[];
  errorMessage: { [key: string]: string };
}

export const loginFormGroup: FormControlObject[] = [
  {
    controlName: 'email',
    controlType: 'text',
    label: 'Email',
    validators: [Validators.required, Validators.email],
    errorMessage: {
      required: 'Email address cannot be empty.',
      email: 'Please enter a valid email address.',
    },
  },
  {
    controlName: 'password',
    controlType: 'password',
    label: 'Password',
    validators: [Validators.required, Validators.minLength(6)],
    errorMessage: {
      required: 'Password cannot be empty.',
      minLength: 'Password should have minimum 6 characters.',
    },
  },
];

export const signUpFormGroup: FormControlObject[] = [
  {
    controlName: 'restaurantName',
    controlType: 'text',
    label: 'Restaurant Name',
    validators: [Validators.required],
    errorMessage: {
      required: 'Restaurant name cannot be empty.',
    },
  },
  {
    controlName: 'email',
    controlType: 'text',
    label: 'Restaurant Email',
    validators: [Validators.required, Validators.email],
    errorMessage: {
      required: 'Email address cannot be empty.',
      email: 'Please enter a valid email address.',
    },
  },
  {
    controlName: 'password',
    controlType: 'password',
    label: 'Password',
    validators: [Validators.required, Validators.minLength(6)],
    errorMessage: {
      required: 'Password cannot be empty.',
      minLength: 'Password should have minimum 6 characters.',
    },
  },
  {
    controlName: 'contactNumber',
    controlType: 'text',
    label: 'Contact Number',
    validators: [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ],
    errorMessage: {
      required: 'Restaurant name cannot be empty.',
      minLength: 'Phone number should have minimum 10 characters.',
      maxLength: 'Phone number should have maximum 10 characters.',
    },
  },
];

export const signUpPageContent = {
  title:
    "Discover<span class='dot'>.</span> Connect<span class='dot'>.</span> Delight<span class='dot'>.</span>",
  desc: 'Where diners and restaurateurs unite for unforgettable experiences. Join our vibrant community today and embark on a culinary adventure like never before.',
};

export const loginPageContent = {
  title: "Welcome Back <span class='dot'>!</span>",
  desc: 'Log in to your account and access a world of dining and business opportunities. Join our community today.',
};
