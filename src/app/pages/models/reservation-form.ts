export class ReservationForm {
  private _name: string;
  private _email: string;
  private _phoneNumber: string;
  private _date: Date;
  private _arrivalTime: string;
  private _numberOfGuests: number;
  private _additionalRequests: string;

  constructor(
    name: string,
    email: string,
    phoneNumber: string,
    date: Date,
    arrivalTime: string,
    numberOfGuests: number,
    additionalRequests: string
  ) {
    this._name = name;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._date = date;
    this._arrivalTime = arrivalTime;
    this._numberOfGuests = numberOfGuests;
    this._additionalRequests = additionalRequests;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get arrivalTime(): string {
    return this._arrivalTime;
  }

  set arrivalTime(value: string) {
    this._arrivalTime = value;
  }

  get numberOfGuests(): number {
    return this._numberOfGuests;
  }

  set numberOfGuests(value: number) {
    this._numberOfGuests = value;
  }

  get additionalRequests(): string {
    return this._additionalRequests;
  }

  set additionalRequests(value: string) {
    this._additionalRequests = value;
  }
}
