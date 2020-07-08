import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from './task.component';
import {TaskRoutingModule} from './task-routing.module';
import {ListModule} from '../../controls/list/list.module';
import {DummyDataService} from '../../services/DummyDataService.service';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {FormModule} from '../../controls/form/form.module';
import {DialogComponent} from '../../controls/dialog/dialog.component';
import {DialogModule} from '../../controls/dialog/dialog.module';
import {ClickOutsideModule} from '../../directives/click-outside/click-outside.module';


@NgModule({
  declarations: [
    TaskComponent,
    TaskDetailComponent
  ],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ListModule,
        FormModule,
        DialogModule,
        ClickOutsideModule
    ],
  providers: [
    DummyDataService
  ]
})
export class TaskModule { }
