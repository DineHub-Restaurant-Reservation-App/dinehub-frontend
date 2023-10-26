import { Address } from './address.model';
import { BusinessHour } from './business-hour.model';
import { Menu } from './menu.model';

export class Restaurant {
  constructor(
    public id: string,
    public url: string,
    public name: string,
    public bannerImageHref: string,
    public logoHref: string,
    public address: Address,
    public businessHours: BusinessHour[],
    public cuisine: string[],
    public rating: number,
    public about: string,
    public menu: Menu
  ) {}
}
