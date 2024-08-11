import { Pipe, PipeTransform } from '@angular/core';
import { BusinessHours } from '../models/restaurants.model';

@Pipe({
  name: 'formatBusinessHours',
})
export class FormatBusinessHoursPipe implements PipeTransform {
  transform(value: BusinessHours | '', ...args: unknown[]): unknown {
    if (value === '') {
      return '';
    }
    if (value.from === '00:00' && value.to === '00:00') {
      return 'Holiday';
    }
    return `${value.from} - ${value.to}`;
  }
}
