import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EntityRecord, EntityResponse} from '../../models/record.model';
import {InputField} from '../form/form.interfaces';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {ODPClientService} from '../../services/odpclient.service';


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
  public parentRecord: any;

  @Input()
  metadata: InputField;

  @Input()
  datasource: string;

  public filterResult: EntityRecord[] = [];

  public isDropdownVisible: boolean = false;

  public inputField: FormControl = new FormControl();

  private selectedRecord: EntityRecord;

  constructor(
    private odpClientService: ODPClientService
  ) {
  }

  ngOnInit(): void {
    if (this.datasource) {
      this.inputField.valueChanges.pipe(
        tap((data: any) => console.log(JSON.stringify(data))),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term: string | number) => {
          let condition: string | undefined;
          if (this.metadata.filterFields && this.metadata.filterFields.length > 0) {
            condition = '';
            this.metadata.filterFields.forEach(
              (field: string) => {
                if (condition !== '') {
                  condition += ' or ';
                }

                condition += 'startswith(' + field + ',' + (typeof term === 'string' ? '\'' + term + '\'' : term.toString()) + ')';
              }
            );
          }
          return this.odpClientService.readEntitySet(this.datasource, condition);
        })
      ).subscribe((result: EntityResponse) => {
        this.filterResult = result.data as EntityRecord[];
        this.showDropdown();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.parentRecord) {
      this.selectedRecord = this.parentRecord[this.metadata.name] as EntityRecord;
      this.inputField.setValue(this.getDisplayText());
    }
  }

  getDisplayText(): string {
    if (this.selectedRecord && this.metadata) {
      const fields: string[] = this.metadata.displayFields;
      if (fields.length > 2) {
        console.error(`Reference field ${this.metadata.name} has more than 2 child fields`);
        return;
      }
      const fieldValues: string[] = fields.map((field: string) => (this.selectedRecord[field]).toString());
      return fieldValues.join(this.metadata.separator);
    }
  }

  private showDropdown(): void {
    this.isDropdownVisible = this.filterResult.length > 0 && this.edit;
  }

  private hideDropDown(): void {
    this.isDropdownVisible = false;
  }

  public getReferenceHeader(record: EntityRecord): string {
    const fieldValues: string[] = this.metadata.referenceItem.headerField.map((field: string) => (record[field]).toString());
    return fieldValues.join(' ');
  }

  public onDropdownItemClick(itemRecord: EntityRecord): void {
    this.hideDropDown();
    this.selectedRecord = itemRecord;
    this.inputField.setValue(this.getDisplayText());
  }

  public clickOutside(): void {
    this.hideDropDown();
  }

}
