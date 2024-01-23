import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

interface AuthResponseData {
  token: string;
  userId: string;
  email: string;
  expiresIn: string;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private _expirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  signUp(email: string, password: string, restaurantName: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:8080/restaurant_app/v1/api/auth/register',
        {
          restaurantName,
          password,
          email,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.userId,
            responseData.token,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:8080/restaurant_app/v1/api/auth/login',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.userId,
            responseData.token,
            +responseData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    /* TODO:
     * If token is expired, redirect to login
     */
    const userData = localStorage.getItem('user_data');
    if (!userData) {
      return;
    }
    const parsedUserData = JSON.parse(userData);
    const authenticatedUser = new User(
      parsedUserData.email,
      parsedUserData.userId,
      parsedUserData._token,
      parsedUserData._tokenExpirationDate
    );
    if (authenticatedUser.token === null) {
      return;
    }
    this.user.next(authenticatedUser);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user_data');
    if (this._expirationTimer) {
      clearTimeout(this._expirationTimer);
    }
    this.router.navigate(['login']);
  }

  autoLogout(expiresIn: number) {
    this._expirationTimer = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(expiresIn);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('user_data', JSON.stringify(user));
    this.autoLogout(expiresIn);
  }

  private handleError(errResponse: HttpErrorResponse) {
    console.log(errResponse);
    let errorMessage: string = 'An error has occurred!';
    if (errResponse.error.code) {
      switch (errResponse.error.code) {
        case 'USER_ALREADY_EXISTING':
          errorMessage = 'Email address already existing!';
          break;
        case 'DUPLICATE_RESTAURANT':
          errorMessage =
            'Restaurant name already taken. Please try a different name!';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Invalid email/ password';
          break;
        case 'INVALID_TOKEN':
          errorMessage = 'Please login again!';
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
