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
    const reservationId = this.route.snapshot.params['id'];

    this.reservationService.getReservation(reservationId).subscribe((data) => {
      this.reservation = data;
      this.isLoaded = true;
    });
  }
}
