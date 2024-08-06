export class Address {
  constructor(
    public street: string,
    public city: string,
    public province: string,
    public postalCode: string,
    public country: string
  ) {}

  public getFormattedAddress() {
    return `${this.street}, ${this.city}, ${this.province}, ${this.postalCode},${this.country}`;
  }
}
