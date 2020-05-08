import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EntityRecord} from '../../models/record.model';

@Component({
  selector: 'app-reference-field',
  templateUrl: './reference-field.component.html',
  styleUrls: ['./reference-field.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ReferenceFieldComponent implements OnInit {

  public users: EntityRecord[] = [
    {
      'entityId': 'ASDELK',
      'personId': 1,
      'firstName': 'Asitha',
      'lastName': 'De Alwis',
      'department': 'Gantt'
    },
    {
      'entityId': 'KUMJLK',
      'personId': 2,
      'firstName': 'Kumeri',
      'lastName': 'Jayasenthu',
      'department': 'Calendar'
    }
  ];

  @Input()
  public edit: boolean = false;

  public displayName: string = 'firstName';

  public filterResult: EntityRecord[] = [];

  public showDropdown: boolean = false;

  public inputField: FormControl = new FormControl();

  private selectedRecord: EntityRecord;

  constructor() {
  }

  ngOnInit(): void {
    this.inputField.valueChanges.subscribe(
      (keyword: string) => {
        this.filterResult = [];
        this.filterResult = this.users.filter(
          (user: EntityRecord) => (user['firstName'] as string).includes(keyword)
        );
        this.showDropdown = this.filterResult.length > 0;
      }
    );
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
