export class BusinessHour {
  private day: string;
  private startTime: number;
  private startTimePeriod: string;
  private endTime: number;
  private endTimePeriod: string;
  private isHoliday: boolean;

  constructor(
    day: string,
    startTime?: number,
    startTimePeriod?: string,
    endTime?: number,
    endTimePeriod?: string,
    isHoliday?: boolean
  ) {
    this.day = day;
    this.startTime = startTime || 0;
    this.startTimePeriod = startTimePeriod || '';
    this.endTime = endTime || 0;
    this.endTimePeriod = endTimePeriod || '';
    this.isHoliday = isHoliday || false;
  }

  public getDay(): string {
    return this.day;
  }
  public getStartTime(): string {
    return `${this.startTime} ${this.startTimePeriod}`;
  }

  public getEndTime(): string {
    return `${this.endTime} ${this.endTimePeriod}`;
  }

  public getIsHoliday(): boolean {
    return this.isHoliday;
  }
}
