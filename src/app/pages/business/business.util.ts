import { Validators } from '@angular/forms';

export const signUpForm = {
  restaurantName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: [
    '',
    [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
  ],
  phone: [
    '',
    [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
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
    "Join<span class='dot'>.</span> Showcase<span class='dot'>.</span> Thrive<span class='dot'>.</span>",
  desc: "Ready to expand your restaurant's reach and delight more diners? Join us today and take the first step to grow your business.",
};

export const loginPageContent = {
  title: "Welcome Back <span class='dot'>!</span>",
  desc: 'Login to your account to manage your restaurant and connect with diners.',
};
