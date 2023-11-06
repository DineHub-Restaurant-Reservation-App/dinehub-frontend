import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private _expirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  signUp(email: string, password: string, username: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1AhswFPRQsr_wn0M9knAmEcnnthKR734',
        {
          email: email,
          password: password,
          displayName: username,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1AhswFPRQsr_wn0M9knAmEcnnthKR734',
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
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  autoLogin() {
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
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('user_data', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage: string = 'An error has occurred!';
    if (errResponse.error.error.message) {
      switch (errResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email address already existing!';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Invalid email/ password';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid email/ password';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Invalid email/ password';
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
