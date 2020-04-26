import {Component, Input, OnInit} from '@angular/core';
import {InputField} from './input-field.interfaces';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Input()
  field: InputField;

  @Input()
  record: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
