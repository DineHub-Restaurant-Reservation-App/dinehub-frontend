import { Menu } from "./menu.model";

export interface Restaurant {
  _id: string;
  name: string;
  email: string;
  password?: string;
  address: Address;
  phoneNumber: string;
  url: string;
  about: string;
  cuisine: string;
  bannerImageHref: string;
  logoHref: string;
  rating: string;
  businessHours: BusinessHours[];
  seatingArrangements: SeatingArragements[];
  slotInterval: number;
  menu: Menu;
  isVisible: boolean;
  reservations:any;
}

export interface Address{
  street:string,
  city:string,
  province:string,
  postalCode:string,
  country:string
}

export interface BusinessHours {
  from: string;
  to: string;
}

export interface SeatingArragements {
  tableNumber: number;
  capacity: number;
}
