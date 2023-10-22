export class Address {
  private street: string;
  private city: string;
  private province: string;
  private zipCode: string;
  private country: string;
  constructor(
    street: string,
    city: string,
    province: string,
    zipCode: string,
    country: string
  ) {
    this.street = street;
    this.city = city;
    this.province = province;
    this.zipCode = zipCode;
    this.country = country;
  }

  toString() {
    return `${this.street}, ${this.city}, ${this.province}, ${this.zipCode},${this.country}`;
  }
}
