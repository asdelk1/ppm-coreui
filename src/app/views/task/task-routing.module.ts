import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './task.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    data: {
      title: 'Tasks'
    },
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'tasks'
    //   }
    // ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TaskRoutingModule {}
