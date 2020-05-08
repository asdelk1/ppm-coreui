import {Component, OnInit} from '@angular/core';
import {InputField} from '../../../controls/form/form.interfaces';
import {DummyDataService} from '../../../services/DummyDataService.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  formFields: InputField[] = [
    {
      name: 'id',
      type: 'input',
      label: 'ID'
    },
    {
      name: 'name',
      type: 'input',
      label: 'Task Name'
    },
    {
      name: 'Assignee',
      type: 'reference',
      label: 'Assignee'
    }
  ];

  record: any;

  constructor(
    private dataService: DummyDataService
  ) {
  }

  ngOnInit(): void {
    this.record = this.dataService.getTaskData()[0];
  }

  public saveTask(data: any) {
    console.log(JSON.stringify(data));
  }

}
