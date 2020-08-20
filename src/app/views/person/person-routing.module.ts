import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from './person.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Persons'
    },
    children: [
      {
        path: '',
        component: PersonComponent,
        data: {
          title: ''
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PersonRoutingModule {}
