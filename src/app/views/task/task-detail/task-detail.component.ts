import {Component, OnInit} from '@angular/core';
import {InputField} from '../../../controls/form/form.interfaces';
import {ActivatedRoute} from '@angular/router';
import {ODPClientService} from '../../../services/odpclient.service';
import {EntityRecord, EntityResponse} from '../../../models/record.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  formFields: InputField[] = [
    {
      name: 'taskId',
      type: 'text',
      label: 'ID'
    },
    {
      name: 'name',
      type: 'text',
      label: 'Task Name'
    },
    {
      name: 'assignee',
      type: 'reference',
      label: 'Assignee',
      separator: ' ',
      displayFields: ['firstName', 'lastName'],
      targetDatasource: 'Persons',
      filterFields: ['firstName', 'lastName'],
      referenceItem: {
        headerField: ['firstName', 'lastName'],
        fields: ['department']
      }
    }
  ];

  record: EntityRecord;

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

  public saveTask(data: EntityRecord) {
    this.odp.updateEntity('Tasks', data).subscribe(
      (result: EntityResponse) => {
        // TODO: Need to add a toast message.
        return;
      }
    );
  }

}
