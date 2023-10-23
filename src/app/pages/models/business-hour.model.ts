export class BusinessHour {
  private _day: string;
  private _startTime: number;
  private _startTimePeriod: string;
  private _endTime: number;
  private _endTimePeriod: string;
  private _isHoliday: boolean;

  constructor(
    day: string,
    startTime?: number,
    startTimePeriod?: string,
    endTime?: number,
    endTimePeriod?: string,
    isHoliday?: boolean
  ) {
    this._day = day;
    this._startTime = startTime || 0;
    this._startTimePeriod = startTimePeriod || '';
    this._endTime = endTime || 0;
    this._endTimePeriod = endTimePeriod || '';
    this._isHoliday = isHoliday || false;
  }

  get day(): string {
    return this._day;
  }

  get workingHours(): string {
    if (this._isHoliday) {
      return 'Holiday';
    }
    return `${this._startTime} ${this._startTimePeriod} - ${this._endTime} ${this._endTimePeriod}`;
  }
  get startTime(): number {
    return this._startTime;
  }

  get endTime(): number {
    return this._endTime;
  }

  get isHoliday(): boolean {
    return this._isHoliday;
  }
}
