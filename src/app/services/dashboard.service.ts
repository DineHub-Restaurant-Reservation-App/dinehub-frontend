import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, take, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu.model';
import { Restaurant } from '../models/restaurants.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

export interface GeneralInfoType {
  name: String;
  address: any;
  bannerImage: String;
  logo: String;
  businessHour: BusinessHour;
  cuisine: String;
  rating: String;
  about: String;
  websiteURL: String;
  phoneNumber: String;
  email: String;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
}

export interface BusinessHour {
  mondayStartingTime: string;
  mondayEndingTime: string;
  tuesdayStartingTime: string;
  tuesdayEndingTime: string;
  wednesdayStartingTime: string;
  wednesdayEndingTime: string;
  thursdayStartingTime: string;
  thursdayEndingTime: string;
  fridayStartingTime: string;
  fridayEndingTime: string;
  saturdayStartingTime: string;
  saturdayEndingTime: string;
  sundayStartingTime: string;
  sundayEndingTime: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  public generalInfoSubject: Subject<{}> = new Subject();
  public reservationInfoSubject: Subject<{}> = new Subject();
  public menu$: Subject<{}> = new Subject();
  private URL: string = `${environment.API_ENDPOINT}`;
  private currentUser?: User | null;
  private categories: any = [];
  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
  }

  private menu: any = [];
  

  getGeneralInfoData() {
    return this.http.get<Restaurant>(`${this.URL}/restaurant/auth`, {
      headers: {
        Authorization: `Bearer ${this.currentUser?.token}`,
      },
    });
  }

  getReservations(restaurantId: string) {
    return this.http
      .get(`${this.URL}/reservation/restaurant/${restaurantId}`)
      .pipe(catchError(this.handleReservationsError));
  }

  handleReservationsError(errResponse: HttpErrorResponse) {
    let errorMessage: string = errResponse.error.message
      ? errResponse.error.message
      : errResponse.error.error
      ? errResponse.error.error
      : 'Error loading reservation!';

    return throwError(() => new Error(errorMessage));
  }

  getMenuDataByCategory(restaurantId: string) {
    console.log('Fetching menus', this.currentUser?.restaurant.menu);

    return this.http
      .get<{ restaurantMenu: any }>(
        `${this.URL}/menu/${this.currentUser?.restaurant.menu}`,
        {
          headers: {
            Authorization: `Bearer ${this.currentUser?.token}`,
          },
        }
      )
      .pipe(
        tap((data: any) => {
          this.menu = data;
        })
      );
  }

  extractCategoriesAndUpdate(menuItems: any) {
    this.categories = [];
    menuItems.forEach((item: any) => {
      this.categories.push(item.categoryName);
    });
  }

  getCategories() {
    console.log('categories: ', this.menu);
    return this.menu.categories;
  }

  updateGeneralInfoData(data: any) {
    const mappedBusinessHours = [
      {
        openHours: {
          startTime: data.businessHours.mondayStartingTime,
          endTime: data.businessHours.mondayEndingTime,
        },
        day: 'Monday',
      },
      {
        openHours: {
          startTime: data.businessHours.thursdayStartingTime,
          endTime: data.businessHours.tuesdayEndingTime,
        },
        day: 'Tuesday',
      },
      {
        openHours: {
          startTime: data.businessHours.wednesdayStartingTime,
          endTime: data.businessHours.wednesdayEndingTime,
        },
        day: 'Wednesday',
      },
      {
        openHours: {
          startTime: data.businessHours.thursdayStartingTime,
          endTime: data.businessHours.thursdayEndingTime,
        },
        day: 'Thursday',
      },
      {
        openHours: {
          startTime: data.businessHours.fridayStartingTime,
          endTime: data.businessHours.fridayEndingTime,
        },
        day: 'Friday',
      },
      {
        openHours: {
          startTime: data.businessHours.saturdayStartingTime,
          endTime: data.businessHours.saturdayEndingTime,
        },
        day: 'Saturday',
      },
      {
        openHours: {
          startTime: data.businessHours.sundayStartingTime,
          endTime: data.businessHours.sundayEndingTime,
        },
        day: 'Sunday',
      },
    ];
    data.businessHours = mappedBusinessHours;

    console.log('sending req: ', data);
    return this.http
      .put<{ restaurant: Restaurant }>(
        `${this.URL}/restaurant/${this.currentUser?.userId}`,
        data
      )
      .pipe(map((data) => data.restaurant));
  }

  addNewCategory(data: any) {
    // this.menu.menuItems.push({
    //   categoryName: data.name,
    //   categoryItems: [],
    // });

    return this.http
      .post(
        `${this.URL}/menu/category`,
        { name: data.name },
        {
          headers: {
            Authorization: `Bearer ${this.currentUser?.token}`,
          },
        }
      )
      .pipe(
        map((data: any) => {
          this.menu = data;
          this.menu$.next(data);
        })
      );
  }

  updateCategory(data: any, categoryId: any) {
    return this.http
      .put(
        `${this.URL}/menu/category/${categoryId}`,
        { name: data.name },
        {
          headers: {
            Authorization: `Bearer ${this.currentUser?.token}`,
          },
        }
      )
      .pipe(
        map((data: any) => {
          this.menu = data;
          this.menu$.next(data);
        })
      );
  }

  deleteCategory(categoryId: any) {
    return this.http
    .delete(
      `${this.URL}/menu/category/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${this.currentUser?.token}`,
        },
      }
    )
    .pipe(
      map((data: any) => {
        this.menu = data;
        this.menu$.next(data);
      })
    );
  }

  addNewMenuItem(data: any) {
    const menu = {
      name: data.name,
      image: data.image,
      description: data.description,
      price: data.price,
    };

    return this.http
      .post(`${this.URL}/menu/category/${data.category}/item`, menu, {
        headers: {
          Authorization: `Bearer ${this.currentUser?.token}`,
        },
      })
      .pipe(
        map((data: any) => {
          this.menu = data;
          this.menu$.next(data);
        })
      );
  }

  updateMenuItem(data: any, itemId: any, categoryId: any) {

    return this.http
    .put(`${this.URL}/menu/category/${categoryId}/item/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${this.currentUser?.token}`,
      },
    })
    .pipe(
      map((data: any) => {
        this.menu = data;
        this.menu$.next(data);
      })
    );
  }

  deleteMenuItem(itemId: any, categoryId: any) {
    return this.http
    .delete(`${this.URL}/menu/category/${categoryId}/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${this.currentUser?.token}`,
      },
    })
    .pipe(
      map((data: any) => {
        this.menu = data;
        this.menu$.next(data);
      })
    );
  }
}
