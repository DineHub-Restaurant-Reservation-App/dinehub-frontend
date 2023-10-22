import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent {
  isBusinessTimingDropdownOpen: boolean = false;

  onClickBusinessTimingDropdown() {
    this.isBusinessTimingDropdownOpen = !this.isBusinessTimingDropdownOpen;
  }
}
