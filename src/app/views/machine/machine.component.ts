import {Component, OnInit} from '@angular/core';
import {ListAction, ListActionExecute, ListHeaderColumn, ListSelectionMode} from '../../controls/list/list.intefaces';
import {InputField, InputFieldSize} from '../../controls/form/form.interfaces';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  public machineListHeaders: ListHeaderColumn[] = [
    {
      name: 'machineId',
      label: 'Id'
    },
    {
      name: 'maxAssignments',
      label: 'Total Capacity'
    },
    {
      name: 'nextServiceDate',
      label: 'Next Service Date'
    }
  ];

  public listActions: ListAction[] = [
    {
      name: 'newMachine',
      label: 'New Machine',
      isBound: false,
      selectMode: ListSelectionMode.Single,
      color: 'success',
      icon: 'fa-plus'
    }
  ];

  public newMachineDialogFields: InputField[] = [
    {
      name: 'machineId',
      label: 'Id',
      type: 'input',
      size: InputFieldSize.large
    },
    {
      name: 'maxAssignments',
      label: 'Total Capacity',
      type: 'input',
      size: InputFieldSize.large
    },
    {
      name: 'nextServiceDate',
      label: 'Next Service Date',
      type: 'datetime',
      size: InputFieldSize.large
    }
  ];

  public showNewMachineDialog: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public machineListActionExecute(event: ListActionExecute) {
    if (event.name === 'newMachine') {
      this.showNewMachine();
    }
  }

  private showNewMachine() {
    this.showNewMachineDialog = true;
  }

}
