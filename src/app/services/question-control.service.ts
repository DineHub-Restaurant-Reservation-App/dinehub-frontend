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
        question.questions.forEach((question) => {
          innerFormGroup[question.key] = this.toFormControl(question);
        });
        group[question.key] = new FormGroup(innerFormGroup);
      }
    });

    return new FormGroup(group);
  }

  private toFormControl(question: Question) {
    return new FormControl(question.value, question.validators);
  }
}
