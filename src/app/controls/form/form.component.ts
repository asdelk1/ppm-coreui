import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {InputField} from './form.interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  edit = false;

  @Input()
  label: string;

  @Input()
  fields: InputField[];

  @Input()
  record: any;

  @Input()
  isEditable: boolean = true;

  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    if (this.fields) {
      this.processInputFields();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.record || changes.fields) {
      this.processInputFields();
    }
  }


  onFormSubmit(): void {
    this.onSubmit.emit(this.form.value);
    this.editMode();
  }

  editMode(): void {
    this.edit = this.isEditable === true ? !this.edit : false;
  }

  public onButtonReset(): void {
    this.editMode();
    this.form.reset(this.record);
  }

  public getErrorMessage(fieldName: string): string {
    const abstractControl: AbstractControl = this.form.get(fieldName);
    if (abstractControl.hasError('required')) {
      return 'This field is required';
    }
  }

  private processInputFields(): void {
    const controls: { [name: string]: AbstractControl } = {};
    for (const field of this.fields) {
      const validators: ValidatorFn[] = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      controls[field.name] = new FormControl(this.record[field.name] ? this.record[field.name] : null, validators);
    }
    this.form = new FormGroup(controls);
  }
}
