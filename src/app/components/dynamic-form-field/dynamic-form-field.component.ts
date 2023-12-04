import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  getFormGroup(key: string) {
    return <FormGroup>this.form.get(key);
  }
}
