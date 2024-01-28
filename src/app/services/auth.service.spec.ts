import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

describe('Auth Service Test', () => {
  let service!: AuthService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService, HttpClient, Router, provideHttpClientTesting()],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should signup successfully on calling the function', async () => {
    const mockResponse = {
      token: '2347skjdhf83724',
      userId: '2348729834jsdhfjks',
      email: 'test@gmail.com',
      expiresIn: '5000',
    };

    const signUp$ = service.signUp('test@gmail.com', 'abcdefg', 'DineHub');
    let signUpPromise: any;

    signUpPromise = firstValueFrom(signUp$);

    const req = httpTestingController.expectOne(
      'http://localhost:8080/restaurant_app/v1/api/auth/register',
      'Request to sign up the new restaurant'
    );

    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);

    expect(await signUpPromise).toBe(mockResponse);

    httpTestingController.verify();
  });

  it('should handle error response if signup fails', async () => {
    const errorReponseCode = 'An error has occurred!';

    const signUp$ = service.signUp('test@gmail.com', 'abcdefg', 'DineHub');
    const signUpResponse = signUp$.subscribe(
      () => {
        fail('Expected error reponse, but got successful response');
      },
      (error) => {
        expect(error.message).toBe(errorReponseCode);
      }
    );

    const req = httpTestingController.expectOne(
      {
        method: 'POST',
        url: 'http://localhost:8080/restaurant_app/v1/api/auth/register',
      },
      'Request to sign up the new restaurant'
    );

    req.error(new ProgressEvent(errorReponseCode));
  });
});
