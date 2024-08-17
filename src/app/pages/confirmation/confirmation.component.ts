import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  reservation!: Reservation;
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const restaurantId = this.route.snapshot.params['restaurantId'];
    const reservationId = this.route.snapshot.params['reservationId'];
    const date = decodeURIComponent(this.route.snapshot.paramMap.get('date') || '');
    const time = this.route.snapshot.params['time'];
    this.reservationService.getReservation({restaurantId, reservationId, date, time}).subscribe((data:any) => {
      console.log(data);
      this.reservation = data;
      this.isLoaded = true;
    });
  }
}
