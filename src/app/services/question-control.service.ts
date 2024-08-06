import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Question } from '../models/question.model';

export class QuestionControlService {
  toFormGroup(questions: Question[]): FormGroup {
    const group: any = {};

    questions.forEach((question) => {
      if (!question.questions) {
        if (question.controlType === 'seatingArrangements') {
          const seatingArrangementsFormArray: any[] = [];
          question.formArray &&
            question.formArray.forEach((value) => {
              const seatingGroup = new FormGroup({
                tableNumber: new FormControl(value.tableNumber),
                capacity: new FormControl(value.capacity),
              });
              seatingArrangementsFormArray.push(seatingGroup);
            });
          group[question.key] = new FormArray(seatingArrangementsFormArray);
        } else {
          group[question.key] = this.toFormControl(question);
        }
      } else {
        const innerFormGroup: any = {};
        const parentQuestionKey = question.key;
        question.questions.forEach((question) => {
          if (parentQuestionKey == 'businessHours') {
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
    return new FormGroup(group);
  }

  private toFormControl(question: Question) {
    return new FormControl(question.value, question.validators);
  }
}
