import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class RestaurantsService {
  private _restaurants: Restaurant[] = [];

  constructor(private http: HttpClient) {}
  get restaurants() {
    return [...this._restaurants];
  }

  public fetchRestaurants(name: string = '') {
    let url =
      'https://dinehub-24505-default-rtdb.firebaseio.com/restaurants.json';
    if (name) {
      url += `?orderBy="$key"&startAt="${name}"&endAt="${name}\uf8ff"`;
    }
    console.log(url);
    return this.http
      .get(url)
      .pipe(map((responseData): Restaurant[] => Object.values(responseData)));
  }
}
