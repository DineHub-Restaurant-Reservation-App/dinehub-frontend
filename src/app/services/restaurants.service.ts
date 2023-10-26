import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class RestaurantsService {
  private _restaurants: Restaurant[] = [];

  get restaurants() {
    return [...this._restaurants];
  }

  public fetchRestaurants() {}
}
