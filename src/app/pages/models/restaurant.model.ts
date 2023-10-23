import { Address } from './address.model';
import { BusinessHour } from './business-hour.model';
import { Menu } from './menu.model';

export class Restaurant {
  private _id: string;
  private _url: string;
  private _name: string;
  private _bannerImageHref: string;
  private _logoHref: string;
  private _address: Address;
  private _businessHours: BusinessHour[];
  private _cuisine: string[];
  private _rating: number;
  private _about: string;
  private _menu: Menu;

  constructor(
    id: string,
    url: string,
    name: string,
    bannerImageHref: string,
    logoHref: string,
    address: Address,
    businessHours: BusinessHour[],
    cuisine: string[],
    rating: number,
    about: string,
    menu: Menu
  ) {
    this._id = id;
    this._url = url;
    this._name = name;
    this._bannerImageHref = bannerImageHref;
    this._logoHref = logoHref;
    this._address = address;
    this._businessHours = businessHours;
    this._cuisine = cuisine;
    this._rating = rating;
    this._about = about;
    this._menu = menu;
  }

  get id(): string {
    return this._id;
  }
  get url(): string {
    return this._url;
  }

  get name(): string {
    return this._name;
  }

  get bannerImageHref(): string {
    return this._bannerImageHref;
  }

  get logoHref(): string {
    return this._logoHref;
  }

  get address(): Address {
    return this._address;
  }

  get businessHours(): BusinessHour[] {
    return this._businessHours;
  }

  get cuisine(): string[] {
    return this._cuisine;
  }

  get rating(): number {
    return this._rating;
  }

  get about(): string {
    return this._about;
  }

  get menu(): Menu {
    return this._menu;
  }
}
