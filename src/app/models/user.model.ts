import { Restaurant } from './restaurant.model';

export class User {
  constructor(
    public restaurant: Restaurant,
    public _token: string,
    public _tokenExpirationDate: Date,
    public userId?: string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
