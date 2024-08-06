import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private selectedRestaurant: any = null;
  private url = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  bookReservation(reservation: Reservation) {
    return this.http
      .post<{ savedReservation: Reservation }>(
        `${this.url}/reservation`,
        reservation
      )
      .pipe(map((response) => response.savedReservation));
  }

  getReservation(reservationId: string) {
    return this.http
      .get<{ reservation: Reservation }>(
        `${this.url}/reservation/${reservationId}`
      )
      .pipe(map((response) => response.reservation));
  }
}
