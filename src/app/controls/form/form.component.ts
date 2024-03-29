import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputField} from './form.interfaces';
import {EntityRecord} from '../../models/record.model';
import {FormService} from '../../services/form.service';

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
  record: EntityRecord;

  @Input()
  isEditable: boolean = true;

  @Output()
  onSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formService: FormService) {
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
    const newRecord: EntityRecord = new EntityRecord(this.form.value);
    newRecord.setId(this.record.getId());
    this.onSubmit.emit(newRecord);
    this.editMode();
  }

  editMode(): void {
    this.edit = this.isEditable === true ? !this.edit : false;
  }

  public onFormReset(): void {
    this.editMode();
    this.form.reset(this.record.getEntity());
  }

  public getErrorMessage(fieldName: string): string {
    return this.formService.getErrorMessage(this.form, fieldName);
  }

  private processInputFields(): void {
    this.form = this.formService.getFormGroup(this.fields, this.record);
  }
}
