export class BusinessHour {
  constructor(
    public day: string,
    public openHours: {
      startTime: string;
      endTime: string;
      startTimePeriod?: string;
      endTimePeriod?: string;
    },
    public isHoliday?: boolean
  ) {}

  get workingHours(): string {
    if (this.isHoliday) {
      return 'Holiday';
    }
    return `${this.openHours.startTime} ${this.openHours.startTimePeriod} - ${this.openHours.endTime} ${this.openHours.endTimePeriod}`;
  }
}
