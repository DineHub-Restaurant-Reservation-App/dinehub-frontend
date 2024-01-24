import { FormControl, FormGroup } from '@angular/forms';
import { Question } from '../models/question.model';

export class QuestionControlService {
  toFormGroup(questions: Question[]): FormGroup {
    const group: any = {};

    questions.forEach((question) => {
      if (!question.questions) {
        group[question.key] = this.toFormControl(question);
      } else {
        const innerFormGroup: any = {};
        const parentQuestionKey = question.key;
        question.questions.forEach((question) => {
          if (parentQuestionKey == 'businessHour') {
            innerFormGroup[question.key + 'StartingTime'] = new FormControl(
              question.startingTime,
              question.validators
            );
            innerFormGroup[question.key + 'EndingTime'] = new FormControl(
              question.endingTime,
              question.validators
            );
          } else {
            innerFormGroup[question.key] = this.toFormControl(question);
          }
        });

        group[question.key] = new FormGroup(innerFormGroup);
      }
    });
    console.log(group);
    return new FormGroup(group);
  }

  private toFormControl(question: Question) {
    return new FormControl(question.value, question.validators);
  }
}
