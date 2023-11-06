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
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  loginForm,
  loginPageContent,
  signUpForm,
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
  authMode = new FormControl('business');
  user!: BehaviorSubject<User | null>;
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
    if (this.isSignUpPage) {
      this.form = this.fb.group(signUpForm);
      this.content = signUpPageContent;
    } else {
      this.form = this.fb.group(loginForm);
      this.content = loginPageContent;
    }
    console.log(this.form);
    if (this.user) {
      this.user.subscribe((data) => {
        console.log(data);
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isSignUpPage) {
        const { email, password, restaurantName } = this.form.value;
        this.authService.signUp(email, password, restaurantName).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => this.handleAuthError(error)
        );
      } else {
        const { email, password } = this.form.value;
        this.authService.login(email, password).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => this.handleAuthError(error)
        );
      }
    } else {
      this.snackBar.open('Invalid authentication credential', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
      });
    }
  }

  handleAuthError(errorMessage: string) {
    this.snackBar.open(errorMessage, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
