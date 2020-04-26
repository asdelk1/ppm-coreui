import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './task.component';
import {NgModule} from '@angular/core';
import {TaskDetailComponent} from './task-detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tasks'
    },
    children: [
      {
        path: '',
        component: TaskComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'details',
        component: TaskDetailComponent,
        data: {
          title: 'Details'
        }
      }
    ]
  },
  // {
  //   path: 'details',
  //   component: TaskDetailComponent,
  //   data: {
  //     title: ''
  //   }
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TaskRoutingModule {
}
