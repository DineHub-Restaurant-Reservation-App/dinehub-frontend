import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private selectedRestaurant: any = null;
  private url = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getAvailableSeats(seatRequest: any) {
    const params = new HttpParams({ fromObject: seatRequest });

    return this.http.get<string[]>(`${this.url}/reservation/seats`, { params });
  }

  bookReservation(reservation: any) {
    return this.http.post(`${this.url}/reservation/reserve`, reservation);
  }

  getReservation(reservationRequest: any) {
    const params = new HttpParams({ fromObject: reservationRequest });

    return this.http.get<Reservation>(`${this.url}/reservation/get-reservation`, {
      params,
    });
  }
}
