import {Component, OnInit} from '@angular/core';
import {ActionExecute, ListAction, ListActionExecute, ListHeaderColumn, ListSelectionMode} from '../../controls/list/list.intefaces';
import {InputField, InputFieldSize} from '../../controls/form/form.interfaces';
import {ODPClientService} from '../../services/odpclient.service';
import {EntityRecord, EntityResponse} from '../../models/record.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  public headerColumns: ListHeaderColumn[] = [
    {
      name: 'personId',
      label: 'Id'
    },
    {
      name: 'firstName',
      label: 'First Name'
    },
    {
      name: 'lastName',
      label: 'Last Name'
    },
    {
      name: 'department',
      label: 'Department'
    }
  ];

  public actions: ListAction[] = [
    {
      name: 'new',
      label: 'New',
      isBound: false,
      color: 'success',
      selectMode: ListSelectionMode.Multi,
      icon: 'fa-plus'
    }
  ];

  public newDialogFields: InputField[] = [
    {
      name: 'personId',
      label: 'Id',
      type: 'input',
      size: InputFieldSize.large
    },
    {
      name: 'firstName',
      label: 'First Name',
      type: 'input',
      size: InputFieldSize.large
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'input',
      size: InputFieldSize.large
    },
    {
      name: 'department',
      label: 'Department',
      type: 'input',
      size: InputFieldSize.large
    }
  ];

  public isVisibleCreateDialog: boolean = false;

  public persons: EntityRecord[] = [];

  constructor(
    private odataService: ODPClientService
  ) {
  }

  ngOnInit(): void {
    this.odataService.readEntitySet('Persons').subscribe(
      (resp: EntityResponse) => this.persons = resp.data as EntityRecord[]
    );
  }

  public executeListActions(event: ListActionExecute): void {
    switch (event.name) {
      case 'new':
        this.isVisibleCreateDialog = true;
        break;
      default:
    }
  }

  public executeDialogActions(event: ActionExecute): void {
    if (event.name === 'ok') {
      this.odataService.createEntity('Persons', event.record).subscribe(
        (response: EntityResponse) => {
          this.persons = this.persons.concat(response.data);
        }
      );
    }
  }

}
