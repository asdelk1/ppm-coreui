import {RouterModule, Routes} from '@angular/router';
import {MachineComponent} from './machine.component';
import {NgModule} from '@angular/core';


export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Machines'
    },
    children: [
      {
        path: '',
        data: {
          title: ''
        },
        component: MachineComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MachineRoutingModule {
}
