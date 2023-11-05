import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  Validators,
} from '@angular/forms';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  loginForm,
  loginPageContent,
  signUpForm,
  signUpPageContent,
} from './business.util';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  form!: FormGroup;
  isSignUpPage!: boolean;
  content!: any;
  authMode = new FormControl('business');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path) {
      this.isSignUpPage = this.route.snapshot.url[0].path !== 'login';
    }
    if (this.isSignUpPage) {
      this.form = this.fb.group(signUpForm);
      this.content = signUpPageContent;
    } else {
      this.form = this.fb.group(loginForm);
      this.content = loginPageContent;
    }
    console.log(this.form);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  onSubmit() {
    this.snackBar.open('Invalid form', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
