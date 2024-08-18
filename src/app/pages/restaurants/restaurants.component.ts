import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { tap } from 'rxjs';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from '../../models/restaurants.model';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  searchTerm!: string;
  restaurants!: Restaurant[];
  filteredRestaurants: Restaurant[] = [];
  isLoading: boolean = true;

  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantService.fetchRestaurants().pipe(tap(()=>{
    })).subscribe((restaurants) => {
      this.isLoading = false;
      this.restaurants = restaurants;
      this.filteredRestaurants = this.restaurants;
    });
  }

  onClickSearchBtn() {
    if (this.searchTerm === '') {
      this.filteredRestaurants = this.restaurants;
      return;
    }
    
    const filteredRestaurantsBySearch = this.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
    this.filteredRestaurants = filteredRestaurantsBySearch;
  }

  restaurantsAvailableForReservation(restaurants: Restaurant[]) {
    return restaurants.filter((restaurant) => {
      if (
        restaurant.about === '' ||
        restaurant.businessHours.length == 0 ||
        restaurant.seatingArrangements.length == 0 ||
        restaurant.logoHref === '' ||
        restaurant.bannerImageHref === '' ||
        restaurant.phoneNumber === ''
      ) {
        return false;
      }
      return true;
    });
  }
}
