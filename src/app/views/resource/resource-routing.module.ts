import {RouterModule, Routes} from '@angular/router';
import {ResourceComponent} from './resource.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Resources'
    },
    children: [
      {
        path: '',
        data: {
          title: ''
        },
        component: ResourceComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ResourceRoutingModule {
}
