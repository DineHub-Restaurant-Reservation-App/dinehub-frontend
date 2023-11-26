import { Validators } from '@angular/forms';

export const signUpFormBusiness = {
  restaurantName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
};

export const signUpFormCustomer = {
  userName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
};

export const loginForm = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
};

export const businessFormGroup = [
  {
    controlName: 'restaurantName',
    controlType: 'text',
    label: 'Restaurant Name',
    validators: [Validators.required],
    errorMessage: {
      required: 'Restaurant name cannot be empty.',
    },
    errorsMsgs: [
      {
        key: 'required',
        msg: 'Restaurant name cannot be empty.',
      },
    ],
  },
  {
    controlName: 'email',
    controlType: 'text',
    label: 'Restaurant Email',
    validators: [Validators.required, Validators.email],
    errorsMsgs: [
      {
        key: 'required',
        msg: 'Email address cannot be empty.',
      },
      {
        key: 'email',
        msg: 'Please enter a valid email address.',
      },
    ],
  },
  {
    controlName: 'password',
    controlType: 'password',
    label: 'Password',
    validators: [Validators.required, Validators.minLength(6)],
    errorsMsgs: [
      {
        key: 'required',
        msg: 'Password cannot be empty',
      },
      {
        key: 'minLength',
        msg: 'Password should have minimum 6 characters.',
      },
    ],
  },
];

export const createFormObj = (formType: string) => {};

export const signUpPageContent = {
  title:
    "Discover<span class='dot'>.</span> Connect<span class='dot'>.</span> Delight<span class='dot'>.</span>",
  desc: 'Where diners and restaurateurs unite for unforgettable experiences. Join our vibrant community today and embark on a culinary adventure like never before.',
};

export const loginPageContent = {
  title: "Welcome Back <span class='dot'>!</span>",
  desc: 'Log in to your account and access a world of dining and business opportunities. Join our community today.',
};
