import {Component, OnInit} from '@angular/core';
import {InputField} from '../../../controls/input-field/input-field.interfaces';
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
      label: 'ID'
    },
    {
      name: 'name',
      label: 'Task Name'
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

}
