import { ValidatorFn } from '@angular/forms';

export class Question {
  key!: string;
  controlType?: string;
  type?: string;
  label?: string;
  value?: string = '';
  startingTime?: string;
  endingTime?: string;
  validators?: ValidatorFn[];
  questions?: Question[];
  errorMessage?: { [key: string]: string };
  hint?: string;
}
