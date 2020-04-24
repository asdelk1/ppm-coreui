import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from './task.component';
import {TaskRoutingModule} from './task-routing.module';
import {ListModule} from '../../controls/list/list.module';
import {DummyDataService} from '../../services/DummyDataService.service';


@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ListModule
  ],
  providers: [
    DummyDataService
  ]
})
export class TaskModule { }
