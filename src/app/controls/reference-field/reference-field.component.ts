import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EntityRecord} from '../../models/record.model';
import {InputField} from '../form/form.interfaces';


@Component({
  selector: 'app-reference-field',
  templateUrl: './reference-field.component.html',
  styleUrls: ['./reference-field.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReferenceFieldComponent implements OnInit, OnChanges {

  @Input()
  public edit: boolean = false;

  @Input()
  public record: any;

  @Input()
  metadata: InputField;

  public displayName: string = 'firstName';

  public filterResult: EntityRecord[] = [];

  public showDropdown: boolean = false;

  public inputField: FormControl = new FormControl();

  private selectedRecord: EntityRecord;

  constructor() {
  }

  ngOnInit(): void {
    this.setValue();
    this.inputField.valueChanges.subscribe(
      (keyword: string) => {
        this.filterResult = [];
        // this.filterResult = this.users.filter(
        //   (user: EntityRecord) => (user['firstName'] as string).includes(keyword)
        // );
        this.showDropdown = this.filterResult.length > 0;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
      this.setValue();
  }

  setValue(): void {
    if (this.record && this.metadata) {
      const fields: string[] = this.metadata.childFields;
      if (fields.length > 2) {
        console.error(`Reference field ${this.metadata.name} has more than 2 child fields`);
        return;
      }
      const childRecord: any = this.record[this.metadata.name];
      const fieldValues: string[] = fields.map((field: string) => childRecord[field]);
      const inputFieldValue: string = fieldValues.join(this.metadata.separator);
      this.inputField.setValue(inputFieldValue);
    }
  }

  public onDropdownItemClick(itemRecord: EntityRecord): void {
    this.showDropdown = false;
    this.inputField.setValue(itemRecord['firstName']);
    this.selectedRecord = itemRecord;
  }

  public clickOutside(): void {
    this.showDropdown = false;
  }

}
