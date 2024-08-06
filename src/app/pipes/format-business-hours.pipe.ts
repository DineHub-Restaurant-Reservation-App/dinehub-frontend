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
    return `${value.openHours.startTime} - ${value.openHours.endTime}`;
    // return `${value.openHours.startTime} ${value.openHours.startTimePeriod} - ${value.openHours.endTime} ${value.openHours.endTimePeriod}`;
  }
}
