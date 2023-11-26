import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  businessFormGroup,
  loginForm,
  loginPageContent,
  signUpFormBusiness,
  signUpFormCustomer,
  signUpPageContent,
} from './auth.util';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form!: FormGroup;
  isSignUpPage!: boolean;
  content!: any;
  user!: BehaviorSubject<User | null>;
  formControls!: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path) {
      this.isSignUpPage = this.route.snapshot.url[0].path !== 'login';
    }
    let dynamicFormGroup: any = {};
    if (this.isSignUpPage) {
      this.formControls = businessFormGroup;
      businessFormGroup.forEach((formControl) => {
        dynamicFormGroup[formControl.controlName] = [
          '',
          formControl.validators,
        ];
      });
      this.form = this.fb.group(dynamicFormGroup);
      this.content = signUpPageContent;
    } else {
      this.form = this.fb.group(loginForm);
      this.content = loginPageContent;
    }
    if (this.user) {
      this.user.subscribe((data) => {
        console.log(data);
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  getErrorMessage(formControl: any) {}

  onSubmit() {
    if (this.form.valid) {
      if (this.isSignUpPage) {
        this.handleSignUp();
      } else {
        this.handleLogin();
      }
    } else {
      this.snackBar.open('Invalid authentication credential', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
      });
    }
  }

  handleSignUp() {
    const { email, password, restaurantName } = this.form.value;
    this.authService.signUp(email, password, restaurantName).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => this.handleAuthError(error)
    );
  }
  handleLogin() {
    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => this.handleAuthError(error)
    );
  }

  handleAuthError(errorMessage: string) {
    this.snackBar.open(errorMessage, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
