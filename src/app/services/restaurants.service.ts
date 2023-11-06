import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable()
export class RestaurantsService {
  private URL: string =
    'https://dinehub-24505-default-rtdb.firebaseio.com/restaurants';

  constructor(private http: HttpClient) {}

  public fetchRestaurants(name: string = '') {
    let url = `${this.URL}.json`;
    if (name) {
      url += `?orderBy="$key"&startAt="${name}"&endAt="${name}\uf8ff"`;
    }
    return this.http
      .get(url)
      .pipe(map((responseData): Restaurant[] => Object.values(responseData)));
  }

  public fetchRestaurant(name: string) {
    return this.http.get<Restaurant>(`${this.URL}/${name}.json`);
  }
}
