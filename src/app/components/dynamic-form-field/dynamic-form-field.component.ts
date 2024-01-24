import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent {
  @Input()
  question!: Question;

  @Input()
  form!: FormGroup;

  getErrorMessage(questionControlName: string | null = null) {
    let formControl: AbstractControl = <FormControl>(
      this.form.get(this.question.key)
    );
    if (questionControlName != null) {
      formControl = <FormControl>this.form.get(questionControlName);
    }
    if (formControl && formControl.errors) {
      console.log(formControl.errors);
      const errorKeys = Object.keys(formControl.errors);
      let errorMessage: string | undefined = '';
      errorKeys.forEach((error) => {
        if (error === 'required') {
          errorMessage = this.question.errorMessage?.['required'];
        } else if (error === 'email') {
          errorMessage = this.question.errorMessage?.['email'];
        } else if (error === 'minlength') {
          errorMessage = this.question.errorMessage?.['minLength'];
        } else if (error === 'maxlength') {
          errorMessage = this.question.errorMessage?.['maxLength'];
        } else if (error === 'invalidHour') {
          errorMessage = this.question.errorMessage?.['invalidHour'];
        }
      });
      if (errorMessage === undefined) {
        errorMessage = 'Invalid input data!';
      }
      return errorMessage;
    }
    return '';
  }

  onBlur() {
    const formControl: AbstractControl = <FormControl>(
      this.form.get(this.question.key)
    );
    const inputValue: string = formControl.value;
    console.log('Inside Blur');
    if (inputValue && inputValue.split('-', 2).length != 0) {
      const splitIntoStartingAndEnding = inputValue.split('-', 2);
      const startingHour: string = splitIntoStartingAndEnding[0].replace(
        /\s+/g,
        ''
      );
      const endingHour: string = splitIntoStartingAndEnding[1].replace(
        /\s+/g,
        ''
      );
      formControl.setValue(`${startingHour} : ${endingHour}`);
    }
  }
}
