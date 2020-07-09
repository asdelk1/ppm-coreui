import {Component, OnInit} from '@angular/core';
import {ActionExecute, ListAction, ListActionExecute, ListHeaderColumn, ListSelectionMode} from '../../controls/list/list.intefaces';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ODPClientService} from '../../services/odpclient.service';
import {EntityRecord, EntityResponse} from '../../models/record.model';
import {InputField, InputFieldSize} from '../../controls/form/form.interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public showTaskCreateDialog: boolean = false;

  public headers: ListHeaderColumn[] = [
    {
      name: 'taskId',
      label: 'ID'
    },
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'dateCreated',
      label: 'Created Date',
      badge: [
        {
          expression: (data: EntityRecord) => data['state'] && data['state'] === 'Open',
          color: 'success'
        },
        {
          expression: (data: EntityRecord) => data['state'] && data['state'] === 'Close',
          color: 'danger'
        }
      ]
    },
    {
      name: 'earlyStart',
      label: 'Early Start'
    },
    {
      name: 'earlyFinish',
      label: 'Early Finish'
    },
    {
      name: 'lateStart',
      label: 'Early Start'
    },
    {
      name: 'lateFinish',
      label: 'Late Finish'
    },
    {
      name: 'freeFloat',
      label: 'Free Float'
    },
    {
      name: 'totalFloat',
      label: 'Total Float'
    },
  ];

  newTaskDialogFields: InputField[] = [
    {
      name: 'taskId',
      type: 'text',
      label: 'ID',
      size: InputFieldSize.large
    },
    {
      name: 'name',
      type: 'text',
      label: 'Task Name',
      size: InputFieldSize.large
    },
    {
      name: 'assignee',
      type: 'reference',
      label: 'Assignee',
      size: InputFieldSize.large,
      separator: ' ',
      displayFields: ['firstName', 'lastName'],
      targetDatasource: 'Persons',
      filterFields: ['firstName', 'lastName'],
      referenceItem: {
        headerField: ['firstName', 'lastName'],
        fields: ['department']
      }
    },
    {
      name: 'earlyStart',
      type: 'datetime-local',
      label: 'Early Start',
      size: InputFieldSize.large
    },
    {
      name: 'earlyFinish',
      type: 'datetime-local',
      label: 'Early Finish',
      size: InputFieldSize.large
    },
    {
      name: 'lateStart',
      type: 'datetime-local',
      label: 'Late Start',
      size: InputFieldSize.large
    },
    {
      name: 'lateFinish',
      type: 'datetime-local',
      label: 'Late Finish',
      size: InputFieldSize.large
    },
    {
      name: 'freeFloat',
      type: 'text',
      label: 'Free Float',
      size: InputFieldSize.large
    },
    {
      name: 'totalFloat',
      type: 'text',
      label: 'Total Float',
      size: InputFieldSize.large
    },
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

  public taskData: EntityRecord[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oDataService: ODPClientService) {
  }

  ngOnInit(): void {
    this.oDataService.readEntitySet('Tasks')
      .subscribe(
        (result: EntityResponse) => {
          this.taskData = <EntityRecord[]>result.data;
        }
      );
  }

  handleActions(action: ListActionExecute) {
    switch (action.name) {
      case 'addTask':
        this.createTask();
        break;
      case 'taskDetails':
        this.navigateToDetails(action.selection[0]);
        break;
      default:
    }
  }

  private createTask(): void {
    this.showTaskCreateDialog = true;
  }

  private navigateToDetails(data: any): void {
    const filterParams: Params = {
      'filter': 'taskId eq \'' + data['taskId'] + '\''
    };
    this.router.navigate(['details'], {
      relativeTo: this.route,
      queryParams: filterParams,
    });
  }

  public onCreateTaskExecute(event: ActionExecute): void {
    if (event.name === 'ok') {
      this.oDataService.saveEntity('Tasks', event.record).subscribe(
        (response: EntityResponse) => {
          this.taskData = this.taskData.concat(response.data);
        }
      );
    }
  }
}
