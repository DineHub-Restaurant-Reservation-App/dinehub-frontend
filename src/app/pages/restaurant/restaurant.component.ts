import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';
import { FormatBusinessHoursPipe } from 'src/app/pipes/format-business-hours.pipe';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from '../../models/restaurants.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  isBusinessTimingDropdownOpen: boolean = false;
  restaurant!: Restaurant;
  restaurantMenu!: any;
  today!: {
    day: number;
    time: number;
  };
  isLoading: boolean = true;
  daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private title: Title
  ) {}
  ngOnInit(): void {
    let restaurantId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      restaurantId = params['id'];
    });
    const restaurant = this.restaurantService.fetchRestaurant(restaurantId);

    forkJoin([restaurant]).subscribe(([restaurant]) => {
      this.isLoading = false;
      this.restaurant = restaurant;
      // this.restaurantMenu = menu;
      console.log(restaurant);
      this.title.setTitle(`DineHub | ${restaurant.name}`);
    });

    this.getTodayDetails();
  }

  getTodayDetails() {
    const date = new Date();
    this.today = {
      day: date.getDay(),
      time: date.getHours(),
    };
  }

  get isOpen() {

    if(this.restaurant.businessHours){
      const todayTiming = this.restaurant.businessHours[this.today.day];
      const startTime: number = +todayTiming.from.split(':')[0];
      const endTime: number = +todayTiming.to.split(':')[0];
      return this.today.time >= startTime && this.today.time <= endTime ? { value: 'Open', style: 'text-green' }: { value: 'Closed', style: 'text-red' }
    }

    return { value: 'Closed', style: 'text-red' };
    
  }

  get todayBusinessHours() {
    return this.restaurant.businessHours[this.today.day] ?? '';
  }

  onClickBusinessTimingDropdown() {
    this.isBusinessTimingDropdownOpen = !this.isBusinessTimingDropdownOpen;
  }
}
