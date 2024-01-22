import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import {
  FormControlObject,
  loginFormGroup,
  loginPageContent,
  signUpFormGroup,
  signUpPageContent,
} from './auth.util';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSignUpPage!: boolean;
  content!: any;
  user!: BehaviorSubject<User | null>;
  formControls!: FormControlObject[];
  $createRestaurantSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private restaurantService: RestaurantsService
  ) {}

  ngOnDestroy(): void {
    if (this.$createRestaurantSubscription) {
      this.$createRestaurantSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path) {
      this.isSignUpPage = this.route.snapshot.url[0].path !== 'login';
    }
    let dynamicFormGroup: any = {};
    if (this.isSignUpPage) {
      this.formControls = signUpFormGroup;
      this.content = signUpPageContent;
    } else {
      this.formControls = loginFormGroup;
      this.content = loginPageContent;
    }
    this.formControls.forEach((formControl) => {
      dynamicFormGroup[formControl.controlName] = ['', formControl.validators];
    });
    this.form = this.fb.group(dynamicFormGroup);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  getErrorMessage(control: any, formControl: AbstractControl) {
    if (formControl.errors) {
      const errorKeys = Object.keys(formControl.errors);
      let errorMessage = 'Invalid Data';
      errorKeys.forEach((error) => {
        if (error === 'required') {
          errorMessage = control.errorMessage.required;
        } else if (error === 'email') {
          errorMessage = control.errorMessage.email;
        } else if (error === 'minLength') {
          errorMessage = control.errorMessage.minLength;
        }
      });
      return errorMessage;
    }
    return '';
  }

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
        this.router.navigate(['app']);
      },
      (error) => this.handleAuthError(error)
    );
  }

  setUpRestaurant(restaurantName: string, email: string) {
    this.snackBar.open('Creating Restaurant!');
    this.restaurantService.createRestaurant(restaurantName).subscribe(
      () => {
        this.snackBar.dismiss();
        this.router.navigate(['app']);
      },
      (error) => this.handleAuthError('Error while creating restaurant!')
    );
  }

  handleLogin() {
    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe(
      (data) => {
        this.router.navigate(['app']);
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
