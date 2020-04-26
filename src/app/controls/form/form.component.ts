import {Component, Input, OnInit} from '@angular/core';
import {InputField} from '../input-field/input-field.interfaces';
import {DummyDataService} from '../../services/DummyDataService.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  @Input()
  label: string;

  @Input()
  fields: InputField[];

  @Input()
  record: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
