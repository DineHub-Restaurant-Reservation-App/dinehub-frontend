export class Reservation {
  constructor(
    public name: string,
    public email: string,
    public phoneNumber: string,
    public date: Date,
    public arrivalTime: string,
    public numberOfGuests: number,
    public additionalRequests: string
  ) {}
}
