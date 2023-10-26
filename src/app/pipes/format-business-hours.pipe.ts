import { Pipe, PipeTransform } from '@angular/core';
import { BusinessHour } from '../models/business-hour.model';

@Pipe({
  name: 'formatBusinessHours',
})
export class FormatBusinessHoursPipe implements PipeTransform {
  transform(value: BusinessHour | '', ...args: unknown[]): unknown {
    if (value === '') {
      return '';
    }
    if (value.isHoliday) {
      return 'Holiday';
    }
    return `${value.startTime} ${value.startTimePeriod} - ${value.endTime} ${value.endTimePeriod}`;
  }
}
