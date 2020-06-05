import {Component, OnInit} from '@angular/core';
import {InputField} from '../../../controls/form/form.interfaces';
import {DummyDataService} from '../../../services/DummyDataService.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ODPClientService} from '../../../services/odpclient.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  formFields: InputField[] = [
    {
      name: 'taskId',
      type: 'input',
      label: 'ID'
    },
    {
      name: 'name',
      type: 'input',
      label: 'Task Name'
    },
    {
      name: 'assignee',
      type: 'reference',
      label: 'Assignee',
      separator: ' ',
      childFields: ['firstName', 'lastName'],
      targetDatasource: 'Persons',
      filterFields: ['firstName', 'lastName']
    }
  ];

  record: any;

  constructor(
    private route: ActivatedRoute,
    private odp: ODPClientService
  ) {
  }

  ngOnInit(): void {
    const filterParams: string = this.route.snapshot.queryParams['filter'];
    this.odp.readEntitySet('Tasks', filterParams, ['assignee']).subscribe(
      (result: any) => this.record = result.data[0]
    );
  }

  public saveTask(data: any) {
    console.log(JSON.stringify(data));
  }

}
