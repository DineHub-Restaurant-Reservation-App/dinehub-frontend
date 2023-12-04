import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() controlType: string = 'text';
  @Input() errorMessage: string = '';
}
