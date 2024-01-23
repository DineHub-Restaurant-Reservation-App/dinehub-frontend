import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

// TODO: remove and re-use the menu.model
export interface MenuItemType {
  name: string;
  id?: string;
  description: string;
  category: string;
  price: number;
  imageURL: string;
  availability?: boolean;
}

export interface MenuType {
  name: string;
  id?: string;
  description: string;
  items: MenuItemType[];
}

export interface GeneralInfoType {
  name: String;
  address: String;
  bannerImage: String;
  logo: String;
  businessHour: String;
  cuisine: String;
  rating: String;
  about: String;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  public generalInfoSubject: Subject<{}> = new Subject();
  public reservationInfoSubject: Subject<{}> = new Subject();
  public menuSubject: Subject<MenuType[]> = new Subject();

  private currentUser?: User | null;
  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
  }

  private generalInfo = {
    name: 'Aloha Bites',
    about:
      "Aloha Bites is a taste of the Hawaiian islands right in the heart of Tropical Paradise. Enjoy our fresh seafood dishes and traditional Hawaiian flavors. Whether it's poke bowls or grilled mahi-mahi, we bring the spirit of aloha to your plate.",
    logo: 'https://images.rawpixel.com/image_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvMzEyLXRlZDkzNzktY2hpbS5qcGc.jpg',
    banner:
      'https://images.rawpixel.com/image_600/cHJpdmF0ZS9zdGF0aWMvaW1hZ2VzL3dlYnNpdGUvMjAyMi0wNi90cDI3MS1wcmVzZW50YXRpb24tMTMuanBn.jpg',
    address: {
      street: '789',
      city: 'Luau Lane',
      state: 'Tropical Paradise',
      postalCode: 'M1M1M1',
    },
    contactInformation: {
      websiteURL: "alohabite.com'",
      phoneNumber: '4629899763',
      email: 'alohabite@gmail.com',
    },
    operatingHours: {
      monday: '12',
      tuesday: '12',
      wednesday: '12',
      thursday: '12',
      friday: '12',
      saturday: '12',
      sunday: '12',
    },
  };

  private menu: MenuType[] = [
    {
      name: 'Seafood',
      description: '',
      items: [
        {
          name: 'Grilled Salmon',
          description:
            'A succulent grilled salmon fillet seasoned to perfection.',
          category: 'Seafood',
          price: 19.99,
          imageURL:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=2960&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          availability: true,
        },
        {
          name: 'Ribeye Steak',
          description:
            'A succulent grilled salmon fillet seasoned to perfection.',
          category: 'Seafood',
          price: 29.99,
          imageURL:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=2960&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          availability: true,
        },
      ],
    },
  ];

  private reservationInfo = {
    slotInterval: '60',
    bufferTime: '0',
    tableCount: null,
    capacityPerTable: null,
  };

  getGeneralInfoData() {
    console.log(this.currentUser);
    return { ...this.generalInfo };
  }
  getMenuDataByCategory() {
    return [...this.menu];
  }
  getReservationInfoData() {
    return { ...this.reservationInfo };
  }

  getCategories() {
    return ['Seafood', 'sides'];
  }

  updateGeneralInfoData(data: any) {
    this.generalInfo = data;
    this.generalInfoSubject.next(this.getGeneralInfoData());
  }
  updateReservationInfoData(data: any) {
    this.reservationInfo = data;
    this.reservationInfoSubject.next(this.getReservationInfoData());
  }

  addNewCategory(data: MenuType) {
    this.menu.push(data);
    this.menuSubject.next(this.getMenuDataByCategory());
    console.log('Updated Menu Category', this.getMenuDataByCategory());
  }
  addNewMenuItem(data: any) {
    const newMenuList = [...this.menu];
    newMenuList.forEach((category) => {
      if (category.name === data.category) {
        category.items.push(data);
      }
    });
    this.menuSubject.next(this.getMenuDataByCategory());
  }

  updateCategory(data: MenuType) {}

  updateMenuItem(data: MenuItemType) {}
}
