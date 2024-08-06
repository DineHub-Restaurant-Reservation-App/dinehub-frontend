import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  @Input()
  questions!: Question[];

  @Input()
  form!: FormGroup;

  @Output()
  formEvent: EventEmitter<{ eventName: string; value?: any }> =
    new EventEmitter();

  getFormGroup(key: string) {
    return <FormGroup>this.form.get(key);
  }
}
