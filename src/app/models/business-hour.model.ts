export class BusinessHour {
  constructor(
    public day: string,
    public startTime: number = 0,
    public startTimePeriod?: string,
    public endTime: number = 0,
    public endTimePeriod?: string,
    public isHoliday?: boolean
  ) {}

  get workingHours(): string {
    if (this.isHoliday) {
      return 'Holiday';
    }
    return `${this.startTime} ${this.startTimePeriod} - ${this.endTime} ${this.endTimePeriod}`;
  }
}
