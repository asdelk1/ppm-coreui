import {Component, OnInit} from '@angular/core';
import {ListAction, ListActionExecute, ListHeaderColumn, ListSelectionMode} from '../../controls/list/list.intefaces';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ODPClientService} from '../../services/odpclient.service';
import {EntityRecord, EntityResponse} from '../../models/record.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

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
          expression: (data: any) => data['state'] && data['state'] === 'Open',
          color: 'success'
        },
        {
          expression: (data: any) => data['state'] && data['state'] === 'Close',
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
      case 'taskDetails':
        this.navigateToDetails(action.selection);
        break;
      default:
    }
  }

  private navigateToDetails(data: any): void {
    const filterParams: Params = {
      'id': data.id
    };
    this.router.navigate(['details'], {
      relativeTo: this.route,
      queryParams: filterParams
    });
  }
}
