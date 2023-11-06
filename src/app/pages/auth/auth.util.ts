import { Validators } from '@angular/forms';

export const signUpForm = {
  restaurantName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: [
    '',
    [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
  ],
};

export const loginForm = {
  email: ['', [Validators.required, Validators.email]],
  password: [
    '',
    [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
  ],
};

export const signUpPageContent = {
  title:
    "Discover<span class='dot'>.</span> Connect<span class='dot'>.</span> Delight<span class='dot'>.</span>",
  desc: 'Where diners and restaurateurs unite for unforgettable experiences. Join our vibrant community today and embark on a culinary adventure like never before.',
};

export const loginPageContent = {
  title: "Welcome Back <span class='dot'>!</span>",
  desc: 'Log in to your account and access a world of dining and business opportunities. Join our community today.',
};
