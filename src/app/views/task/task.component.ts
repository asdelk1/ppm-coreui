import {Component, OnInit} from '@angular/core';
import {ListAction, ListActionExecute, ListHeaderColumn, ListSelectionMode} from '../../controls/list/list.intefaces';
import {DummyDataService} from '../../services/DummyDataService.service';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public headers: ListHeaderColumn[] = [
    {
      name: 'id',
      label: 'ID'
    },
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'state',
      label: 'State',
      badge: [
        {
          expression: (data: any) => data['state'] && data['state'] === 'Open',
          color: 'success'
        },
        {
          expression: (data: any) => data['state'] && data['state'] === 'Close',
          color: 'danger'
        }
      ]
    }
  ];

  public actions: ListAction[] = [
    {
      name: 'addTask',
      color: 'success',
      enable: (data: any) => true,
      label: 'New Task',
      icon: 'fa-plus',
      selectMode: ListSelectionMode.Single,
      isBound: false
    },
    {
      name: 'taskDetails',
      isBound: true,
      selectMode: ListSelectionMode.Single,
      label: 'Details'
    }
  ];

  public taskData: Task[];

  constructor(private dataService: DummyDataService) {
  }

  ngOnInit(): void {
    this.taskData = this.dataService.getTaskData();
  }

  handleActions(action: ListActionExecute) {
    console.log(JSON.stringify(action));
  }
}
