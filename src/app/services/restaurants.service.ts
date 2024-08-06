import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subject, exhaustMap, map, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Address } from '../models/address.model';
import { Menu } from '../models/menu.model';
import { Restaurant } from '../models/restaurants.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
@Injectable()
export class RestaurantsService {
  private URL: string = `${environment.API_ENDPOINT}/restaurants`;
  restaurant = new Subject<Restaurant | null>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchRestaurants(name: string = '') {
    let url = `${this.URL}`;
    if (name) {
      url += `/search?name=${name}`;
    }
    return this.http
      .get<Restaurant[]>(url);
  }

  fetchRestaurant(name: string) {
    return this.http
      .get<{ restaurant: Restaurant }>(`${this.URL}/name/${name}`)
      .pipe(map((responseData): Restaurant => responseData.restaurant));
  }

  createRestaurant(name: string) {
    // const restaurant: Restaurant = {
    //   name,
    //   about: '',
    //   address: new Address('', '', '', '', ''),
    //   bannerImageHref: '',
    //   businessHours: [],
    //   // cuisine: [],
    //   // id: '',
    //   logoHref: '',
    //   // menu: {
    //   //   restaurantMenu: [],
    //   // },
    //   // rating: 0,
    //   url: `restaurants/${name}`,
    // };
    const restaurant: any= {}
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (user && user.token && user.userId) {
          return this.http.put<Restaurant>(
            `${environment.API_ENDPOINT}/api/restaurants/${user.userId}.json`,
            { ...restaurant },
            {
              params: new HttpParams().set('auth', user ? user.token : ''),
            }
          );
        }
        return EMPTY;
      })
    );
  }

  fetchMenu(restaurantId: string) {
    return this.http
      .get<{ restaurantMenu: any }>(
        `${environment.API_ENDPOINT}/menu/restaurant/${restaurantId}`
      )
      .pipe(
        map((responseData: any) => {
          return responseData.restaurantMenu[0];
        })
      );
  }
}
