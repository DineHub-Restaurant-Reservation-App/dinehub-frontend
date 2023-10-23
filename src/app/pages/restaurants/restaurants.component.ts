import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from '../models/address.model';
import { BusinessHour } from '../models/business-hour.model';
import { Menu, MenuItem } from '../models/menu.model';
import { Restaurant } from '../models/restaurant.model';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  searchFormControl = new FormControl();

  restaurants!: Restaurant[];

  ngOnInit(): void {
    const seaShell = new Restaurant(
      '',
      'restaurant/sea-shell',
      'Sea Shell',
      '',
      '',
      new Address(
        '123 Ocean Avenue',
        'Seaside City',
        'ON',
        'M1K4S6',
        'Country'
      ),
      [
        new BusinessHour('Monday', 9, 'AM', 10, 'PM'),
        new BusinessHour('Tuesday', 9, 'AM', 10, 'PM'),
        new BusinessHour('Thursday', 9, 'AM', 10, 'PM'),
        new BusinessHour('Friday', 9, 'AM', 10, 'PM'),
        new BusinessHour('Saturday', 9, 'AM', 10, 'PM'),
        new BusinessHour('Sunday', 0, '', 0, '', true),
      ],
      ['Seafood'],
      4.5,
      "Welcome to the Sea Shell Restaurant, a paradise for seafood lovers. Our menu is filled with a wide range of delectable seafood dishes, all prepared with the freshest catch from the ocean. Whether you're a seafood connoisseur or new to the world of underwater flavors, our chefs are ready to tantalize your taste buds with a memorable culinary experience.",
      new Menu([
        {
          category: 'Featured Items',
          items: [
            new MenuItem(
              'Featured Items',
              'Chicken Biriyani',
              'https://material.angular.io/assets/img/examples/shiba2.jpg',
              'Home style chicken biriyni',
              5.99
            ),
          ],
        },
      ])
    );
    this.restaurants = [seaShell];
  }
}
