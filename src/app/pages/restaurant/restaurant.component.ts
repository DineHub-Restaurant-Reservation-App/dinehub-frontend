import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormatBusinessHoursPipe } from 'src/app/pipes/format-business-hours.pipe';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  isBusinessTimingDropdownOpen: boolean = false;
  restaurant!: Restaurant;
  today!: {
    day: string;
    time: number;
  };
  isLoading: boolean = true;

  constructor(
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute,
    private title: Title
  ) {}
  ngOnInit(): void {
    let restaurantName = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      restaurantName = params['id'];
    });

    this.restaurantService
      .fetchRestaurant(restaurantName)
      .subscribe((restaurant) => {
        this.isLoading = false;
        this.restaurant = restaurant;
        console.log(restaurant);
        this.title.setTitle(`DineHub | ${restaurant.name}`);
      });
    this.getTodayDetails();
  }

  getTodayDetails() {
    const date = new Date();
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    this.today = {
      day: daysOfWeek[date.getDay()].toLowerCase(),
      time: date.getHours() <= 12 ? date.getHours() : date.getHours() - 12,
    };
  }

  get isOpen() {
    for (let businessHour of this.restaurant.businessHours) {
      if (
        !businessHour.isHoliday &&
        businessHour.day.toLowerCase() === this.today.day &&
        this.today.time >= businessHour.startTime &&
        this.today.time <= businessHour.endTime
      ) {
        return { value: 'Open', style: 'text-green' };
      }
    }
    return { value: 'Closed', style: 'text-red' };
  }

  get todayBusinessHours() {
    for (let businessHour of this.restaurant.businessHours) {
      if (businessHour.day.toLowerCase() === this.today.day) {
        return businessHour;
      }
    }
    console.log(`Error while finding ${this.today.day}'s business hours`);
    return '';
  }

  onClickBusinessTimingDropdown() {
    this.isBusinessTimingDropdownOpen = !this.isBusinessTimingDropdownOpen;
  }
}
