import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant.model';
import { User } from '../models/user.model';

interface AuthResponseData {
  token: string;
  restaurant: Restaurant;
}

@Injectable()
export class AuthService {
  private URL: string = `${environment.API_ENDPOINT}`;
  user = new BehaviorSubject<User | null>(null);
  private _expirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  signUp(
    email: string,
    password: string,
    restaurantName: string,
    contactNumber: string
  ) {
    return this.http
      .post(`${this.URL}/restaurant`, {
        name: restaurantName,
        businessEmail: email,
        password,
        contactNumber,
      })
      .pipe(
        catchError(this.handleError)
        // tap((responseData) => {
        //   this.handleAuthentication(
        //     responseData.email,
        //     responseData.userId,
        //     responseData.token,
        //     +responseData.expiresIn
        //   );
        // })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.URL}/restaurant/auth/login`, {
        email, password
      })
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.restaurant,
            responseData.token
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
      parsedUserData.restaurant,
      parsedUserData._token,
      parsedUserData._tokenExpirationDate,
      parsedUserData.userId
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

  private handleAuthentication(restaurant: Restaurant, token: string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2);

    const user = new User(restaurant, token, expirationDate, restaurant._id);
    this.user.next(user);
    localStorage.setItem('user_data', JSON.stringify(user));
    // this.autoLogout(expirationDate.getTime());
  }

  private handleError(errResponse: HttpErrorResponse) {
    console.log(errResponse);
    let errorMessage: string = errResponse.error.message
      ? errResponse.error.message
      : errResponse.error.error
      ? errResponse.error.error
      : 'An error has occurred!';

    return throwError(() => new Error(errorMessage));
  }
}
