import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  @ViewChild('searchTextField') searchTermField!: ElementRef;
  restaurants!: Restaurant[];

  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
  }

  onClickSearchBtn() {
    this.restaurantService
      .fetchRestaurants(this.searchTermField.nativeElement.value)
      .subscribe((restaurants) => {
        this.restaurants = restaurants;
      });
  }
}
