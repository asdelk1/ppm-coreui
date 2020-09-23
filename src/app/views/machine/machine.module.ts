import {NgModule} from '@angular/core';
import {MachineComponent} from './machine.component';
import {ListModule} from '../../controls/list/list.module';
import {DialogModule} from '../../controls/dialog/dialog.module';
import {MachineRoutingModule} from './machine-routing.module';

@NgModule({
  declarations: [
    MachineComponent
  ],
  imports: [
    MachineRoutingModule,
    ListModule,
    DialogModule
  ]
})
export class MachineModule {
}
